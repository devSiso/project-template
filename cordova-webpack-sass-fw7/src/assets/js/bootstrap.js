'use strict';

/**
*
*/
import 'Framework7';

/**
*
*/
import State from 'libs/state';
import Database from 'libs/database';
import Api from 'libs/api';
import Routes from './routes';
import config from './config';

/**
*
*/
document.addEventListener('deviceready', () => {
	const options = {
		version: 1
	};

	const database = new Database('nodo', options);

	const settings = {
		init: false,
		precompileTemplates: true,
		template7Pages: true,
		uniqueHistory: false,
		sortable: false,
		hideNavbarOnPageScroll: false,
		showBarsOnPageScrollEnd: false,
		debug: config.debug
	};

	window.$ = Dom7;
	window.App = new Framework7(settings);

	App.database = database;
	App.State = new State();
	App.api = new Api();

	Routes.init();
	App.init();
});

!window.cordova && window.setTimeout(function() {
var e = document.createEvent('Events');
e.initEvent("deviceready", true, false);
document.dispatchEvent(e);
}, 50);
