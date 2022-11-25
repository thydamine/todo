class Block {
    constructor(name = "New File", nextVersion = null){
        this.id = proj.blocks.length;
        this.name = name;
        this.path = path;
        this.fileSize = Math.round(Math.random() * 1000);
        this.dateAdded = new Date();
        this.tags = [];
        this.nextVersion = nextVersion;
    }
    deleteBlock(){
        let index = proj.blocks.indexOf(this);
        proj.blocks.splice(index, 1);
    }
    addTag(tagId){
        this.tags.push(proj.tags[tagId]);
        populateTagBox(this.id);
        closeTagBox();
    }
    removeTag(tagId){
        let index = this.tags.indexOf(proj.tags[tagId]);
        this.tags.splice(index, 1);
        populateTagBox(this.id);
    }
    getTagsNotInThisBlock(){
        let tagsNotInThisBlock = [];
        for (let i = 0; i < proj.tags.length; i++){
            if (!this.tags.includes(proj.tags[i])){
                tagsNotInThisBlock.push(proj.tags[i]);
            }
        }
        return tagsNotInThisBlock;
    }
    get fileSizeString(){
        return this.fileSize + " KB";
    }
    get dateAddedString(){
        return this.dateAdded.toDateString();
    }
}

/**
 * Makes a div slowly disappear and then removes it from the DOM
 */
function fadeOutAndRemove(element){
    let opacity = 1;
    let interval = setInterval(function(){
        if (opacity <= 0.1){
            clearInterval(interval);
            element.remove();
        }
        element.style.opacity = opacity;
        opacity -= opacity * 0.1;
    }, 20);
}
function jumpToTagWindow(){
    closeShade();
    populatePanel(2);
}