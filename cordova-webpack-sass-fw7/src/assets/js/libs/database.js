'use strict';

/**
*
*/

class Database {

	/**
	*
	*/
	constructor (name, options) {
		let storage = window.localStorage;

		options = options || {};

		this.name = name;
		this.version = options.version || 1;
		this.dbName = this.name + '_' + this.version;

		this._storage = storage;
		this._db = (storage[this.dbName]) ? JSON.parse(storage[this.dbName]) : {};

		return this;
	}

	/**
	 *
	 */
	get (name) {
		return this._db[name] || false;
	}

	/**
	 *
	 */
	set (name, value) {
		this._db[name] = value;
		this.save();
	}

	/**
	 *
	 */
	rm (name) {
		delete this._db[name];
		this.save();
	}

	/**
	 *
	 */
	save () {
		this._storage[this.dbName] = JSON.stringify(this._db);
	}
}

export {Database as default}
