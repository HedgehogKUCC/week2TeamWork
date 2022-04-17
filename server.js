const http = require('http');
const mongoose = require('mongoose');
const htmlEntities = require('html-entities');

const { success, error } = require('./responseHandle.js');

const ArticleListModel = require('./models/ArticleList');

const PORT = 3005;

mongoose
    .connect('mongodb://localhost:27017/team_w2')
    .then(() => console.log('mongodb is connected...'))
    .catch((err) => console.log(err));

function replaceHtmlSpecialCharacters(strAry) {
    return strAry.map((str) => htmlEntities.encode(str.trim()));
}

async function requestListener(req, res) {

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    if ( req.url === '/' && req.method === 'GET' ) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Home Page</h1>');
        res.end();
    } else if ( req.url === '/ArticleList' && req.method === 'GET' ) {
        const data = await ArticleListModel.find();
        success(res, data);
    } else if ( req.url === '/ArticleList' && req.method === 'POST' ) {
        req.on('end', async () => {
            try {
                // 前端給資料一定要照 userName, userContent, userPhoto, imgUrl 順序
                const [
                    userName,
                    userContent,
                    userPhoto,
                    imgUrl
                ] = replaceHtmlSpecialCharacters(Object.values(JSON.parse(body)));
                let regex = /['\-<>]/g;

                if ( !userName ) {
                    error(res, 'userName property is required');
                    return;
                }
                if ( !userContent ) {
                    error(res, 'userContent property is required');
                    return;
                }
                if ( regex.test(userName) || regex.test(userContent) || regex.test(userPhoto) || regex.test(imgUrl) ) {
                    error(res, "Do not use special symbol dash(-)");
                    return;
                }

                const data = await ArticleListModel.create(
                    {
                        userName,
                        userContent,
                        userPhoto,
                        imgUrl,
                    }
                );
                success(res, data);
            } catch(err) {
                error(res, err.message);
            }
        });
    } else if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>Not Found Page</h1>');
        res.end();
    }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    if (process.env.PORT || PORT) {
        console.log(`Server is running...`);
    }
});
