"use strict"

class {{ table }} extends Data { 
    constructor() {
        super();
    }

    {% block createDB %}{% endblock %}

    {% block updateBefore %}{% endblock %}
    
    *update() {
        console.log('coool')
    }

    *find() {
        console.log('coool')
    }

}