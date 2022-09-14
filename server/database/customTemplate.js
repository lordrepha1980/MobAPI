"use strict";

const _dirname      = process.cwd();
const Custom        = require(_dirname + '/server/database/Custom.js');

const Auth          = require( _dirname + '/server/app/checkAuth.js');
const auth          = new Auth();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const mob           = new ClassRouter();

const uuid              = require('uuid');
const config            = require(_dirname + '/config');

{% block main %}{% endblock %}

class {{ function.split(.)[0] }} extends Custom { 

    {% block methodConstructor %}
        constructor() {
            super();
        }
    {% endblock %}

    {% block methodFunction %}
        
    {% endblock %}

}

module.exports = {{ function }};