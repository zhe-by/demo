define(function (require) {
    'use strict';
    var Field = function (store, key) {
        return {
            init: function () {
                this.listenTo(store, this.storeChanged);

                if (this.get()) {
                    this.trigger(this.get());
                }
            },
            getInitialState: function () {
                var storeData = store.get();
                return !!storeData && storeData[key];
            },
            get: function () {
                return this.getInitialState();
            },
            storeChanged: function () {
                if (this.oldValue === this.get()) {
                    return;
                }
                this.oldValue = this.get();
                this.trigger(this.oldValue);
            }
        };
    };
    return Field;
});
