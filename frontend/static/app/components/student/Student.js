define(function(require) {
    'use strict';

    var Menu = require('./Menu');
    var Main = require('./Main');

    var paragraphs = require('stores/paragraphs');

    return React.createClass({
        mixins: [Reflux.connect(paragraphs, 'paragraphs')],
        render: function() {
            return h('div', [
                h('div.menu-container', [h(Menu)]),
                !_.isEmpty(this.state.paragraphs) && h('div.main-container', [h(Main, {
                    paragraphs: this.state.paragraphs
                })])
            ]);
        }
    });
});
