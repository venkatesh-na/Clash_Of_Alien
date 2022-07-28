const allBox = document.querySelectorAll(".box");
const board = document.querySelector("body > div > div")
const outsideBoard = document.querySelector("body > div")

//initialy player life 100
let player1Life = 100;
let player2Life = 100;

//allBox[60] is a a player1 
allBox[120].classList.add("player1")
allBox[120].innerHTML = `<div class = "lifeBar1">
<div></div>
</div>
<div class = "arrow"></div>
`
//allBox[60] is a a player2 
allBox[0].classList.add("player2")
allBox[0].innerHTML = `<div class = "lifeBar2">
<div></div>
</div>
<div class = "arrow2"></div>`


const arrow = document.querySelector(".box.player1 .arrow")
const lifeBar1 = document.querySelector(".box.player1 .lifeBar1 div")
const lifeBar2 = document.querySelector(".box.player1 .lifeBar1 div")
//setting player1 and player2 life to 100%
lifeBar1.style.width = `${player1Life}%`
lifeBar2.style.width = `${player2Life}%`



//ranodm mituor
setInterval(()=>{
    allBox.forEach(e=>{
        //before adding mituor class we remove the existing mituor present in board
        if(e.classList.contains("mituor")){
            e.classList.remove("mituor")
        }
    })
    for(let i = 0; i<2; i++){
        let randNum = Math.floor(Math.random() * 120) //120 becuase there are total 120 boxes
        allBox[randNum].classList.add("mituor");
    }
},5000)


//adding id to each box
allBox.forEach((e,i)=>{
    e.id = i;
  // e.textContent = i;
})

//ui for player1 life level
function player1LifeLevel(index){
    allBox[index].innerHTML = `<div class = "lifeBar1">
    <div></div>
    </div>
    <div class = "arrow"></div>`
    allBox[index].querySelector(".lifeBar1 div").style.width = `${player1Life}%`;
}

//ui for player2 life level
function player2LifeLevel(index){
    allBox[index].innerHTML = `<div class = "lifeBar2">
    <div></div>
    </div>
    <div class = "arrow2"></div>`
    allBox[index].querySelector(".lifeBar2 div").style.width = `${player2Life}%`;
}



setInterval(()=>{
    //for reducing life of player1 when player is in mutour range
    allBox.forEach(e=>{
        if(e.classList.contains("player1") &&
        e.classList.contains("box") &&
        e.classList.contains("mituor")
        ){
            player1Life -= 10;
            e.querySelector(".lifeBar1 div").style.width = `${player1Life}%`
            if(player1Life <= 0){
            outsideBoard.innerHTML = `<h1 style={{color : "red"}}>Player dead</h1>`
            return;
            }
        }

        //for reducing life of player2 when player is in mutour range
        if(e.classList.contains("player2") &&
        e.classList.contains("box") &&
        e.classList.contains("mituor")
        ){
            player2Life -= 10;
            e.querySelector(".lifeBar2 div").style.width = `${player2Life}%`
            if(player2Life <= 0){
            outsideBoard.innerHTML = `<h1 style={{color : "red"}}>Player dead</h1>`
            return;
            }
        }
    })
},500)
//if i reduce the time interval time than it will detect the player and immediately reduce the life
//if i increase the time interval time than player gets time to move from the mutour range

//return the player position in board
function returnIndex(player){   
    let id = null;
    if(player == "player1"){
        allBox.forEach(e=>{
            if(e.classList.contains("player1")){
                id = e.id //cant return inside a forEach
            };
        })
    } else if(player == "player2") {
         allBox.forEach(e=>{
            if(e.classList.contains("player2")){
                id = e.id //cant return inside a forEach
            };
        })
    }
    return id;
}

function checkPlayer2BulletCollision(playerId, interval){
    if(allBox[playerId].classList.contains("player2") && allBox[playerId].classList.contains("bullet")){
        allBox[playerId].classList.remove("bullet") 
        player2Life -= 10;
        document.querySelector(".box.player2 .lifeBar2 div").style.width = `${player2Life}%`
        if(player2Life <= 0){
            outsideBoard.innerHTML = `<h1 style="color : rgb(151, 253, 151)">Brown Player dead , Green player win </h1>`
            return clearInterval(interval);
        }
        return clearInterval(interval) //so that bullet does not pass through player
    }
}

