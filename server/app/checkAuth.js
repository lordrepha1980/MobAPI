"use strict";

module.exports = class checkAuth {
    
    constructor(  ) {

    }

    async check ( ctx, status ) { 
        try {
            if ( !status === false )
                return;
            
            if ( !ctx.auth ){
                throw ('Not authorized');
            }
        }
        catch (error) {
            throw error;
        }
        
    }
}