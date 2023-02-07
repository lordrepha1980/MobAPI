const debug         = require('debug')('app:server:custom:system:globalHooks');
const _dirname      = process.cwd();
const config        = require(_dirname + '/config.js');

module.exports  = ( app ) => { 
    const updateBefore = async ({ io, body, auth, noCheck, table, query, ctx }) => { 
        config.debug.extend && debug('updateBefore')
    }
    const updateAfter = async ({ io, body, auth, noCheck, table, query, ctx, result }) => { 
        config.debug.extend && debug('updateAfter')
    }
    const findBefore = async ({ io, body, auth, noCheck, table, query, ctx }) => { 
        config.debug.extend && debug('findBefore')
    }
    const findAfter = async ({ io, body, auth, noCheck, table, query, ctx, result }) => { 
        config.debug.extend && debug('findAfter')
    }
    const findOneBefore = async ({ io, body, auth, noCheck, table, query, ctx }) => { 
        config.debug.extend && debug('findOneBefore')
    }
    const findOneAfter = async ({ io, body, auth, noCheck, table, query, ctx, result }) => { 
        config.debug.extend && debug('findOneAfter')
    }
    const deleteBefore = async ({ io, body, auth, noCheck, table, query, ctx }) => { 
        config.debug.extend && debug('deleteBefore')
    }
    const deleteAfter = async ({ io, body, auth, noCheck, table, query, ctx, result }) => { 
        config.debug.extend && debug('deleteAfter')
    }

    return {
        updateBefore,
        updateAfter,
        findBefore,
        findAfter,
        findOneBefore,
        findOneAfter,
        deleteBefore,   
        deleteAfter
    }
}