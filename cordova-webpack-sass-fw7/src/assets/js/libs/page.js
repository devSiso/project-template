'use strict';

/**
 *
 */
import Component from 'libs/component';

/**
 *
 */

class Page extends Component {

	/**
	 *
	 */
	constructor (page) {
		super();
		this.container = $(page.container);
		this.content = this.container.find('.page-content');
		this.query = Object.assign({}, page.query);
	}
}

export { Page as default }
