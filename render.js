/**
 * Changes the main panel content
 * @param {*} panelName Takes a name (discussion, tasks, or tags)
 */
function populatePanel(panelIndex){
    let title = panels[panelIndex].title;
    let iconPath = panels[panelIndex].iconPathColor;
    let titleHtml = "<img src='" + iconPath + "' class='panelHeadingIcon'>";
    titleHtml += title;

    document.getElementById("panelHeading").innerHTML = titleHtml;

    if (panelIndex === 0){
        document.getElementById("panelContentParent").innerHTML = getHtmlForDiscussion();
        renderChatMessages();
    }
    if (panelIndex === 1){
        document.getElementById("panelContentParent").innerHTML = getHtmlForTasks();
    }
    if (panelIndex === 2){
        document.getElementById("panelContentParent").innerHTML = getHtmlForTags();
    }
}
/**
 * Generates HTML code that can be injected into the panel DOM element
 * @returns String containing HTML for the discussion panel
 */
function getHtmlForDiscussion(){
    let html = "";
    html += '<div class="panelChatContainer" id="chatContainer">';
        html += '<div class="panelChatMessageBox">';
            html += '<div class="panelChatIcon chatLeft"></div>';
            html += '<div class="panelChatMessage chatRight">';
                html += 'Text content up in here.</div></div></div>';
    html += '<div class="panelChatInputContainer">';
    html += '<input type="text" placeholder="Type a Message..." class="panelChatInput">';
    html += '<input type="button" class="panelChatButton" value="Send"></div>';
    return html;
}
/**
 * Generates HTML for the entire hierarchy of tasks
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForTasks(){
    let html = "";
    html += '<div class="panelTasksContainer">';
    for (let i = 0; i < projects[currentProject].numberOfTaskLists; i++){
        let list = projects[currentProject].taskLists[i];
        html += '<div class="panelTasksList">';
        html += getHtmlForTaskList(i);
        html += '</div>';
    }
    html += '</div>';

    return html;
}
/**
 * Generates HTML for a To-Do list
 * @param {int} listIndex Unique ID that identifies the list within the project
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForTaskList(listIndex){
    let html = "";
    let title = proj.taskLists[listIndex].name; 
    let list = proj.taskLists[listIndex].tasks;

    html += '<div class="panelTasksHeader">';
    html += title;
    html += '</div>';
    html += '<div id="">';
    for (let i = 0; i < list.length; i++){
        html += getHtmlForTaskItem(listIndex, i);
    }
    html += '</div>';
    return html;
}
/**
 * Generates HTML for a specific To-Do list item
 * @param {int} listIndex Unique ID that identifies the list within the project
 * @param {int} taskIndex Unique ID that identifies the task within the list
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForTaskItem(listIndex, taskIndex){
    console.log(listIndex, taskIndex);
    let item = proj.taskLists[listIndex].tasks[taskIndex];
    let checkIconPath = "./img/circleUnfilled.png";
    let html = "";
    html += '<div class="panelTaskContainer">';
        html += '<img src="' + checkIconPath + '" class="panelTaskCheckbox">';
        html += '<div class="panelTaskItem">';
            html += item.name;
        html += '</div>';
    html += '</div>';
    return html;
}
/**
 * Generates HTML for the tag panel
 * @returns HTML code string that can be sent to the DOM
 */
 function getHtmlForTags(){
    let html = "";
    for (let i = 0; i < projects[currentProject].tags.length; i++){
        let tag = projects[currentProject].tags[i];
        html += '<div class="panelTagsTagCore">' + tag.name + '</div>';
    }

    return html;
}


populatePanel(currentPanelState);