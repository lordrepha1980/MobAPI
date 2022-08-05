"use strict"
const _dirname  = process.cwd()

const Data          = require(_dirname + '/server/database/MongoDB/Data.js');

class {{ table }} extends Data { 

    {% block methodeConstructor %}
        constructor() {
            super();
        }
    {% endblock %}

    {% block createDB %}{% endblock %}
    
    {% block methodeUpdate %}
        async update( ctx ) {
            {% block updateBefore %}{% endblock %}

            await super.update( ctx )

            {% block updateAfter %}{% endblock %}
        }
    {% endblock %}

    {% block methodeFindeOne %}
        async findOne( ctx ) {
            {% block findOneBefore %}{% endblock %}

            const result = await super.findOne( ctx )

            {% block findOneAfter %}{% endblock %}
            return result
        }
    {% endblock %}

    {% block methodeFind %}
        async find( ctx ) {
            {% block findBefore %}{% endblock %}

            const result = await super.find( ctx )

            {% block findAfter %}{% endblock %}
            return result
        }
    {% endblock %}

}

module.exports = {{ table }};