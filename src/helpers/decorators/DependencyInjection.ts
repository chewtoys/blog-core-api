import "reflect-metadata";

import { ServiceContainer } from '../class/ServiceContainer';

/**
 * Register service in the service container.
 *
 * @author Julien Guillot
 * @since 02-NOV-2019
 * @version 0.0.1
 *
 * @param debug Enable debug logging
 */
export function Service(debug: boolean = false) {
    const serviceContainer = new ServiceContainer(debug);

    return (target: any) => {
        if (debug) {
            console.log(`Service: ${ target.name } was registered in the service container.`);
        }

        serviceContainer.register(target);
    }
}

/**
 * Inject service into property (only if service is registered in the service container)
 *
 * @author Julien Guillot
 * @since 02-NOV-2019
 * @version 0.0.1
 *
 * @param debug Enable debug logging
 */
export function Inject(debug: boolean = false) {
    const serviceContainer = new ServiceContainer(debug);

    return (target: any, key: string) => {
        const type = Reflect.getMetadata("design:type", target, key);

        if (debug) {
            console.log(`Parameter ${key} with type: ${type.name} was injected`);
        }

        // FIXME: Injection doesn't work for now
        target.key = serviceContainer.get(type);

        console.log(serviceContainer.get(type));
    }
}
