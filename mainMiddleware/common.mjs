import * as fs from 'node:fs';
class Common {
  parse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  stringify(data) {
    try {
      return JSON.stringify(data);
    } catch (e) {
      return data;
    }
  }

  getReqPayload(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = '';
        req.on('data', (chunk) => {
          // append the string version to the body
          body += chunk.toString();
        });
        req.on('end', () => {
          // send back the data
          if (req.headers['content-type'] === 'application/json')
            resolve(this.parse(body));
          else resolve(body);
        });
        req.on('error', (err) => {
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  getDatabase() {
    return new Promise((resolve, reject) => {
        fs.readFile('./database.json','utf-8',(err,data)=>{
          if (err) reject(err);
          else resolve(this.parse(data));
        });
    });
  }
  setDatabase(userData,res){
    return new Promise((resolve,reject)=>{
      fs.writeFile('./database.json',this.stringify(userData),(err)=>{
        if (err) reject(err);
        res.end('Your data has been added to the database');
        resolve("data added");
      });
    });
  }

}

export const common = new Common();
