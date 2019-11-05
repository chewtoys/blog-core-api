import "reflect-metadata";

interface Property {
    property: string,
    type: string
}

/**
 * Get property name and type and add them to class metadata
 */
export function Property() {
    // ensure data uniqueness
    const propertiesSymbol = Symbol.for('model:properties');

    return (target: any, property: any) => {
        const type = Reflect.getMetadata("design:type", target, property).name;
        const existingParameters = Reflect.getMetadata(propertiesSymbol, target);

        if (!existingParameters) {
            Reflect.defineMetadata(propertiesSymbol, [
                {
                    property: property,
                    type: type
                }
            ], target);
        } else {
            Reflect.defineMetadata(propertiesSymbol, [
                ...existingParameters,
                {
                    property: property,
                    type: type
                }
            ], target);
        }
    }
}
