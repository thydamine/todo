class Block {
    constructor(name = "New File", path = ""){
        this.name = name;
        this.path = path;
    }
    deleteBlock(){
        let index = proj.blocks.indexOf(this);
        proj.blocks.splice(index, 1);
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