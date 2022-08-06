# MobAPI
A node.js API

## Installation

1. `git clone git@github.com:CodingRuo/MobAPI.git`
2. npm install || npm i
3. Start server (for dev env `npm run dev`, for prod env `npm run start`)

## Configuration
Configuration file is config.json in root.

### database init:

    "database": {
        "type": "MongoDB",
        "host": "localhost",
        "port": 1337,
        "user": "root",
        "password": "",
        "name": "test"
    }

possible database are ['MongoDB']

    "noDatabase": false init no database

## Structure
STANDARDTEMPLATE for API
    server/database/selected database/mainTemplates.js 
    
With CUSTOMTEMPLATE are possible extend the STANDARDTEMPLATE. 
    server/custom/mycustomtemplate.js 
    
**Warning dont insert code in STANDARDTEMPLATE, you can add code in CUSTOMTEMPLATE**

Insert new Table in file
    server/database/tables.json

You can extend the STANDARDTEMPLATE with custom code. 
1. create a ne file in server/custom/ with name like your table
2. Insert a hook or methode. 

### Example

Hook

    {% block updateBefore %}
        This code is running before update
    {% endblock %}

Methode

    {% block methodeUpdate %}
        This code replaced the standard update methode
    {% endblock %}

## Hooks / Methodes
Possible hooks in CUSTOMTEMPLATE
- updateBefore / updateAfter
- findBefore / findAfter
- findOneBefore / findOneAfter
- countBefore / countAfter

Possible methodes in CUSTOMTEMPLATE
- methodeConstructor
- methodeUpdate
- methodeFindeOne
- methodeFind
- methodeCount

### Hook example
    {% block updateBefore %}{% endblock %}

## API Calls
Possible API Calls

### get
    find 
    findOne
    count

### Example:
    get first item from database with id = '1'
    `https://url/findOne?_id=1`

    get alls item from database with group = 'foo'
    `https://url/find?group=foo`


