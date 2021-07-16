require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
import api from './api';
import mongoose from 'mongoose';
//import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';

const {PORT, MONGO_URI} = process.env;


mongoose.connect(MONGO_URI,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB');
    //createFakeData();
}).catch(e=>{
    console.error(e)
})


router.use('/api',api.routes());

app.use(bodyParser());

app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port,()=> {
    console.log('Listening to the port %d',port);
})