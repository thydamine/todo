/**
 * Tag contains the name of the tag, can be assigned to other project components
 * in different contexts.
 */
class Tag {
    constructor(name = "New Tag"){
        this.name = name;
        this.id = proj.tags.length;
    }
}