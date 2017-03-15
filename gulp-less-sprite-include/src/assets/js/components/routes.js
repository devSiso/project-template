!function(window) {
	'use strict';

	var Routes = {};

	Routes.init = function() {

		Path.map("#/home").to(function(){
			console.log('home');
		});

		Path.root("#/home");

		Path.listen();
	};

  // export
	window.Routes = Routes;
}(window);
