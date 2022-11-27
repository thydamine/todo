function closeShade(){
    console.log("Closing shade");
    let shade = document.getElementById("shade");
    shade.style.display = "none";

    // Hide the popover box
    let popover = document.getElementById("popoverBlock");
    popover.style.display = "none";

    // Hide the invite box
    let invite = document.getElementById("popoverInvite");
    invite.style.display = "none";

    // Hide the task box
    let task = document.getElementById("popoverTaskList");
    task.style.display = "none";

    // Hide the new file box
    let newFile = document.getElementById("popoverFile");
    newFile.style.display = "none";
}
function openShade(){
    $("#shade").fadeIn(200);
}

function populatePopover(blockId){
    // Establish that this block is the active block
    activeBlock = blockId;

    let block = proj.blocks[blockId];
    let html = "";

    html += '<div class="popoverBoxClose" onclick="closeShade();">&times;</div>';
    html += '<div class="popoverFileThumbnailContainer">';
    html += '<img src="img/placeholder.png" class="popoverFileThumbnail">';
    html += '<div class="popoverVersionContainer" id="popoverVersions">Content</div>';
    html += '</div>';
    html += '<div class="popoverBoxContent">';
    html += '    <input type="text" value="' + block.name + '" class="popoverBoxHeading" id="blockNameField" onchange="renameActiveBlock()">';
    html += '    <div class="popoverBoxSubheading">Uploaded by <i>Test User</i></div>';
    html += '    <div class="popoverBoxTags" id="popoverTagContainer">';
    html += '        <div class="popoverBoxTag">&times; Tag 1</div>';
    html += '        <div class="popoverBoxTag">&times; Tag 2</div>';
    html += '        <div class="popoverBoxTag">&times; Tag 3</div>';
    html += '        <div class="popoverBoxTag popoverBoxTagGray" onclick="toggleTagBox(' + blockId + ');">&plus; New Tag</div>';
    html += '    </div>';
    html += '    <div class="popoverBoxNewTags" id="popoverTagBox" style="display:none;"><div class="popoverBoxTag">&plus; Tag 1</div></div>';
    html += '    <div class="popoverBoxButton" onclick="setFocusToTextBox();">Rename</div>';
    html += '    <div class="popoverBoxButton">Download Latest Version (' + block.fileSizeString + ')</div>';
    html += '    <div class="popoverBoxButton" onclick="createNewVersion();">Upload a New Version</div>';
    html += '    <div class="popoverBoxButton buttonDelete" onclick="togglePanelDelete();">Delete All Versions</div>';
    html += '    <div class="buttonConfirmationContainer" id="popoverPanelDelete" style="display:none;">';
    html += '        <div class="buttonConfirmation bcLabel">Are you sure?</div>';
    html += '        <div class="buttonConfirmation bcRed" onclick="deleteBlocks(' + blockId + ');">Delete</div>';
    html += '        <div class="buttonConfirmation bcGray" onclick="togglePanelDelete();">Cancel</div>';
    html += '    </div>';
    html += '</div>';

    document.getElementById("popoverBlock").innerHTML = html;

    openShade();
    document.getElementById("popoverBlock").style.display = "block";
    populateVersionBox();
    populateTagBox(blockId);
}
function populateTagBox(blockId){
    let block = proj.blocks[blockId];
    let html = "";
    block.tags.forEach(tag => {
        html += '<div class="popoverBoxTag" onclick="proj.blocks[' + blockId + '].removeTag(' + tag.id + ')">&times; ' + tag.name + '</div>';
    });
    html += '<div class="popoverBoxTag popoverBoxTagGray" onclick="toggleTagBox(' + blockId + ');">&plus; New Tag</div>';

    document.getElementById("popoverTagContainer").innerHTML = html;

    let tagsNotInThisBlock = block.getTagsNotInThisBlock();
    html = "";
    for (i = 0; i < tagsNotInThisBlock.length; i++){
        html += '<div class="popoverBoxTag" onclick="proj.blocks[' + blockId + '].addTag(' + tagsNotInThisBlock[i].id + ');">&plus; ' + tagsNotInThisBlock[i].name + '</div>';
    }
    if (html == ""){
        html += '<div class="popoverBoxTag popoverBoxTagGray" onclick="jumpToTagWindow();">Create a new tag</div>';
    }
    document.getElementById("popoverTagBox").innerHTML = html;
}
function populateTaskListBox(listId){
    console.log("Rendering list " + listId);
    let html = "";
    // Search every list to find one with a matching id
    proj.taskLists.forEach(list => {
        if (list.id == listId){
            activeTaskList = list.id;
            let checkIconPath;
            html += '<div class="popoverBoxClose" onclick="hideTaskBox();">&times;</div>';
            html += '    <input type="text" value="' + list.name + '" class="popoverBoxHeading" id="listNameField" onchange="renameActiveList();">';
            html += '    <div class="popoverBoxSubheading">Created by <i>Test User</i></div>';
            list.tasks.forEach(task => {
                if (!task.complete){
                    html += getHtmlForPopoverTaskItem(task);
                }
            });
            list.tasks.forEach(task => {
                if (task.complete){
                    html += getHtmlForPopoverTaskItem(task);
                }
            });
            html += '<div class="popoverTaskSpacer"></div>';
            html += '    <div class="popoverBoxButton" onclick="createANewTask(' + listId + ');">Add a New Task</div>';
            html += '    <div class="popoverBoxButton buttonDelete" onclick="toggleTaskPanelDelete();">Delete</div>';
            html += '    <div class="buttonConfirmationContainer" id="popoverTaskPanelDelete" style="display:none;">';
            html += '        <div class="buttonConfirmation bcLabel">Are you sure?</div>';
            html += '        <div class="buttonConfirmation bcRed" onclick="deleteTaskList(' + listId + ');">Delete</div>';
            html += '        <div class="buttonConfirmation bcGray" onclick="toggleTaskPanelDelete();">Cancel</div>';
            html += '    </div>';
        }
    });
    document.getElementById("popoverTaskList").innerHTML = html;
}
function getHtmlForPopoverTaskItem(task){
    let checkIconPath;
    let functionName;
    let html = "";
    if (!task.complete){
        checkIconPath = "./img/circleUnfilled.png";
        functionName = "processTaskCompletion";
        opacity = "1";
    } else {
        checkIconPath = "./img/checkedRadio.png";
        functionName = "processTaskUncompletion";
        opacity = "0.5";
    }
    html += '<div class="popoverTaskContainer" id="taskPopoverItem' + task.id + '">';
    html += '<div class="popoverTaskTitle" style="opacity: ' + opacity + '">';
    html += '<img src="' + checkIconPath + '" class="panelTaskCheckbox" id="taskCheckPop' + task.id + '" onclick="' + functionName + '(' + task.id + ');"> ';
    html += '<input class="popoverTaskTitleInput" placeholder="New Task" type="text" value="' + task.name + '" id="taskNamePop' + task.id + '" onchange="renameTask(' + task.id + ');">';
    html += '<input type="date" value="' + task.dueDate + '" class="popoverTaskDateAssign" id="taskDueDatePop' + task.id + '" onchange="setTaskDueDate(' + task.id + ')">';
    html += '</div>';
    html += '</div>';
    return html;
}
function populateVersionBox(){
    let block = proj.blocks[activeBlock];
    let html = "";
    console.log("Populating version box");
    for (i = 0; i < block.versions.length && i < 5; i++){
        let version = block.versions[i];
        let boldStatus = "";
        if (i === 0){
            boldStatus = "bold";
        }
        html += '<div class="popoverVersion">';
        html += '    <div class="popoverVersionDate">' + version.dateAddedString + '</div>';
        html += '    <div class="popoverVersionSize ' + boldStatus + '" onclick="toggleVersionRollback(' + version.versionNumber + ');">Version ' + version.versionNumber + '</div>';
        html += '    <div class="popoverVersionRollbackContainer" style="display:none;" id="popoverVersionRollback' + version.versionNumber + '">';
        html += '        <div class="popoverVersionRollback" onclick="rollbackToVersion(' + version.versionNumber + ');">Revert to Version ' + version.versionNumber + '</div>';
        html += '        <div class="popoverVersionRollbackCancel" onclick="toggleVersionRollback(' + version.versionNumber + ');">Cancel</div>';
        html += '    </div>';
        html += '</div>';
    }
    document.getElementById("popoverVersions").innerHTML = html;
}

