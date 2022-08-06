"use strict"
const _dirname  = process.cwd()

const Data          = require(_dirname + '/server/database/MongoDB/Data.js');
{% block main %}{% endblock %}

class {{ table }} extends Data { 

    {% block methodeConstructor %}
        constructor() {
            super();
        }
    {% endblock %}
    
    {% block methodeUpdate %}
        async update( request ) {
            {% block updateBefore %}{% endblock %}

            const result = await super.update( request )
            {% block updateAfter %}{% endblock %}

            return result
            
        }
    {% endblock %}

    {% block methodeFindeOne %}
        async findOne( request ) {
            {% block findOneBefore %}{% endblock %}

            const result = await super.findOne( request )

            {% block findOneAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodeFind %}
        async find( request ) {
            {% block findBefore %}{% endblock %}

            const result = await super.find( request )

            {% block findAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodeDelete %}
        async delete( request ) {
            {% block deleteBefore %}{% endblock %}

            const result = await super.delete( request )

            {% block deleteAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodeCount %}
        async count( request ) {
            {% block countBefore %}{% endblock %}

            const result = await super.count( request )

            {% block countAfter %}{% endblock %}
            return result
        }
    {% endblock %}

}

module.exports = {{ table }};