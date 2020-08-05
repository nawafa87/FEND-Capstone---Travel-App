import request from 'supertest';
import "@babel/polyfill";
import e from "express";

const { calc } = require ('./src/client/js/calc');
const {app} = require ('./src/server/testServer');

test('It should calc Function Defined', ()=>{
        expect(calc).toBeDefined();
    });

 

test('should get 200 status',async () => {
    try{
        const res = await request(app).post('/add');
        expect(res.statusCode).toEqual(200);
    }
    catch(error){
        console.log(error);
    }  
});

