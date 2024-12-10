let time = 0; //Time variable 
let sunX = 55; //X position of the sun 
let sunY = 200; //Initial Y position of the sun
let moonX = 600; //X position of the moon 
let moonY = 400; //Initial Y position of the moon 
let skyColor; //Variable to store the color of the sky
let stars = []; //star pos3itions and twinkle effect

let scaleFactor1 = 1;
let scaleFactor2 = 1;
let scaleFactor3 = 1;
let scaleFactor4 = 1;
let scaleFactor5 = 1;
let scaleFactor6 = 1;
let circleX = 320;
let circleDirection = 1;
let stopCircle = false;
let tireRotation = 0;
let lightColor;
let dashOffset = 0
let roseScale = 0
let cloudX = -100; //initial X - clouds
let birdX = 1000;
let crowX = 180;
let crowY = 280;
let crowMoved = false;


// Urdu text 1
let textX1 = 340;
let textY1 = 445;
let textWidth1 = 250; 
let textHeight1 = 20; 

// Urdu text 2
let textX2 = 590;
let textY2 = 445;
let textWidth2 = 250; 
let textHeight2 = 20; 


function setup() {
  createCanvas(1000, 1000);
  noStroke();
  
    // star positions at random
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2), // 
      brightness: random(100, 255) // Random 
    });
  }
  
}

