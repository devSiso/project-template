// Configurations
var config = require('../config');

var Api = {
	url: 'https://' + config.apiurl,
	headers: {
		"Authorization": "BASIC " + config.key
	};
};

module.exports = Api;
