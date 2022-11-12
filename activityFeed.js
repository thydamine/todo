/**
 * Items that appear in the activity feed, below the To-Do list.
 */
class ActivityFeedItem {
    constructor(changeType, personChanged, itemChanged = null){
        this.changeType = changeType;
        this.personChanged = personChanged;
        this.itemChanged = itemChanged;
    }

    isTypeValid(type){
        return validFeedTypes.includes(type);
    }
    set changeType(type){
        if(this.isTypeValid(type)){
            this._changeType = type;
        } else {
            console.log("Invalid change type");
        }
    }
    get changeType(){
        return this._changeType;
    }
    get description(){
        let desc = "";
        let nameOfPerson = proj.people[this.personChanged].name;
        let nameOfPersonHtml = "<b>" + nameOfPerson + "</b>";
        switch(this.changeType){
            case "EDIT":
                desc = nameOfPersonHtml + " edited " + this.itemChanged;
                break;
            case "ADD":
                desc = nameOfPersonHtml + " added " + this.itemChanged;
                break;
            case "DELETE":
                desc = nameOfPersonHtml + " deleted " + this.itemChanged;
                break;
            case "ASSIGN": 
                desc = nameOfPersonHtml + " was assigned to " + this.itemChanged;
                break;
        }
        return desc;
    }
    changeType;
    personChanged;
    time = new Date();
}
const validFeedTypes = ["EDIT", "ADD", "DELETE", "ASSIGN"];