const mysql = require('mysql2');
const databaseConfig = require('./databaseConfig.json');

const pool  = mysql.createPool(databaseConfig);


/**
 * Performs an SQL query.
 * @param {string} query The query to perform.
 */
async function performQuery(query) {
    // Holds array of returned results.
    let returnResults = [];     
    if (!query) {
        throw new Error(`query is ${query}`);
    }

    await pool.query(
        query,
        (error, results, fields) => {
            if (error) throw error;
            console.log(results);
            returnResults = results;
        }
    );
    
    return returnResults;
}

module.exports = {
    pool
}

