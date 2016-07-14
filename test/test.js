import test from 'blue-tape';
import EurostatSource from '../lib/index.js';
import config from './test-config.js';

test('proper configuration', t => {
    t.equal(EurostatSource.props.name, require('../package.json').name);
    t.equal(EurostatSource.props.version, require('../package.json').version);
    t.end();
});

test('test map properties', async (t) => {
	const source = new EurostatSource();
	const response = await source.getDataSet(config);
});

test('test map properties', t => {
	const source = new EurostatSource();
	const response = source.mapProperties(data);
	t.end();
});
