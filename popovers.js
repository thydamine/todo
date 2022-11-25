function closeShade(){
    let shade = document.getElementById("shade");
    shade.style.display = "none";
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
    populateVersionBox();
    populateTagBox(blockId);
}
function populateTagBox(blockId){
    let block = proj.blocks[blockId];
    let html = "";
    for (i = 0; i < block.tags.length; i++){
        let tag = block.tags[i];
        html += '<div class="popoverBoxTag" onclick="proj.blocks[' + blockId + '].removeTag(' + tag.id + ')">&times; ' + block.tags[i].name + '</div>';
    }
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