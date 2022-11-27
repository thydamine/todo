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
        let nameOfPerson = this.personChanged;
        let nameOfPersonHtml = "<b>" + nameOfPerson + "</b>";
        switch(this.changeType){
            case "EDIT":
                desc = nameOfPersonHtml + " edited " + this.itemChanged.name;
                break;
            case "ADD":
                desc = nameOfPersonHtml + " added " + this.itemChanged.name;
                break;
            case "DELETE":
                desc = nameOfPersonHtml + " deleted " + this.itemChanged.name;
                break;
            case "ASSIGN": 
                desc = nameOfPersonHtml + " was assigned to " + this.itemChanged.name;
                break;
        }
        return desc;
    }
    changeType;
    personChanged;
    time = new Date();
}
const validFeedTypes = ["EDIT", "ADD", "DELETE", "ASSIGN"];