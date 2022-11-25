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
        // Delete this block and every older version
        if (this.olderVersion != null){
            this.olderVersion.deleteBlock();
        }
        let index = proj.blocks.indexOf(this);
        proj.blocks.splice(index, 1);
    }
    deleteSpecificBlock(){
        // Delete this block only, not older versions
        let index = proj.blocks.indexOf(this);
        proj.blocks.splice(index, 1);
    }
    hideBlock(){
        // Messy solution, but it works
        this.newerVersion = "hidden";
    }
    addTag(tagId){
        let tagToAdd;
        proj.tags.forEach(tag => {
            if (tag.id == tagId){
                tagToAdd = tag;
            }
        });
        this.tags.push(tagToAdd);
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
        proj.tags.forEach(tag => {
            if (!this.tags.includes(tag)){
                tagsNotInThisBlock.push(tag);
            }
        });
        return tagsNotInThisBlock;
    }
    createNewVersion(){
        let newVersion = new Block(this.name, this.newestVersion);
        newVersion.tags = this.tags;
        this.newerVersion = newVersion;
        newVersion.olderVersion = this;
        return newVersion;
    }
    deleteEveryBlockWithAVersionHigherThanThis(versionNumber){
        // Delete every block with a version higher than this one
        let versions = this.versions;
        for (let i = 0; i < versions.length; i++){
            if (versions[i].versionNumber > versionNumber){
                versions[i].deleteSpecificBlock();
            }
            if (versions[i].versionNumber == versionNumber){
                versions[i].newerVersion = null;
                activeBlock = proj.blocks.indexOf(versions[i]);
            }
        }
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
            if (newestVersion != "hidden"){
                versions.push(newestVersion);
            }
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