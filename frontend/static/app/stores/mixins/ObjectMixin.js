define(function (require) {
    'use strict';
    return function (initialValue) {
        return {
            init: function () {
                this._value = initialValue;
            },
            getInitialState: function () {
                return this._value;
            },
            get: function () {
                return this.getInitialState();
            },
            set: function (newValue) {
                if (this._value === newValue) {
                    return;
                }
                this._value = newValue;
                this.trigger(this.get());
            }
        };
    };
});
