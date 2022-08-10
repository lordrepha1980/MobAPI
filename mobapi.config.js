module.exports = {
    apps : [{
        name   : "MobAPI",
        script : "DEBUG=app:* node ./app.js",
        noAutorestart: true,
        watch  : true,
        ignore_watch: [
            "./server/database/MongoDB/dataApi/*",
            "./server/database/sqlite/dataApi/*",
            "./server/database/customApi/*",
            "node_modules"
        ]
    }]
}