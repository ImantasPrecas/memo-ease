import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId?: string 
        }
    }
}

module.exports = (req:Request, res:Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if(token) {
        try {
              const decodedToken = jwt.decode(token, process.env.SECRET_KEY) as {id: string, email: string, username: string}
    
              if(typeof decodedToken === 'string') {
                req.userId = decodedToken
              } else {
                req.userId = decodedToken.id
              }
    
        } catch (error) {
            
        }

    }
    next()
}
