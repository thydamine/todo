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
    console.log(projects[currentProject].numberOfTaskLists);
    for (let i = 0; i < projects[currentProject].numberOfTaskLists; i++){
        console.log("iteration " + i);
        let list = projects[currentProject].taskLists[i];
        html += '<div class="panelTasksList">';
        html += list.name;
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
    // Loop through a bunch of tasks
    return html;
}
/**
 * Generates HTML for a specific To-Do list item
 * @param {int} listIndex Unique ID that identifies the list within the project
 * @param {int} taskIndex Unique ID that identifies the task within the list
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForTaskItem(listIndex, taskIndex){
    let html = "";
    
    return html;
}

populatePanel(currentPanelState);