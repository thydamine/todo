let panelState = 1;
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
function panelMove(position){
    $( "#panel" ).animate({
        left: position,
      }, 200, function() {
        if (panelState === -1){
            panelBounceIn(20);
        }
      });
}
function panelBounceIn(intensity){
    $( "#panel" ).animate({
        left: panelClosedPos - intensity,
      }, 30, function() {
        $( "#panel" ).animate({
            left: panelClosedPos,
          }, 300, function() {});
      });
}
function panelBounceOut(intensity){
    $( "#panel" ).animate({
        left: intensity,
      }, 30, function() {
        $( "#panel" ).animate({
            left: 0,
          }, 300, function() {});
      });
}
/**
 * Moves the panel to the base (open) position
 */
function panelOpen(){
    panelMove(0);
    panelState = 1;
}