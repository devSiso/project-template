'use strict';

/**
*
*/
import Router from './libs/router';

/**
*
*/
import Home from 'components/pages/home';

/**
*
*/
export default {
	init() {
		let router = new Router();
		let defaultRoute = 'home';

		router.add('home', Home);

		router.load(defaultRoute);

		App.State.Router = router.State;
	}
}
