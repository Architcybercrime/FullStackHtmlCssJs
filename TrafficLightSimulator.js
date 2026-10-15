


// use an if/else to log "Stop",slow down", or "Go" based on the value of a variable storing the color of a traffic light
var trafficLightColor = "red";    
var message;
if (trafficLightColor === "red") {
    message = "Stop";
}
else if (trafficLightColor === "yellow") {
    message = "Slow down";
}       
    else {
        message = "Go";
    }
console.log(message);