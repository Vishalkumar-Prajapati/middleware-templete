import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {render} from 'ejs';

function createTemplet() {
    const {database}=JSON.parse(readFileSync("../mainMiddleware/database.json",'utf8'));
    const value={database}
    const templete=readFileSync('./templete.ejs','utf8');
    return render(templete,value);
}

export const server = createServer((req, res) => {
    const output =createTemplet();
    res.writeHead(200,{'content-type': 'text/html'});
    res.end(output);
});
