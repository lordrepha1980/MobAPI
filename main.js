const tables                = require("./server/database/tables.json");
const config                = require("./config.json");
const dbType                = config.database.type;
const fs                    = require('fs');  
const fsPromise             = require('fs/promises');    
const _dirname              = process.cwd();

const Nunjucks              = require("nunjucks");   

const main = {
    initDatabase: async () =>{ 
        console.log('init Database: ', dbType);

        if ( dbType === 'MongoDB' ) {
            const Connection        = require('./server/database/MongoDB/Connection.js');
            let connection          = new Connection();
            const db                = await connection.init();        }
    },
    checkStructure: async () =>{ 
        console.log('check Structure: ');

        const checks = [
            './server/custom/data',
            './server/custom/custom',
            './server/database/customApi',
            './server/database/MongoDB/dataApi'
        ];

        for (let i = 0; i < checks.length; i++)
            fs.mkdirSync(checks[i], {recursive: true})
    },
    generateTables: function() {
        //generate tables für DATA
        for( const [ key, item ] of Object.entries(tables) ) { 
            //Main Template
            let Template                = `./server/database/${ dbType }/mainTemplate.js`; 

            // check if custom template and set template
            if ( fs.existsSync(`./server/custom/data/${key}.js`) )
                Template                = `./server/custom/data/${key}.js`;

            console.log('render Template (DATA): ', Template); 
            const template              = Nunjucks.render(Template, { table: key, database: dbType, _dirname });
            //write templates
            fs.writeFile(`./server/database/${dbType}/dataApi/${key}.js`, template, err => {
                if (err) {
                    console.error(err);
                }
            });
        }

        //generate tables für Custom
        if ( fs.existsSync(`./server/custom/custom`) ) {
            fs.readdir(`./server/custom/custom`, (err, files) => {
                files.forEach(file => {

                    const Template                = `./server/custom/custom/${file}`;
                    console.log('render Template (CUSTOM): ', Template); 

                    const template              = Nunjucks.render(Template, { function: file.replace('.js', ''), _dirname });
                    //write templates
                    fs.writeFile(`./server/database/customApi/${file}`, template, err => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            });
        }
    }
}

module.exports = main;
