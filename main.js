const tables                = require("./server/database/tables.json");
const config                = require("./config.json");
const dbType                = config.database.type;
const fs                    = require('fs');    

const Nunjucks              = require("nunjucks");   

const main = {
    initDatabase: async function() { 
        console.log('init Database: ', dbType);

        if ( dbType === 'MongoDB' ) {
            console.log('start Init Database');
            const { MongoClient }   = require('mongodb');
            const url               = `mongodb://${config.database.host}:${config.database.port}`;
            const client            = new MongoClient(url);

            // Database Name
            const dbName            = config.database.name || 'defaultDb';

            await client.connect();
            console.log('Connected successfully to server');
            const db                = client.db(dbName);
            const collection        = db.collection('documents');
        }
    },
    generateTables: function() {
        for( const [ key, item ] of Object.entries(tables) ) { 
            //Main Template
            let Template                = `./server/database/${ dbType }/mainTemplate.js`; 

            // check if custom template and set template
            if ( fs.existsSync(`./server/custom/${key}.js`) )
                Template                = `./server/custom/${key}.js`;

            console.log('render Template: ', Template); 
            const template              = Nunjucks.render(Template, {table: key, database: dbType});
            //write templates
            fs.writeFile(`./server/database/${dbType}/generatedTables/${key}.js`, template, err => {
                if (err) {
                    console.error(err);
                }
            });
        }
        
    }
}

module.exports = main;
