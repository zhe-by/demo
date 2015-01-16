define(function (require) {
    'use strict';
    var session = require('stores/session');
    var Wizard = require('./wizard/Wizard');
    var Student = require('./student/Student');
    var Teacher = require('./teacher/Teacher');

    return React.createClass({
        displayName: 'RootApp',
        mixins: [
            Reflux.connect(session, 'session'),
            Reflux.connect(session.status, 'sessionStatus')
        ],
        render: function () {
            return h(Student);
            if (!this.state) {
                return null;
            }
            if (this.state.sessionStatus.isLoading) {
                return h('div', 'Profile loading...');
            }
            if (this.state.session) {
                if (this.state.session.role == null) {
                    return h(Wizard);
                }
                if (this.state.session.role === 'student') {
                    return h(Student);
                }
                if (this.state.session.role === 'teacher') {
                    return h(Teacher);
                }
            }
            return h('div', 'Something went wrong');
        }
    });
});
