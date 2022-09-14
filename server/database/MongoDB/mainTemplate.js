"use strict";

const _dirname      = process.cwd();
const Data          = require(_dirname + '/server/database/MongoDB/Data.js');
const DataClass     = new Data();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const mob           = new ClassRouter();

{% block main %}{% endblock %}

class {{ table }} extends Data { 

    {% block methodConstructor %}
        constructor() {
            super();
        }
    {% endblock %}
    
    {% block methodUpdate %}
        async update( request ) {
            try {
                {% block updateBefore %}{% endblock %}

                const result = await super.update( request )
                {% block updateAfter %}{% endblock %}

                return result
            }
            catch (error) { 
                console.log(error)
                throw ( error )
            }
            
        }
    {% endblock %}

    {% block methodFindeOne %}
        async findOne( request ) {
            try {
                {% block findOneBefore %}{% endblock %}

                const result = await super.findOne( request )

                {% block findOneAfter %}{% endblock %}
                return result
            }
            catch (error) { 
                console.log(error)
                throw ( error )
            }
        }
    {% endblock %}

    {% block methodFind %}
        async find( request ) {
            try {
                {% block findBefore %}{% endblock %}

                const result = await super.find( request )

                {% block findAfter %}{% endblock %}
                return result
            }
            catch (error) { 
                console.log(error)
                throw ( error )
            }
        }
    {% endblock %}

    {% block methodDelete %}
        async delete( request ) {
            try {
                {% block deleteBefore %}{% endblock %}

                const result = await super.delete( request )

                {% block deleteAfter %}{% endblock %}
                return result
            }
            catch (error) { 
                console.log(error)
                throw ( error )
            }
        }
    {% endblock %}

    {% block methodCount %}
        async count( request ) {
            try {
                {% block countBefore %}{% endblock %}

                const result = await super.count( request )

                {% block countAfter %}{% endblock %}
                return result
            }
            catch (error) { 
                console.log(error)
                throw ( error )
            }
        }
    {% endblock %}

}

module.exports = {{ table }};