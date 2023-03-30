module.exports = {
    apps: [{
        name: "MobAPI",
        script: "./app.js",
        noAutorestart: true,
        watch: true,
        ignore_watch: [
            "server/database/MongoDB/dataApi/*",
            "server/database/customApi/*",
            "server/database/MongoDB/dataApi/get/*",
            "server/database/customApi/get/*",
            "server/database/MongoDB/dataApi/post/*",
            "server/database/customApi/post/*",
            "node_modules"
        ],
        env: {
            NODE_ENV: 'development',
            DEBUG: 'app:*',
            DEBUG_COLORS: 1
        },
    },
    ],

}