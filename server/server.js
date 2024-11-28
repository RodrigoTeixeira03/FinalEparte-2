import express from "express";

import indexRouter from "../routes/index.routes.js";
import cors from 'cors'
import * as db from '../db/cnn_mongodb.js'


export default class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute= '/api';
        this.conectarMongo();
        this.middlewares();
        this.routes();
    }

    async conectarMongo(){
        if(!db.isConected){
            await db.coneccionMongo();
        }
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.generalRoute, indexRouter); 
        this.app.use('**',(req, res) => {
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', `${this.port}`.grey);
        });
    }

}