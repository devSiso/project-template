'use strict';

import _ from 'lodash';
import config from '../config';

/**
 * @author Nodo
 */

class Api {

	constructor () {
		this.apiPath = config.api.url;
		this.headers = {};
	}

	request(method, path, data) {
		return new Promise((success, error) => {
			$.ajax({
				method,data,
				url: this.apiPath+path,
				success: (response) => {
					let json = JSON.parse(response);
					success(json);
				},
				error,
				headers: this.headers
			});
		})
	}

	setHeader(name, value) {
		this.headers[name] = value;
	}
}

export { Api as default }
