module.exports = {
    port: process.env.PORT || 8082,
    db:{
        database: process.env.DB_NAME || 'ramstore',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        options:{
                dialect: process.env.DIALECT || 'mysql',
                host: process.env.HOST || '127.0.0.1',
                storage: './album.sql'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
