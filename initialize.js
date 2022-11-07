/* Initialize a few defaults */
let currentProject = 0;
let myUserId = 5;
let currentPanelState = 0; // 0: Discussions, 1: Tasks, 2: Tags

/* Create a new list of projects, add a sample project to it */
let projects = [];
projects.push(new Project("3020 Group Project"));
let proj = projects[currentProject];

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
proj.addTaskList("Milestone 3 Summary");

/* Put some tasks on those lists */
proj.taskLists[0].newTask("Set up GitHub repo");
proj.taskLists[0].newTask("Finish panels");
proj.taskLists[0].newTask("Add file sharing area");

proj.taskLists[1].newTask("First draft of overall summary");

/* Populate a few tags */

proj.addTag("Essay");
proj.addTag("Code");
proj.addTag("Important");
proj.addTag("Milestone 3");
proj.addTag("Needs Editing");

/* Send all that data out to the console so that we can investigate */
console.log(projects);