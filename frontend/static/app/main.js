define(function (require) {
    'use strict';
    var RootApp = require('components/RootApp');
    React.render(
        h(RootApp),
        document.getElementById('application'));
});