function toggleTagBox(blockId){
    populateTagBox(blockId);
    $("#popoverTagBox").slideToggle(200);
}
function togglePanelDelete(){
    $("#popoverPanelDelete").fadeToggle(200);
}
function toggleTaskPanelDelete(){
    $("#popoverTaskPanelDelete").fadeToggle(200);
}
function toggleVersionRollback(versionId){
    $("#popoverVersionRollback" + versionId).slideToggle(200);
}
function closePanelDelete(){
    $("#popoverPanelDelete").fadeToggle(0);
}
function hideTagBox(){
    $("#popoverTagBox").slideUp(0);
}
function closeTagBox(){
    $("#popoverTagBox").slideUp(200);
}
function setFocusToTextBox(){
    document.getElementById("blockNameField").focus();
}
function createNewVersion(){
    let block = proj.blocks[activeBlock];
    let newVersion = block.createNewVersion();
    console.log(activeBlock);
    activeBlock = newVersion.id;
    proj.blocks[activeBlock] = newVersion;
    console.log(activeBlock);
    renderBlocks();
    populatePopover(activeBlock);
    populateVersionBox();
}
function rollbackToVersion(versionId){
    let block = proj.blocks[activeBlock];
    block.deleteEveryBlockWithAVersionHigherThanThis(versionId);
    renderBlocks();
    populatePopover(activeBlock);
    populateVersionBox();
}
function deleteBlocks(blockId){
    proj.blocks[blockId].hideBlock(); // This might be fishy, bug check
    closeShade();
    renderBlocks();
}