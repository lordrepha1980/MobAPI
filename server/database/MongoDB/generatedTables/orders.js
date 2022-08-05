"use strict"
const _dirname  = process.cwd()

const Data          = require(_dirname + '/server/database/MongoDB/Data.js');

class orders extends Data { 

    
        constructor() {
            super();
        }
    

    
    
    
        async update( ctx ) {
            

            await super.update( ctx )

            
        }
    

    
        async findOne( ctx ) {
            

            const result = await super.findOne( ctx )

            
            return result
        }
    

    
        async find( ctx ) {
            

            const result = await super.find( ctx )

            
            return result
        }
    

}

module.exports = orders;