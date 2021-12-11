img = ""
statusVar = "";
objects = []
function preload(){
    img = loadImage("https://previews.123rf.com/images/georgejmclittle/georgejmclittle1511/georgejmclittle151100053/48215532-businessman-at-work-close-up-top-view-of-man-working-on-laptop-withtravel-agency-website-on-screene-.jpg")
}

function setup(){
    canvas = createCanvas(600, 420);
    canvas.center()

    objectDetector = ml5.objectDetector("cocosd", modelLoaded)
    document.getElementById("objectStatus").innerHTML = "Status: Detecting Objects";
}
function draw(){
    image(img, 0, 0, 640, 420);

    if(statusVar != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(img, gotResult)
        for(i = 0; i < objects.length; i++){
            document.getElementById("objectStatus").innerHTML = "Status: Object detected";
            document.getElementById("stat").innerHTML = "There are 6 objects out of which cocossd captured " + objects.length + " objects"
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    statusVar = true;
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects = results
}