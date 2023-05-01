import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

function read(file) {
    try {
        if(file==='html') return readFileSync('./index.html', 'utf8');
        else if(file==='json') return readFileSync('../mainMiddleware/database.json', 'utf8');
    } catch (error) {
        return "<h1>404, file is not found</h1>";
    }
}

export const server = createServer((req, res) => {
    if (req.url == '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.end(read('html'));
        res.end(`${read('html')}`);
    }
    if (req.url == '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(read('json'));
    }
});