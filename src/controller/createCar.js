"use strict";
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var car_1 = require("../entity/car");
var CreateCarController = /** @class */ (function () {
    function CreateCarController(carRepository) {
        this.carRepository = carRepository;
    }
    CreateCarController.prototype.execute = function (req, res) {
        console.log(req.body);
        var car = class_transformer_1.plainToClass(car_1["default"], req.body /*, { excludeExtraneousValues: true }*/);
        console.log(car);
        this.carRepository.add(car);
        console.log("Added car " + car.getMaker() + " " + car.getModel() + " to the list");
        res.sendStatus(201);
    };
    return CreateCarController;
}());
exports["default"] = CreateCarController;
