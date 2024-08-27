// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction ) {
//        const fechaActual = new Date()
//         console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}, a la hora ${fechaActual}`,

//         );
//         next();
//     }
// }

export function LoggerGlobal(req: Request, res: Response, next: NextFunction ) {
    const fechaActual = new Date()
        console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}, a la hora ${fechaActual}`,

        );
        next();
};