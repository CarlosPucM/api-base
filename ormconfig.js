const detectTSNode = require('detect-ts-node');

const commonConfig = {
   "type": "mysql",
    "host": "db4free.net",
    "port": 3306,
    "username": "devcarlospucm",
    "password": "devCarlosPucM",
    "database": "dbtestcarlospucm",
    "synchronize": true,
    "logging": false,
    "options": {
        "encrypt": false,
        "enableArithAbort": false
    }
};


const srcConfig = {
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};

const distConfig = {
    "entities": [
        __dirname +  "/build/entity/**/*.js"
    ],
    "migrations": [
        __dirname + "/build/migration/**/*.js"
    ],
    "subscribers": [
        __dirname +  "/build/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": __dirname +  "/build/entity",
        "migrationsDir": __dirname +  "/build/migration",
        "subscribersDir": __dirname + "/build/subscriber"
    }
};


const result = {};
let key;

// Append common configs to final object
for (key in commonConfig) {
    if (commonConfig.hasOwnProperty(key)) {
        result[key] = commonConfig[key];
    }
}

if (detectTSNode) {
    // if ts-node append src configuration
    for (key in srcConfig) {
        if (srcConfig.hasOwnProperty(key)) {
            result[key] = srcConfig[key];
        }
    }
} else {
    // else append dist configuration
    for (key in distConfig) {
        if (distConfig.hasOwnProperty(key)) {
            result[key] = distConfig[key];
        }
    }

}

module.exports = result;