"use strict";

const _dirname      = process.cwd();
const Data          = require(_dirname + '/server/database/MongoDB/Data.js');

    const User = require( _dirname + "/server/database/MongoDB/dataApi/user.js" )


class location extends Data { 

    
        constructor() {
            super();
        }
    
    
    
        async update( request ) {
            
    const user = new User();
    if ( !request.body )
        request.body = {
            from: 'location',
            lastAccess: new Date()
        }
    
    const { data: usr } = await user.findOne({ table: 'user', query: { _id: '1'} })

    if ( usr )
        request.body.user = usr
    else
        request.body.user = 'No user found'


            const result = await super.update( request )
            

            return result
            
        }
    

    
        async findOne( request ) {
            

            const result = await super.findOne( request )

            
            return result
        }
    

    
        async find( request ) {
            

            const result = await super.find( request )

            
            return result
        }
    

    
        async delete( request ) {
            

            const result = await super.delete( request )

            
            return result
        }
    

    
        async count( request ) {
            

            const result = await super.count( request )

            
            return result
        }
    

}

module.exports = location;