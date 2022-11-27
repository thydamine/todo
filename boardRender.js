function getHtmlForBlock(blockId){
    let html = "";
    let block = proj.blocks[blockId];

    html += '<div class="boardBlockContainer" onclick="populatePopover(' + blockId + ');populateTagBox(' + blockId + ')">';
    if (block.versionNumber > 1){
        html += '<div class="boardBlockVersion">v';
        html += block.versionNumber;
        html += '</div>';
    }
    html += '<img class="boardBlockImg" id="bbItem1" src="img/placeholder.png">';
    html += '<div class="boardBlock">' + block.name + '</div>';
    html += '</div>';

    return html;
}

function renderBlocks(){
    let html = "";
    let i = 0;
    // create a reverse order version of the blocks array
    let blocks = proj.blocks.slice(0);
    blocks.reverse();
    blocks.forEach(element => {
        if (element.isNewestVersion){
            html += getHtmlForBlock(element.id);
        }
    });
    html += "</div>";
    document.getElementById("blockZone").innerHTML = html;
}

function renameActiveBlock(){
    let block = proj.blocks[activeBlock];
    block.name = document.getElementById("blockNameField").value;
    renderBlocks();
}
function togglePlusStack(){
    $("#plusStack").slideToggle(200, "linear");
}
function showInviteBox(){
    openShade();
    $("#popoverInvite").fadeIn(200, "linear");
}
function closeInviteBox(){
    closeShade();
}
function showFileBox(){
    openShade();
    $("#popoverFile").fadeIn(200, "linear");
}
function closeFileBox(){
    closeShade();
}
function showTaskBox(listId){
    console.log("Showing task box for id " + listId);
    openShade();
    $("#popoverTaskList").fadeIn(200, "linear");
    populateTaskListBox(listId);
}
function hideTaskBox(){
    $("#popoverTaskList").hide();
    closeShade();
}

renderBlocks();
closePanelDelete();
closeTagBox();
closeShade();