const _dirname              = process.cwd();
const tables                = require(_dirname + "/server/database/tables.json");
const config                = require(_dirname + "/config");
const dbType                = config.database.type;
const fs                    = require('fs');  
const fsPromise             = require('fs/promises');    

const Nunjucks              = require("nunjucks");   

const main = {
    moduleLoader: () => { 
        //register
        try {
            require(_dirname + '/server/custom/system/register.js');
        } catch (error) {
            require(_dirname + '/server/app/system/register.js');
        }

        //signin
        try {
            require(_dirname + '/server/custom/system/signin.js');
        } catch (error) {
            require(_dirname + '/server/app/system/signin.js');
        }
        
        //auth
        try {
            require(_dirname + '/server/custom/system/auth.js');
        } catch (error) {
            require(_dirname + '/server/app/system/auth.js');
        }

        //logout
        try {
            require(_dirname + '/server/custom/system/logout.js');
        } catch (error) {
            require(_dirname + '/server/app/system/logout.js');
        }

    },
    getModule: (module) => {
        return Object.entries(require.cache).reduce((acc, [module_path, loaded_module]) => {

            // Wenn schon ein Eintrag gefunden wurde
            if (acc !== undefined) {
              return acc;
            }
    
            if (module_path.endsWith(module) === false) {
              return acc;
            }
    
            return loaded_module.exports;
          }, undefined);
    },
    initDatabase: async () =>{ 
        console.log('init Database: ', dbType);

        if ( dbType === 'MongoDB' ) {
            const Connection        = require('../database/MongoDB/Connection.js');
            let connection          = new Connection();
            const db                = await connection.init();        }
    },
    checkStructure: async () =>{ 
        console.log('check Structure: ');

        const checks = [
            './server/custom/data',
            './server/custom/custom',
            './server/custom/system',
            './server/database/customApi',
            './server/database/MongoDB/dataApi'
        ];
        for (let i = 0; i < checks.length; i++)
            fs.mkdirSync(checks[i], {recursive: true, mode: '777'})
    },
    generateTables: async function() {
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

            fs.writeFileSync(`./server/database/${dbType}/dataApi/${key}.js`, template, err => {
                if (err) 
                    reject(err);
                resolve()
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
                    fs.writeFileSync(`./server/database/customApi/${file}`, template, err => {
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
