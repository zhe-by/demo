(function (global, doc){

	'use strict';

	function Login	() {
		
	}

	var login;
	global.addEventListened('load', function () {
		login = new Login();
	});
}(window, document));