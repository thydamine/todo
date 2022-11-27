/* Initialize a few defaults */
let currentProject = 0;
let myUserId = 5;
let currentPanelState = 0; // 0: Discussions, 1: Tasks, 2: Tags
let panelOpenDefault = false;

/* Which elements are we currently looking at? */
let activeBlock = 0;
let activeTaskList = 0;

/* Create a new list of projects, add a sample project to it */
let projects = [];
projects.push(new Project("3020 Group Project"));
let proj = projects[currentProject];

/* Create an array of test file names */
let nameArray = [];
nameArray.push("Project Proposal");
nameArray.push("Project Report");
nameArray.push("Project Presentation");
nameArray.push("Project Video");
nameArray.push("Project Code");
nameArray.push("Project Poster");
nameArray.push("Project Presentation");

/* Add some canned people to the project */
let latestId = 0;
proj.addPerson(new Person("May Chen",        "#d2c68d"));
proj.addPerson(new Person("Karen Idoko",     "#4bbe5e"));
proj.addPerson(new Person("Trevor Neudorf",  "#1eaef8"));
proj.addPerson(new Person("Brendan Schacht", "#c2c7cb"));
proj.addPerson(new Person("Dhvani Thakkar",  "#4aafa5"));
proj.addPerson(new Person("Test User",       "#ff2f6c"));

/* Add some messages from those people */
proj.addMessage(0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
proj.addMessage(5, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
proj.addMessage(2, "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
proj.addMessage(1, "Duis aute.");
proj.addMessage(1, "Irure dolor.");
proj.addMessage(3, "voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
proj.addMessage(4, "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
proj.addMessage(5, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
proj.addMessage(2, "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
proj.addMessage(4, "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

/* Create a few lists that we can use in examples */
proj.addTaskList("Write App");
proj.addTaskList("Grade Milestone 3");

/* Add some blocks to the Blackboard */
proj.addBlock("Summary");
proj.addBlock("Contract");
proj.addBlock("Q3 Footnotes");
proj.addBlock("General Notes");
proj.addBlock("Meeting Minutes");
proj.addBlock("Group Ideas");
proj.addBlock("Friday Meeting Outline");
proj.addBlock("Function Prototypes");

/* Put some tasks on those lists */
proj.taskLists[0].newTask("Set up GitHub repo");
proj.taskLists[0].newTask("Finish panels");
proj.taskLists[0].newTask("Add file sharing area");

proj.taskLists[1].newTask("Be nice to Group 18");
proj.taskLists[1].newTask("They tried really hard");

/* Populate a few tags */

proj.addTag("Essay");
proj.addTag("Code");
proj.addTag("Important");
proj.addTag("Milestone 3");
proj.addTag("Needs Editing");

proj.addActivityFeedItem("EDIT", 3);
proj.addActivityFeedItem("ADD", 0);
proj.addActivityFeedItem("DELETE", 5);
proj.addActivityFeedItem("ASSIGN", 1);
proj.addActivityFeedItem("EDIT", 2);
proj.addActivityFeedItem("EDIT", 4);

function createRandomBlock(){
    let block = new Block(nameArray[Math.floor(Math.random() * nameArray.length)]);
    proj.addBlock(block.name);
    renderBlocks();
}
function createBlock(){
    let string = document.getElementById("fileInput").value;
    let stringFormatted = string.split("\\");
    console.log(string);
    console.log(stringFormatted);
    let block = new Block(stringFormatted.pop());
    proj.addBlock(block.name);
    renderBlocks();
}

/* Send all that data out to the console so that we can investigate */
console.log(projects);