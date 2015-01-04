(function () {
    'use strict';

    function debounce(func, wait) {
        var timeout, args, context, timestamp;
        if (null == wait) {
            wait = 100;
        }

        function later() {
            var last = Date.now() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            }
        }

        return function debounced() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    }

    function showForm(tabName) {
        document.getElementById('form-login').className = 'hidden';
        document.getElementById('form-register').className = 'hidden';
        document.getElementById('form-reset').className = 'hidden';
        document.getElementById('form-' + tabName).className = '';
    }

    function addEventListenerAll(doms, event, fn) {
        for (var i = 0; i < doms.length; i++) {
            doms[i].addEventListener(event, fn);
        }
    }

    addEventListenerAll(
        document.getElementsByClassName('tab-switch-login'),
        'click',
        showForm.bind(null, 'login')
    );
    addEventListenerAll(
        document.getElementsByClassName('tab-switch-register'),
        'click',
        showForm.bind(null, 'register')
    );
    addEventListenerAll(
        document.getElementsByClassName('tab-switch-reset'),
        'click',
        showForm.bind(null, 'reset')
    );

    function setStatus(status) {
        document.getElementById('email-is-loading')
            .className = status === 'loading' ? '' : 'hidden';
        document.getElementById('email-is-exist')
            .className = status === 'exist' ? '' : 'hidden';
        document.getElementById('email-is-free')
            .className = status === 'free' ? '' : 'hidden';
        document.getElementById('submit-register')
            .className = status === 'free' ? '' : 'hidden';
    }


    var ajaxCheckEmail = debounce(function (email) {
        var oReq = new XMLHttpRequest();
        oReq.onload = function () {
            if (this.status === 404) {
                setStatus('free');
            } else if (this.status === 409) {
                setStatus('exist');
            }
        };
        oReq.open('GET', '/api/auth/email/' + email + '/exist', true);
        oReq.send();
    });

    document.getElementById('email-register')
        .addEventListener('input', function (e) {
            if (e.target.value && e.target.value.indexOf('@') !== -1) {
                setStatus('loading');
                ajaxCheckEmail(e.target.value);
            } else {
                setStatus('empty');
            }
        });
    document.getElementById('password-retype')
        .addEventListener('input', function (e) {
            var password = document.getElementById('password').value;
            document.getElementById('password-is-different')
                .className = (e.target.value && e.target.value !== password) ?
                '' : 'hidden';
        });
    document.getElementById('form-register')
        .addEventListener('submit', function (e) {
            var password = document.getElementById('password').value;
            var passwordRetype = document
                .getElementById('password-retype').value;
            var email = document.getElementById('email-register').value;
            if (!password || password !== passwordRetype ||
                !email || email.indexOf('@') === -1) {
                e.preventDefault();
            }
        });
}());
