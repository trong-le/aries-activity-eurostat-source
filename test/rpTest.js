'use strict';
var rp = require('request-promise');
var fs = require('fs');

var url = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/sts_inpp_m?geo=UK&nace_r2=C27&precision=2&unit=I10&s_adj=NSA';
var geo = 'UK';
var nace_r2 = 'C201';
var precision = 1;
var unit = 'I10';
var  s_adj = 'NSA';

var options = {
	uri: `http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/sts_inpp_m`,
	qs: {
		geo,
		nace_r2,
		precision,
		unit,
	},
	headers: {
		'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
	}
}
rp(options)
	.then(function(response) {
		fs.writeFile('response.txt', response, (err) => {
			if (err) throw err;
		})
	});