function checkPlayer1BulletCollision(playerId, interval){
    if(allBox[playerId].classList.contains("player1") && allBox[playerId].classList.contains("bullet2")){
        allBox[playerId].classList.remove("bullet2") 
        player1Life -= 10;
        document.querySelector(".box.player1 .lifeBar1 div").style.width = `${player1Life}%`
        if(player1Life <= 0){
            outsideBoard.innerHTML = `<h1 style="color : rgb(194, 135, 99)">Green Player dead and brown player win</h1>`
            return clearInterval(interval);
        }
        return clearInterval(interval) //so that bullet does not pass through player
    }
}

// function translateXFunction(value){
//     return `translateX(${value})`
// }

// function translateYFunction(value){
//     return `translateY(${value})`
// }

// function movement(index, className, position, translateInt, whichTranslateFun){
//     allBox[index].classList.remove(className);
//     allBox[index + position].classList.add(className);
//     player1LifeLevel(index + position);
//     translateValue -= translateInt;
//     board.style.transform = whichTranslateFun(translateValue) 
// }


let translateXValue = 0; //for camera movement in x direction
let translateYValue = 0;
let arrowDirectionPlayer1 = ""; //help in shooting a bullet in certain direction
let arrowDirectionPlayer2 = ""
document.addEventListener("keydown",(e)=>{
    let index;
    switch(e.key){
        case "ArrowUp":
            index = parseInt(returnIndex("player1")); //returns position of player1
        if(index - 11 >= 0 && !allBox[index - 11].classList.contains("player2")){
            arrowDirectionPlayer1 = "up"
            allBox[index].classList.remove("player1"); 
            allBox[index - 11].classList.add("player1");
            player1LifeLevel(index-11);
            translateYValue += 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
             allBox[index - 11].querySelector(".arrow").style.transform = `translate(0px, 0px) rotate(-2deg)`
        }
        break;
        case "ArrowDown":
        index = parseInt(returnIndex("player1"));
        if(index + 11 <= 120 && !allBox[index + 11].classList.contains("player2")){
            arrowDirectionPlayer1 = "down"
            allBox[index].classList.remove("player1");
            allBox[index + 11].classList.add("player1");
            player1LifeLevel(index+11); //if i dont call fun the player life level will not visible when we navigate to different boxes
            translateYValue -= 10;
            //if i just add translateX(translateXValue) then y position will be set as initial position which doesnt make smooth camera movement
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
            allBox[index + 11].querySelector(".arrow").style.transform = `translate(0px,47px) rotate(180deg)` //arrow movement on left,right,up,down
            }
        break;
        case "ArrowRight":
        index = parseInt(returnIndex("player1"));
        if((index + 1) % 11 != 0 && !allBox[index + 1].classList.contains("player2")){
            arrowDirectionPlayer1 = "right"
            allBox[index].classList.remove("player1");
            allBox[index + 1].classList.add("player1");    
            player1LifeLevel(index+1);
            translateXValue -= 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
            allBox[index + 1].querySelector(".arrow").style.transform = `translate(23px,24px) rotate(90deg)`
        }
        break;
        case "ArrowLeft":
        arrowDirectionPlayer1 = "left"
        index = parseInt(returnIndex("player1"));
        if(index % 11 != 0 && !allBox[index - 1].classList.contains("player2")){
            allBox[index].classList.remove("player1");
            allBox[index - 1].classList.add("player1");
            player1LifeLevel(index-1);
            translateXValue += 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
             allBox[index - 1].querySelector(".arrow").style.transform = `translate(-24px,26px) rotate(268deg)`
        }
        break;
        case "0":
        bulletControll(arrowDirectionPlayer1)
            break;
        case "w":
            index = parseInt(returnIndex("player2"));
        if(index - 11 >= 0){
            arrowDirectionPlayer2 = "up"
            allBox[index].classList.remove("player2");
            allBox[index - 11].classList.add("player2");
            player2LifeLevel(index-11);
            translateYValue += 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
             allBox[index - 11].querySelector(".arrow2").style.transform = `translate(0px, 0px) rotate(-2deg)`
        }
        break;
        case "s":
        index = parseInt(returnIndex("player2"));
        if(index + 11 <= 120 && !allBox[index + 11].classList.contains("player1")){
            arrowDirectionPlayer2 = "down"
            allBox[index].classList.remove("player2");
            allBox[index + 11].classList.add("player2");
            player2LifeLevel(index+11); //if i dont call fun the player life level will not visible when we navigate to different boxes
            translateYValue -= 10;
            //if i just add translateX(translateXValue) then y position will be set as initial position which doesnt make smooth camera movement
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
            allBox[index + 11].querySelector(".arrow2").style.transform = `translate(0px,47px) rotate(180deg)` //arrow movement on left,right,up,down
            }
        break;
        case "d":
        index = parseInt(returnIndex("player2"));
        if((index + 1) % 11 != 0 && !allBox[index + 1].classList.contains("player1")){
            arrowDirectionPlayer2 = "right"
            allBox[index].classList.remove("player2");
            allBox[index + 1].classList.add("player2");    
            player2LifeLevel(index+1);
            translateXValue -= 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
            allBox[index + 1].querySelector(".arrow2").style.transform = `translate(23px,24px) rotate(90deg)`
        }
        break;
        case "a":
        arrowDirectionPlayer2 = "left"
        index = parseInt(returnIndex("player2"));
        if(index % 11 != 0 && !allBox[index - 1].classList.contains("player1")){
            allBox[index].classList.remove("player2");
            allBox[index - 1].classList.add("player2");
            player2LifeLevel(index-1);
            translateXValue += 10;
            board.style.transform = `translate(${translateXValue}px,${translateYValue}px)`
             allBox[index - 1].querySelector(".arrow2").style.transform = `translate(-24px,26px) rotate(268deg)`
        }
        break;
        case " ":
            bulletControll2(arrowDirectionPlayer2)
            break;
    }
})

