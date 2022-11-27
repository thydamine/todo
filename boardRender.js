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
    let isBlocks = false;
    let i = 0;
    // create a reverse order version of the blocks array
    let blocks = proj.blocks.slice(0);
    blocks.reverse();
    blocks.forEach(element => {
        isBlocks = true;
        if (element.isNewestVersion){
            html += getHtmlForBlock(element.id);
        }
    });
    html += "</div>";
    document.getElementById("blockZone").innerHTML = html;

    if (!isBlocks){
        let helperString = `<b>Welcome to Blackboard!</b><br>
        Blackboard is a tool for organizing your ideas and projects in small groups. Start by adding a file block to your group's board using the "+" button below.
        <br><br>
        To see a populated project, select a different project using the selector above.`;
        document.getElementById("blockZone").innerHTML = '<div class="helperBlackboard">' + helperString + '</div>';
    }
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
function renderGroupCount(){
    let count = proj.people.length;
    let string = "+ New Member (" + count + ")";
    document.getElementById("groupCount").innerHTML = string;
}
function toggleProjectList(){
    renderProjectList();
    $("#projList").fadeToggle(100, "linear");
}
function renderProjectList(){
    let html = "";
    projects.forEach(element => {
        html += '<div class="projItem" onclick="changeProjects(' + element.id + ')">' + element.name + '</div>';
    });
    document.getElementById("projList").innerHTML = html;
}

renderBlocks();
closePanelDelete();
closeTagBox();
closeShade();
renderGroupCount();
renderProjectName();

changeProjects(1); // Start at the empty one
changeProjects(1); // Kludge, this is to fix a bug where the first project doesn't load properly