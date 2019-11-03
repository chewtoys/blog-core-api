/**
 * Define roles needed to perform CRUD operations on content
 *
 * @author Julien Guillot
 * @since 27-OCT-2019
 * @version 0.0.1
 */
class ProtectedContent {
    /**
     * Array of roles matching format <CLASSNAME>_<ACTION>
     */
    public readonly roles = [
        this.constructor.name.toUpperCase() + '_CREATE',
        this.constructor.name.toUpperCase() + '_READ',
        this.constructor.name.toUpperCase() + '_UPDATE',
        this.constructor.name.toUpperCase() + '_DELETE',
        this.constructor.name.toUpperCase() + '_PUBLISH'
    ];
}

export { ProtectedContent };
