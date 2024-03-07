const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user: 'user',
    password: 'password',
    database: 'ISATest'
});


/**
 * Performs an SQL query.
 * @param {string} query The query to perform.
 */
async function performQuery(query) {
    let returnResults = []; // Holds array of returned results.

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

