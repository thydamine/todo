/**
 * Project is a container for the entire group data package (chat, tasks, and files)
 */
class Project {
    constructor(name){
        this.name = name;
    }
    name;
    people = [];
    chatMessages = [];
    taskLists = [];
    tags = [];
    blocks = [];
    activityFeed = [];

    addPerson(person){
        this.people.push(person);
    }
    addMessage(sender, messageText){
        this.chatMessages.push(new ChatMessages(sender, messageText));
    }
    getChatList(){
        return this.chatMessages;
    }
    addTaskList(name){
        this.taskLists.push(new TaskList(name));
    }
    addTag(name){
        this.tags.push(new Tag(name));
    }
    addBlock(name, path){
        this.blocks.push(new Block(name, path));
    }
    addActivityFeedItem(changeType, personChanged){
        this.activityFeed.push(new ActivityFeedItem(changeType, personChanged));
    }
    get numberOfTaskLists() {
        return this.taskLists.length;
    }
}

// Common data for each panel, this never really changes.
let panels = [];
panels[0] = {
    title: "Discussion",
    iconPath: "./img/chat.png",
    iconPathColor: "./img/colored/chat.png",
    color: "#4bbe5e" // Green
};
panels[1] = {
    title: "Tasks",
    iconPath: "./img/circleCheck.png",
    iconPathColor: "./img/colored/circleCheck.png",
    color: "#1eaef8"
}
panels[2] = {
    title: "Tags",
    iconPath: "./img/tag.png",
    iconPathColor: "./img/colored/tag.png",
    color: "#1eaef8"
}