import { Activity, singleS3StreamOutput } from 'aries-data';
import rp from 'request-promise';

/**
 * Activity to run a query on Eurostat
 */

const baseURI = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1';

// Requires a language (english, french, or german). Arbitrary for our purposes.
const lang = 'en';

export default class EurostatSource extends Activity {
	static props = {
		name: require('../package.json').name,
		version: require('../package.json').version
	};

	@singleS3StreamOutput('json')
	async onTask(activityTask, config) {
		this.log.info('running');
		const data = await this.getDataSet(config);
		return data;
	}

	async getDataSet({ format, datasetCode, geo, nace_r2, unit, precision, s_adj }) {
		const options = {
			uri: `${baseURI}/${format}/${lang}/${datasetCode}`,
			qs: {
				geo,
				nace_r2,
				precision,
				unit,
				s_adj
			},
			headers: {
				'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
			},
			json: true
		}

		this.log.info('before response');
		const response = await rp(options)
		const data = await this.mapProperties(response);
		return response;
	}


	async mapProperties(dataSet) {
		const value = dataSet.value;
		const timeKeys = Object.keys(value);
		const index = dataSet.dimension.time.category.index;
		const keyIndex = Object.keys(index);
		const valueIndex = Object.values(index);

		let mappedProperties = [];
		this.log.info('before timeKeys foreach');
		timeKeys.forEach((time) => {
			this.log.info('before valueIndex foreach');
			valueIndex.forEach((val) => {
				if (val.toString() === time) {
					const obj = {
						period : keyIndex[val],
						index : value[time],
						timestamp: new Date()
					}
					mappedProperties.push(obj)
				}
			})
		})
		return mappedProperties;
	}
}