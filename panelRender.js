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
        // Discussion
        document.getElementById("panelContentParent").innerHTML = getHtmlForDiscussion();
        renderChatMessages();
    }
    if (panelIndex === 1){
        // Tasks
        document.getElementById("panelContentParent").innerHTML = getHtmlForTasks();
    }
    if (panelIndex === 2){
        // Tags
        document.getElementById("panelContentParent").innerHTML = getHtmlForTags();
    }

    // Change the content of the panel to reflect the chosen state
    updateSidebarState(panelIndex);

    if (panelState === -1){
        // We don't want stuff to bounce if the panel's already open.
        panelOpen();
    }
}
/**
 * Re-renders sidebar items to reflect currently-selected state
 * @param {*} stateId ID of the current panel state (0: Discussions, 1: Tasks,
 * 2: Tags)
 */
function updateSidebarState(stateId){
    for (let i = 0; i < 3; i++){
        if (i === stateId){
            document.getElementById("iconTab" + i).style = "background-color: var(--darkerBG)";
            document.getElementById("tabImg" + i).src = "./img/colored/" + i + ".png";
        } else {
            document.getElementById("iconTab" + i).style = "background-color: var(--lightBG)";
            document.getElementById("tabImg" + i).src = "./img/" + i + ".png";
        }
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
    for (let i = 0; i < projects[currentProject].numberOfTaskLists; i++){
        let list = projects[currentProject].taskLists[i];
        html += '<div class="panelTasksList">';
        html += getHtmlForTaskList(i);
        html += '</div>';
    }

    return html;
}
/**
 * Generates HTML for a To-Do list
 * @param {int} listIndex Unique ID that identifies the list within the project
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForTaskList(listIndex){
    let html = "";
    let title = proj.taskLists[listIndex].nameShortened; 
    let list = proj.taskLists[listIndex].tasks;

    html += '<div class="panelTasksHeader" onclick="showTaskBox(' + proj.taskLists[listIndex].id + ')">';
    html += title;
    html += '</div>';
    html += '<div id="">';
    for (let i = 0; i < list.length; i++){
        html += getHtmlForTaskItem(listIndex, i);
    }
    html += '</div>';

    html += '<div class="buttonContainer">';
    html += '<div class="button" id="plusTag" onclick="createANewList();">+</div>';
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
    let item = proj.taskLists[listIndex].tasks[taskIndex];
    if (item.complete){
        return "";
    }
    let checkIconPath = "./img/circleUnfilled.png";
    let html = "";
    html += '<div class="panelTaskContainer" id="taskPanelItem' + item.id + '">';
        html += '<img src="' + checkIconPath + '" class="panelTaskCheckbox" id="taskCheck' + item.id + '" onclick="processTaskCompletion(' + item.id + ');">';
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
    projects[currentProject].tags.forEach(tag => {
        html += '<div class="panelTagsTagCore"><span onclick="deleteTagById(' + tag.id + ')" style="cursor:pointer">&times;</span>';
        html += '<input type="text" class="panelTagsInput" id="tagLabel' + tag.id + '" value="' + tag.name + '" onchange="updateTagLabel(' + tag.id + ');"></div>';
        html += '</div>';
    });
    html += '<div class="buttonContainer">';
    html += '<div class="button" id="plusTag" onclick="createANewTag();">+</div>';
    html += '</div>';

    return html;
}
/**
 * Generates HTML for the due tasks section of the activity feed
 * @returns HTML code string that can be sent to the DOM
 */
function getHtmlForDueTasks(){
    let html = "";
    let concatLength = 30;
    html += '<div class="panelNotificationSubheading">Due Tasks</div>';
    for (let i = 0; i < projects[currentProject].tasks.length; i++){
        let task = projects[currentProject].tasks[i];

        // Shorten the task name
        let taskName = task.name;
        if (taskName.length > concatLength){
            taskName = taskName.substring(0, concatLength) + "...";
        }

        let ONE_DAY_IN_MS = 86400000;
        if (task.dueDate < Date.now() - ONE_DAY_IN_MS){
            html += '<div class="panelDueTaskContainer">';
                html += '<div class="panelDueTaskTitle">' + taskName;
                html += '<div class="panelDueTaskDate">' + task.dueDateString + '</div>';
                html += '</div>';
            html += '</div>';
        }
    }
    return html;
}
function getHtmlForActivityFeed(){
    let html = "";
    let topMargin = 30;
    html += '<div class="panelNotificationSubheading" style="margin-top:' + topMargin + 'px">Activity Feed</div>';
    let activity = projects[currentProject].activityFeed;
    for (let i = 0; i < activity.length; i++){
        let item = activity[i];
        html += '<div class="panelActivityItem">';
        html += '<div class="panelActivityIcon"></div>';
        html += '<div class="panelActivityText">';
        html += item.description;
        html += '</div></div>';
    }
    return html;
}
function renderActivityFeed(){
    let html = "";
    html += '<div class="panelNotificationsContainer">';
    html += getHtmlForDueTasks();
    html += getHtmlForActivityFeed();
    html += '</div>';
    document.getElementById("notificationPanel").innerHTML = html;
}
// Do an initial render of the panel
populatePanel(currentPanelState);
if (!panelOpenDefault){
    // If the panel is closed by default, close it.
    panelToggle();
}

// Do an initial render of the activity feed
renderActivityFeed();