// check out the database
// username: ssNorway
// pw: Passord123

const dbPath = () =>{
    switch(process.env.NODE_ENV){
        case "test": 
            return "mongodb://test:test@ds052629.mlab.com:52629/soprasteria-test";
        case "dev":
            return "mongodb://test:test@ds052629.mlab.com:52629/soprasteria-dev";
        default : 
            return "mongodb://test:test@ds040898.mlab.com:40898/soprasteria";
    }
}

const config = {
    db : dbPath(),
    dbOptions : {}
};

export default config;