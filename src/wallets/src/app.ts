import {walletRouter} from "./routes/wallet.route";
import {transactionRouter} from "./routes/transaction.route";
const { errorHandler, NotFoundError } = require('@softzone/common');
import { Request, Response,  } from 'express';

const express = require( 'express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const config = require('config');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla'
}));

app.use(walletRouter);
app.use(transactionRouter);

app.all('*', async (req: Request, res: Response) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };