const http = require('http');
const path = require('path');
const fs = require('fs');

/** Handles a 404 file not found error.
 *
 * @param {http.IncomingMessage} req The http request.
 * @param {http.ServerResponse<IncomingMessage>} res The http response.
 */
function handle404(req, res) {
  //res.writeHead(404, { 'Content-Type': 'text/plain' })
  //res.end('404 Not Found');
  serveFile(res, './404.html', 'text/html');
}

/** Handles a 500 internal server error.
 *
 * @param {http.IncomingMessage} req The http request.
 * @param {http.ServerResponse<IncomingMessage>} res The http response.
 */
function handle500(req, res) {
  res.writeHead(500, { 'Content-Type': 'text/plain' })
  res.end('Internal Server Error')
}

/** Returns the body of a request.
 * 
 * @param {http.IncomingMessage} req 
 * @returns {Promise<any>}
 */
async function getRequestBody(req) {
  // Asynchronously parse out the body.
  return new Promise((resolve, reject) => {
    let body = '';

    if (!req) {
      reject(new Error('Request is null.'));
      return;
    }

    if (req.method !== 'POST') {
      resolve({});
      return;
    }

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(new Error('Error parsing JSON.'));
      }
    });

    req.on('error', (error) => {
      reject(new Error('Error with the request.'));
    });
  });
}

/**Serves a file to the connected user.
 *
 * @param {Response} res The server response.
 * @param {string} relativePath The relative path.
 * @param {string} contentType The type of content.
 */
function serveFile(res, relativePath, contentType) {
  try {
    // Join the file path.
    const filePath = path.join(__dirname, relativePath)

    // If the path does not exist, return an error.
    if (!fs.existsSync(filePath)) {
      // Handle file read error.
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
    }

    // Read the file.
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        // Handle file read error.
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Internal Server Error')
      } else {
        // Serve the file content
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
      }
    });
  } catch (error) {
    console.error(error);
  }
}

/** Sets the CORS headers.
 * @param {http.Response} res the http response.
 */
function setCORSHeaders(res) {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
}

module.exports = {
  handle404,
  handle500,
  getRequestBody,
  serveFile,
  setCORSHeaders
}
