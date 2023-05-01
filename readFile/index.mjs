import {server} from './server.mjs';
import 'dotenv/config';
const PORT = process.env.PORT;

server.listen(PORT, (err) => {
    if(err) throw new Error('server error');
    console.log(`Server is running on port 127.0.0.1:${PORT}`);
});