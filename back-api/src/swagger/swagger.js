module.exports = (root) => {
    return {
        swaggerDefinition: {
            info: {
                title: 'API Test Saegus',
                version: '0.0.1',
                description: `Test Saegus par Antony Noyelle`
            },
            host: 'localhost:3000',
            basePath: '/',
            securityDefinitions:{
                jwt: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
          
        },
        // List of files to be processes. You can also set globs './routes/*.js'
        apis: [root + '/routes/**.route.js'],

    }
}