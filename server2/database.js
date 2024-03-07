const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user: 'main',
    password: 'secret',
    database: 'mydb'
});


/**
 * Performs an SQL query.
 * @param {string} query The query to perform.
 */
async function performQuery(query) {
    const results = []; // Holds array of results.

    if (!query) {
        throw new Error(`query is ${query}`);
    }

    pool.query(
    query,
        (error, results, fields) => {
            if (error) throw error;
            return results;
        }
    );
}

async function testDB() {

    const results = await performQuery(
        'SHOW TABLES;'
    );

    console.log(results);
}


testDB();

