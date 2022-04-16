const http = require('http');

const PORT = 3005;

function requestListener(req, res) {
    res.end();
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    if (process.env.PORT || PORT) {
        console.log(`Server is running...`);
    }
});
