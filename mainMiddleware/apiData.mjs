import {common} from './common.mjs';

export class ApiData{
    #middlewares
    constructor(){
        this.#middlewares=[];
    }
    use(middleware){
        this.#middlewares.push(middleware);
    }
    async getData(req,res){
        for(const middleware of this.#middlewares){
            middleware(req,res);
        }
        if(req.message==="access data"){
            const data=await common.getDatabase();
            res.end(common.stringify(data));
        }
        else{
            res.end(req.message)
        }
    }
}