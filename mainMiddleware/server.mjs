import { createServer } from 'node:http';
import { URL } from 'node:url';
import { Router } from './router.mjs';
import { common } from './common.mjs';
import { ApiData } from './apiData.mjs';

const router = new Router();
const apiData = new ApiData();

apiData.use((req, res) => {
    console.log(req.headers);
    if (req.headers.apikey === 'Vishal@1545') {
        req.message = "access data"
    }
    else {
        req.message = "invalid api key";
    }
})

router.use((req, res) => {
    console.log(`\n[${req.method}] ${req.url}`);
    console.log('Body:', req.body, '\n');
});

router.use((req, res) => {
    try {
        if (!((req.body.userName && req.body.fullName && req.body.email && req.body.phoneNumber))) {
            req.message = "all filed are required userName ,fullName ,email, phoneNumber";
            console.log(req.message);
        }
    } catch (error) {
        console.error(error, "error in middleware");
    }
});
router.use((req, res) => {
    try {
        if (req.userData.database.find(objData => objData.userName === req.body.userName)) {
            req.message = "user already exist";
            console.log(req.message);
        }
    } catch (error) {
        console.error(error, "error in middleware");
    }
});

router.post('/createUser', 'userData');

export const server = createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    req.path = urlObj.pathname;
    if (req.method === 'POST') {
        req.body = await common.getReqPayload(req);
        req.userData = await common.getDatabase();
        return router.route(req, res);
    }
    else if (req.method === 'GET' && req.url == '/apiKey') {
        return apiData.getData(req, res);
    }
});