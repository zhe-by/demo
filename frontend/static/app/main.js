define(function (require) {
    'use strict';

    var LoginForm = React.createClass({displayName: "LoginForm",
    	render: function () {
    		return (
    				h("div", null, 
    					h("form", null, 
    						h("input", {type: "email"}), 
    						h("input", {type: "password"}),
    						h("input", {type: "submit"})
    					)
    				)
    			);
    	}
    });

    var LoginPage = React.createClass({displayName: "LoginPage",
    	render: function () {
    		return (
    			h("div", null, 
    				h(LoginForm, null)
    			)
    			);
    	}
    });

    var App = React.createClass({displayName: "App",
    	render: function () {
    		return (
    				h("div", null, 
    					"Reacted!", 
    					h(LoginPage, null)
    				)
    			);
    	}
    });

    React.render(
        h(App, null),
        document.getElementById('application'));
});