import { EventEmitter } from 'node:events';
import { common } from './common.mjs';

const emitter=new EventEmitter();
export class Router {
  #routes;
  #middlewares;

  constructor() {
    this.#routes = new Map();
    this.#middlewares = [];
  }
  #addRoute(method, path, eventName) {
    const key = `${method.toUpperCase()} ${path}`;
    this.#routes.set(key, eventName);
  }
  use(middleware) {
    this.#middlewares.push(middleware);
  }
  post(path, eventName) {
    this.#addRoute('POST', path, eventName);
  }
  async route(req, res) {

    const key = `${req.method.toUpperCase()} ${req.path}`;
    const eventName = this.#routes.get(key);
    //event registere
    
    emitter.on('userData',async  (req,res)=>{
      req.userData.database.push(req.body);
      await common.setDatabase(req.userData,res)
    });
    emitter.on('notFound', (res) => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(common.stringify({ message: 'Not Found' }));
    });

    // Execute middlewares
    for (const middleware of this.#middlewares) {
      await middleware(req, res);
    }
    if (!eventName) return emitter.emit('notFound', res);
    if(req.message){
      return res.end(req.message);
    }
    else
      emitter.emit('userData',req,res);
  }
}