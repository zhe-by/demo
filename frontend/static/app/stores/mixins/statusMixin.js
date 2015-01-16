define(function (require) {
    'use strict';
    return {
        init: function () {
            this.status = Reflux.createStore({
                init: function () {
                    this.status = {
                        isLoading: false,
                        isError: false,
                        error: null
                    };
                    this.queue = 0;
                },
                getInitialState: function () {
                    return this.status;
                },
                get: function () {
                    return this.getInitialState();
                },
                set: function (newValue) {
                    this.status = _.assign({}, this.status, newValue);
                    this.trigger(this.getInitialState());
                },
                reset: function () {
                    this.queue = 0;
                    this.set({
                        isLoading: false,
                        isError: false,
                        error: null
                    });
                },
                loading: function () {
                    this.queue++;
                    if (this.queue === 1) {
                        this.set({
                            isLoading: true,
                            isError: false,
                            error: null
                        });
                    } else {
                        this.set({
                            isLoading: true
                        });
                    }
                },
                ok: function () {
                    this.queue--;
                    if (this.queue === 0) {
                        this.set({
                            isLoading: false
                        });
                    }
                },
                error: function (reason, immediate) {
                    if (!immediate) {
                        this.queue--;
                    }
                    if (this.queue === 0) {
                        this.set({
                            isLoading: false,
                            isError: true,
                            error: reason
                        });
                    } else {
                        this.set({
                            isError: true,
                            error: reason
                        });
                    }
                    setTimeout(function () {
                        if (this.get().error === reason) {
                            this.set({
                                isError: false,
                                error: null
                            });
                        }
                    }.bind(this), 5000);
                },
                promised: function (promise) {
                    this.loading();
                    return promise
                        .then(function (value) {
                            this.ok();
                            return value;
                        }.bind(this), function (reason) {
                            this.error(reason);
                            throw reason;
                        }.bind(this));
                }
            });
        }
    };
});
