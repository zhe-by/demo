define(function (require) {
    'use strict';

    var landingHTML = document.getElementById('landing-text').innerHTML;

    var AuthForm = React.createClass({
        displayName: 'AuthForm',
        mixins: [
            React.addons.PureRenderMixin,
            React.addons.LinkStateMixin
        ],
        getInitialState: function () {
            return {
                email: null,
                password: null
            };
        },
        render: function () {
            return h('form', [
                h('input[type=text]', {
                    valueLink: this.linkState('email')
                }),
                h('input[type=password]', {
                    valueLink: this.linkState('password')
                }),
                h('button[type=submit]', {
                    onSubmit: this.onSubmit
                }, 'Логин/Регистрация')
            ]);
        },
        onSubmit: function (e) {
            e.preventDefault();
            console.log(this.state);
        }
    });

    return React.createClass({
        render: function () {
            return h('div.content', [
                h(AuthForm),
                h('div#landing-text', {
                    dangerouslySetInnerHTML: {
                        __html: landingHTML
                    }
                })
            ]);
        }
    });
});
