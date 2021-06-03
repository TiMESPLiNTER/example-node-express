import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
    const supportedContentType = 'application/json';

    if ('POST' === req.method && !req.is(supportedContentType)) {
        res.status(400).send('Conent-Type header must be application/json');
        return;
    }

    if (!req.accepts(supportedContentType)) {
        res.status(406).send('Accpet header must be application/json');
        return;
    }

    next();
}
