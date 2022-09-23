document.addEventListener('DOMContentLoaded', loaded);
//make ai, ai give hint or image
//themeing -custom image, customfont,custom ga,e bg and page bg, maybe animation
//Gamemode exporting
//Other customizations: Custom spawn number (must be reflected with the goal to make possible), splitscreen multiplayer, flappy, tertirs
function loaded() {

    function getUrlVar(varible){
        vars = window.location.search.split("?");
        for (let x = 0; x < vars.length; x++) {
            varibleData = vars[x].split("=");
            if(varibleData[0] == varible){
                return varibleData[1];
            }
        }

    }
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
    //GOAL
    let savedgoal = getCookie("goal");
    if (savedgoal != "") {
        goal = savedgoal;

    }
    //REVERSED
    const reverseCheck = document.querySelector('#reverse');
    let reverse = false;
    let rvcook = getCookie("reverse");
    if (rvcook != "") {

        if (rvcook == "true")
            reverse = true;
        else
            reverse = false;

    }
    if (reverse)
        goal = 2;

    //OPENED
    let opened = getCookie("open");
    if (opened != "") {
        if (opened == "yes")
            openNav()
        else
            closeNav()

    }

    //AUTOPLAY
    const autoplayCheck = document.querySelector('#auto');
    //REVERSED
    const realtimeCheck = document.querySelector('#realtime');
    let realtime = false;
    let realcook = getCookie("realtime");
    if (realcook != "") {

        if (realcook == "true")
            realtime = true;
        else
            realtime = false;

    }


    let continueEnabled = false;


    //	console.log(reverse)
    let container = [];
    let squares = [];
    let score = 0;

    /////////DEFAULT THEME//////
    def_temp = new BoardElement("", "", "");
    def_0 = new BoardElement("rgb(128, 190, 128)", "rgb(128, 190, 128)", "");
    def_2 = new BoardElement("rgb(84, 193, 84)", "#776e65", "");
    def_4 = new BoardElement("rgb(84, 193, 84)", "#776e65", "");
    def_8 = new BoardElement("rgb(66, 255, 224)", "#776e65", "");
    def_16 = new BoardElement("rgb(0, 132, 255)", "white", "");
    def_32 = new BoardElement("rgb(0, 81, 255)", "white", "");
    def_64 = new BoardElement("rgb(25, 0, 255)", "white", "");
    def_128 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 2px red");
    def_256 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 4px red");
    def_512 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 6px red");
    def_1024 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 8px red");
    def_2048 = new BoardElement("black", "white", "0 0 5px 8px white");
    der_morethen2048 = true;
    def_4096 = new BoardElement("red", "white", "0 0 5px 8px white");
    def_morele = [
        ["4096"],
        [def_4096]
    ];
    def_theme = new Theme(def_0, def_2, def_4, def_8, def_16, def_32, def_64, def_128, def_256, def_512, def_1024, def_2048, der_morethen2048, def_morele);
    //////////////////////////////////THEME GENARATOR//////////////////
    var customThemeActive = false;
    /////DEFAULT ELEMENTS
    cus_temp = new BoardElement("", "", "");
    cus_0 = new BoardElement("rgb(128, 190, 128)", "rgb(128, 190, 128)", "");
    cus_2 = new BoardElement("rgb(84, 193, 84)", "#776e65", "");
    cus_4 = new BoardElement("rgb(84, 193, 84)", "#776e65", "");
    cus_8 = new BoardElement("rgb(66, 255, 224)", "#776e65", "");
    cus_16 = new BoardElement("rgb(0, 132, 255)", "white", "");
    cus_32 = new BoardElement("rgb(0, 81, 255)", "white", "");
    cus_64 = new BoardElement("rgb(25, 0, 255)", "white", "");
    cus_128 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 2px red");
    cus_256 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 4px red");
    cus_512 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 6px red");
    cus_1024 = new BoardElement("rgb(98, 0, 255)", "white", "0 0 5px 8px red");
    cus_2048 = new BoardElement("black", "white", "0 0 5px 8px white");
    der_morethen2048 = false;
    cus_morele = [
        [""],
        [""]
    ];
    ///////////UI
    customThemeLoaded = false;
    default_glowamt = 2;
    default_textcol = "#000000";
    default_bgcol = "#FFFFFF";
    default_glowCol = "#FFFFFF";


    //OpenClose
    const themeMakerDisplay = document.querySelector('.themepannel');
    const themeMakerClose = document.querySelector('.theme_closebtn');
    const themeMakerOpen = document.querySelector('.theme_openbtn');

    themeMakerOpen.addEventListener("click", openThemeMaker);
    themeMakerClose.addEventListener("click", closeThemeMaker);

    function openThemeMaker() {
        themeMakerDisplay.style.width = "250px";
        setCookie("theme-open","yes",1);
    }

    function closeThemeMaker() {
        themeMakerDisplay.style.width = "0";
        setCookie("theme-open","no",1);
    }
    let thememakerOpened = getCookie("theme-open");
    if (thememakerOpened != "") {
        if (thememakerOpened == "yes")
            openThemeMaker()
        else
            closeThemeMaker()

    }

    //TileSelector
    const themeTilelDisplay = document.querySelector('#themeTile');
    const themeTileincrease = document.querySelector('#themeTileincrese');
    const themeTiledecrease = document.querySelector('#themeTiledecrese');
    themeTileincrease.addEventListener("click", themeTileincrese);
    themeTiledecrease.addEventListener("click", themeTiledecrese);
    var tilenum = 2;

    function themeTileincrese() {
        tilenum = tilenum * 2;
        themeTilelDisplay.innerHTML = "<p>" + tilenum + "</p>";
        loadfromsave()
    }

    function themeTiledecrese() {
        tilenum = tilenum / 2;
        if (tilenum == 1) {
            tilenum = 2;
        }
        themeTilelDisplay.innerHTML = "<p>" + tilenum + "</p>";
        loadfromsave()
    }

    //Realtime

    function setreal() {
        setCookie("realtime", realtimeCheck.checked, 1);
    }
    if (realtime) {
        realtimeCheck.checked = true
    } else if (!realtime) {
        realtimeCheck.checked = false
    }
    realtimeCheck.addEventListener("change", setreal);
    //TextColour
    var textcolpciker = new iro.ColorPicker('#textcolpciker', {
        width: 150,
        color: default_textcol
    });
    textcol = textcolpciker.color.hexString;
    textcolpciker.on('color:change', function () {
        textcol = textcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    //BackgroundCol
    var bgcolpciker = new iro.ColorPicker('#bgcolpciker', {
        width: 150,
        color: default_bgcol
    });
    bgcol = bgcolpciker.color.hexString;
    bgcolpciker.on('color:change', function () {
        bgcol = bgcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    //GlowAmount
    const themeglowAmtlDisplay = document.querySelector('#themeglowAmt');
    const themeglowAmtincrease = document.querySelector('#themeglowAmtincrese');
    const themeglowAmtdecrease = document.querySelector('#themeglowAmtdecrese');
    themeglowAmtincrease.addEventListener("click", themeglowAmtincrese);
    themeglowAmtdecrease.addEventListener("click", themeglowAmtdecrese);
    var glowAmtnum = default_glowamt;

    function themeglowAmtincrese() {
        glowAmtnum += 2;
        themeglowAmtlDisplay.innerHTML = "<p>" + glowAmtnum + "px</p>";
        if (realtime) {
            makeintotile();
        }
    }

    function themeglowAmtdecrese() {
        glowAmtnum -= 2;
        if (glowAmtnum == 0) {
            glowAmtnum = 2;
        }
        themeglowAmtlDisplay.innerHTML = "<p>" + glowAmtnum + "px</p>";
        if (realtime) {
            makeintotile();
        }
    }
    //GlowCol
    var glowcolpciker = new iro.ColorPicker('#glowcolpciker', {
        width: 150,
        color: default_glowCol
    });
    glowCol = glowcolpciker.color.hexString;
    glowcolpciker.on('color:change', function () {
        glowCol = glowcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    function loadfromsave() {
        storedtheme = getCookie("customTheme");
        if (storedtheme != "") {
            customThemeLoaded = true;
            jsonedTheme = JSON.parse(storedtheme);
            //console.log(storedtheme)
            if (tilenum > 2048) {

            } else {
                for (let y = 0; y < jsonedTheme.options.length; y++) {
                    if (tilenum == parseInt(jsonedTheme.number[y])) {
                        boxshadow = jsonedTheme.options[y].boxshadow;
                        if (boxshadow != "") {
                            glowData = boxshadow.split(" ");
                            default_glowCol = glowData[4]
                            default_glowamt = parseInt(glowData[3].replace('px', ''));
                        }
                        //console.log(jsonedTheme.options[y].textcol)
                        default_textcol = jsonedTheme.options[y].textcol;
                        default_bgcol = jsonedTheme.options[y].bg;
                        bgcolpciker.color.set(default_bgcol);
                        textcolpciker.color.set(default_textcol);
                        glowcolpciker.color.set(default_glowCol);

                    }
                }
            }


        }
        //update pickers re changes
    }

    loadfromsave();
    ///Sumbmit button
    const submitbutton = document.querySelector('.makeTile');
    submitbutton.addEventListener("click", function () {
        makeintotile();
    });
    if(customThemeLoaded){
        makeintotile();
    }

    function makeintotile() {
        customThemeActive = true;
        //check  if cus_x
        //set cux_x to theme items
        if (tilenum == 2) {
            cus_2 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 4) {
            cus_4 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 8) {
            cus_8 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 16) {
            cus_16 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 32) {
            cus_32 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 64) {
            cus_64 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 128) {
            cus_128 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 256) {
            cus_256 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 512) {
            cus_512 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 1024) {
            cus_1024 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum == 2048) {
            cus_2048 = new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol);
        }
        if (tilenum > 2048) {
            der_morethen2048 = true;
            cus_morele[0].push(tilenum);
            cus_morele[1].push(new BoardElement(bgcol, textcol, "0 0 5px " + glowAmtnum + "px " + glowCol));
        }
        cus_theme = new Theme(cus_0, cus_2, cus_4, cus_8, cus_16, cus_32, cus_64, cus_128, cus_256, cus_512, cus_1024, cus_2048, der_morethen2048, cus_morele);
        themeData = JSON.stringify(cus_theme);
        setCookie("customTheme", themeData, 365);
        themeBoard(cus_theme);
    }

    //Theme externally loading and sharing
    //Make shareable
    const sharethemebutton = document.querySelector('#sharethemebutton');
    const loadthemebutton = document.querySelector('#loadthemebutton');
    const sharetext = document.querySelector('#sharetext');
    const sharethemediv = document.querySelector('.sharethemediv');
    const sharethemeinputbox = document.querySelector('#sharethemedata');
    const share_closebtn = document.querySelector('.share_closebtn');
    const sharetitle = document.querySelector('#sharetitle');
    const loadbutton = document.querySelector('#loadbutton');
    share_closebtn.addEventListener("click", closeshare);
    sharethemebutton.addEventListener("click", sharemytheme);
    loadthemebutton.addEventListener("click", loadtheme);
    loadbutton.addEventListener("click", loadthemedata);
    function sharemytheme(){
        makeintotile();
        sharethemediv.style.display = "block";
        loadbutton.style.display = "none";
        sharetitle.innerHTML = "Share Theme";
        website = window.location.href.split(".html")

        storedtheme = getCookie("customTheme");
        if (storedtheme != "") {
            jsonedTheme = JSON.parse(storedtheme);
            var encoded = btoa(JSON.stringify(jsonedTheme));
            sharethemeinputbox.value = encoded;
            sharetext.innerHTML = "Copy this text and share it with whoever. (Click inside and press ctrl-a then copy) or share this link <a href='"+website[0]+".html?rawTheme="+encoded+"'>Link to Theme</a>";
        }else{
            sharetext.innerHTML = "Please note you need a theme to use this tool."
        }
    }
    function closeshare(){
        sharethemediv.style.display = "none";
    }
    function loadtheme(){
        makeintotile();
        sharethemediv.style.display = "block";
        loadbutton.style.display = "block";
        sharetitle.innerHTML = "Load Theme";
        sharetext.innerHTML = "Paste your text and press the buton below";


    }
    function loadthemedata(){
        console.log("Loading..")
        let shareddata = sharethemeinputbox.value;
        try{
            var decoded = atob(shareddata);
        }catch(err) {
            sharethemeinputbox.value = "ERROR LOADING";
        }
        try{
            var jsondata = JSON.parse(decoded)
        }catch(err) {
            sharethemeinputbox.value = "ERROR LOADING";
        }

        if(jsondata == ""){
            sharethemeinputbox.value = "ERROR LOADING";
        }
        if(jsondata.encodedproperly == ""){
            sharethemeinputbox.value = "ERROR LOADING";
        }
        if(jsondata.encodedproperly == "it_works_pls_dont_mess_with_this_otherwise_it_breaks"){
            console.log("WORKS")
            setCookie("customTheme", decoded, 365);
            loadfromsave();
            closeshare();
        }else{
            sharethemeinputbox.value = "ERROR LOADING";
        }
    }

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

    function BoardElement(bg, textcol, boxshadow) {
        this.bg = bg;
        this.textcol = textcol;
        this.boxshadow = boxshadow;
    }

    function Theme(zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight, more2048, elemore) {
        this.zero = zero;
        this.two = two;
        this.four = four;
        this.eight = eight;
        this.sixteen = sixteen;
        this.thirtytwo = thirtytwo;
        this.sixtyfour = sixtyfour;
        this.onetwentyeight = onetwentyeight;
        this.twofiftysix = twofiftysix;
        this.fivetwelve = fivetwelve;
        this.oneohtwentyfour = oneohtwentyfour;
        this.twozerofoureight = twozerofoureight;
        this.number = ["0", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
        this.options = [zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight];
        this.moreenabled = more2048;
        this.elementMore = elemore;
        this.encodedproperly = "it_works_pls_dont_mess_with_this_otherwise_it_breaks";
    }

    function themeBoard(Theme) {
        t_0 = Theme.zero;
        t_2 = Theme.two;
        t_4 = Theme.four;
        t_8 = Theme.eight;
        t_16 = Theme.sixteen;
        t_32 = Theme.thirtytwo;
        t_64 = Theme.sixtyfour;
        t_128 = Theme.onetwentyeight;
        t_256 = Theme.twofiftysix;
        t_512 = Theme.fivetwelve;
        t_1024 = Theme.oneohtwentyfour;
        t_2048 = Theme.twozerofoureight;
        for (let x = 0; x < squares.length; x++) {
            for (let y = 0; y < Theme.options.length; y++) {
                if (parseInt(squares[x].innerHTML) == parseInt(Theme.number[y])) {
                    squares[x].style.color = Theme.options[y].textcol;
                    squares[x].style.background = Theme.options[y].bg;
                    squares[x].style.boxShadow = Theme.options[y].boxshadow;
                }
            }
            if (parseInt(squares[x].innerHTML) > 2048) {
                if (Theme.moreenabled) {
                    themedtile = false;
                    for (let y = 0; y < Theme.elementMore[0].length; y++) {
                        if (parseInt(squares[x].innerHTML) == parseInt(Theme.elementMore[0][y])) {
                            squares[x].style.color = Theme.elementMore[1][y].textcol;
                            squares[x].style.background = Theme.elementMore[1][y].bg;
                            squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                            themedtile = true;
                        }
                    }
                    if (!themedtile) {
                        squares[x].style.color = Theme.elementMore[1][Theme.elementMore[1].length - 1].textcol;
                        squares[x].style.background = Theme.elementMore[1][Theme.elementMore[1].length - 1].bg;
                        squares[x].style.boxShadow = Theme.elementMore[1][Theme.elementMore[1].length - 1].boxshadow;
                    }
                } else {
                    squares[x].style.color = Theme.options[Theme.options.length - 1].textcol;
                    squares[x].style.background = Theme.options[Theme.options.length - 1].bg;
                    squares[x].style.boxShadow = Theme.options[Theme.options.length - 1].boxshadow;
                }

            }
        }
    }

    createBoard();
    themeBoard(def_theme)
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
        goalDisplay.innerHTML = "<p>" + goal + "</p>";
        document.title = goal + " | Max Tyson";
        setCookie("goal", goal, 1);
    }
    goalincrease.addEventListener("click", function () {
        setgoal(2);
    });
    goaldecrease.addEventListener("click", function () {
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
    sizeincrease.addEventListener("click", function () {
        setsize(2);
    });
    sizedecrease.addEventListener("click", function () {
        setsize(1);
    });
    sizeDisplay.innerHTML = "<p>" + width + "</p>";

    function setreverse() {

        setCookie("reverse", reverseCheck.checked, 1);
        if (reverseCheck.checked) {
            setCookie("goal", 2, 1);
        } else {
            setCookie("goal", 2048, 1);
        }
        console.log(getCookie("reverse"))
        location.reload();
    }
    if (reverse) {
        reverseCheck.checked = true
    } else if (!reverse) {
        reverseCheck.checked = false
    }
    //	console.log(reverseCheck.checked +"="+reverse);
    reverseCheck.addEventListener("change", setreverse);
    autoplayCheck.addEventListener("change", autoplay);


    function generate() {
        let randNum = Math.floor(Math.random() * squares.length);
        if (squares[randNum].innerHTML == 0) {
            if (reverse) {
                var newel = squares[randNum].cloneNode(true);
                squares[randNum].parentNode.replaceChild(newel, squares[randNum]);
                squares[randNum] = newel;
                squares[randNum].innerHTML = 2048;
            } else {
                var newel = squares[randNum].cloneNode(true);
                squares[randNum].parentNode.replaceChild(newel, squares[randNum]);
                squares[randNum] = newel;
                squares[randNum].innerHTML = 2;
            }

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
                    let oldval = parseInt(squares[x + y].innerHTML);
                    squares[x + y].innerHTML = newRow[0 + y];
                    if (newRow[0 + y] != 0 && oldval != newRow[0 + y]) {
                        squares[x + y].parentNode.classList.add("animate-right");
                        squares[x + y].parentNode.addEventListener('animationend', function () {
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
                    let oldval = parseInt(squares[x + y].innerHTML);
                    squares[x + y].innerHTML = newRow[0 + y];
                    if (newRow[0 + y] != 0 && oldval != newRow[0 + y]) {
                        squares[x + y].parentNode.classList.add("animate-left");
                        squares[x + y].parentNode.addEventListener('animationend', function () {
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
                let oldval = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
                    squares[x + y * width].parentNode.classList.add("animate-down");
                    squares[x + y * width].parentNode.addEventListener('animationend', function () {
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
                let oldval = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
                    squares[x + y * width].parentNode.classList.add("animate-up");
                    squares[x + y * width].parentNode.addEventListener('animationend', function () {
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
                if (mode != "nocheck")
                    score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkhigh();
                squares[x].innerHTML = combinedTotal;
                if (mode != "nocheck")
                    checkbest();
                squares[x + 1].innerHTML = 0;
                if (mode == "left") {
                    //console.log("Left: "+x)
                    if (parseInt(squares[x].innerHTML) != 0) {
                        squares[x].parentNode.classList.add("animate-pop");
                        squares[x].parentNode.addEventListener('animationend', function () {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                } else {

                    if (parseInt(squares[x].innerHTML) != 0) {

                        squares[x + 1].parentNode.classList.add("animate-pop");
                        squares[x + 1].parentNode.addEventListener('animationend', function () {
                            squares[x + 1].parentNode.classList.remove('animate-pop');
                        })
                    }
                }


            }

        }
        if (mode != "nocheck")
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
                if (mode != "nocheck")
                    score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkhigh();
                squares[x].innerHTML = combinedTotal;
                if (mode == "up") {
                    if (parseInt(squares[x].innerHTML) != 0) {
                        squares[x].parentNode.classList.add("animate-pop");
                        squares[x].parentNode.addEventListener('animationend', function () {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                } else {
                    if (parseInt(squares[x].innerHTML) != 0) {
                        squares[x + width].parentNode.classList.add("animate-pop");
                        squares[x + width].parentNode.addEventListener('animationend', function () {
                            squares[x + width].parentNode.classList.remove('animate-pop');
                        })
                    }
                }
                if (mode != "nocheck")
                    checkbest();

                squares[x + width].innerHTML = 0;
            }

        }
        if (mode != "nocheck")
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
                scoreResult.style.width = (width * 100) + "px";
                scoreResult.style.height = width * 100 + "px";
                scoreResult.style.background = "lightgreen";
                scoreResult.innerHTML = "<h1 style='font-size: " + (width * width) * 5 + "px;'>You Win!</h1><button onclick='location.reload()'>Replay</button><button id='cont'>Continue</button>"
                document.getElementById("cont").addEventListener("click", continueGame);
                autoplayCheck.checked = false;
                autoplayCheck.removeEventListener("change", autoplay);
                document.removeEventListener('keyup', control);
            }

        }
    }

    function checkGameOver() {
        let zeros = 0;

        let tmpsquares = [];
        for (let x = 0; x < squares.length; x++) {
            if (squares[x].innerHTML == 0) {
                zeros++;

            }
            tmpsquares.push(squares[x])
        }
        if (zeros === 0) {
            let possible = false;
            for (let x = 0; x < (width * width) - 1; x++) {
                if (tmpsquares[x].innerHTML === tmpsquares[x + 1].innerHTML) {
                    possible = true;
                }
            }
            for (let x = 0; x < (width * width) - width; x++) {
                if (squares[x].innerHTML === squares[x + width].innerHTML) {
                    possible = true;
                }
            }
            if (!possible) {
                scoreResult.style.display = "block";
                scoreResult.style.width = width * 100 + "px";
                scoreResult.style.height = width * 100 + "px";
                scoreResult.innerHTML = "<h1 style='font-size: " + (width * width) * 5 + "px;'>You Lose</h1><button onclick='location.reload()'>Replay</button>";
                autoplayCheck.enabled = false;
                autoplayCheck.removeEventListener("change", autoplay);
                document.removeEventListener('keyup', control);
            }


        }


    }

    function checkhigh() {
        if (!reverse) {
            let current = parseInt(scoreDisplay.innerHTML);
            let high = getCookie("highscore");
            if (high != "") {
                if (current >= high) {
                    setCookie("highscore", current, 365);
                }
            } else {
                setCookie("highscore", current, 365);
            }
            hscoreDisplay.innerHTML = high;
        } else {
            hscoreDisplay.innerHTML = "Unavalible in reverse mode.";
        }
    }

    function checkh_best() {
        if (!reverse) {

            let current = parseInt(bestDisplay.innerHTML);
            let high = getCookie("bestscore");
            if (high != "") {
                if (current >= high) {
                    setCookie("bestscore", current, 365);
                }
            } else {
                setCookie("bestscore", current, 365);
            }
            hbestDisplay.innerHTML = high;
        } else {
            hbestDisplay.innerHTML = "Unavalible in reverse mode.";
        }


    }

    function checkbest() {
        let current = parseInt(bestDisplay.innerHTML);
        let best = current;
        for (let x = 0; x < squares.length; x++) {
            if (reverse) {
                best = 2048;
                if (parseInt(squares[x].innerHTML) <= best) {
                    if (parseInt(squares[x].innerHTML) == 0) {

                    } else {
                        best = parseInt(squares[x].innerHTML);
                    }

                }
            } else {
                if (parseInt(squares[x].innerHTML) >= best) {
                    best = parseInt(squares[x].innerHTML);
                }
            }

        }
        checkh_best();
        bestDisplay.innerHTML = best;


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
        if (customThemeActive) {
            themeBoard(cus_theme);
        } else {
            themeBoard(def_theme);
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

    function autoplay() {
        if (autoplayCheck.checked) {
            setTimeout(function () {
                document.removeEventListener('keyup', control);
                let min = Math.ceil(1);
                let max = Math.floor(5);
                let rand = Math.floor(Math.random() * (max - min) + min); //The
                if (rand == 1)
                    keyLeft();
                else if (rand == 2)
                    keyRight();
                else if (rand == 3)
                    keyup();
                else if (rand == 4)
                    keydown();
                themeBoard(def_theme)
                autoplay();
            }, 100);
        } else {
            document.addEventListener('keyup', control);
        }

    }
    var passedTheme = getUrlVar("rawTheme")
    if (passedTheme != undefined){
        sharethemeinputbox.value = passedTheme;
        loadthemedata();
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
function resetTheme(){
    setCookie("customTheme", "", 365);
    location.reload();
}