define(function (require) {
    'use strict';

    var statusMixin = require('./mixins/statusMixin');

    return Reflux.createStore({
        mixins: [statusMixin],
        init: function () {
            this.status.loading();
            ajax.get('/api/paragraphs', function (res) {
                if (res.status === 200) {
                    this.status.ok();
                    this._data = res.body;
                    this.trigger(this._data);
                } else {
                    this.status.error();
                }
            }.bind(this));
        },
        getInitialState: function () {
            return this._data;
        }
    });
});
