"use strict";

const _dirname      = process.cwd();
const Custom        = require(_dirname + '/server/database/Custom.js')
const sentry        = require(_dirname + '/server/database/sentry.js')
const debug         = require('debug')('app:server:Custom')
const dayjs         = require('dayjs')
const dayjsIsBetween     = require('dayjs/plugin/isBetween')

const Auth          = require( _dirname + '/server/app/checkAuth.js')
const auth      = new Auth();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js')
const mob           = new ClassRouter();

const uuid          = require('uuid');
const config        = require(_dirname + '/config');

const Sentry        = new sentry();
dayjs.extend(dayjsIsBetween)

{% block main %}{% endblock %}

class {{ function }} extends Custom { 
        {% block methodConstructor %}
            constructor() {
                super();
            }
        {% endblock %}

        {% block methodFunction %}
            
        {% endblock %}
        
        //======= begin custom auth methods =======
        {% block methodFunctionAuth %}
            
        {% endblock %}
        //======= end custom auth methods =======
        
}

module.exports = {{ function }}