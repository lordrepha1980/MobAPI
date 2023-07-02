const debug         = require('debug')('app:server:custom:system:globalHooks');
const _dirname      = process.cwd();
const config        = require(_dirname + '/config.js');

module.exports  = ( app ) => { 
    const updateBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('updateBefore')
    }
    const updateAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('updateAfter')
    }
    const updateManyBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('updateManyBefore')
    }
    const updateManyAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('updateManyAfter')
    }
    const findBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('findBefore')
    }
    const findAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('findAfter')
    }
    const findOneBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('findOneBefore')
    }
    const findOneAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('findOneAfter')
    }
    const deleteBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('deleteBefore')
    }
    const deleteAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('deleteAfter')
    }
    const deleteManyBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('deleteManyBefore')
    }
    const deleteManyAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('deleteManyAfter')
    }
    const countBefore = async ({ io, body, auth, noCheck, table, query, ctx, user, actions }) => { 
        config.debug.extend && debug('countBefore')
    }
    const countAfter = async ({ io, body, auth, noCheck, table, query, ctx, result, user, actions }) => { 
        config.debug.extend && debug('countAfter')
    }

    return {
        updateBefore,
        updateAfter,
        updateManyBefore,
        updateManyAfter,
        findBefore,
        findAfter,
        findOneBefore,
        findOneAfter,
        deleteBefore,   
        deleteAfter,
        deleteManyBefore,
        deleteManyAfter,
        countBefore,
        countAfter,
    }
}