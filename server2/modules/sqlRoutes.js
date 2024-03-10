/** Holds handlers for the routes.
 *
 * @author Ethan Diosana
 */

const db = require('./database/database.js');

/** Handles SQL GET queries.
 * 
 * @param {http.Request} req the request
 * @param {http.Response} res the response
 */
async function handleGetQuery(req, res)
{
    try {
    
        let results; // The results of the query.
        let body; // The body of the request.
        let query; // The query to run.

        // Get the query from the request.
        query = req;

        query = `SELECT * FROM patients;`; 

        // Perform the query.
        db.pool
            .promise()
            .query(query)
            .then(
            // If query, successful, return results.
            (resolve) => {
                res.setHeader( 
                    'Content-Type',
                    'application/json'
                );

                results = {
                    'queryReturn': resolve[0]
                }

                res.end(JSON.stringify(results));
            },

            (reject) => {
                res.writeHead(501, {'Content-Type': 'text/plain'});
                res.end(
                `internal server error\n${reject}`
                );
            },
        )

        // If error, return an error.
        .catch(error => {
            res.writeHead(501, {'Content-Type': 'text/plain'});
            res.end(
                `internal server error\n${error}`
            );
        });

    } catch(error) {
        res.writeHead(501, {'Content-Type': 'text/plain'});
        res.end(
            `internal server error\n${error}`
        );
    }
}

/** Handles SQL POST queries.
 * 
 * @param {http.Request} req the request
 * @param {http.Response} res the response
 */
async function handlePostQuery(req, res)
{
    // Perform the query.
    
    // If query, successful, return results.
    
    // If error, return an error.
}

module.exports = {
    handleGetQuery,
    handlePostQuery
}
