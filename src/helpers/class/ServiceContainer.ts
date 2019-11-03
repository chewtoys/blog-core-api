/**
 * Simple service container used for dependency injection
 *
 * @author Julien Guillot
 * @since 02-NOV-2019
 * @version 0.0.1
 */
export class ServiceContainer {

    static instance: ServiceContainer;

    private services: any = {};

    constructor(debug?: boolean) {
        if (!ServiceContainer.instance) {
            if (debug) {
                console.log("Service container created.");
            }

            ServiceContainer.instance = this;
        }

        return ServiceContainer.instance;
    }

    /**
     * Register instance of service if not already present
     *
     * @author Julien Guillot
     * @since 02-NOV-2019
     * @version 0.0.1
     *
     * @param service Class to register as a service
     */
    public register(service: any): this {
        if (!this.services.hasOwnProperty(service.name)) {
            this.services[service.name] = new service();
        }

        return this;
    }

    public get<T>(service: T&Function): T {
        if (!this.services.hasOwnProperty(service.name)) {
            throw Error(`Service: ${ service.name } is not registered`);
        }

        return service;
    }
}
