/* Holds handlers for the routes.
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

            (reject) => {handleDBError(res, reject);},
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
    try {
        let query;
        let parsedBody;
        let body = '';

        // Get the query from the request.
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When complete, use the received data.
        req.on('end', () => {
            parsedBody = JSON.parse(body);
        });

        query = parsedBody.sqlQuery;
 
        // Perform the query.
        db.pool
            .promise(query)
            .then(
                (resolve) => {},
                (reject) => {},
            )
            .catch(error => {
                handleDBError(res, error);
             });
                  
    } catch(error) {
        res.writeHead(501, {'Content-Type': 'text/plain'});
        res.end(
            `internal server error\n${error}`
        );
    }
}

/** Handles database errors.
 * @param {http.Response} res the http response
 * @param {string} errorMsg the error message
 */
function handleDBError(res, errorMsg) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end(`request failed\n${errorMsg}`);
}

module.exports = {
    handleGetQuery,
    handlePostQuery
}
