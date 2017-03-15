'use strict';

/**
 *
 */
import config from '../config';

import View from 'libs/view';
import State from 'libs/state';

/**
 * Routes
 * ...
 *
 * @author Nodo
 */

class Router {

	/**
	 *
	 */
	constructor () {
		this._state = new State();
		this._view = new View();
	}

	/**
	 *
	 */
	get State () {
		return this._state;
	}

	/**
	 *
	 */
	add (alias, Page) {
		App.onPageInit(alias, (page) => {
			this._state.last = this._state.active;
			this._state.active = new Page(page);
		})

		App.onPageAfterAnimation(alias, (page) => {
			this._state.active.onPageAfterAnimation && this._state.active.onPageAfterAnimation();
		})
	}

	/**
	 *
	 */
	load (alias, params) {
		let extension = 'html';
		let html = [alias.replace(/\./g, '\/'), extension].join('.');

		let url = [config.pages, html].join('/');
		let settings = Object.assign({ url }, params);

		this.view.router.load(settings);
	}

	/**
	 *
	 */
	get view () {
		return this._view;
	}
}

export { Router as default }
