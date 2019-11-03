/**
 * Interface for object population and export
 *
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1
 */
interface Model {
    /**
     * Populate model with data
     *
     * @param data Data to populate model with
     */
    populate(data: any): this;

    /**
     * Export model to JSON
     */
    export(): any;
}

export { Model };
