function closeShade(){
    let shade = document.getElementById("shade");
    shade.style.display = "none";
}
function openShade(){
    $("#shade").fadeToggle(200);
}

function populatePopover(blockId){
    // Establish that this block is the active block
    activeBlock = blockId;

    let block = proj.blocks[blockId];
    let html = "";

    html += '<div class="popoverBoxClose" onclick="closeShade();">&times;</div>';
    html += '<img src="img/placeholder.png" class="popoverFileThumbnail">';
    html += '<div class="popoverBoxContent">';
    html += '    <input type="text" value="' + block.name + '" class="popoverBoxHeading" id="blockNameField" onchange="renameActiveBlock()">';
    html += '    <div class="popoverBoxSubheading">' + block.dateAddedString + '</div>';
    html += '    <div class="popoverBoxTags" id="popoverTagContainer">';
    html += '        <div class="popoverBoxTag">&times; Tag 1</div>';
    html += '        <div class="popoverBoxTag">&times; Tag 2</div>';
    html += '        <div class="popoverBoxTag">&times; Tag 3</div>';
    html += '        <div class="popoverBoxTag popoverBoxTagGray" onclick="toggleTagBox(' + blockId + ');">&plus; New Tag</div>';
    html += '    </div>';
    html += '    <div class="popoverBoxNewTags" id="popoverTagBox" style="display:none;"><div class="popoverBoxTag">&plus; Tag 1</div></div>';
    html += '    <div class="popoverBoxButton">Download (' + block.fileSizeString + ')</div>';
    html += '    <div class="popoverBoxButton" onclick="setFocusToTextBox();">Rename</div>';
    html += '    <div class="popoverBoxButton buttonDelete" onclick="togglePanelDelete();">Delete File</div>';
    html += '    <div class="buttonConfirmationContainer" id="popoverPanelDelete" style="display:none;">';
    html += '        <div class="buttonConfirmation bcLabel">Are you sure?</div>';
    html += '        <div class="buttonConfirmation bcRed">Delete</div>';
    html += '        <div class="buttonConfirmation bcGray">Cancel</div>';
    html += '    </div>';
    html += '</div>';

    document.getElementById("popoverBlock").innerHTML = html;

    openShade();
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

function toggleTagBox(blockId){
    populateTagBox(blockId);
    $("#popoverTagBox").slideToggle(200);
}
function togglePanelDelete(){
    $("#popoverPanelDelete").fadeToggle(200);
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
