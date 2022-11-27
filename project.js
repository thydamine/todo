/**
 * Project is a container for the entire group data package (chat, tasks, and files)
 */
class Project {
    constructor(name){
        this.name = name;
        this.id = projects.length;
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
    addActivityFeedItem(changeType, itemChanged, personChanged = "Test User"){
        this.activityFeed.push(new ActivityFeedItem(changeType, personChanged, itemChanged));
    }
    addTaskList(name){
        console.log("Is this firing?");
        let newList = new TaskList(name);
        this.taskLists.push(newList);
        //this.addActivityFeedItem("ADD", "Test User", newList);
    }
    addTag(name){
        this.tags.push(new Tag(name));
    }
    addBlock(name, path){
        // Add an activity feed item
        let newBlock = new Block(name, path);
        this.blocks.push(newBlock);
        //this.addActivityFeedItem("ADD", 0, newBlock);
    }
    addActivityFeedItem(changeType, personChanged, item){
        this.activityFeed.push(new ActivityFeedItem(changeType, personChanged, item));
    }
    get numberOfTaskLists() {
        return this.taskLists.length;
    }
    get tasks() {
        let tasks = [];
        this.taskLists.forEach(list => {
            tasks = tasks.concat(list.tasks);
        });
        return tasks;
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