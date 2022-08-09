"use strict";

const _dirname      = process.cwd();
const Custom        = require(_dirname + '/server/database/Custom.js');

const Auth          = require( _dirname + '/server/app/checkAuth.js');
const auth          = new Auth();

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const classRouter   = new ClassRouter();


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

    async getBla ( { ctx, request } ) {

        ctx.body = { text: 'getBla'};
    }


}

module.exports = member;