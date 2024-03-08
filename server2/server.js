/**
 * <Used ChatGPT as a guide.>
 */

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')

// Http helpers.
const { handle404, getRequestBody, handle500 } 
    = require('./modules/utils');

// Endpoints from the config.
const endpoints 
    = require('./modules/endpoints.json');

// Port from the config.
const PORT = require('./modules/config.json');

// Create the server.
const server = http.createServer((req, res) => {
    let pathname;
    let parsedUrl;
    
    try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(204); // No Content
      res.end();
      return;
    }

    // Parse the request URL
    parsedUrl = url.parse(req.url, true)

    // Get the pathname from the URL
    pathname = parsedUrl.pathname

    // Handle no path error.
    if (!pathname) {
      handle404(req, res);
      return
    }

    // Check routes.


 } catch (error) {
    console.error(error);
    handle500(req, res);
  }

});

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

// Start listening for connections.
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
