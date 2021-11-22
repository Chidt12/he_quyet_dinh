import express from 'express';
import routes from '../api';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import multer from 'multer';
import BaseError from '../packages/error/error';

import { PythonShell } from 'python-shell';
import path from 'path';


export default ({ app }: { app: express.Application }) => {
    app.use(cors(
        {
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }
    ));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        secret: 'he_quyet_dinh_secret',
        resave: false,
        saveUninitialized: false
    }));

    app.get('/', (req, res) => {
        res.send('THIS REALLY WORKED');
    });

    app.get('/test', (req, res) => {
        var dir = path.join(__dirname , "/../python_script")
        PythonShell.run('script.py', {scriptPath: dir}, function (err, result) {
            if (err) throw err;
            console.log('finished');
            console.log(result)
            return res.send(result);
        });
    });

    app.use(`/${process.env.UPLOAD_FOLDER}`, express.static(`${process.env.UPLOAD_FOLDER}`))

    app.use('/api', routes());


    app.use(function (error: Error, req, res, next) {
        // Gets called because of `wrapAsync()`
        res.status(200).send(new BaseError(error.message, -1).release());
    });
};