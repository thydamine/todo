/* Initialize a few defaults */
let currentProject = 0;
let myUserId = 5;
let currentPanelState = 1; // 0: Discussions, 1: Tasks, 2: Tags

/* Create a new list of projects, add a sample project to it */
let projects = [];
projects.push(new Project("3020 Group Project"));
let proj = project[currentProject];

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

proj.addTaskList();
proj.addTaskList();

proj.taskLists[0].newTask();
proj.taskLists[0].newTask();
proj.taskLists[0].newTask();

proj.taskLists[1].newTask();

/* Send all that data out to the console so that we can investigate */
console.log(projects);