'use strict';

/**
 *
 */
import consts from '../consts';

/**
* Views
*
* @author Nodo
*/

class View {
	/**
	 *
	 */
	constructor () {
		let settings = {
			dynamicNavbar: consts.VIEW_DYNAMIC_NAVBAR,
			preroute: () => {
			}
		};
		this._main = App.addView(consts.VIEW_MAIN, settings);
	}

	/**
	 *
	 */
	get main () {
		return this._main;
	}

	/**
	 *
	 */
	get router () {
		return this.main.router;
	}
}

export { View as default}
