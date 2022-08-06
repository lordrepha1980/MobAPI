const { request } = require( "../../app" )

{% extends '../database/' + database + '/mainTemplate.js' %}

{% block updateAfter %} 
    if ( result.inserted || request.actions?.setPassword )
        console.log('generate Password')
{% endblock %}

{% block findOneAfter %}  
    if ( result.data )
        result.data.password = null
{% endblock %}