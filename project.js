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

    addPerson(person){
        this.people.push(person);
    }
    addMessage(sender, messageText){
        this.chatMessages.push(new ChatMessages(sender, messageText));
    }
    getChatList(){
        return this.chatMessages;
    }
    addTaskList(){
        console.log("Adding a new task list (" + this.taskLists.length + " before this)");
        this.taskLists.push(new TaskList());
    }
    get numberOfTaskLists() {
        return this.taskLists.length;
    }
}

// Common data for each panel, this never really changes.
let panels = [];
panels[0] = {
    title: "Discussions",
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