"use strict";
exports.__esModule = true;
var CarRepository = /** @class */ (function () {
    function CarRepository() {
        this.cars = [];
    }
    CarRepository.prototype.add = function (car) {
        this.cars.push(car);
    };
    CarRepository.prototype.getAll = function () {
        return this.cars;
    };
    return CarRepository;
}());
exports["default"] = CarRepository;
