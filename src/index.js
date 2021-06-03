"use strict";
exports.__esModule = true;
require("dotenv/config");
var cors_1 = require("cors");
var contentTypeMiddleware_1 = require("./middleware/contentTypeMiddleware");
var express_1 = require("express");
var car_1 = require("./entity/car");
var carRepository_1 = require("./storage/carRepository");
var createCar_1 = require("./controller/createCar");
var getCars_1 = require("./controller/getCars");
var pimple_1 = require("pimple");
var APP_PORT = process.env.PORT;
var container = new pimple_1["default"]();
var app = express_1["default"]();
container.set(carRepository_1["default"].name, function (pimple) {
    return new carRepository_1["default"]();
});
var carRepository = new carRepository_1["default"]();
carRepository.add(new car_1["default"]('Aston Martin', 'Vengeance', 'me'));
// Middlewares
app.use(cors_1["default"]());
app.use(contentTypeMiddleware_1["default"]);
app.use(express_1["default"].json());
// Routes
app.get('/car', function (req, res) { return (new getCars_1["default"](carRepository)).execute(req, res); });
app.post('/car', function (req, res) { return (new createCar_1["default"](carRepository)).execute(req, res); });
app.listen(APP_PORT, function () {
    return console.log("Example app listening on port " + APP_PORT + "!");
});
