/**
 * Container class for a user of the app. These are functionally "group members"
 */
class Person {
    constructor(name, color){
        this.id = latestId++;
        this.name = name;
        this.color = color;
    }
}
/**
 * Individual messages that appear in the discussion panel. Person / message
 * combination.
 */
class ChatMessages {
    constructor(person, message = "Lorem Ipsum dolor sit amet"){
        this.person = person;
        this.message = message;
    }
}

/**
 * Generates a block of HTML with a message inside it.
 * @param {string} messageId - The internal id of the message you're printing
 */
function getHtmlForMessage(messageId, incoming = true){
    // Make a bunch of aliases, the HTML is hard enough to read as-is.
    let html = '<div class="panelChatFrame">';
    let personId = projects[currentProject].chatMessages[messageId].person;
    let person = projects[currentProject].people[personId];
    let color = person.color;
    let messageText = projects[currentProject].chatMessages[messageId].message;
    if (!incoming){
        html += '<div class="panelChatMessageBox" style="text-align: left">';
        html += '<div class="panelChatIcon" style="background-color: ' + color
        html += '; left: inherit; right:0;"></div><div class="panelChatMessage">';
        html += messageText + '</div></div>';
    } else {
        html += '<div class="panelChatMessageBox"><div class="panelChatMessage">';
        html += messageText + '</div><div class="panelChatIcon" style="background-color: ';
        html += color + '"></div></div>';
    }
    
    html += '</div>';

    return html;
}

/**
 * Takes the internal data for messages and renders them out to the discussion
 * panel. Note that the discussion panel overwrites all content when activated,
 * so this needs to always be run on-toggle or content won't appear.
 */
function renderChatMessages(){
    let fullHtml = '<div style="display: block">';
    for (let i = 0; i < projects[currentProject].chatMessages.length; i++){
        if (myUserId === projects[currentProject].chatMessages[i].person){
            fullHtml += getHtmlForMessage(i, false);
        } else {
            fullHtml += getHtmlForMessage(i);
        }
    }
    fullHtml += '</div>';
    document.getElementById("chatContainer").innerHTML = fullHtml;
}