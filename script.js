const allBox = document.querySelectorAll(".box");
const board = document.querySelector("body > div > div")
console.log(board)
allBox[60].classList.add("player")
allBox.forEach((e,i)=>{
    e.id = i;
})

function returnIndex(){   
    let id = null;
    allBox.forEach(e=>{
      if(e.classList.contains("player")){
        id = e.id //cant return inside a forEach
      };
    })
    return id;
}
console.log(returnIndex())


let translateValue = 0;
document.addEventListener("keydown",(e)=>{
    let index;
    switch(e.key){
        case "ArrowUp":
        index = parseInt(returnIndex());
        console.log(index)
        allBox[index].classList.remove("player");
        allBox[index - 11].classList.add("player");
        translateValue += 10;
        board.style.transform = `translateY(${translateValue}px)`
            break;
        case "ArrowDown":
        index = parseInt(returnIndex());
        allBox[index].classList.remove("player");
        allBox[index + 11].classList.add("player");
        translateValue -= 10;
        board.style.transform = `translateY(${translateValue}px)`
            break;
        case "ArrowRight":
        index = parseInt(returnIndex());
        allBox[index].classList.remove("player");
        allBox[index + 1].classList.add("player");    
        translateValue -= 10;
        board.style.transform = `translateX(${translateValue}px)`
            break;
        case "ArrowLeft":
        index = parseInt(returnIndex());
        allBox[index].classList.remove("player");
        allBox[index - 1].classList.add("player");
        translateValue += 10;
        board.style.transform = `translateX(${translateValue}px)`
            break;
    }
})
