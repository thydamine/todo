class Block {
    constructor(name = "New File", olderVersion = null){
        this.id = proj.blocks.length;
        this.name = name;
        this.fileSize = Math.round(Math.random() * 1000);
        this.dateAdded = new Date();
        this.tags = [];
        this.newerVersion = null;
        this.olderVersion = olderVersion;
        this.versionNumber = this.versionCount;
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
    createNewVersion(){
        let newVersion = new Block(this.name, this.newestVersion);
        newVersion.tags = this.tags;
        this.newerVersion = newVersion;
        newVersion.olderVersion = this;
        return newVersion;
    }
    get fileSizeString(){
        return this.fileSize + " KB";
    }
    get dateAddedString(){
        return this.dateAdded.toLocaleDateString("en-US");
    }
    get newestVersion(){
        if (this.newerVersion == null){
            return this;
        } else {
            return this.newerVersion.newestVersion;
        }
    }
    get isNewestVersion(){
        return this.newestVersion == this;
    }
    get oldestVersion(){
        if (this.olderVersion == null){
            return this;
        } else {
            return this.olderVersion.oldestVersion;
        }
    }
    get versionCount(){
        if (this.olderVersion == null){
            return 1;
        } else {
            return this.olderVersion.versionCount + 1;
        }
    }
    get versions(){
        // Get a list of versions from newest to oldest
        let versions = [];
        let newestVersion = this.newestVersion;
        for (let i = 0; i < this.versionCount; i++){
            versions.push(newestVersion);
            newestVersion = newestVersion.olderVersion;
        }
        return versions;
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