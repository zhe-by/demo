define(function (require) {
    'use strict';

    var Unauth = require('components/unauth/App');

    React.render(
        h(Unauth),
        document.getElementById('application'));
});
