let panelState = 1;
let notifState = -1;
const panelClosedPos = -360;

/**
 * Changes panel state from open to closed
 */
function panelToggle(){
    let panelPos = 0;
    if (panelState === 1){
        panelPos = panelClosedPos;
    } else {
        panelPos = 0;
    }
    
    panelMove(panelPos);

    panelState *= -1;
}
/**
 * Moves the panel element to the given x position
 * @param {int} position Desired x position of the panel
 */
function panelMove(position, panelid = "panel"){
    let slideTime = 200;
    let anchor = "left";
    let localState = panelState;

    if (panelid === "notificationPanel"){
        anchor = "right";
        localState = notifState;
    }

    $( "#" + panelid ).animate({
        [anchor]: position,
      }, slideTime, function() {
        if (localState === 1){
            panelBounceIn(20, panelid, anchor);
        } else {
            panelBounceOut(10, panelid, anchor);
        }
      });
}
/**
 * Pulls the panel in slightly upon close to give a bounce effect
 * @param {int} intensity how far the panel bounces on close (in px)
 */
function panelBounceIn(intensity, panelid = "panel", anchor = "left"){
    $( "#" + panelid ).animate({
        [anchor]: panelClosedPos - intensity,
      }, 30, function() {
        $( "#" + panelid ).animate({
            [anchor]: panelClosedPos,
          }, 300, function() {});
      });
}
/**
 * Pushes the panel outward slightly upon close to give a bounce effect
 * @param {int} intensity how far the panel bounces beyond the maximum (in px)
 */
function panelBounceOut(intensity, panelid = "panel", anchor = "left"){
    $( "#" + panelid ).animate({
        [anchor]: -1 * intensity,
      }, 100, function() {
        $( "#" + panelid ).animate({
            [anchor]: 0,
          }, 200, function() {});
      });
}
/**
 * Moves the panel to the base (open) position
 */
function panelOpen(){
    panelMove(0);
    panelState = 1;
}

function toggleNotificationPane(){
    let panelPos = 0;
    if (notifState === 1){
        panelPos = panelClosedPos;
    } else {
        panelPos = 0;
    }
    
    panelMove(panelPos, "notificationPanel");

    notifState *= -1;
}
