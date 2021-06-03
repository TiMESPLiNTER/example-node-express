"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var Car = /** @class */ (function () {
    function Car(maker, model, owner) {
        this.maker = maker;
        this.model = model;
        this.owner = owner;
    }
    Car.prototype.getMaker = function () {
        return this.maker;
    };
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.getOwner = function () {
        return this.owner;
    };
    __decorate([
        class_transformer_1.Expose()
    ], Car.prototype, "maker");
    __decorate([
        class_transformer_1.Expose()
    ], Car.prototype, "model");
    Car = __decorate([
        class_transformer_1.Exclude()
    ], Car);
    return Car;
}());
exports["default"] = Car;
