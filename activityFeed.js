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
        return (type == "EDIT" || type == "ADD" || type == "DELETE" || type == "ASSIGN");
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
    }
    changeType;
    personChanged;
    time = new Date();
}