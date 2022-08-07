"use strict";

const _dirname      = process.cwd();
const Custom          = require(_dirname + '/server/database/Custom.js');
{% block main %}{% endblock %}

class {{ function }} extends Custom { 

    {% block methodeConstructor %}
        constructor() {
            super();
        }
    {% endblock %}
    
    {% block methodeFunction %}
        
    {% endblock %}


}

module.exports = {{ function }};