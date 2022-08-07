"use strict";

const _dirname      = process.cwd();
const Custom          = require(_dirname + '/server/database/Custom.js');

    const User = require( _dirname + '/server/database/MongoDB/dataApi/user.js');
    const user = new User()


class member extends Custom { 

    
        constructor() {
            super();
        }
    
    
    
    async getUser ( { ctx, request } ) {
        console.log(ctx, request)
        const result = await user.find({ table: 'user' })

        ctx.body = { text: 'hurra es geht', data: result };
    }



}

module.exports = member;