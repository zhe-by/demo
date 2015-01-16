define(function(require) {
    'use strict';

    return React.createClass({
        render: function () {
            return h('div.main', this.props.paragraphs.map(function(el) {
                return h('div', el.title);
            }));
        }
    });
});
