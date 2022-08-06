{% extends '../database/' + database + '/mainTemplate.js' %}

{% block main %}
    const User = require( _dirname + "/server/database/MongoDB/generatedTables/user.js" )
{% endblock %}

{% block updateBefore %}
    const user = new User();
    if ( !request.body )
        request.body = {}
    
    const usr = await user.findOne({ table: 'user', query: { _id: '1'} })

    if ( usr )
        request.body.user = usr
    else
        request.body.user = 'No user found'
{% endblock %}