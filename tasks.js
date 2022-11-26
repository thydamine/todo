/**
 * Format for a list of tasks in the Tasks panel
 */
class TaskList {
    constructor(name = "New List"){
        this.name = name;
        this.id = proj.taskLists.length;
    }

    tasks = [];
    tags = [];

    newTask(name){
        this.taskCount++;
        this.tasks.push(new Task(name));
    }
    getNumberOfTasks(){
        return this.tasks.length;
    }
    rename(name){
        this.name = name;
    }
    delete(){
        deleteChildTasks();
        let index = proj.tasks.indexOf(this);
        proj.tasks.splice(index, 1);
    }
    deleteChildTasks(){
        this.tasks.forEach(task => {
            task.deleteTask();
        });
    }
    appendTag(tagId){
        let tagToAdd;
        proj.tags.forEach(tag => {
            if (tag.id == tagId){
                tagToAdd = tag;
            }
        });
        this.tags.push(tagToAdd);
    }
    removeTag(tagId){
        let index = this.tags.indexOf(tagId);
        this.tags.splice(index, 1);
    }
    get numberOfTasks(){
        return this.tasks.length;
    }
    get nameShortened(){
        if (this.name.length > 20){
            return this.name.slice(0, 15) + "...";
        }
        return this.name;
    }
    rename(newName){
        this.name = newName;
    }
}
/**
 * Format for a specific task item, can be assigned or marked as completed.
 */
class Task {
    constructor(name = "New Task", parentId = null){
        this.name = name;
        this.id = generateUniqueTaskId();
        this.complete = false;
        this.parentId = parentId;
    }
    complete = false;
    dueDate = 0; // Unix Timestamp
    assignment = null;

    assign(person){
        this.assignment = person;
    }
    setDueDate(dueDateTimestamp){
        this.dueDate = dueDateTimestamp;
    }
    get dueDateString(){
        let date = new Date(this.dueDate);
        // cut the last 5 characters from a string
        return date.toLocaleDateString().slice(0, -5);
    }
    markComplete(){
        this.complete = true;
    }
    markIncomplete(){
        this.complete = false;
    }
    rename(newName){
        this.name = newName;
    }
    deleteTask(){
        let index = proj.tasks.indexOf(this);
        proj.tasks.splice(index, 1);
    }
    get nameShortened(){
        if (this.name.length > 25){
            return this.name.slice(0, 15) + "...";
        }
        return this.name;
    }
}

function createANewList(){
    let newList = new TaskList();
    newList.name = "New List";
    newList.newTask("New Task");
    proj.taskLists.push(newList);
    populatePanel(1);
}
function processTaskCompletion(taskId){
    // Search every task list for a task that matches the id
    console.log("Processing task completion for task " + taskId);
    proj.taskLists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.id == taskId){
                console.log("Found task " + taskId);
                document.getElementById("taskCheck" + taskId).src="./img/checkedRadio.png";
                document.getElementById("taskCheckPop" + taskId).src="./img/checkedRadio.png";
                task.markComplete();
                $( "#taskPanelItem" + taskId ).delay( 2000 ).fadeOut( 300 , function() {
                    //populatePanel(1); // May not be necessary?
                });
                $( "#taskPopoverItem" + taskId ).delay( 2000 ).fadeOut( 300 , function() {
                    // Rerender the popover
                    proj.taskLists.forEach(list => {
                        list.tasks.forEach(task => {
                            if (task.id == taskId){
                                populateTaskListBox(list.id);
                            }
                        });
                    });
                });
            }
        });
    });
    
    //populatePanel(1);
}
function processTaskUncompletion(taskId){
    // Search every task list for a task that matches the id
    console.log("Processing task uncompletion for task " + taskId);
    let listId;
    proj.taskLists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.id == taskId){
                console.log("Found task " + taskId);
                task.markIncomplete();
                listId = list.id;
            }
        });
    });
    populatePanel(1);
    populateTaskListBox(listId);
}
function generateUniqueTaskId(){
    let id = Math.floor(Math.random() * 1000000);
    let idIsUnique = true;
    proj.tasks.forEach(task => {
        if (task.id == id){
            idIsUnique = false;
        }
    });
    if (idIsUnique){
        return id;
    } else {
        return generateUniqueTaskId();    
    }
}
function renameTask(taskId){
    let listId;
    let newName = document.getElementById("taskNamePop" + taskId).value;
    proj.taskLists.forEach(list => {
        list.tasks.forEach(task => {
            if (task.id == taskId){
                listId = list.id;
                task.rename(newName);
            }
        });
    });
    populatePanel(1);
    populateTaskListBox(listId);
}