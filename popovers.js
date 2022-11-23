function closeShade(){
    let shade = document.getElementById("shade");
    shade.style.display = "none";
}
function openShade(){
    let shade = document.getElementById("shade");
    shade.style.display = "block";
}
function toggleTagBox(){
    $("#popoverTagBox").slideToggle(200);
}
function togglePanelDelete(){
    $("#popoverPanelDelete").fadeToggle(200);
}
function closePanelDelete(){
    $("#popoverPanelDelete").fadeToggle(0);
}
function closeTagBox(){
    $("#popoverTagBox").slideToggle(0);
}