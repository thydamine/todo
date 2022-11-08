let panelState = 1;

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
function panelMove(position){
    $( "#panel" ).animate({
        left: position,
      }, 200, function() {
        
      });
}
function panelOpen(){
    panelMove(0);
    panelState = 1;
}