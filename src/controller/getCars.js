"use strict";
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var GetCarsController = /** @class */ (function () {
    function GetCarsController(carRepository) {
        this.carRepository = carRepository;
    }
    GetCarsController.prototype.execute = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(class_transformer_1.classToPlain(this.carRepository.getAll())));
    };
    return GetCarsController;
}());
exports["default"] = GetCarsController;
