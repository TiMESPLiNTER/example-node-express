"use strict";
exports.__esModule = true;
exports["default"] = (function (req, res, next) {
    var supportedContentType = 'application/json';
    if ('POST' === req.method && !req.is(supportedContentType)) {
        res.status(400).send('Conent-Type header must be application/json');
        return;
    }
    if (!req.accepts(supportedContentType)) {
        res.status(406).send('Accpet header must be application/json');
        return;
    }
    next();
});
