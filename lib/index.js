import { Activity, singleS3StreamOutput } from 'aries-data';
import rp from 'request-promise';

/**
 * Activity to run a query on Eurostat
 */

const baseURI = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/'

// Requires a language (english, french, or german). Arbitrary for our purposes.
const lang = 'en'

export default class EurostatSource extends Activity {
	static props = {
		name: require('../package.json').name,
		version: require('..package.json').version
	};

	@singleS3StreamOutput('json')
	async onTask(activityTask, config) {
		const data = await this.getDataSet(config);
		return data;
	}

	async getDataSet({base, format, datasetCode, nace_r2}) {

		const options = {
			uri: `${baseURI}${format}`+lang+`${datasetCode}`,
			qs: {
				geo,
				nace_r2,
				unit,
				precision,
				s_adj
			}
		}
		return new rp(options)
			.then((response) => {
				return response;
			})
	}
}