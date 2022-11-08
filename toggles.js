let panelState = 1;

/**
 * Changes panel state from open to closed
 */
function panelToggle(){
    let panelPos = 0;
    if (panelState === 1){
        panelPos = -360;
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
        
      });
}
/**
 * Moves the panel to the base (open) position
 */
function panelOpen(){
    panelMove(0);
    panelState = 1;
}