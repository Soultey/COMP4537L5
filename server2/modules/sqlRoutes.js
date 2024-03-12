/* Holds handlers for the routes.
 *
 * @author Ethan Diosana
 */

const url = require('url');
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
        let parsedUrl; // The parsed url.
        let query; // The query to run.

        // Get the query from the request.
        parsedUrl = new URL(req.url, 
            `http://${req.headers.host}`);
        query = parsedUrl.searchParams.get('sqlQuery');

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
                handleDBError(res, error);
        });

    } catch(error) {
        console.log(error);
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
        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body);
                const query = parsedBody.sqlQuery;

                console.log("body: " + body);
                console.log("parsedBody: ", parsedBody);

                // Perform the query.
                const [results] = await db.pool.promise().query(query);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 'queryReturn': results }));
            } catch (error) {
                console.error(error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Bad request, could not parse JSON.' }));
            }
        });                  
    } catch(error) {
        console.log(error);
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
    console.log(errorMsg);    
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end(`request failed\n${errorMsg}`);
}

module.exports = {
    handleGetQuery,
    handlePostQuery
}
