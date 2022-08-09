module.exports = {
    apps : [{
        name   : "MobAPI",
        script : "DEBUG=app:* ./bin/www",
        watch  : true,
        ignore_watch: [
            "./server/database/MongoDB/dataApi/*",
            "./server/database/sqlite/dataApi/*",
            "./server/database/customApi/*",
            "node_modules"
        ]
    }]
}