function bulletControll(direction){
    let player = document.querySelector(".box.player1")
    let playerId;
    let i; 
    let interval;
    switch(direction){
        case "up":
            player = document.querySelector(".box.player1")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(i != 0){ //may be by removing this line it will work
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet") 
                }
                i++; 
                playerId -= 11;
                if(playerId < 0){
                    return clearInterval(interval)
                }
                allBox[playerId].classList.add("bullet")
                checkPlayer2BulletCollision(playerId, interval)
            },300)
            break;
        case "down":
            player = document.querySelector(".box.player1")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet") 
                }
                i++;
                playerId += 11;
                if(playerId >= 120){
                    return clearInterval(interval)
                }
                allBox[playerId].classList.add("bullet")
                checkPlayer2BulletCollision(playerId, interval)
            },300)
            break;
        case "left":
            player = document.querySelector(".box.player1")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(playerId % 11 == 0){
                    allBox[playerId].classList.remove("bullet") //remove display when hit to a left wall
                    return clearInterval(interval)
                }
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet") 
                }
                i++;
                playerId -= 1;
                allBox[playerId].classList.add("bullet")
                checkPlayer2BulletCollision(playerId, interval)
            },300)
            break;
        case "right":
            player = document.querySelector(".box.player1")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if((playerId + 1) % 11 == 0){
                    allBox[playerId].classList.remove("bullet") //remove display when hit to a left wall
                    return clearInterval(interval)
                }
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet") 
                }
                i++;
                playerId += 1;
                allBox[playerId].classList.add("bullet")
                checkPlayer2BulletCollision(playerId, interval)
            },300)
            break;
    }
}


function bulletControll2(direction){
let player = document.querySelector(".box.player2")
    let playerId;
    let i;
    let interval;
    switch(direction){
        case "up":
            player = document.querySelector(".box.player2")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet2") 
                }
                i++;
                playerId -= 11;
                if(playerId < 0){
                    return clearInterval(interval)
                }
                allBox[playerId].classList.add("bullet2")
                checkPlayer1BulletCollision(playerId, interval)
            },300)
            break;
        case "down":
            player = document.querySelector(".box.player2")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet2") 
                }
                i++;
                playerId += 11;
                if(playerId >= 120){
                    return clearInterval(interval)
                }
                allBox[playerId].classList.add("bullet2")
                checkPlayer1BulletCollision(playerId, interval)
            },300)
            break;
        case "left":
            player = document.querySelector(".box.player2")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if(playerId % 11 == 0){
                    allBox[playerId].classList.remove("bullet2") //remove display when hit to a left wall
                    return clearInterval(interval)
                }
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet2") 
                }
                i++;
                playerId -= 1;
                allBox[playerId].classList.add("bullet2")
                checkPlayer1BulletCollision(playerId, interval)
            },300)
            break;
        case "right":
            player = document.querySelector(".box.player2")
            playerId = parseInt(player.id)
            i = 0;
            interval = setInterval(()=>{
                if((playerId + 1) % 11 == 0){
                    allBox[playerId].classList.remove("bullet2") //remove display when hit to a left wall
                    return clearInterval(interval)
                }
                if(i != 0){
                    //we dont want to create bullet on every down box
                    //so clearing bullet class of previous box
                    //we dont want to removed bullet class on first iteration
                   allBox[playerId].classList.remove("bullet2") 
                }
                i++;
                playerId += 1;
                allBox[playerId].classList.add("bullet2")
                checkPlayer1BulletCollision(playerId, interval)
            },300)
            break;
    }
}