function draw() {
  background(173, 216, 230); // Light blue background

// day to night - Sky transition
  let r = map(time, 0, 300, 173, 25); // Red from light blue to dark blue
  let g = map(time, 0, 300, 216, 25); // Green from light blue to dark blue
  let b = map(time, 0, 300, 230, 112); // Blue from light blue to dark blue
  skyColor = color(r, g, b);
  background(skyColor);

  // Sun - day
  if (time < 300) {
    textSize(80);
    text("☀️", sunX, sunY); // Draw the sun emoji
    if (time > 100) {
      sunY += 2; // Gradually move the sun down after some time has passed
    }
  }

 // Moon - after sunset
  if (time >= 150) {
    textSize(80);
    text("🌙", moonX, moonY); // Draw the moon emoji
    if (moonY > 100) {
      moonY -= 0.5; // Gradually move the moon up
    }
  }

  // Twinkling stars at night
  if (time >= 200) {
    for (let i = 0; i < stars.length; i++) {
      fill(255, 255, 255, stars[i].brightness); // Star color with brightness
      ellipse(stars[i].x, stars[i].y, 5, 5); // Draw star

      // Twinkle effect 
      stars[i].brightness += random(-5, 5);
      stars[i].brightness = constrain(stars[i].brightness, 100, 255);
    }
  }

  // time increase in transition
  if (time < 300) {
    time++;
  }


  //crow sitting on the edge
textSize(35);

 if (!crowMoved) {
    // Check if the mouse is hovering over the crow
    let crowSize = 35;
    if (mouseX > crowX - crowSize / 2 && mouseX < crowX + crowSize / 2 &&
        mouseY > crowY - crowSize / 2 && mouseY < crowY + crowSize / 2) {
      crowX = 150; // Update x position of crow
      crowY = 312; // Update y position of crow
      crowMoved = true; // Mark the crow as moved
    }
  }


text("🦅", crowX, crowY);


//road and truck

  // Road
  push();
fill("green");
rect(0, 500, 1000, 900)

  fill("#000000"); // Black color for the road
  rect(0, 400, 1000, 550); // Road behind the truck

//animated dashed line
dashOffset -= 2; // Adjust the speed of the animation by changing the value
  if (dashOffset < -36) {
    dashOffset = 0;
  }



//dashed line across the road
push();
  drawingContext.setLineDash([16, 20]); // Create a dashed line pattern
  drawingContext.lineDashOffset = dashOffset; // Move the dashed line offset
  stroke("white"); // White color for dashed line
  strokeWeight(4);
  line(0, 700, 1000, 700); // Draw dashed line
  drawingContext.setLineDash([]); // Reset dash to solid line after drawing
  pop();

// road markers
fill("#FFD13B");
rect(0, 430, 1000, 5);
fill("#FFD13B");
rect(0, 920, 1000, 5);

//flag on the back of the hood

textSize(25);
text("🏅", 157, 667); // Draw the emoji at the new origin

textSize(25);
text("🏅", 176, 667); // Draw the emoji at the new origin

textSize(25);
text("🏅", 196, 667); // Draw the emoji at the new origin

//bumper
fill(128);
rect(165,625,640,20, 4);

  
  // light color in a loop
  if (frameCount % 60 < 30) {
    lightColor = color(255, 255, 0); // Yellow color
  } else {
    lightColor = color(255, 165, 0); // Orange color
  }
  fill(lightColor);
  ellipse(180, 610, 20, 30); // Positioned at the left edge of the arc


  // Semi-Circle Hood 
  fill(0, 128, 0); // Green color for the fender
  arc(300, 625, 250, 250, PI, TWO_PI); // Positioned below truck base, centered

//light in the back
fill("red");
rect(795, 600, 10, 20, 20);
  
  // Truck Base 
  push();
  fill("#8BC34A"); // 
  rect(300, 350, 500, 275, 0, 10, 10, 0); // Centered horizontally and vertically
  pop();

  let c = color(255, 0, 0);

  //left rect
  noStroke();
  fill(c);
  rect(300, 350, 500, 100, 0, 10);

  // Set 'blueValue' to 220
  let blueValue = 220;

  //right rectangle
  fill(0, 0, blueValue);
  rect(300, 350, 250, 100, 0, 0);

  // Front Tire 
  push();
  translate(400, 625);
  rotate(-tireRotation); // Rotate in opposite direction
  fill(70, 105, 105); // Yellow color for tires
  circle(0, 0, 125); // Front tire centered with truck base
  fill(0);
  arc(0, 0, 62.5, 62.5, 0, PI); // Black half of the inner circle
  fill(255);
  arc(0, 0, 62.5, 62.5, PI, TWO_PI); // White half of the inner circle
  pop();
  
  //flower
textSize(40)
  text("🔆", 380, 640)


  // Back Tire 
  push();
  translate(700, 625);
  rotate(-tireRotation); // Rotate in opposite direction
  fill(70, 105, 105); // Yellow color for tires
  circle(0, 0, 125); // Back tire centered with truck base
  fill(0);
  arc(0, 0, 62.5, 62.5, 0, PI); // Black half of the inner circle
  fill(255);
  arc(0, 0, 62.5, 62.5, PI, TWO_PI); // White half of the inner circle
  pop();
  
textSize(40)
  text("🔆", 680, 640)

  // Hood 
  fill("#FF0000"); 
  triangle(300, 350, 300, 500, 150, 320); // Adjusted to align with truck base

  
  // Door
  fill("#FF0000"); 
  push();
  quad(220, 400, 300, 390, 300, 550, 200, 555); // Coordinates for the door
  pop();


//line to break
fill("#E91E63"); 
push();
  rect(220, 395, 80, 10, 0, 10, 0, 0); 
pop();

//design
if (mouseX > 220 && mouseX < 290 && mouseY > 395 && mouseY < 405) {
  fill(0); 
} else {
  fill(255); 
}
push();
rect(220, 395, 10);
pop();

if (mouseX > 235 && mouseX < 245 && mouseY > 395 && mouseY < 405) {
  fill(255); 
} else {
  fill(0); 
}
push();
rect(235, 395, 10);
pop();

if (mouseX > 250 && mouseX < 260 && mouseY > 395 && mouseY < 405) {
  fill(0); 
} else {
  fill(255); 
}
push();
rect(250, 395, 10);
pop();

if (mouseX > 265 && mouseX < 275 && mouseY > 395 && mouseY < 405) {
  fill(255); 
} else {
  fill(0); 
}
push();
rect(265, 395, 10);
pop();

if (mouseX > 280 && mouseX < 290 && mouseY > 395 && mouseY < 405) {
  fill(0); 
} else {
  fill(255); 
}
push();
rect(280, 395, 10);
pop();


  // Subset Door
  fill("#add8e6"); // Light blue color for the subset door
  push();
  quad(230, 420, 285, 420, 288, 530, 220, 530); // Coordinates for the subset door, 20 units smaller
  pop();

//inthe window
  textSize(150);
  text("🧎🏽‍♀️", 187, 539);


//wheel
push();
  fill("#000000");
 ellipse(235, 525, 08, 50, 20);
  describe('A black ellipse')
pop();
  
//cover body
fill("#0FA65F")
rect(195, 520, 605, 40, 10)
  

  // Door Handle
  if (mouseX > 220 && mouseX < 300 && mouseY > 400 && mouseY < 550) {
    fill("#0125eb"); 
  } else {
    fill("#FADB09"); 
  }
  push();
  rect(270, 540, 10, 5); // Door handle coordinates
  pop();

  // Draw the right rectangle
  push();
  fill("#FADB09");
  rect(300, 450, 500, 10);
  rect(300, 470, 500, 10);

  fill("#0FA65F");
  rect(300, 460, 500, 10);
  pop();

  // Emojis (Top Layer)
  textSize(55);

  // Emoji 1
  push();
  translate(320, 420);
  if (dist(mouseX, mouseY, 320, 420) < 50) {
    scaleFactor1 = 1.2;
  } else {
    scaleFactor1 = 1;
  }
  scale(scaleFactor1);
  text("🌼", 0, 0);
  pop();

  // Emoji 2
  push();
  translate(400, 420);
  if (dist(mouseX, mouseY, 400, 420) < 50) {
    scaleFactor2 = 1.2;
  } else {
    scaleFactor2 = 1;
  }
  scale(scaleFactor2);
  text("🦚", 0, 0);
  pop();

  // Emoji 3
  push();
  translate(480, 420);
  if (dist(mouseX, mouseY, 480, 420) < 50) {
    scaleFactor3 = 1.2;
  } else {
    scaleFactor3 = 1;
  }
  scale(scaleFactor3);
  text("🌼", 0, 0);
  pop();

  // Emoji 4
  push();
  translate(570, 420);
  if (dist(mouseX, mouseY, 570, 420) < 50) {
    scaleFactor4 = 1.2;
  } else {
    scaleFactor4 = 1;
  }
  scale(scaleFactor4);
  text("🦚", 0, 0);
  pop();

  // Emoji 5
  push();
  translate(650, 420);
  if (dist(mouseX, mouseY, 650, 420) < 50) {
    scaleFactor5 = 1.2;
  } else {
    scaleFactor5 = 1;
  }
  scale(scaleFactor5);
  text("🌼", 0, 0);
  pop();

  // Emoji 6
  push();
  translate(730, 420);
  if (dist(mouseX, mouseY, 730, 420) < 50) {
    scaleFactor6 = 1.2;
  } else {
    scaleFactor6 = 1;
  }
  scale(scaleFactor6);
  text("🦚", 0, 0);
  pop();

//design emoji on the hood
textSize(30);
  if (mouseX > 180 && mouseX < 770 && mouseY > 615 && mouseY < 645) {
    fill("#FFEB3B"); 
  } else {
    fill("#FFFFFF"); 
  }
text("❖",180, 635);
text("❖",220, 635);
text("❖",260, 635);
text("❖",300, 635);
text("❖",470, 635);
text("❖",510, 635);
text("❖",550, 635);
text("❖",590, 635);
text("❖",770, 635);


//hanging under bumper
textSize(22)
  if (mouseX > 202 && mouseX < 615 && mouseY > 615 && mouseY < 645) {
    fill("#FAFAF7"); 
  } else {
    fill("#FF0000"); 
  }

text("❁",202, 635);
text("❁",242, 635);
text("❁",282, 635);
text("❁",493, 635);
text("❁",533, 635);  
text("❁",575, 635);
text("❁",615, 635);
  
  //circles behind stars
textSize(30);
    text("🔵", 306, 514);
  text("🔴", 336, 514);
  text("🟢", 366, 514);
  text("🟢", 396, 514);
  text("⚪️", 426, 514);
  text("🔵", 456, 514);
  text("🟢", 486, 514);
  text("🔴", 516, 514);
  text("🔴", 546, 514);
  text("🟢", 576, 514);
  text("🔵", 606, 514);
  text("⚪️", 636, 514);
  text("🟢", 666, 514);
  text("🟢", 696, 514);
  text("🔴", 726, 514);
  text("🔵", 756, 514);

 // Rainbow colors array
  let rainbowColors = [
    color(250, 0, 0),    // Red
    color(255, 165, 0),  // Orange
    color(255, 255, 0),  // Yellow
    color(0, 128, 0),    // Green
    color(0, 0, 255),    // Blue
    color(75, 0, 130),   // Indigo
    color(238, 130, 238) // Violet
  ];

 // Coordinates of stars
  let starX = 306;
  let starY = 360;
  let starSpacing = 30; 
  
  
//truck top
textSize(30)
  for (let i = 0; i < 8; i++) {
    // Calculate the index of the rainbow color based on frameCount to cycle colors over time
    let colorIndex = (frameCount / 50 + i) % rainbowColors.length;
    fill(rainbowColors[int(colorIndex)]);

    // Draw the star
    text("✦", starX + i * starSpacing, starY);
  }



//more design on the top
 text("✦", 306, 360);
text("✦", 336, 360);
text("✦", 366, 360);
text("✦", 396, 360);
text("✦", 426, 360);
  text("✦", 456, 360);
  text("✦", 486, 360);
  text("✦", 516, 360);


text("✦", 546, 360);
text("✦", 576, 360);
text("✦", 606, 360);
text("✦", 636, 360);
text("✦", 666, 360);
text("✦", 696, 360);
text("✦", 726, 360);
text("✦", 756, 360);

textSize(20)
text("✦", 310, 445);
text("✦", 530, 445);
text("✦", 560, 445);
text("✦", 770, 445);

textSize(20)
text("✪", 200, 555);
  text("✪", 775, 555);
  
// Details on the pink truck
textSize(20);
if (mouseX > 310 && mouseX < 760 && mouseY > 510 && mouseY < 545) {
    fill("#FFFFFF"); 
  } else {
    fill("#FFEB3B"); 
  }
text("♠︎", 310, 510);
  text("👁️", 340, 510);
  text("🌼", 370, 510);
  text("♦︎", 400, 510);
  text("🇵🇰", 430, 510);
  text("♠︎", 460, 510);
  text("♦︎", 490, 510);
  text("👁️", 520, 510);
  text("👁️", 550, 510);
  text("♦︎", 580, 510);
  text("♠︎", 610, 510);
  text("🇵🇰", 640, 510);
  text("♦︎", 670, 510);
  text("🌼", 700, 510);
  text("👁️", 730, 510);
  text("♠︎", 760, 510);
  

//flower on the hood
textSize(30)
  text("🌺", 145, 340);
  
textSize(29)
  text("🌺", 175, 345);
textSize(28)
  text("🌺", 165, 340);
  textSize(30)
  text("🌺", 185, 350);
textSize(30)
  text("🌺", 197, 350);
textSize(30)
  text("🌺", 220, 355);
textSize(32)
  text("🌺", 240, 359);
textSize(29)
  text("🌺", 255, 360);
textSize(30)
  text("🌺", 270, 361);

//dashed line across the TRUCK
push();
drawingContext.setLineDash([10, 10]); 
stroke("#FF0000"); 
strokeWeight(2);
line(210, 530, 779, 530); 
drawingContext.setLineDash([]); 
pop();

  
  // Interactive Moving Circle
  fill("#8BC34A"); 
  circle(circleX, 465, 25); 

  // mouse (320 to 780)
  if (!stopCircle) {
    circleX += 2 * circleDirection;
    if (circleX > 780 || circleX < 320) {
      circleDirection *= -1;
    }
  }

  // Stop movement on mouse hover
  if (mouseX > circleX - 17.5 && mouseX < circleX + 17.5 && mouseY > 447.5 && mouseY < 482.5) {
    stopCircle = true;
  } else {
    stopCircle = false;
  }

  // Rotate tires to show movement
  if (!stopCircle) {
    tireRotation += 0.1;
  }

//more design on truck
  textSize(70)
   text("🌿", 550, 600)
  push();
translate(545, 600);
  scale(-1, 1);
textSize(70)
 text("🌿", 0, 0)
pop();
  
//leaves on the front of the hood
  textSize(40)
   text("🌿", 240, 600)
  push();
translate(240, 600);
  scale(-1, 1);
textSize(40)
 text("🌿", 0, 0)
pop();
  
//leaves on the back of the truck
  textSize(30)
   text("🌿", 750, 600)
  push();
translate(650, 600);
  scale(-1, 1);
textSize(30)
 text("🌿", 0, 0)
pop();  

//leaves on the front of the tired
  textSize(30)
   text("🌿", 450, 600)
  push();
translate(350, 600);
  scale(-1, 1);
textSize(30)
 text("🌿", 0, 0)
pop();  

//flag on the back of the hood
push(); 
translate(780, 642); 
rotate(HALF_PI); 
textSize(30);
text("🚩", 0, 0); 
pop(); 
  
// Hovering over the rose emoji
  if (mouseX > 460 && mouseX < 540 && mouseY > 570 && mouseY < 630) {
    roseScale = 1.3; 
  } else {
    roseScale = 1; //
  }  
  
//draw rose 
push();
translate(515, 600);
  scale(roseScale);
textSize(60);
  text("🌺", 0, 0);
pop();
  

// mouse hover - text1
  if (mouseX > textX1 && mouseX < textX1 + textWidth1 && mouseY > textY1 - textHeight1 && mouseY < textY1) {
    fill("red"); 
  } else {
    fill("#FFFFFE"); 
  }
  // Urdu text 1
  textSize(15);
  text("فاصلہ رکھیں ورنہ پیار ہو جائے گا", textX1, textY1);

  // mouse hover - text 2
  if (mouseX > textX2 && mouseX < textX2 + textWidth2 && mouseY > textY2 - textHeight2 && mouseY < textY2) {
    fill("blue"); // blue
  } else {
    fill("#FFFFFE"); // to white
  }
  // Urdu text 2
  textSize(15);
  text("دیکھنے میں ڈولی چلنے میں گولی", textX2, textY2);


 // mouse hover - Urdu text 2
  if (mouseX > textX2 && mouseX < textX2 + textWidth2 && mouseY > textY2 - textHeight2 && mouseY < textY2) {
    fill("#030303"); // black
  } else {
    fill("#FFC107"); // yellow
  }
//Urdu Text
textSize(20)
text("ماں کی دعا", 210, 385)

//Urdu Text
textSize(20)
text("جنت کا ہوا", 210, 589)

//urdutext
textSize(20)
text("باپ کی دعا", 625, 555)

//urdutext
textSize(20)
text("جا بیٹا ٹیکسی چلا", 340, 555)

//cloud
textSize(220)
  text("☁️", 130, 190);

textSize(300)
  text("☁️", -90, 180);

textSize(250)
  text("☁️", 300, 190);


textSize(190)
  text("☁️", 400, 220);

textSize(250)
  text("☁️", 600, 240);

textSize(220)
  text("☁️", 900, 190);

textSize(200)
  text("☁️", 800, 300);

textSize(190)
  text("☁️", 460, 160);


textSize(200)
  text("☁️", cloudX, 150);

//Move the cloud to right
cloudX += 1.0;

//if cloud moves of the right
if (cloudX > width) {
  cloudX = -100; 
}
  
  //birdcloud
textSize(200);
text("☁️", birdX, 260);
  
//Move the bird to right
birdX -= 1.5;

//if bird moves of the right
if (birdX < -100) {
  birdX = width; // Reset to the left side
} 
  
  
}


