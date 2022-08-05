const tables                = require("./server/database/tables.json");
const config                = require("./config.json");
const dbType                = config.database.type;
const fs                    = require('fs');    

const Nunjucks              = require("nunjucks");   

const main = {
    initDatabase: async () =>{ 
        console.log('init Database: ', dbType);

        if ( dbType === 'MongoDB' ) {
            const Connection        = require('./server/database/MongoDB/Connection.js');
            let connection          = new Connection();
            const db                = await connection.init();        }
    },
    generateTables: function() {
        for( const [ key, item ] of Object.entries(tables) ) { 
            //Main Template
            let Template                = `./server/database/${ dbType }/mainTemplate.js`; 

            // check if custom template and set template
            if ( fs.existsSync(`./server/custom/${key}.js`) )
                Template                = `./server/custom/${key}.js`;

            console.log('render Template: ', Template); 
            const template              = Nunjucks.render(Template, { table: key, database: dbType });
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
