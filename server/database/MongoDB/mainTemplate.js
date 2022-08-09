"use strict";

const _dirname      = process.cwd();
const Data          = require(_dirname + '/server/database/MongoDB/Data.js');
const DataClass     = new Data();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const classRouter   = new ClassRouter();

{% block main %}{% endblock %}

class {{ table }} extends Data { 

    {% block methodConstructor %}
        constructor() {
            super();
        }
    {% endblock %}
    
    {% block methodUpdate %}
        async update( request ) {
            {% block updateBefore %}{% endblock %}

            const result = await super.update( request )
            {% block updateAfter %}{% endblock %}

            return result
            
        }
    {% endblock %}

    {% block methodFindeOne %}
        async findOne( request ) {
            {% block findOneBefore %}{% endblock %}

            const result = await super.findOne( request )

            {% block findOneAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodFind %}
        async find( request ) {
            {% block findBefore %}{% endblock %}

            const result = await super.find( request )

            {% block findAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodDelete %}
        async delete( request ) {
            {% block deleteBefore %}{% endblock %}

            const result = await super.delete( request )

            {% block deleteAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodCount %}
        async count( request ) {
            {% block countBefore %}{% endblock %}

            const result = await super.count( request )

            {% block countAfter %}{% endblock %}
            return result
        }
    {% endblock %}

}

module.exports = {{ table }};