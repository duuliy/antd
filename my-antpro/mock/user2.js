import { parse } from 'url';




export function query(req,res,u,b){
    console.log(123)

}
export function add(req,res){
    // let url = u;

    // const body = (b && b.body) || req.body;
    // const { method, no, description } = body;

}
export function delet(req,res,u,b){
    // let url = u;

    // const body = (b && b.body) || req.body;
    // const { method, no, description } = body;

    console.log(333)
}

export default{
    query,
    add,
    delet
}