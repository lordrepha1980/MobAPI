"use strict";
const debug         = require('debug')('app:server:app:system:register');
const bcrypt        = require('bcrypt');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');

const bcryptSalt   = config.bcrypt.saltRounds;

try{
    const User = require( _dirname + '/server/database/MongoDB/dataApi/user.js');
    const user = new User()
}
catch(error) {

}

module.exports = class Register {
    
    constructor(  ) {

    }

    async register ( bodyParse ) { 

        config.debug.extend && debug('register params: ', bodyParse );
        try {
            const {data: userExists} = await user.findOne({ table: 'user', query: { username: bodyParse.body.username }, auth: true, actions: { register: true, auth: true } });

            if ( userExists )
                throw ("User already exists");

            const hash = await bcrypt.hash( bodyParse.body.password, bcryptSalt )
            
            if ( hash )
                bodyParse.body.password = hash

            const { data: createdUser } = await user.update({ table: 'user', body: bodyParse.body, auth: true, actions: { register: true, auth: true } });

            if ( createdUser )
                delete createdUser.password;

            return { data: createdUser };
        } 
        catch (error) {
            console.error(error);
            return { error };
        }
    }
}