/**
 * Tag contains the name of the tag, can be assigned to other project components
 * in different contexts.
 */
class Tag {
    constructor(name = "New Tag"){
        this.name = name;
        this.id = proj.tags.length;
    }
    deleteTag(){
        // Delete this tag from every block, and from tags generally
        let blocks = proj.blocks;
        let index = proj.tags.indexOf(this);
        proj.tags.splice(index, 1);
        blocks.forEach (block => {
            if (block.tags.includes(this)){
                block.removeTag(this.id);
            }
        });
    }
}

function deleteTagById(tagId){
    console.log("Trying to delete tag with id " + tagId);
    let tags = proj.tags;
    tags.forEach(tag => {
        if (tag.id == tagId){
            tag.deleteTag();
            populatePanel(2); // 2 is the tag panel
            return;
        }
    });
}