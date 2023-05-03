import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { render } from 'ejs';
import {parse} from 'node:querystring';
function readFile() {
    const { database } = JSON.parse(readFileSync('../mainMiddleware/database.json'), 'utf8');
    return database;
}
export const server = createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const template = readFileSync('./button.ejs', 'utf8');
        return res.end(render(template));
    }
    else if (req.url == '/verification' && req.method == 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const database = readFile();
        let data = '';
        req.on('data', (chunk) => {
            data += chunk.toString();
        });
        req.on('end', () => {
            const { email } = parse(data);
            const index = database.findIndex(oData => oData.email === email);
            if (index !== -1) {
                const template = readFileSync('./template.ejs', 'utf8');
                const name = database[index].fullName;
                const value = { name };
                return res.end(render(template, value));
            }
            else {
                return res.end(render("<h1>your email <%= email %> is not verified</h1>", { email }));
            }
        })
    }
}) 
