const _dirname              = process.cwd();
const tables                = require(_dirname + "/server/database/tables.json");
const config                = require(_dirname + "/config");
const dbType                = config.database.type;
const fs                    = require('fs');  
const fsPromise             = require('fs/promises');    
const debug                 = require('debug')('app:server:app:main');

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

        //rights
        try {
            require(_dirname + '/server/custom/system/rights.js');
        } catch (error) {
            require(_dirname + '/server/app/system/rights.js');
        }

        //logout
        try {
            require(_dirname + '/server/custom/system/logout.js');
        } catch (error) {
            require(_dirname + '/server/app/system/logout.js');
        }

    },
    writeAuthFunction(template) {
        const authMethodsRegExp = /\/\/======= begin custom auth methods =======\r?\n([\s\S]*?)\/\/======= end custom auth methods =======/m;
        const matches = authMethodsRegExp.exec(template);
        if (matches) {
            const authMethodsCode = matches[1];
            const modifiedCode = authMethodsCode.replace(/(^|\r?\n)\s*async\s+(\w+)\s*\((.*?)\)\s*{/g, (match, p1, p2, p3) => {
                return `${p1}async ${p2} (${p3}) {\nif((!ctx || !ctx.auth) && (!auth || typeof auth !== 'boolean')) { if (ctx) {ctx.body = {error: 'Not Authorized'}} return {error: 'Not Authorized'} }`;
            });
            template = template.replace(authMethodsRegExp, `//======= begin custom auth methods =======\n${modifiedCode}//======= end custom auth methods =======`);
        }

        return template
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
    clearOldStructure: async () => { 
        debug('clear Old Structure: ');
        
        try {
            //clear data API
            fs.rmSync(`./server/database/${dbType}/dataApi`, { recursive: true, force: true });
            //clear custom API
            fs.rmSync(`./server/database/customApi`, { recursive: true, force: true });

        } catch ( error ) {
            debug('Error: clear Old Structure', error)
        }
    },
    checkStructure: async () =>{ 
        debug('check Structure: ');

        const checks = [
            './server/custom/data',
            './server/custom/custom',
            './server/custom/custom/post',
            './server/custom/custom/get',
            './server/custom/system',
            './server/database/customApi',
            './server/database/customApi/get',
            './server/database/customApi/post',
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

            debug('render Template (DATA): ', key); 
            const template              = Nunjucks.render(Template, { table: key, collection: key,  database: dbType, _dirname });

            //write templates
            fs.writeFileSync(`./server/database/${dbType}/dataApi/${key}.js`, template, err => {
                if (err) 
                    reject(err);
                resolve()
            });
          
        }

        //generate tables für Custom GET
        if ( fs.existsSync(`./server/custom/custom`) ) {
            fs.readdir(`./server/custom/custom/get`, (err, files) => {
                files.forEach(file => {

                    const Template                = `./server/custom/custom/get/${file}`;
                    debug('render Template (CUSTOM GET): ', file); 

                    let template              = Nunjucks.render(Template, { function: file.replace('.js', ''), _dirname  });

                    template = main.writeAuthFunction(template)

                    //write templates
                    fs.writeFileSync(`./server/database/customApi/get/${file}`, template, err => {
                        if (err) {
                            debug(err);
                        }
                    });
                });
            });
        }

        //generate tables für Custom POST
        if ( fs.existsSync(`./server/custom/custom`) ) {
            fs.readdir(`./server/custom/custom/post`, (err, files) => {
                files.forEach(file => {

                    const Template                = `./server/custom/custom/post/${file}`;
                    debug('render Template (CUSTOM POST): ', file); 

                    let template              = Nunjucks.render(Template, { function: file.replace('.js', ''), _dirname });
                    
                    template = main.writeAuthFunction(template)

                    //write templates
                    fs.writeFileSync(`./server/database/customApi/post/${file}`, template, err => {
                        if (err) {
                            debug(err);
                        }
                    });
                });
            });
        }
    }
}

module.exports = main;
