song = ""

function preload()
{
    song = loadSound("MEGALOVANIAPHONK.mp3")
}

scoreRightWrist = 0
scoreLeftWrist = 0
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0

function setup()
{
    canvas = createCanvas(500,500);
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded()
{
    console.log('PoseNet Is Inicialized')
}

function gotPoses(results)
{
    if(results.lenght > 0)
    {
        console.log(results)
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);
    }
}

function play()
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function draw()
{
    image(video, 0, 0, 500, 500);
    fill("blue");
    stroke("aliceblue");
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20)
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "velocidade = 0.5x"
            song.rate(0.5)
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "velocidade = 1x"
            song.rate(1)
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "velocidade = 1.5x"
            song.rate(1.5)
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "velocidade = 2x"
            song.rate(2)
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "velocidade = 2.5x"
            song.rate(2.5)
        }
        else if(rightWristY > 500)
        {
            document.getElementById("speed").innerHTML = "velocidade = 3x"
            song.rate(3)
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500
        document.getElementById("volume").innerHTML = "volume = " + volume
        song.setVolume(volume)
    }
}
