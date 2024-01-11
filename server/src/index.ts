//Importing project dependancies that we installed earlier
import * as dotenv from 'dotenv'
import express, {Application, Request, Response,NextFunction, Errback} from 'express'
import cors from 'cors' 
import helmet from 'helmet'
import bcypt from 'bcrypt';

import validateEnv from '@utils/validateEnv'

import User from './models/user';

const authRoutes = require('@routes/auth')
const notesRoutes = require('@routes/notes')

interface UserInterface {
    username: string;
    email: string;
    password: string;
  }

//App Varaibles 
dotenv.config()

validateEnv()
//intializing the express app 
const app: Application = express(); 

//using the dependancies
app.use(helmet()); 
app.use(cors()); 
app.use(express.json())


app.use('/notes', notesRoutes)
app.use('/', authRoutes)

app.use((error: any, req, res: Response, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

module.exports = app