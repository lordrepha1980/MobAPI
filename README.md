# MobAPI
A node.js API

## Installation

1. `git clone git@github.com:CodingRuo/MobAPI.git`
2. npm install || npm i
3. Start server (for dev env `npm run dev`, for prod env `npm run start`)

## Configuration
Configuration file is config.json in root.

### database init:

`"database": {
    "type": "MongoDB",
    "host": "localhost",
    "port": 1337,
    "user": "root",
    "password": "",
    "name": "test"
}`

possible database are ['MongoDB']

`"noDatabase": false` init no database

## Structure
server/database/selected database/mainTemplates.js STANDARDTEMPLATE for API

server/custom/tableName.js CUSTOMTEMPLATE, with CUSTOMTEMPLATE are possible extend the STANDARDTEMPLATE

## Hooks
Possible Hooks in CUSTOMTEMPLATE
- updateBefore / updateAfter
- findBefore / findAfter
- findOneBefore / findOneAfter

### Hook example
`{% block updateBefore %}{% endblock %}`

## API Calls
Possible API Calls

### get
    find 
    findOne

### Example:
    get first item from database with id = '1'
    `https://url/findOne?_id=1`

    get alls item from database with group = 'foo'
    `https://url/find?group=foo`


