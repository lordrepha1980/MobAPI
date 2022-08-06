"use strict"
const _dirname  = process.cwd()

const Data          = require(_dirname + '/server/database/MongoDB/Data.js');


class hobbys extends Data { 

    
        constructor() {
            super();
        }
    
    
    
        async update( request ) {
            

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

module.exports = hobbys;