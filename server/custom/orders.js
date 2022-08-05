{% extends '../database/' + database + '/mainTemplate.js' %}

{% block createDB %}
    *createDB ( params ) {
        console.log('coool')
    }
{% endblock %}

{% block updateBefore %}
    'Grammok ist cool'
{% endblock %}