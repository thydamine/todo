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
        } else {
            panelBounceOut(10);
        }
      });
}
/**
 * Pulls the panel in slightly upon close to give a bounce effect
 * @param {int} intensity how far the panel bounces on close (in px)
 */
function panelBounceIn(intensity){
    $( "#panel" ).animate({
        left: panelClosedPos - intensity,
      }, 30, function() {
        $( "#panel" ).animate({
            left: panelClosedPos,
          }, 300, function() {});
      });
}
/**
 * Pushes the panel outward slightly upon close to give a bounce effect
 * @param {int} intensity how far the panel bounces beyond the maximum (in px)
 */
function panelBounceOut(intensity){
    $( "#panel" ).animate({
        left: -1 * intensity,
      }, 100, function() {
        $( "#panel" ).animate({
            left: 0,
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