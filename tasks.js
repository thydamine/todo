/**
 * Format for a list of tasks in the Tasks panel
 */
class TaskList {
    constructor(name = "New List"){
        this.name = name;
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
}
/**
 * Format for a specific task item, can be assigned or marked as completed.
 */
class Task {
    constructor(name = "New Task"){
        this.name = name;
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
}
