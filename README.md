# MobAPI
A node.js API

## Installation

1. git clone `https://github.com/lordrepha1980/MobAPI.git`
2. npm i
3. npm i pm2 -g
4. [Configuration](https://github.com/lordrepha1980/MobAPI/blob/master/README.md#configuration)
5. create a [server/database/tables.json](https://github.com/lordrepha1980/MobAPI/blob/master/README.md#configuration)
6. Start server `pm2 start mobapi.config.js`. For windows user use `pm2 start mobapi.config.windows.js`

## Configuration
Create a file in root with name config.js. Feel free to extend the structure for your own project

Example

    {
        "publicPath": "./public",
        "database": {
            "type": "MongoDB",
            "host": process.env.DB_HOST,
            "port": process.env.DB_PORT,
            "credentials": {
                "username": process.env.DB_USERNAME,
                "password": process.env.DB_PASSWORD
            },
            "name": "MobAPI"
        },
        "serverPort": process.env.SERVER_PORT,
        "auth": {
            "enabled": true,
            "secret": process.env.AUTH_SECRET,
            "options": { 
                "expiresIn": "24h" 
            }
        },
        "bcrypt": {
            "saltRounds": 10 
        },
        "debug": {
            "extend": false
        },
        "module": {
            "useSignin":    true,
            "useRegister":  false
        }
    }

- publicPath - default 'public'. This is the directory for index.html
- database - database connection definition
- auth - standart MobAPI auth service (passports JWT)
- serverPort - port for server
- bcrypt - definition for standart methode encrypt a password
- debug - enable extend log output
- module - enable standard modules

MongoDB: connect to database without credentials remove key 'database.credentials'

## tables.json:
With this file you can create data endpoints

    {
        "posts": 'User Posts Collection',
        "votings": "votings Collection"
    }
    
after save from the tables.json MobAPI generate automatically a class with methodes (find, findOne, update, delete...).
[See data api calls](https://github.com/lordrepha1980/MobAPI/blob/master/README.md#data-api-calls)


### database init:

    "database": {
        "type": "MongoDB",
        "host": "localhost",
        "port": 1337,
        "user": "root",
        "password": "",
        "name": "test"
    },
    "auth": {
        "enabled": true,
        "secret": "insertYourSecretHere",
        "options": { 
            "expiresIn": "24h" 
        }
    }

possible database are ['MongoDB']

    "noDatabase": false init no database

## Structure
### server/database/selected database/mainTemplates.js 
STANDARDTEMPLATE for API

### server/custom/mycustomtemplate.js
CUSTOMTEMPLATE for API. With CUSTOMTEMPLATE are possible extend the STANDARDTEMPLATE. 
     

### server/custom
the main directory for developer. 

    `/data`: In this directory you can set hooks or methods for 'data' endpoint like `yourdomain/data/:table/:action`

    `/custom/get` GET: In the  directory you can methods for 'custom' endpoint like `yourdomain/custom/:action/` 
    `/custom/post` GET: In the  directory you can methods for 'custom' endpoint like `yourdomain/custom/:action/` 

    `system` In the  directory you can overwrite system endpoints
    possible endpoints are:
    `yourdomain/auth`  

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
- deleteBefore / deleteAfter
- countBefore / countAfter

Possible methodes in CUSTOMTEMPLATE
- methodConstructor
- methodUpdate
- methodFindeOne
- methodFind
- methodDelete
- methodCount

### Hook example
    {% block updateBefore %}{% endblock %}
    
### items in Hook
available item in Hook are:
    - result:   result from the database
    - request:  request from the client see [params](https://github.com/lordrepha1980/MobAPI/blob/master/README.md#parameter)
    - _dirname: root directory

## DATA API Calls
IMPORTANT: ALL  REQUEST TO THE ROUTE /DATA NEED A VALIDE AUTHTENTICATE FOR OPEN ROUTE PLEASE USE /CUSTOM [MORE DETAILS](https://github.com/lordrepha1980/MobAPI/blob/master/README.md#custom-api-calls).

this is the API for `https://url/data/` request.

## get
    find 
    findOne
    count
    
### Example:
    get first item from database with id = '1'
    `https://url/data/:table/findOne?_id=1`

    get alls item from database with group = 'foo'
    `https://url/data/:table/find?group=foo`
    
:table i the endpoint from the API normally Databasetable
    
## post
    find 
    findOne
    delete
    update
    count
    
## get/post Parameter
    {
        table,      
        query,      
        body,
        actions,
        sort,
        skip,
        limit,
        auth, //only server
        noCheck, // only Server
        user //only server
    }
    
- table:                Required (String) Databasetable
- query:                (Object) Select data from DB
- body (only post):     For Update new updated item
- actions (only post):  Hook for custom actions
- sort:                 Sort result from the database
- skip:                 Skip lines from the database
- limit:                Max lines from database 
- auth:                 Required (boolean) true / false is user login ( only server parameter )
- noCheck:              (boolean) check permission ( only server parameter )
- user:                 (Object) the user ( only server parameter )
- ctx:                  complete request from Koa
    
### Example:
    get first item from database with _id = '1'
    `https://url/data/:table/findOne`
    {
        "query": {
            "_id": "1"
        }
    }

    get alls item from database with group = 'foo'
    `https://url/data/:table/find`
    {
        "query": {
            "group": "foo"
    }

:table i the endpoint from the API normally Databasetable

## CUSTOM API Calls
this is the API for `https://url/custom/` request.

## post
    everything what you want
    
### Example:
    `https://url/custom/:class/:action
    
:class is the class :action is the methode frpm the class
    
### Parameter
    {
        ctx
        body
    }
    
- ctx:      complete request from Koa
- body:     ctx.request.body
    

#Templates
## default DATA Template
this template is for custom/data/:table request

    {% extends _dirname + '/server/database/' + database + '/mainTemplate.js' %}

    {% block main %}{% endblock %}
    
    //insert hooks or methods here 
    
## default CUSTOM Template
this template is for custom/custom/:class request

    {% extends _dirname + '/server/database/customTemplate.js' %}

    {% block main %}{% endblock %}

    {% block methodFunction %}
        //write methods here
    {% endblock %} 


# Code-Examples

Google-API
    /server/custom/custom/googleAPI.js
    
    {% extends _dirname + '/server/database/customTemplate.js' %} //required do not move this line

    {% block methodFunction %}
        async getDirection ( { ctx } ) {
            try {
                //check is user registerd user, if not throw(). This is a internal method from MobAPI
                await auth.check(ctx) 
                
                //get directions from googlemaps
                
                //update drive
                const body = {
                    lat: 'lat from Google'
                    lat: 'lat from Google'
                }
                
                //get API endpoint with internal method mob.get
                const drive = mob.get('data/drive');
                //write update to database
                await drive.update({ table: 'user', auth: ctx.auth, body: body })

                ctx.body = { data: 'Update Complete' }
                return 
            } catch (error) {
                console.log('custom getDirection error: ' + error)
            }
        }
        
        Now you can call url/custom/googleApi/getDirection
    {% endblock %}
    
Update user with google direction;

    {% extends _dirname + '/server/database/' + database + '/mainTemplate.js' %}

    {% block updateBefore %}
        googleApi = mob.get('custom/googleApi');
        
        result = googleApi.getDirection(request)
       
        //modify user
        request.body.googleData = result;
        
        //Now you can call url/data/user/update
    {% endblock %}

# Default-Authentication (JWT)
Activate the Authentication in config.js

    "module": {
        "useSignin":    true
    }

The signin/login endpoints are:

    POST
    /auth/signin 
    or
    /auth/login

    //request
    { 
        body: {
            username,
            password
        }
    }

    //response
    {
        data: jwt-token string
    }
You need a user database table with a username and password field.

The check is token valid endpoints:

    POST
    /auth/check

    //request
    send jwt token in header
    headers: { "Authorization": `Bearer ${token}` }

    //response
    true / false
every route with /data/* check if login valid. It is not possible get or set data from this enpoint without login

The logout endpoints:

    POST
    /auth/logout
for JWT-Token is this endpoint not in use

Generate a secret keys for a salt or whatever.
    GET
    /secret


# Permission
Activate the rights in config.js

    "module": {
        "useRights":    true
    }

create a database table 'rights'

schema rights

    table:methode

    //example
    //all permission granted
    {
        "_id" : "1",
        "group" : "admin",
        "permission" : [
            "*"
        ]
    }

    //ser methods allowed
    {
        "_id" : "1",
        "group" : "user",
        "permission" : [
            "user:*"
        ]
    }

    //user, order methods allowed
    {
        "_id" : "1",
        "group" : "user",
        "permission" : [
            "user:*",
            "order:*"
        ]
    }

    //user methode find, all order methods allowed
    {
        "_id" : "1",
        "group" : "user",
        "permission" : [
            "user:find",
            "order:*"
        ]
    }



