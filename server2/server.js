/**
 * <Used ChatGPT as a guide.>
 */

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')

// Http helpers.
const utils = require('./modules/utils.js');

// Endpoints from the config.
const endpoints 
    = require('./modules/endpoints.json');

// Port from the config.
const config = require('./modules/config.json');

// Create the server.
const server = http.createServer((req, res) => {
    let pathname;
    let parsedUrl;
    
    try {
    // Set the CORS headers.
    utils.setCORSHeaders(res);

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

    // Handle routes.
    switch(pathname) {
        case endpoints.postQuery: {
            handlePostQuery(req, res);
            break;
        }
        case endpoints.getQuery: {
            handleGetQuery(req, res);
            break;
        }
        case endpoints.postDefaultQuery: {
            handlePostDefaultQuery(req, res);
            break;
        }
        default: {
            utils.handle404(req, res);
            return;
        }
    }

 } catch (error) {
    console.error(error);
    utils.handle500(req, res);
  }

});


// Start listening for connections.
server.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`)
});
