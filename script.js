//HEADER
//fading background
let headerBackgrounds = document.querySelectorAll(".background");//get all background images
let imageIndex = 0;//which background to show

function changeBackground() {

    //remove .showing class from current background
    headerBackgrounds[imageIndex].classList.remove("showing");

    //Go to next index
    imageIndex++;

    //ensure it does not go out of range
    imageIndex = imageIndex % headerBackgrounds.length;

    //add .showing class to NEW current background
    headerBackgrounds[imageIndex].classList.add("showing");
}

//call function to change background every 8 seconds
setInterval(changeBackground, 8000);


//CONTENT
//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
var allpages = document.querySelectorAll(".page");
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    onepage.style.display = "block";
}

show(1);//show page one first

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
    hidealldesc(alldescs);/*hide descriptions first*/
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
    hidealldesc(alltypes);/*hide all types of burds when shift to this page*/
});


/*for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");
function toggleMenus() { /*open and close menu*/
    menuItemsList.classList.toggle("menuShow");
}//can optimize using toggle class with css transitions



/*for page 1 buttons*/
const Fbtn = document.querySelector("#partsF");
const Bbtn = document.querySelector("#partsB");
const Sbtn = document.querySelector("#partsS");
const Hbtn = document.querySelector("#partsH");
var alldescs = document.querySelectorAll(".partdesc");/*description for each part*/
function hidealldesc(alldata) { //function to hide all pages
    for (let data of alldata) { //go through all subtopic pages
        data.style.display = "none"; //remove show atrribute
    }
}
function showdesc(alldata, pgno) { //function to show selected page no
    hidealldesc(alldata);

    let onedesc = alldata[pgno];
    //show the page
    onedesc.style.display = "block";

}

/*Event Listener*/
Fbtn.addEventListener("click", function () {
    showdesc(alldescs, 0);
});
Bbtn.addEventListener("click", function () {
    showdesc(alldescs, 1);
});
Sbtn.addEventListener("click", function () {
    showdesc(alldescs, 2);
});
Hbtn.addEventListener("click", function () {
    showdesc(alldescs, 3);
});

hidealldesc(alldescs);/*hide descriptions first*/


/*Page 2*/
/*Game*/
var gameplaying = 0;/*0 == notplaying, 1 == playing*/
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var scoretext = document.getElementById("score");
var prompt = document.getElementById("prompt");
const game = document.querySelector("#game");
var score = 0;

//audio
const flyaudio = new Audio();
flyaudio.src = "audio/sound_fly.ogg";
const fallaudio = new Audio();
fallaudio.src = "audio/sound_fall.ogg"

/*jump*/
var jumping = 0;
var jumpForce = 7;

/*Check for every animation loop and change hole position*/
hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 300) + 150);/*-150 to -450 range*/
    hole.style.top = random + "px";
    score++;/*increase score per interation*/
    scoretext.innerHTML = "Score: " + score;/*update score*/
});

/*jump function*/
function jump() {
    jumping = 1;
    flyaudio.play();//play jump audio
    let jumpCount = 0;/*keep track so that player does not jump forever*/
    var jumpInterval = setInterval(function () {
        jumpCount += 1;
        /*add force up*/
        /*get character top value*/
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        /*set new character top, add to simulate jump up*/
        character.style.top = (characterTop - jumpForce) + "px";

        if ((characterTop > jumpForce + 1) && (jumpCount < 15)) {/*check player not hit ceiling*/
            /*set new character top, add to simulate jump up*/
            character.style.top = (characterTop - jumpForce) + "px";
        }

        /*end loop after 20 loops*/
        if (jumpCount >= 20) {
            /*set jump to zero to enable gravity*/
            jumping = 0;
            jumpCount = 0;
            clearInterval(jumpInterval);
        }

        /*add jump count every loop*/
        jumpCount++;
    }, 10);
}

game.addEventListener("click", function () {
    if (gameplaying == 0) {/*Game Not Started*/
        gameplaying = 1;/* game start*/
        /*add animator to block*/
        block.classList.add("gameanimate");
        hole.classList.add("gameanimate");

        /*remove prompt*/
        prompt.style.display ="none";

        /* reset score*/
        scoretext.innerHTML = "Score: " + score;

        /*gravity for bird*/
        gameinterval = setInterval(function () {
            /*get character top value*/
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            /*get block*/
            var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
            /*hole has negative top position so need to change*/
            var cTop = -(500 - characterTop);

            /*check if not jumping*/
            if (jumping == 0) {
                /*set new character top, add to simulate gravity down*/
                character.style.top = (characterTop + 3) + "px";
            }

            /*check for collision/ gameover*/
            if (characterTop > 480 ||
                ((blockLeft < 20) /*block is touching player in any way */
                    && ((blockLeft > - 50)
                        && ((cTop < holeTop) || (cTop > holeTop + 130))))) {/*player is out of hole*/
                /*stop game*/
                clearInterval(gameinterval);
                /*remove animator to block*/
                block.classList.remove("gameanimate");
                hole.classList.remove("gameanimate");

                //Fall Sound
                fallaudio.play();

                gameplaying = 0;
                /*reset player position*/
                character.style.top = 100 + "px";
                /*reset score*/
                score = 0;
                /*show prompt again */
                prompt.style.display ="block";
            }
        }, 10);/*10ms*/
    }
    else if (gameplaying == 1) {
        /*game running*/
        jump();
    }
});



/*page 3*/
/*animation fade in when scroll to that position*/
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {/*can observe multiple elements*/
        if (entry.isIntersecting){/*check if intersecting view port*/
            entry.target.classList.add('show');/*make visible*/
        } else {
            entry.target.classList.remove('show');/*have animation to repeat when re=enter viewport*/
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));/*observe all hidden lements*/


/*page 4*/
/*navigation bar for typeList*/
//target all elements to save to constants
const type1btn = document.querySelector("#type1");
const type2btn = document.querySelector("#type2");
const type3btn = document.querySelector("#type3");
const type4btn = document.querySelector("#type4");
var alltypes = document.querySelectorAll(".type");
function showtype(pgno) { //function to show selected page no
    hidealldesc(alltypes);//reusing function from before
    //select the page based on the parameter passed in
    let type = alltypes[pgno];
    //show the page
    type.style.display = "flex";//not reusing this function as type is different
}

//audio for bird chirps
const mynaaudio = new Audio();
mynaaudio.src = "audio/sound_myna.mp3";
const crowaudio = new Audio();
crowaudio.src = "audio/sound_crow.mp3";
const penguinaudio = new Audio();
penguinaudio.src = "audio/sound_penguin.mp3";
const ostritchaudio = new Audio();
ostritchaudio.src = "audio/sound_ostritch.mp3";

/*listener for this page*/
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
type1btn.addEventListener("click", function () {
    showtype(0);
    //play audio
    mynaaudio.play();
});
type2btn.addEventListener("click", function () {
    showtype(1);
    //play audio
    crowaudio.play();
});
type3btn.addEventListener("click", function () {
    showtype(2);
    //play audio
    penguinaudio.play();
});
type4btn.addEventListener("click", function () {
    showtype(3);
    ostritchaudio.play();
});