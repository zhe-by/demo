(function () {
    'use strict';

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
}());
