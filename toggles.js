let panelState = 1;
let notifState = -1;
const panelClosedPos = -360;

/**
 * Changes panel state from open to closed
 */
function panelToggle(){
    let panelPos = 0;
    if (panelState === 1){
        document.getElementById("chevron").src = "./img/chevronRight.png";
        panelPos = panelClosedPos;
        renderPanelShade(false);
    } else {
        document.getElementById("chevron").src = "./img/chevronLeft.png";
        panelPos = 0;
        renderPanelShade(true);
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
    document.getElementById("chevron").src = "./img/chevronLeft.png";
    renderPanelShade(true);
}
/**
 * Opens and closes the notification panel
 */
function toggleNotificationPane(){
    let panelPos = 0;
    if (notifState === 1){
        // It's open, close it
        panelPos = panelClosedPos;
        renderNotifShade(false);
    } else {
        // It's closed, open it
        panelPos = 0;
        renderNotifShade(true);
    }
    
    panelMove(panelPos, "notificationPanel");

    notifState *= -1;
}
function renderPanelShade(boolean){
    if (boolean){
        document.getElementById("panelShade").style = "display: block";
    } else {
        document.getElementById("panelShade").style = "display: none";
    }
}
function renderNotifShade(boolean){
    if (boolean){
        document.getElementById("notificationShade").style = "display: block";
    } else {
        document.getElementById("notificationShade").style = "display: none";
    }
}
function iconToClosePanel(clickedIcon){
    console.log("######");
    console.log("Clicked icon: " + clickedIcon);
    console.log("Panel state: " + panelState);
    console.log("Current Panel State: " + currentPanelState);

    if (clickedIcon === currentPanelState && panelState == 1){
        panelToggle();
    } else {
        populatePanel(clickedIcon);
    }
}