document.addEventListener('DOMContentLoaded', loaded);
//make ai
//themeing
//make  custom  themeing.
//fix loose  for combining
function loaded() {

    document.addEventListener('keyup', control);
    //////////////////GAME////////////
    const gridDisplay = document.querySelector('.grid');
    const headertext = document.querySelector('.goaltext');
    const headertext2 = document.querySelector('.goaltext2');
    //Scores
    const scoreDisplay = document.querySelector('#score');
    const hscoreDisplay = document.querySelector('#hscore');
    //best
    const bestDisplay = document.querySelector('#best');
    const hbestDisplay = document.querySelector('#hbest');
    //end
    const scoreResult = document.querySelector('#result');
    /////////////SETTINGS/////////////////
    //GOAL
    const goalDisplay = document.querySelector('#goal');
    const goalincrease = document.querySelector('#goalincrease');
    const goaldecrease = document.querySelector('#goaldecrease');
    let goal = 2048;
    //SIZE
    const sizeDisplay = document.querySelector('#size');
    const sizeincrease = document.querySelector('#sizeincrease');
    const sizedecrease = document.querySelector('#sizedecrease');
    var width = 4;
    let widthcookie = getCookie("width");
    if (widthcookie != "") {

        width = parseInt(widthcookie);
    }
    //REVERSED
    const reverseCheck = document.querySelector('#reverse');
    let reverse = false;
    let rvcook = getCookie("reverse");
    if (rvcook != "") {

        if(rvcook ==  "true")
            reverse = true;
        else
            reverse = false;

    }
    if (reverse)
        goal = 2;
    //OPENED
    let opened = getCookie("open");
    console.log(opened)
    if (opened != "") {
        if(opened ==  "yes")
            openNav()
        else
            closeNav()

    }
    //AUTOPLAY
    const autoplayCheck = document.querySelector('#auto');



    let continueEnabled = false;


//	console.log(reverse)
    let container = [];
    let squares = [];
    let score = 0;



    function createBoard() {
        gridDisplay.style.width = width * 100 + "px";
        gridDisplay.style.height = width * 100 + "px";
        for (let x = 0; x < width * width; x++) {
            square = document.createElement('div');
            tile = document.createElement("div");
            tile.className = "tile";
            tile.innerHTML = 0;
            square.appendChild(tile)
            gridDisplay.appendChild(square);
            squares.push(tile);
        }
        generate();
        generate();
    }
    createBoard();

    //GOAL
    function setgoal(mode) {
        //console.log("Clicked");
        if (mode == 1) {
            if (goal != 2)
                goal = goal / 2;
            else
                goal = 2;
        }
        if (mode == 2) {
            goal = goal * 2;
        }
        headertext.innerHTML = goal;
        headertext2.innerHTML = goal;
        goalDisplay.innerHTML = "<p>"+goal+"</p>";
        document.title = goal;
    }
    goalincrease.addEventListener("click", function() {
        setgoal(2);
    });
    goaldecrease.addEventListener("click", function() {
        setgoal(1);
    });
    setgoal(0);
    ///SZIE
    function setsize(mode) {
        //console.log("Clicked");
        if (mode == 1) {
            if (width != 2)
                size = width - 2;
            else
                size = 2;
        }
        if (mode == 2) {
            size = width + 2;
        }
        setCookie("width", size, 1);
        location.reload();
    }
    sizeincrease.addEventListener("click", function() {
        setsize(2);
    });
    sizedecrease.addEventListener("click", function() {
        setsize(1);
    });
    sizeDisplay.innerHTML = "<p>"+width+"</p>";

    function setreverse() {

        setCookie("reverse", reverseCheck.checked, 1);
        console.log(getCookie("reverse"))
        location.reload();
    }
    if(reverse){reverseCheck.checked = true}
    else if(!reverse){reverseCheck.checked = false}
//	console.log(reverseCheck.checked +"="+reverse);
    reverseCheck.addEventListener("change", setreverse);
    autoplayCheck.addEventListener("change", autoplay);


    function generate() {
        let randNum = Math.floor(Math.random() * squares.length);
        if (squares[randNum].innerHTML == 0) {
            if (reverse)
                squares[randNum].innerHTML = 2048;
            else
                var newel = squares[randNum].cloneNode(true);
            squares[randNum].parentNode.replaceChild(newel, squares[randNum]);
            squares[randNum] = newel;
            squares[randNum].innerHTML = 2;
        } else {
            generate();
        }
        checkGameOver()
    }

    function moveRight() {
        for (let x = 0; x < width * width; x++) {
            if (x % width === 0) {
                let row = [];
                for (let y = 0; y < width; y++) {
                    row.push(parseInt(squares[x + y].innerHTML));
                }
                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = zeros.concat(filteredRow);
                for (let y = 0; y < width; y++) {
                    let oldval  = parseInt(squares[x + y].innerHTML);
                    squares[x + y].innerHTML = newRow[0 + y];
                    if(newRow[0 + y] != 0 && oldval != newRow[0 + y]){
                        squares[x + y].parentNode.classList.add("animate-right");
                        squares[x + y].parentNode.addEventListener('animationend', function() {
                            squares[x + y].parentNode.classList.remove('animate-right');
                        })
                    }
                }
            }
        }

    }

    function moveLeft() {
        for (let x = 0; x < width * width; x++) {
            if (x % width === 0) {
                let row = [];
                for (let y = 0; y < width; y++) {
                    row.push(parseInt(squares[x + y].innerHTML));
                }
                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = filteredRow.concat(zeros);

                for (let y = 0; y < width; y++) {
                    let oldval  = parseInt(squares[x + y].innerHTML);
                    squares[x + y].innerHTML = newRow[0 + y];
                    if(newRow[0 + y] != 0 && oldval != newRow[0 + y]){
                        squares[x + y].parentNode.classList.add("animate-left");
                        squares[x + y].parentNode.addEventListener('animationend', function() {
                            squares[x + y].parentNode.classList.remove('animate-left');
                        })
                    }
                }
            }
        }

    }

    function moveDown() {
        for (let x = 0; x < width; x++) {
            let collum = [];
            for (let y = 0; y < width; y++) {
                collum.push(parseInt(squares[x + y * width].innerHTML));
            }
            let filteredCol = collum.filter(num => num);
            let missing = width - filteredCol.length;
            let zeros = Array(missing).fill(0);

            let newCol = zeros.concat(filteredCol);
            for (let y = 0; y < width; y++) {
                let oldval  = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if(newCol[0 + y] != 0 && oldval != newCol[0 + y]){
                    squares[x + y * width].parentNode.classList.add("animate-down");
                    squares[x + y * width].parentNode.addEventListener('animationend', function() {
                        squares[x + y * width].parentNode.classList.remove('animate-down');
                    })
                }

            }
        }
    }

    function moveUp() {
        for (let x = 0; x < width; x++) {
            let collum = [];
            for (let y = 0; y < width; y++) {
                collum.push(parseInt(squares[x + y * width].innerHTML));
            }
            let filteredCol = collum.filter(num => num);
            let missing = width - filteredCol.length;
            let zeros = Array(missing).fill(0);

            let newCol = filteredCol.concat(zeros);
            for (let y = 0; y < width; y++) {
                let oldval  = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if(newCol[0 + y] != 0 && oldval != newCol[0 + y]){
                    squares[x + y * width].parentNode.classList.add("animate-up");
                    squares[x + y * width].parentNode.addEventListener('animationend', function() {
                        squares[x + y * width].parentNode.classList.remove('animate-up');
                    })
                }
            }
        }
    }

    function combineRow(mode) {
        for (let x = 0; x < (width * width) - 1; x++) {
            if (squares[x].innerHTML === squares[x + 1].innerHTML) {
                let combinedTotal = 0;
                if (reverse)
                    combinedTotal = parseInt(squares[x].innerHTML) / 2;
                else
                    combinedTotal = parseInt(squares[x].innerHTML) + parseInt(squares[x + 1].innerHTML);
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkhigh();
                squares[x].innerHTML = combinedTotal;
                checkbest();
                squares[x + 1].innerHTML = 0;
                if(mode == "left"){
                    console.log("Left: "+x)
                    if(parseInt(squares[x].innerHTML) != 0){
                        squares[x].parentNode.classList.add("animate-pop");
                        squares[x].parentNode.addEventListener('animationend', function() {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                }else{

                    if(parseInt(squares[x].innerHTML) != 0){

                        squares[x+1].parentNode.classList.add("animate-pop");
                        squares[x+1].parentNode.addEventListener('animationend', function() {
                            squares[x+1].parentNode.classList.remove('animate-pop');
                        })
                    }
                }


            }

        }
        checkWin();
    }

    function combineCol(mode) {
        for (let x = 0; x < (width * width) - width; x++) {
            if (squares[x].innerHTML === squares[x + width].innerHTML) {
                let combinedTotal = 0;
                if (reverse)
                    combinedTotal = parseInt(squares[x].innerHTML) / 2;
                else
                    combinedTotal = parseInt(squares[x].innerHTML) + parseInt(squares[x + width].innerHTML);
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkhigh();
                squares[x].innerHTML = combinedTotal;
                if(mode == "up"){
                    if(parseInt(squares[x].innerHTML) != 0){
                        squares[x].parentNode.classList.add("animate-pop");
                        squares[x].parentNode.addEventListener('animationend', function() {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                }else{
                    if(parseInt(squares[x].innerHTML) != 0){
                        squares[x+width].parentNode.classList.add("animate-pop");
                        squares[x+width].parentNode.addEventListener('animationend', function() {
                            squares[x+width].parentNode.classList.remove('animate-pop');
                        })
                    }
                }
                checkbest();
                squares[x + width].innerHTML = 0;
            }

        }
        checkWin();
    }
    function continueGame() {
        scoreResult.style.display = "none";
        continueEnabled = true;
        autoplayCheck.addEventListener("change", autoplay);
        document.addEventListener('keyup', control);
    }
    function checkWin() {
        // console.log("CHECKING")
        for (let x = 0; x < squares.length; x++) {
            if (squares[x].innerHTML == goal && !continueEnabled) {
                scoreResult.style.display = "block";
                scoreResult.style.width = width*100+"px";
                scoreResult.style.height = width*100+"px";
                scoreResult.style.background = "lightgreen";
                scoreResult.innerHTML = "<h1 style='font-size: "+(width*width)*5+"px;'>You Win!</h1><button onclick='location.reload()'>Replay</button><button id='cont'>Continue</button>"
                document.getElementById("cont").addEventListener("click", continueGame);
                autoplayCheck.checked = false;
                autoplayCheck.removeEventListener("change", autoplay);
                document.removeEventListener('keyup', control);
            }

        }
    }

    function checkGameOver() {
        let zeros = 0;
        for (let x = 0; x < squares.length; x++) {
            if (squares[x].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            scoreResult.style.display = "block";
            scoreResult.style.width = width*100+"px";
            scoreResult.style.height = width*100+"px";
            scoreResult.innerHTML = "<h1 style='font-size: "+(width*width)*5+"px;'>You Lose</h1><button onclick='location.reload()'>Replay</button>";
            autoplayCheck.enabled = false;
            autoplayCheck.removeEventListener("change", autoplay);
            document.removeEventListener('keyup', control);
        }
    }

    function checkhigh(){
        if(!reverse){
            let current = parseInt(scoreDisplay.innerHTML);
            let high = getCookie("highscore");
            if (high != "") {
                if(current >=  high){
                    setCookie("highscore", current, 365);
                }
            }else{
                setCookie("highscore", current, 365);
            }
            hscoreDisplay.innerHTML =  high;
        }else{hscoreDisplay.innerHTML =  "Unavalible in reverse mode.";}
    }
    function checkh_best(){
        if(!reverse){

            let current = parseInt(bestDisplay.innerHTML);
            let high = getCookie("bestscore");
            if (high != "") {
                if(current >=  high){
                    setCookie("bestscore", current, 365);
                }
            }else{
                setCookie("bestscore", current, 365);
            }
            hbestDisplay.innerHTML =  high;
        }else{hbestDisplay.innerHTML =  "Unavalible in reverse mode.";}


    }

    function checkbest(){
        let current = parseInt(bestDisplay.innerHTML);
        let best = current;
        for (let x = 0; x < squares.length; x++) {
            if(reverse){
                best = 2048;
                if (parseInt(squares[x].innerHTML) <= best) {
                    if(parseInt(squares[x].innerHTML) == 0){

                    }else{ best = parseInt(squares[x].innerHTML);}

                }
            }else{
                if (parseInt(squares[x].innerHTML) >= best) {
                    best = parseInt(squares[x].innerHTML);
                }
            }

        }
        checkh_best();
        bestDisplay.innerHTML =  best;


    }
    checkbest();
    checkhigh()
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyup();
        } else if (e.keyCode === 40) {
            keydown();
        }
    }

    function keyup() {
        moveUp();
        combineCol("up");
        moveUp();
        generate();
    }

    function keydown() {
        moveDown();
        combineCol("down");
        moveDown();
        generate();
    }

    function keyRight() {
        moveRight();
        combineRow("right");
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow("left");
        moveLeft();
        generate();
    }
    function autoplay(){
        if(autoplayCheck.checked){ setTimeout(function(){
            document.removeEventListener('keyup', control);
            let min = Math.ceil(1);
            let max = Math.floor(5);
            let rand = Math.floor(Math.random() * (max - min) + min); //The
            if(rand == 1)
                keyLeft();
            else if(rand == 2)
                keyRight();
            else if(rand == 3)
                keyup();
            else if(rand == 4)
                keydown();
            autoplay();
        },100);
        }else{
            document.addEventListener('keyup', control);
        }

    }

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function openNav() {
    setCookie("open", "yes", 1);
    document.getElementById("settingspannel").style.width = "250px";
}

function closeNav() {
    setCookie("open", "no", 1);
    document.getElementById("settingspannel").style.width = "0";
}