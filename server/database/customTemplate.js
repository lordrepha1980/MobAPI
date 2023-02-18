"use strict";

const _dirname      = process.cwd();
const Custom        = require(_dirname + '/server/database/Custom.js');
const debug         = require('debug')('app:server:custom');   

const Auth          = require( _dirname + '/server/app/checkAuth.js');
const auth          = new Auth();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const mob           = new ClassRouter();

const uuid              = require('uuid');
const config            = require(_dirname + '/config');

const Sentry            = require("@sentry/node");

if ( config.sentryDSN ) {
    Sentry.init({
        ...{
            dsn: config.sentryDSN,
            tracesSampleRate: 1.0,
        },
        ...config.sentryOptions
    });
}

{% block main %}{% endblock %}

class {{ function }} extends Custom { 

    {% block methodConstructor %}
        constructor() {
            super();
        }
    {% endblock %}

    {% block methodFunction %}
        
    {% endblock %}

}

module.exports = {{ function }};