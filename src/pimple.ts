"use strict";

/** Declaration types */
type ServiceDeclaration  = Function|Object;
type ProviderDeclaration = Function|ServiceProvider;

/**
 * Reserved names of properties
 * @type {string[]}
 */
const reservedProperties: string[] = [
    'get', 'set', 'factory', 'raw',
    'protect', 'share', 'toString', 'constructor',
    'prototype'
];

/**
 * Service provider class for service injecting in Pimple container
 */
export interface ServiceProvider 
{
     register(container: Pimple): void;
}

/**
 * Pimple dependency injection container
 *
 * @copyright 2011 M.PARAISO <mparaiso@online.fr>
 * @copyright 2016 SerafimArts <nesk@xakep.ru>
 * @license LGPL
 * @version 3.0.0
 */
export default class Pimple 
{
    /**
     * @type {string}
     */
    static get VERSION() { return '3.0.0'; }

    /**
     * @type {{}}
     * @private
     */
    private _definitions: { [key: string]: any; } = {};

    /**
     * @type {{}}
     * @private
     */
    private _raw: { [key: string]: any; } = {};

    constructor(services: { [key: string]: any; } = {}) {
        Object.keys(services).forEach(function (service) {
            this.set(service, services[service]);
        }, this);
    }

    /**
     * Define a service
     *
     * @param {string} name
     * @param {Object|Function} service
     * @return {Pimple}
     */
    set(name: string, service: ServiceDeclaration): Pimple
    {
        this._raw[name] = service;

        this._definitions[name] = service instanceof Function ?
            (function () {
                let cached: any;
                return (pimple: Pimple) => {
                    if (cached === undefined) {
                        cached = service(pimple);
                    }
                    return cached;
                };
            }()) : service;

        try {
            if (reservedProperties.indexOf(name) === -1) {
                Object.defineProperty(this, name, {
                    get: function () {
                        return this.get(name);
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    /**
     * Register a factory
     *
     * @param {string} name
     * @param {Function} callback
     * @return {Pimple}
     */
    public factory(name: string, callback: Function): Pimple {
        this._raw[name]         = callback;
        this._definitions[name] = callback;

        try {
            if (reservedProperties.indexOf(name) === -1) {
                Object.defineProperty(this, name, {
                    get: function () {
                        return this.get(name);
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }

        return this;
    }

    /**
     * Get a service instance
     * @param {string} name
     * @return {*}
     */
    public get(name: string): any {
        if (this._definitions[name] instanceof Function) {
            return this._definitions[name](this);
        }
        return this._definitions[name];
    }

    /**
     * Register a protected function
     * @param {Function} service
     * @returns {Function}
     */
    protect(service: Function): Function {
        return function () {
            return service;
        };
    }

    /**
     * Extend a service
     * @param {string} serviceName
     * @param {Function} service
     * @returns {Function}
     */
    public extend(serviceName: string, service: Function): Function {
        if (!this._definitions[serviceName]) {
            throw new RangeError(`Definition with "${serviceName}" not defined in container.`);
        }

        var def = this._definitions[serviceName];

        return function (container: Pimple) {
            if (def instanceof Function) {
                def = def(container);
            }
            return service(def, container);
        };
    }

    /**
     * Get a service raw definition
     */
    raw(name: string): Function {
        return this._raw[name];
    }

    /**
     * Register a service provider
     */
    public register(provider: ProviderDeclaration): Pimple {
        if (this.instanceOfServiceProvider(provider) && provider.register instanceof Function) {
            provider.register(this);
            return this;
        }

        if (provider instanceof Function) {
            provider(this);
            return this;
        }

        return this;
    }

    private instanceOfServiceProvider(object: any): object is ServiceProvider {
        return 'register' in object;
    }
}
