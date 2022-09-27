document.addEventListener('DOMContentLoaded', loaded);
if (!window.location.href.includes("index.html")) {
    window.location.href = "index.html";
}
openNav = "";
closeNav = "";
//__________________Done this update___________________________

//Fixed Replay saving/loading
//Added How to Play
//Theme Details
//Moved Around Game Controls

//_______________________NEXT__________________________________

//Game modes


//--Modes
//----tetris
//----cnsl ver
//Gamemode exporting

//__________________Remake Tiles b4___________________________

//Game modes
//--flappy
//--racing
//Replay direction backward/forward
//Animate Back

//______________________FINAL_________________________________

//make ai, ai give hint or image
//COMENT all this uhgh

//_______________________FUTURE________________________________


//mod maker

function loaded() {

    vecookie = getCookie("version");
    if (vecookie != "21") {
        setCookie("version", "21", 356); //22
        setCookie("settingsData", "", 356);
        setCookie("savedgames", "", 356);

    }

    const headertext = document.querySelector('.goaltext');
    const headertext2 = document.querySelector('.goaltext2');



    ////////////////////////////////////////////////////////SETTINGS////////////////////////////////////////////////////////
    //--------------------------------------------------------------------------------------------------------------------//
    //__________________________________________________Settings-Vars_____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    //CLASS
    zoom = 100;

    let settingsData = {}
    //If cookie then  load it
    if (getCookie("settingsData") != "") {
        settingsData = JSON.parse(getCookie("settingsData"));

    } else {
        settingsData.goal = 2048;
        settingsData.spwantile = 2;
        settingsData.width = 4;
        settingsData.reverse = false;
        settingsData.savemode = true;
        settingsData.opened = false;
        settingsData.theme_opened = false;
        settingsData.themeopened = false;
        settingsData.movecap = 0;
        settingsData.gamemode = "Default";
        settingsData.currentgamemode = 0;
        settingsData.realtime = false;
        settingsData.replayopened = false;
        settingsData.zoom = 100;
        setCookie("settingsData", JSON.stringify(settingsData), 1);

    }
    function loadsettingstovar() {
        goal = settingsData.goal;
        spwantile = settingsData.spwantile;
        width = settingsData.width;
        reverse = settingsData.reverse;
        savemode = settingsData.savemode;
        opened = settingsData.opened;
        movecap = settingsData.movecap;
        realtime = settingsData.realtime;
        zoom = settingsData.zoom;
        gamemode = settingsData.gamemode;
        currentgamemode = settingsData.currentgamemode;
    }
    function updatezoom() {

        root = document.documentElement;
        root.style.setProperty('--anim-move', "-" + zoom + "px");
        root.style.setProperty('--full-zoom', zoom + "px");
        root.style.setProperty('--half-zoom', zoom / 6 + "px");
        root.style.setProperty('--tile-zoom', zoom - (zoom / 10) + "px");
        root.style.setProperty('--border-zoom', (zoom / 10) / 2 + "px");
        for (let g = 0; g < games.length; g++) {
            games[g].gridDisplay.style.width = width * zoom + "px";
            games[g].gridDisplay.style.height = width * zoom + "px";
            games[g].checkGameOver();
            games[g].checkWin();
            if (customThemeActive) {
                games[g].themeBoard(cus_theme);
            } else {
                games[g].themeBoard(def_theme);
            }
        }

    }

    loadsettingstovar();
    //GAMEMODE
    const gameModeDisplay = document.querySelector('#gameMode');
    const gameModeincrease = document.querySelector('#gameModeincrease');
    const gameModedecrease = document.querySelector('#gameModedecrese');
    gamemodename = ["Default", "Upsidedown"]


    //GOAL
    const goalDisplay = document.querySelector('#goal');
    const goalincrease = document.querySelector('#goalincrease');
    const goaldecrease = document.querySelector('#goaldecrease');
    //zoom
    const zoomDisplay = document.querySelector('#zoom');
    const zoomincrease = document.querySelector('#zoomincrease');
    const zoomdecrease = document.querySelector('#zoomdecrease');

    //SPAWN
    const spawnDisplay = document.querySelector('#spawn');
    const spawnincrease = document.querySelector('#spawnincrease');
    const spawndecrease = document.querySelector('#spawndecrease');

    //SIZE
    const sizeDisplay = document.querySelector('#size');
    const sizeincrease = document.querySelector('#sizeincrease');
    const sizedecrease = document.querySelector('#sizedecrease');
    //REVERSED
    const reverseCheck = document.querySelector('#reverse');
    //Allow SAVING
    const savemodeCheck = document.querySelector('#savemode');
    //false converter insert here
    //AUTOPLAY
    const autoplayCheck = document.querySelector('#auto');
    //Moves

    const movescapdisplay = document.querySelector('#movecap');
    const moveincrease = document.querySelector('#moveincrease');
    const movedecrease = document.querySelector('#movedecrease');

    //REVERSED
    const realtimeCheck = document.querySelector('#realtime');

    //--------------------------------------------------------------------------------------------------------------------//
    //_______________________________________________Settings-Functions___________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//

    function updategamemode() {
        gamemode = gamemodename[currentgamemode];
        settingsData.currentgamemode = currentgamemode;
        settingsData.gamemode = gamemode;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        for (let g = 0; g < games.length; g++) {
            games[g].reset2();
        }
        ReloadPage();
    }

    function gamemodeeincrese() {
        if (currentgamemode + 1 == gamemodename.length) {
            currentgamemode = 0;
        } else {
            currentgamemode += 1;
        }
        updategamemode();
    }

    function gamemodedecrese() {

        if (currentgamemode - 1 == -1) {
            currentgamemode = gamemodename.length - 1;
        } else {
            currentgamemode -= 1;
        }
        updategamemode();
    }



    //SPAWN
    function setspawn(mode) {

        if (mode == 1) {
            if (spwantile != 1)
                settingsData.spwantile -= 1;
            else
                settingsData.spwantile = 1;
        }
        if (mode == 2) {
            settingsData.spwantile += 1;
        }
        spawnDisplay.innerHTML = "<p>" + settingsData.spwantile + "</p>";
        loadsettingstovar();
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        if (mode != 0) {
            for (let g = 0; g < games.length; g++) {
                games[g].reset2();
            }
            ReloadPage();
        }
    }
    spawnincrease.addEventListener("click", function () {
        setspawn(2);
    });
    spawndecrease.addEventListener("click", function () {
        setspawn(1);
    });
    //ZOOM
    function setzoom(mode) {

        if (mode == 1) {
            if (zoom != 50)
                settingsData.zoom -= 5;
            else
                settingsData.zoom = 50;
        }
        if (mode == 2) {
            if (zoom != 200)
                settingsData.zoom += 5;
            else
                settingsData.zoom = 200;
        }
        zoomDisplay.innerHTML = "<p>" + settingsData.zoom + "%</p>";
        if (mode != 0) {
            loadsettingstovar();
            updatezoom();
        }

        setCookie("settingsData", JSON.stringify(settingsData), 1);
    }
    zoomincrease.addEventListener("click", function () {
        setzoom(2);
    });
    zoomdecrease.addEventListener("click", function () {
        setzoom(1);
    });
    setzoom(0);
    //GOAL
    function setgoal(mode) {

        let stepscookie = getCookie("steps");
        if (stepscookie == "") {
            setCookie("steps", 11, 1);
            setps = 11;
        } else {
            setps = parseInt(stepscookie);
        }
        currentstep = 1;
        if (!reverse) {
            startnum = spwantile;
            for (let y = 2; y < setps + 1; y++) {
                startnum = startnum * 2;
            }
            goal = startnum;
        }

        if (mode == 1) {
            if (goal != spwantile) {
                settingsData.goal = goal / 2;
                setCookie("steps", setps - 1, 1);
            } else
                settingsData.goal = 2;
        }
        if (mode == 2) {
            settingsData.goal = goal * 2;
            setCookie("steps", setps + 1, 1);
        }
        goal = settingsData.goal;
        headertext.innerHTML = goal;
        headertext2.innerHTML = goal;
        goalDisplay.innerHTML = "<p>" + goal + "</p>";
        document.title = goal + " | Max Tyson";

        setCookie("settingsData", JSON.stringify(settingsData), 1);
    }
    goalincrease.addEventListener("click", function () {
        setgoal(2);
    });
    goaldecrease.addEventListener("click", function () {
        setgoal(1);
    });


    function setsize(mode) {

        if (mode == 1) {
            if (width != 2)
                size = width - 2;
            else
                size = 2;
        }
        if (mode == 2) {
            size = width + 2;
        }
        settingsData.width = size;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        for (let g = 0; g < games.length; g++) {
            resetGame(games[g], 1);
        }
        ReloadPage();

    }
    sizeincrease.addEventListener("click", function () {
        setsize(2);
    });
    sizedecrease.addEventListener("click", function () {
        setsize(1);
    });


    function setmovecap(mode) {

        if (mode == 1) {
            if (movecap != 0)
                movecap -= 100;
            else
                movecap = 0;
        }
        if (mode == 2) {
            movecap += 100;
        }
        settingsData.movecap = movecap;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        movescapdisplay.innerHTML = "<p>" + settingsData.movecap + "</p>";
    }
    moveincrease.addEventListener("click", function () {
        setmovecap(2);
    });
    movedecrease.addEventListener("click", function () {
        setmovecap(1);
    });




    function setreverse() {


        if (reverseCheck.checked) {
            settingsData.reverse = true;
            settingsData.goal = 2;
            settingsData.spwantile = 2048;
        } else {
            settingsData.reverse = false;
            settingsData.goal = 2048;
            settingsData.spwantile = 2;
        }
        loadsettingstovar()
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        for (let g = 0; g < games.length; g++) {
            games[g].reset2();
        }

    }
    if (reverse) {
        reverseCheck.checked = true
    } else if (!reverse) {
        reverseCheck.checked = false
    }



    function setsave() {


        savemode = savemodeCheck.checked;
        settingsData.savemode = savemode;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
    }
    if (savemode) {
        savemodeCheck.checked = true
    } else if (!savemode) {
        savemodeCheck.checked = false
    }



    openNav = function openNavFunct() {

        settingsData.opened = true;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        document.getElementById("settingspannel").style.width = "250px";
    }

    closeNav = function closeNavFunct() {
        settingsData.opened = false;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        document.getElementById("settingspannel").style.width = "0";
    }



    if (settingsData.opened)
        openNav()
    else
        closeNav();

    function setSettings() {
        setspawn(0);
        setgoal(0);
        sizeDisplay.innerHTML = "<p>" + width + "</p>";
        movescapdisplay.innerHTML = "<p>" + movecap + "</p>";
        reverseCheck.addEventListener("change", setreverse);
        savemodeCheck.addEventListener("change", setsave);
        autoplayCheck.addEventListener("change", autoplay);
        gameModeincrease.addEventListener("click", gamemodeeincrese);
        gameModedecrease.addEventListener("click", gamemodedecrese);
        gameModeDisplay.innerHTML = "<p>" + gamemode + "</p>";
    }



    ////////////////////////////////////////////////////////THEME////////////////////////////////////////////////////////////
    //--------------------------------------------------------------------------------------------------------------------//
    //__________________________________________________Theme-THemes______________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
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
    ////Example game Empty    Board     Background    Body     Score     tagline
    def_gametheme = [def_0, "#cacece", "#72b182ab", "#fffff", "#808080", "WildCard"];
    def_theme = new Theme(def_0, def_2, def_4, def_8, def_16, def_32, def_64, def_128, def_256, def_512, def_1024, def_2048, der_morethen2048, def_morele, def_gametheme);
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
    cus_gametheme = [cus_0, "#cacece", "#72b182ab", "#776e65", "#808080", "WildCard"];
    cus_morele = [
        [],
        []
    ];
    cus_theme = new Theme(cus_0, cus_2, cus_4, cus_8, cus_16, cus_32, cus_64, cus_128, cus_256, cus_512, cus_1024, cus_2048, der_morethen2048, cus_morele, cus_gametheme);
    //--------------------------------------------------------------------------------------------------------------------//
    //__________________________________________________Theme-Vars________________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    ///////////UI
    customThemeLoaded = false;
    default_glowamt = 0;
    default_textcol = "#000000";
    default_bgcol = "#FFFFFF";
    default_glowCol = "#FFFFFF";
    zerocol = "rgb(128, 190, 128)"
    boardcol = "#cacece"
    bodytextcol = "#ffffff"
    bodybgcol = "#72b182ab"
    scorecol = "#808080";
    tagline = "WildCard";
    //OpenClose
    const themeMakerDisplay = document.querySelector('.themepannel');
    const themeMakerClose = document.querySelector('.theme_closebtn');
    const themeMakerOpen = document.querySelector('.theme_openbtn');



    //--------------------------------------------------------------------------------------------------------------------//
    //________________________________________________Theme-THememaker____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    ///////////UI//////////////
    function openThemeMaker() {

        closeReplay();
        settingsData.theme_opened = true;
        setCookie("settingsData", JSON.stringify(settingsData), 365);
        themeMakerDisplay.style.width = "250px";

    }

    function closeThemeMaker() {
        debug("funct_closethememaker", 2);
        themeMakerDisplay.style.width = "0";
        settingsData.theme_opened = false;
        setCookie("settingsData", JSON.stringify(settingsData), 365);
    }


    //TileSelector
    const themeTilelDisplay = document.querySelector('#themeTile');
    const themeTileincrease = document.querySelector('#themeTileincrese');
    const themeTiledecrease = document.querySelector('#themeTiledecrese');
    themeTileincrease.addEventListener("click", themeTileincrese);
    themeTiledecrease.addEventListener("click", themeTiledecrese);
    var tilenum = 2;
    var tempnum = spwantile;
    if (reverse)
        tempnum = goal


    function themeTileincrese() {
        debug("funct_increasetile", 2);
        tilenum = tilenum * 2;
        tempnum = tempnum * 2;

        themeTilelDisplay.innerHTML = "<p>" + tempnum + "</p>";
        loadtilefromsave()
    }

    function themeTiledecrese() {
        debug("funct_decreasetile", 2);
        tilenum = tilenum / 2;
        if (tilenum == 1) {
            themeTileincrese();
        }
        if (reverse) {
            if (tempnum / 2 <= goal) {
                tempnum = goal;
            } else {
                tempnum = tempnum / 2;
            }
        } else {
            if (tempnum / 2 <= spwantile) {
                tempnum = spwantile;
            } else {
                tempnum = tempnum / 2;
            }
        }

        themeTilelDisplay.innerHTML = "<p>" + tempnum + "</p>";
        loadtilefromsave()
    }

    //Realtime
    function setreal() {

        settingsData.realtime = realtimeCheck.checked;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
    }
    if (realtime) {
        realtimeCheck.checked = true
    } else if (!realtime) {
        realtimeCheck.checked = false
    }


    ///////Theme Mode//////
    const themeModeDisplay = document.querySelector('#themeMode');
    const colurmode = document.querySelector('.colourmode');
    const imagemode = document.querySelector('.imagemode');
    modes = [colurmode, imagemode]
    modename = ["Colour", "Image"]
    const themeModeincrease = document.querySelector('#themeModeincrese');
    const themeModedecrease = document.querySelector('#themeModedecrese');
    themeModeincrease.addEventListener("click", themeModeincrese);
    themeModedecrease.addEventListener("click", themeModedecrese);
    var currentmode = 0;

    function updatemode() {
        for (let y = 0; y < modes.length; y++) {

            if (y == currentmode) {
                modes[y].style.display = "block";


            } else {
                modes[y].style.display = "none";

            }
        }
        themeModeDisplay.innerHTML = "<p>" + modename[currentmode] + "</p>";
    }

    function themeModeincrese() {
        //("Increase");


        if (currentmode + 1 == modes.length) {
            currentmode = 0;
        } else {
            currentmode += 1;
        }
        updatemode() //put this bellow increeser later
    }

    function themeModedecrese() {
        //("Decrease");

        if (currentmode - 1 == -1) {
            currentmode = modes.length - 1;
        } else {
            currentmode -= 1;
        }
        updatemode();
    }



    //////Image
    //Image Source
    const urlinput = document.querySelector('#imgurl');

    var urldata = "";

    function seturl() {
        urldata = urlinput.value;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    }

    ///////Colour Pickers////////////
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
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
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
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    //GlowAmount
    const themeglowAmtlDisplay = document.querySelector('#themeglowAmt');
    const themeglowAmtincrease = document.querySelector('#themeglowAmtincrese');
    const themeglowAmtdecrease = document.querySelector('#themeglowAmtdecrese');
    var glowAmtnum = default_glowamt;

    function themeglowAmtincrese() {
        debug("funct_glowincraese", 2);
        glowAmtnum += 2;
        themeglowAmtlDisplay.innerHTML = "<p>" + glowAmtnum + "px</p>";
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    }

    function themeglowAmtdecrese() {
        debug("funct_glowdecrease", 2);
        glowAmtnum -= 2;
        if (glowAmtnum == 0) {
            glowAmtnum = 2;
        }
        themeglowAmtlDisplay.innerHTML = "<p>" + glowAmtnum + "px</p>";
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
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
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });

    //ZeroCol
    var zerocolpciker = new iro.ColorPicker('#zeropicker', {
        width: 150,
        color: zerocol
    });
    zerocol = zerocolpciker.color.hexString;
    zerocolpciker.on('color:change', function () {
        zerocol = zerocolpciker.color.hexString;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    var boardcolpciker = new iro.ColorPicker('#boardpicker', {
        width: 150,
        color: boardcol
    });
    boardcol = boardcolpciker.color.hexString;
    boardcolpciker.on('color:change', function () {
        boardcol = boardcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    var bodybgcolpciker = new iro.ColorPicker('#worldbgpicker', {
        width: 150,
        color: bodybgcol
    });
    bodybgcol = bodybgcolpciker.color.hexString;
    bodybgcolpciker.on('color:change', function () {
        bodybgcol = bodybgcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    var bodytextcolpciker = new iro.ColorPicker('#worldtextpicker', {
        width: 150,
        color: bodytextcol
    });
    bodytextcol = bodytextcolpciker.color.hexString;
    bodytextcolpciker.on('color:change', function () {
        bodytextcol = bodytextcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    var scorecolpciker = new iro.ColorPicker('#worldscore', {
        width: 150,
        color: scorecol
    });
    scorecol = scorecolpciker.color.hexString;
    scorecolpciker.on('color:change', function () {
        scorecol = scorecolpciker.color.hexString;
        if (realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
        }
    });
    const taginput = document.querySelector('#taginput');

    function settag() {
        tagline = taginput.value;

        if (realtime)
            makeintotile()
    }

    const submitbutton = document.querySelector('.makeTile');
    if (!realtime) {
        submitbutton.innerHTML = "Set Tile"
    } else {
        submitbutton.innerHTML = "Apply Theme"
    }
    submitbutton.addEventListener("click", function () {
        if (!realtime) {
            makeintotile();
            for (let g = 0; g < games.length; g++) {
                games[g].themeBoard(cus_theme);
            }
            applytheme();
        } else {
            applytheme();
        }

    });
    if (customThemeLoaded) {
        makeintotile();
    }
    ///////////Loading

    function loadtilefromsave(initial = false) {
        debug("loadfromsave", 1);
        storedtheme = getCookie("customTheme");


        if (storedtheme != "") {
            jsonedTheme = JSON.parse(storedtheme);
            customThemeLoaded = true;
            tinum = tilenum;
            firnum = 2;
            stpnum = 1;
            if (tinum != 0) {
                for (let y = 1; y < 12 + jsonedTheme.elementMore[0].length; y++) {
                    if (firnum == tinum) {
                        stpnum = y;


                        break
                    } else {
                        firnum = firnum * 2;
                    }
                }
            }
            if (tilenum >= 4096) {
                if (jsonedTheme.elementMore[0].length != 0) {
                    cus_morele = jsonedTheme.elementMore;

                }

                for (let y = 0; y < jsonedTheme.elementMore[0].length; y++) {
                    if (stpnum == parseInt(jsonedTheme.elementMore[0][y])) {

                        boxshadow = jsonedTheme.elementMore[1][y].boxshadow;
                        if (boxshadow != "") {
                            glowData = boxshadow.split(" ");
                            default_glowCol = glowData[4]
                            glowAmtnum = parseInt(glowData[3].replace('px', ''));


                        }
                        default_textcol = jsonedTheme.elementMore[1][y].textcol;
                        default_bgcol = jsonedTheme.elementMore[1][y].bg;
                        bgcolpciker.color.set(default_bgcol);
                        textcolpciker.color.set(default_textcol);
                        glowcolpciker.color.set(default_glowCol);
                        if (jsonedTheme.elementMore[1][y].imagemode) {
                            currentmode = 0;
                            updatemode();
                            urldata = jsonedTheme.elementMore[1][y].imageurl;
                            urlinput.value = urldata;
                            makeintotile()
                        } else {
                            currentmode = 1;
                            updatemode()
                            urlinput.value = "";


                        }

                    }
                }
            } else {

                for (let y = 0; y < jsonedTheme.options.length; y++) {
                    if (stpnum == parseInt(jsonedTheme.number[y])) {

                        boxshadow = jsonedTheme.options[y].boxshadow;
                        if (boxshadow != "") {
                            glowData = boxshadow.split(" ");
                            default_glowCol = glowData[4]
                            glowAmtnum = parseInt(glowData[3].replace('px', ''));

                        }

                        default_textcol = jsonedTheme.options[y].textcol;
                        default_bgcol = jsonedTheme.options[y].bg;
                        bgcolpciker.color.set(default_bgcol);
                        textcolpciker.color.set(default_textcol);
                        glowcolpciker.color.set(default_glowCol);
                        if (jsonedTheme.options[y].imagemode) {
                            currentmode = 1;
                            updatemode();
                            urldata = jsonedTheme.options[y].imageurl;
                            urlinput.value = urldata;
                            makeintotile() //single  line fixed the theming problemds, once again
                        } else {
                            currentmode = 0;
                            updatemode()
                            urlinput.value = "";

                        }


                    }
                }
            }
        }

    }

    function loadallfromsave() {
        debug("funct_loadall", 2);
        cache_tilenum = tilenum;
        storedtheme = getCookie("customTheme");

        if (storedtheme != "") {
            customThemeLoaded = true;
            jsonedTheme = JSON.parse(storedtheme);
            while (tilenum != 2048) {

                loadtilefromsave(true);
                makeintotile(false);

                tilenum = tilenum + tilenum;
            }
            loadtilefromsave(true);
            makeintotile(false);
            for (let y = 0; y < jsonedTheme.elementMore[0].length; y++) {

                tilenum = tilenum * 2;
                loadtilefromsave();
                makeintotile(false);
            }
            tilenum = cache_tilenum;
            zerocol = jsonedTheme.zero.bg;
            zerocolpciker.color.set(zerocol);
            boardcol = jsonedTheme.gamethem[1];
            boardcolpciker.color.set(boardcol);
            bodybgcol = jsonedTheme.gamethem[2];
            bodybgcolpciker.color.set(bodybgcol);
            bodytextcol = jsonedTheme.gamethem[3];
            bodytextcolpciker.color.set(bodytextcol);
            scorecol = jsonedTheme.gamethem[4];
            scorecolpciker.color.set(scorecol);
            tagline = jsonedTheme.gamethem[5];
            taginput.value = tagline;


            // makeintotile(); THIS LINE  WAS CAUSING THE MF 2 not beign coloure corclty BUG, I  STG 2 HRS WASTED UGHHHHHHHHHHH
        }

    }


    ///////////Theming tiles
    function makeintotile(save = true) {
        debug("funct_maketile", 2);
        customThemeActive = true;
        cus_0 = new BoardElement(zerocol, zerocol, "");
        if (tilenum == 2) {
            cus_2 = newBoardElemet();
        }
        if (tilenum == 4) {

            cus_4 = newBoardElemet();
        }
        if (tilenum == 8) {
            cus_8 = newBoardElemet();

        }
        if (tilenum == 16) {
            cus_16 = newBoardElemet();
        }
        if (tilenum == 32) {
            cus_32 = newBoardElemet();
        }
        if (tilenum == 64) {
            cus_64 = newBoardElemet();
        }
        if (tilenum == 128) {
            cus_128 = newBoardElemet();
        }
        if (tilenum == 256) {
            cus_256 = newBoardElemet();
        }
        if (tilenum == 512) {
            cus_512 = newBoardElemet();
        }
        if (tilenum == 1024) {

            cus_1024 = newBoardElemet();

        }
        if (tilenum == 2048) {
            cus_2048 = newBoardElemet();
        }
        if (tilenum >= 4096) {
            firnum = 2;
            stpnum = 1;

            for (let y = 1; y < tilenum; y++) {
                if (firnum == tilenum) {
                    stpnum = y;
                    break
                } else {
                    firnum = firnum * 2;
                }
            }


            der_morethen2048 = true;
            if (cus_morele.length != 0) {
                replaced = false;
                for (let y = 0; y < cus_morele[0].length; y++) {
                    if (stpnum == parseInt(cus_morele[0][y])) {
                        cus_morele[0][y] = stpnum;
                        cus_morele[1][y] = newBoardElemet();

                        replaced = true;
                    }

                }
                if (!replaced) {
                    cus_morele[0].push(stpnum);
                    cus_morele[1].push(newBoardElemet());
                }
            } else {

                cus_morele[0].push(stpnum);
                cus_morele[1].push(newBoardElemet());
            }

        }

        function newBoardElemet() {

            element = "";

            if (modename[currentmode] == "Image") {

                element = new BoardElement(bgcol, textcol, "0 0 " + glowAmtnum + "px " + glowAmtnum + "px " + glowCol, true, urldata)
            } else
                element = new BoardElement(bgcol, textcol, "0 0 " + glowAmtnum + "px " + glowAmtnum + "px " + glowCol, false, "none")
            return element;
        }
        cus_gametheme[1] = boardcol;
        cus_gametheme[2] = bodybgcol;
        cus_gametheme[3] = bodytextcol;
        cus_gametheme[4] = scorecol;
        cus_gametheme[5] = tagline;
        cus_theme = new Theme(cus_0, cus_2, cus_4, cus_8, cus_16, cus_32, cus_64, cus_128, cus_256, cus_512, cus_1024, cus_2048, der_morethen2048, cus_morele, cus_gametheme);
        debug(cus_theme, 1)
        debug("cus_theme", 1)
        themeData = JSON.stringify(cus_theme);




    }
    //--------------------------------------------------------------------------------------------------------------------//
    //________________________________________________Theme-Sharing/Loading____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    //Theme externally loading and sharing
    //Make shareable
    const sharethemebutton = document.querySelector('#sharethemebutton');
    const loadthemebutton = document.querySelector('#loadthemebutton');
    const presetthemebutton = document.querySelector('#presetthemebutton');

    const sharetext = document.querySelector('#sharetext');
    const presets = document.querySelector('#presetlist');
    const sharethemediv = document.querySelector('.sharethemediv');
    const sharethemeinputbox = document.querySelector('#sharethemedata');
    const share_closebtn = document.querySelector('.share_closebtn');
    const sharetitle = document.querySelector('#sharetitle');
    const loadbutton = document.querySelector('#loadbutton');

    website = window.location.href.split(".html")

    function applytheme() {
        sharemytheme();
        loadthemedata()
    }

    function sharemytheme() {
        debug("sharetheme_loadtheme", 2);
        debug(cus_theme, 2);
        sharethemediv.style.display = "block";
        loadbutton.style.display = "none";
        sharetitle.innerHTML = "Share Theme";
        storedtheme = JSON.stringify(cus_theme);
        if (storedtheme != "") {
            debug("Unparsed cokie", 1)
            debug(storedtheme, 1)
            jsonedTheme = JSON.parse(storedtheme);
            presets.style.display = "none";
            debug("Parsed JSON", 1);
            debug(jsonedTheme, 1);
            var encoded = btoa(JSON.stringify(jsonedTheme));
            sharethemeinputbox.value = encoded;
            sharethemeinputbox.style.display = "block";
            sharetext.innerHTML = "Copy this text and share it with whoever. (Click inside and press ctrl-a then copy) or email this file <a href='" + website[0] + ".html?rawTheme=" + encoded + "'>Link to Theme</a>";
        } else {
            sharetext.innerHTML = "Please note you need a theme to use this tool."
        }
    }

    function closeshare() {
        sharethemediv.style.display = "none";
    }

    function presettheme() {
        debug("funct_loadtheme", 2);
        makeintotile();
        sharethemediv.style.display = "block";
        loadbutton.style.display = "none";
        sharethemeinputbox.style.display = "none";

        presets.style.display = "block";
        sharetitle.innerHTML = "Preset Themes";
        sharetext.innerHTML = "Share your theme with me for the chance of it beign added here";
    }

    function loadtheme() {
        debug("funct_loadtheme", 2);
        makeintotile();
        sharethemediv.style.display = "block";
        sharethemeinputbox.style.display = "block";
        loadbutton.style.display = "block";
        presets.style.display = "none";
        sharetitle.innerHTML = "Load Theme";
        sharetext.innerHTML = "Paste your text and press the buton below";


    }

    function loadthemedata() {
        debug("funct_loadthemedata", 2);
        let shareddata = sharethemeinputbox.value;
        try {
            var decoded = atob(shareddata);
        } catch (err) {
            sharethemeinputbox.value = "ERROR LOADING";
        }
        try {
            var jsondata = JSON.parse(decoded)
        } catch (err) {
            sharethemeinputbox.value = "ERROR LOADING";
        }

        if (jsondata == "") {
            sharethemeinputbox.value = "ERROR LOADING";
        }
        if (jsondata.encodedproperly == "") {
            sharethemeinputbox.value = "ERROR LOADING";
        }
        if (jsondata.encodedproperly == "it_works_pls_dont_mess_with_this_otherwise_it_breaks") {
            setCookie("customTheme", decoded, 365);
            tilenum = 0;
            loadtilefromsave();
            closeshare();
            window.location = website[0] + ".html";
        } else {
            sharethemeinputbox.value = "ERROR LOADING";
        }
    }


    //--------------------------------------------------------------------------------------------------------------------//
    //________________________________________________Theme-Themer____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    function BoardElement(bg, textcol, boxshadow, imagemode, imageurl) {
        this.bg = bg;
        this.textcol = textcol;
        this.boxshadow = boxshadow;
        this.imagemode = imagemode;
        this.imageurl = imageurl;
    }

    function Theme(zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight, more2048, elemore, gameThemeData) {
        this.zero = zero;

        this.number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        this.options = [zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight];
        this.moreenabled = more2048;
        this.elementMore = elemore;
        this.gamethem = gameThemeData;
        this.encodedproperly = "it_works_pls_dont_mess_with_this_otherwise_it_breaks";
    }



    themeBoardFunct = function themeBoard(Theme) {
        debug("funct_themetheboard", 2);
        debug(Theme, 1);
        debug("CHECK POINT", 1);
        gameTheme = Theme.gamethem;
        for (let x = 0; x < this.squares.length; x++) {
            tinum = parseInt(this.squares[x].innerHTML);
            firnum = spwantile;
            stpnum = 0;
            if (tinum != 0) {
                if (reverse)
                    for (let y = 1; y < 12; y++) {
                        if (firnum == tinum) {
                            stpnum = 12 - y;
                            break
                        } else {
                            firnum = firnum / 2;
                        }
                    }
                else
                    for (let y = 1; y < 12 + Theme.elementMore[0].length; y++) {
                        if (firnum == tinum) {
                            stpnum = y;
                            break
                        } else {
                            firnum = firnum * 2;
                        }
                    }
            }

            for (let y = 0; y < Theme.options.length; y++) {
                if (stpnum == parseInt(Theme.number[y])) {
                    if (Theme.options[y].imagemode) {

                        this.squares[x].style.fontSize = "0px";
                        this.squares[x].style.background = "white"; //Fixed for transparancy
                        this.squares[x].style.boxShadow = Theme.options[y].boxshadow;
                        this.squares[x].style.backgroundSize = "cover";
                        this.squares[x].style.backgroundImage = "url('" + Theme.options[y].imageurl + "')";
                    } else {

                        this.squares[x].style.fontSize = 4 * (zoom / 10) + "px";
                        this.squares[x].style.color = Theme.options[y].textcol;
                        this.squares[x].style.background = Theme.options[y].bg;
                        this.squares[x].style.boxShadow = Theme.options[y].boxshadow;
                    }

                }

            }
            if (stpnum > 11) {
                if (Theme.moreenabled) {
                    themedtile = false;
                    for (let y = 0; y < Theme.elementMore[0].length; y++) {
                        if (stpnum == parseInt(Theme.elementMore[0][y])) {
                            if (Theme.elementMore[1][y].imagemode) {

                                this.squares[x].style.fontSize = "0px";
                                this.squares[x].style.background = Theme.elementMore[1][y].bg;

                                this.squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                                this.squares[x].style.backgroundSize = "cover";
                                this.squares[x].style.backgroundImage = "url('" + Theme.elementMore[1][y].imageurl + "')";
                            } else {

                                this.squares[x].style.fontSize = 4 * (zoom / 10) + "px";
                                this.squares[x].style.color = Theme.elementMore[1][y].textcol;
                                this.squares[x].style.background = Theme.elementMore[1][y].bg;

                                this.squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                            }
                            themedtile = true;
                        }
                    }
                    if (!themedtile) {
                        if (Theme.elementMore[1][y].imagemode) {

                            this.squares[x].style.fontSize = "0px";
                            this.squares[x].style.background = Theme.elementMore[1][y].bg;
                            this.squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                            this.squares[x].style.backgroundSize = "cover";
                            this.squares[x].style.backgroundImage = "url('" + Theme.elementMore[1][y].imageurl + "')";
                        } else {

                            this.squares[x].style.fontSize = 4 * (zoom / 10) + "px";
                            this.squares[x].style.color = Theme.elementMore[1][y].textcol;
                            this.squares[x].style.background = Theme.elementMore[1][y].bg;
                            this.squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                        }
                    }
                } else {
                    if (Theme.elementMore[1][y].imagemode) {
                        this.squares[x].style.color = "black";
                    } else {
                        this.squares[x].style.color = Theme.options[Theme.options.length - 1].textcol;
                    }
                    this.squares[x].style.background = Theme.options[Theme.options.length - 1].bg;
                    this.squares[x].style.boxShadow = Theme.options[Theme.options.length - 1].boxshadow;
                }

            }
        }

        if (gameTheme != undefined) {

            document.body.style.background = gameTheme[2];
            document.body.style.color = gameTheme[3];
            textclasses = document.querySelectorAll("p, .scoretab, .side-item, .bar, .play");
            for (let y = 0; y < textclasses.length; y++) {
                textclasses[y].style.color = gameTheme[3];
            }
            sidecols = document.querySelectorAll(".side-item, .progress");
            for (let y = 0; y < sidecols.length; y++) {
                sidecols[y].style.borderColor = gameTheme[1];
            }
            this.gridDisplay.style.border = "5px solid " + gameTheme[1];
            this.gridDisplay.style.backgroundColor = zerocol;
            tilestotheme = this.gridDisplay.children;
            document.querySelector("#tagline").innerHTML = gameTheme[5];
            scoresclass = document.querySelectorAll(".scoretab, .side-item, .bar, .play");
            for (let y = 0; y < scoresclass.length; y++) {
                scoresclass[y].style.backgroundColor = gameTheme[4];
            }

            for (let y = 0; y < tilestotheme.length; y++) {
                tilestotheme[y].style.backgroundColor = gameTheme[1];
            }
            // document.getElementsByClassName("grid")
        }
    }

    function setTHeming() {
        let thememakerOpened = getCookie("theme-open");
        if (thememakerOpened != "") {
            if (settingsData.theme_opened)
                openThemeMaker();

            else
                closeThemeMaker()

        }
        themeMakerOpen.addEventListener("click", openThemeMaker);
        themeMakerClose.addEventListener("click", closeThemeMaker);
        themeTilelDisplay.innerHTML = "<p>" + tempnum + "</p>";
        realtimeCheck.addEventListener("change", setreal);
        updatemode();
        urlinput.addEventListener("change", seturl);
        themeglowAmtincrease.addEventListener("click", themeglowAmtincrese);
        themeglowAmtdecrease.addEventListener("click", themeglowAmtdecrese);
        taginput.addEventListener("change", settag);
        share_closebtn.addEventListener("click", closeshare);
        sharethemebutton.addEventListener("click", sharemytheme);
        loadthemebutton.addEventListener("click", loadtheme);
        presetthemebutton.addEventListener("click", presettheme);
        loadbutton.addEventListener("click", loadthemedata);

    }
    ////////////////////////////////////////////////////////Replay////////////////////////////////////////////////////////////
    //--------------------------------------------------------------------------------------------------------------------//
    //___________________________________________________Replay-Vars______________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//

    const replaypannel = document.getElementById("replaypannel");
    const sharereplaydata = document.getElementById("sharereplaydata");
    const loadReplay = document.getElementById("loadReplay");
    const historycontinaer = document.getElementById("historycontinaer");
    const openbutton = document.getElementById("openreplayfile");
    const closebutton = document.querySelector(".replay_close");
    var play_pause = {};
    var cancelothers = false;

    var resdata = {};
    localStorageSpace = function () {
        var allStrings = '';
        for (var key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key)) {
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 0;
    };
    openbutton.addEventListener('change', (event) => {
        const fileList = event.target.files;
        let filename = fileList[0].name;
        filename = filename.split('.').pop();
        if (filename == "replay") {
            var fr = new FileReader();
            fr.onload = function () {
                openreplfile(fr.result);
            }
            fr.readAsText(fileList[0]);
        }
    });
    loadReplay.addEventListener('click', function () {
        openreplfile(sharereplaydata.value);
    })

    //--------------------------------------------------------------------------------------------------------------------//
    //________________________________________________Replay-Functions____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//

    /////////// UI

    openReplay = function openReplay() {
        closeThemeMaker();
        settingsData.replayopened = true;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        replaypannel.style.width = "250px";
        historyJson = { saved: [] }
        savedhistory = localStorage.getItem("replayHistory");
        if (savedhistory != null) {

            historyJson = JSON.parse(savedhistory);
            historycontinaer.innerHTML = "";
            for (x = 0; x < historyJson.saved.length; x++) {
                historyData = JSON.parse(historyJson.saved[x]);
                historyItem = document.createElement("div");
                historyTitle = document.createElement("p");
                if (historyData.best != undefined) {
                    historyTitle.innerHTML = historyData.time + ", " + historyData.best;
                } else {
                    historyTitle.innerHTML = historyData.time + ", " + historyData.settings.goal;
                }

                historyItem.appendChild(historyTitle);
                historyreplay = document.createElement("button");
                historyreplay.innerHTML = "Play Replay";
                historyreplay.replaydadata = historyData;
                historyreplay.addEventListener("click", function (evt) {
                    openreplfile(
                        btoa(
                            JSON.stringify(evt.currentTarget.replaydadata)
                        )
                    )
                })
                historyItem.appendChild(historyreplay);
                historycontinaer.appendChild(historyItem);


            }
        }
    }

    closeReplay = function closeReplay() {
        settingsData.replayopened = false;
        setCookie("settingsData", JSON.stringify(settingsData), 1);
        replaypannel.style.width = "0";
    }
    closebutton.addEventListener("click", closeReplay);

    if (settingsData.replayopened)
        openReplay()
    else
        closeReplay();

    ////////////////////////////   Saving
    function addtoreplayhistory(game) {

        space = localStorageSpace();
        if (space <= 3000) {
            newreplay = genarateReplay(game, "json")
            historyJson = { saved: [] }
            savedhistory = localStorage.getItem("replayHistory");
            if (savedhistory != null) {
                historyJson = JSON.parse(savedhistory);
            }
            let size = new Blob([newreplay]).size;
            if ((space + (size / 1000)) <= 3000) {

                historyJson.saved.push(newreplay)
                localStorage.setItem("replayHistory", JSON.stringify(historyJson))
            } else {
                function removeFromhistory(newreplay) {
                    historyJson.saved.pop();
                    localStorage.setItem("replayHistory", JSON.stringify(historyJson));
                    space = localStorageSpace();
                    let size = new Blob([newreplay]).size;
                    if ((space + (size / 1000)) <= 3000) {
                        historyJson.saved.push(newreplay)
                    } else {
                        removeFromhistory(newreplay);
                    }

                }
                removeFromhistory(newreplay);
            }
            if (settingsData.replayopened) {
                openReplay();
            }
        }
    }

    function genarateReplay(game, type) {
        var today = new Date().toLocaleDateString();
        function ReplayData(initial, states, max, settings, best) {
            this.id = game.gameId;
            this.time = today;
            this.initial = initial;
            this.state = states;
            this.settings = settings;
            this.max = max;
            this.best = best;
        }
        repdata = new ReplayData(game.backdata[0], game.backdata, game.backdata.length, settingsData, game.ctile);
        replaydata = JSON.stringify(repdata);
        if (type == "file") {
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:attachment/text,' + encodeURI(btoa(replaydata));
            hiddenElement.target = '_blank';
            hiddenElement.download = "(" + today + ")_" + game.ctile + "_[" + game.gameId + "]_.replay";
            hiddenElement.click();
        }
        if (type == "json") {
            return replaydata;
        }
    }



    function begin_sharereplay() {
        shareReplay(resdata.replaydata)
    }
    function begin_savereplay() {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(btoa(JSON.stringify(resdata.replaydata)));
        hiddenElement.target = '_blank';
        hiddenElement.download = "(" + resdata.replaydata.time + ")_" + resdata.replaydata.best + "_[" + resdata.replaydata.id + "]_.replay";
        hiddenElement.click();

    }
    function begin_restarting() {
        replay(resdata.game, JSON.stringify(resdata.replaydata))

    }
    function shareReplay(data) {
        sharethemediv.style.display = "block";
        loadbutton.style.display = "none";
        sharetitle.innerHTML = "Share Replay";
        presets.style.display = "none";
        var encoded = btoa(JSON.stringify(data));
        sharethemeinputbox.value = encoded;
        sharethemeinputbox.style.display = "block";
        sharetext.innerHTML = "Copy this text and share it with whoever. (Click inside and press ctrl-a then copy) or copy the text above and email it via this link: <a href='mailto:example@example.com?subject=I've shared my replay with you!&body=Copy the text below into the replay section of this website: " + website[0] + " Data to Copy: INSERT_TEXT_FROM_WEBSITE'>Email Link</a>";
    }

    //////////////////////////       Playback
    function openreplfile(repfile) {

        decodedfile = atob(repfile);
        try {
            repdata = JSON.parse(decodedfile);
        }
        catch (err) {
            sharereplaydata.value = "Error Loading";
        }

        try {
            parseInt(repdata.id)
        }
        catch (err) {
            sharereplaydata.value = "Error Loading";
        }
        for (let x = 0; x < games.length; x++) {
            console.log(repdata.id)
            if (games[x].gameId == repdata.id) {
                settingsData = repdata.settings;
                loadsettingstovar();
                updatezoom();
                games[x].gridDisplay.innerHTML = "";
                games[x].squares.length = 0;
                SetUpGame(games[x], games[x].keycodes)
                games[x].createBoard();
                replay(games[x], JSON.stringify(repdata))

            }
        }
    };

    function replay(game, replaydata) {
        replaydisplay = document.getElementById("speed-" + game.gameId);
        replayspeed = replaydisplay.innerHTML.split("");
        a = replayspeed.pop();
        replayspeed = replayspeed.join("");
        replayspeed = parseInt(replayspeed)
        if (replayspeed == 0) {
            replayspeed = 0.5;
        }
        replayspeed = 500 / replayspeed;
        document.getElementById("replaycontrol-" + game.gameId).style.display = "block";
        replaydata = JSON.parse(replaydata);
        game.scoreResult.style.display = "none";
        game.allowInput = false;
        resdata.game = game;
        resdata.replaydata = replaydata;
        if (game.replaying) {
            cancelothers = true;
            setTimeout(function () {
                cancelothers = false;
                game.replaying = false;
                replay(game, JSON.stringify(replaydata))
            }, (replayspeed + 200))
        } else {
            game.replaying = true;
            loadgame(replaydata.initial, game, true)
            replayStep(1, game, replaydata)
        }


    }

    function replayStep(x, game, replaydata,) {

        play_pause.html = document.getElementById('play_pause-' + game.gameId);
        if (play_pause.html.innerHTML == "Play") {
            play_pause.x = x;
            play_pause.game = game;
            play_pause.replaydata = replaydata;
            return;
        }
        replaydisplay = document.getElementById("speed-" + game.gameId);
        replayspeed = replaydisplay.innerHTML.split("");
        a = replayspeed.pop();
        replayspeed = replayspeed.join("");
        replayspeed = parseInt(replayspeed)
        if (replayspeed == 0) {
            replayspeed = 0.5;
        }
        replayspeed = 500 / replayspeed;
        if (replaydata.state[x].keyPressed == "inital") {
            replayspeed = 100;
        }
        setTimeout(function () {
            loadgame(replaydata.state[x - 1], game, true)
            key = replaydata.state[x].keyPressed;
            bardisplay = document.getElementById("bar-" + game.gameId);
            if (key == "inital") {
                bardisplay.innerHTML = x + " / Loading";
                bardisplay.style.width = "100%";
            } else {
                bardisplay.innerHTML = x + "/" + (replaydata.max - 1);
                bardisplay.style.width = (x / (replaydata.max - 1)) * 100 + "%";
            }


            console.log(key + "_" + x)
            if (key == "left") {
                game.keyLeft();
            }
            else if (key == "right") {
                game.keyRight();
            }
            else if (key == "up") {
                game.keyup();
            }
            else if (key == "down") {
                game.keydown();
            }
            if (customThemeActive) {
                game.themeBoard(cus_theme); //FIX LATER
            } else {
                game.themeBoard(def_theme); //FIX LATER
            }
            game.movesdisplay.innerHTML = parseInt(game.movesdisplay.innerHTML) + 1;

            if (x != replaydata.max - 1 && !cancelothers)
                replayStep(x + 1, game, replaydata)
            else {
                bardisplay.innerHTML = "Finished"
                settingsData = JSON.parse(getCookie("settingsData"));
                loadsettingstovar();
            }
        }, replayspeed);

    }


    ////////////////////////////////////////////////////////GAME////////////////////////////////////////////////////////////
    //--------------------------------------------------------------------------------------------------------------------//
    //____________________________________________________Game-Vars_______________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    //best

    var GameClass = {
        gridDisplay: "",
        gridDisplayId: "",
        movesdisplay: "",
        scoreDisplay: "",
        hscoreDisplay: "",
        scoreAddDisplay: "",
        bestDisplay: "",
        hbestDisplay: "",
        gameId: "",
        backdata: [],
        createboardhtml: function (selector) {
            this.gameId = selector;
            gamespace = document.getElementById("gamespace");
            //Padding
            paddingdiv = document.createElement('div');
            paddingdiv.classList.add("padding25px");
            paddingdiv.id = "**_" + selector + "_**";
            //Score Container
            score_containerdiv = document.createElement('div');
            score_containerdiv.classList.add("scoreContainer");
            //Row 1
            row1div = document.createElement('div');
            row1div.classList.add("row")
            //Col 1
            col1div = document.createElement('div');
            col1div.classList.add("column")
            //Tab 1
            scoretabdiv1 = document.createElement('div');
            scoretabdiv1.classList.add("scoretab");
            //Title
            scoretitlediv = document.createElement('div');
            scoretitlediv.classList.add("score-title");
            scoretitlediv.innerHTML = "<strong>Score:</strong>";
            //Span  w data
            scoreSpan = document.createElement('span');
            scoreSpan.id = 'score-' + selector;
            //Spawn w add
            addScoreSpan = document.createElement('span');
            addScoreSpan.id = 'scoreadd-' + selector
            addScoreSpan.className = "class_scoreadd";
            scoretabdiv1.appendChild(scoretitlediv);
            scoretabdiv1.appendChild(scoreSpan);
            scoretabdiv1.appendChild(addScoreSpan);
            col1div.appendChild(scoretabdiv1);
            //Col 2
            col2div = document.createElement('div');
            col2div.classList.add("column")
            //Tab 1
            scoretabdiv2 = document.createElement('div');
            scoretabdiv2.classList.add("scoretab");
            //Title
            hscoretitlediv = document.createElement('div');
            hscoretitlediv.classList.add("hscore-title");
            hscoretitlediv.innerHTML = "<strong>Highscore:</strong>";
            //Span  w data
            hscoreSpan = document.createElement('span');
            hscoreSpan.id = 'hscore-' + selector;
            //Spawn w add
            scoretabdiv2.appendChild(hscoretitlediv);
            scoretabdiv2.appendChild(hscoreSpan);
            col2div.appendChild(scoretabdiv2);
            row1div.appendChild(col1div);
            row1div.appendChild(col2div);
            score_containerdiv.appendChild(row1div);
            //Game Container
            game_containerdiv = document.createElement('div');
            game_containerdiv.classList.add("gamecoantiner");
            //Result
            resultdiv = document.createElement('div');
            resultdiv.classList.add("result");
            resultdiv.id = "result-" + selector;
            //inline div
            inlinediv = document.createElement('div');
            inlinediv.style.display = "inline";
            //Grid
            griddiv = document.createElement('div');
            griddiv.classList.add("grid");
            griddiv.id = "grid-" + selector;
            this.gridDisplayId = 'grid-' + selector;
            inlinediv.appendChild(griddiv);
            //SideTab
            sidediv = document.createElement('div');
            sidediv.classList.add("side-tab");
            //Reset
            resetbutton = document.createElement('button');
            resetbutton.style.fontSize = "28px";
            resetbutton.classList.add("side-item");
            resetbutton.id = 'reset-' + selector;
            resetbutton.innerHTML = "<span class=reload> &nbsp&#x21bb&nbsp;</span>"
            //Back
            backbutton = document.createElement('button');
            backbutton.style.fontSize = "28px"
            backbutton.classList.add("side-item")
            backbutton.id = 'goback-' + selector;
            backbutton.innerHTML = "<span class=reload> &nbsp&#8592&nbsp;</span>"
            //Moves
            movesdiv = document.createElement('div');
            movesdiv.classList.add("side-item")
            movestext = document.createElement('p');
            movestext.id = 'moves-' + selector;
            movesdiv.appendChild(movestext);
            //Time
            timediv = document.createElement('div');
            timediv.classList.add("side-item")
            timetext = document.createElement('p');
            timetext.id = 'time-' + selector;
            timetext.innerHTML = "0:0"
            timediv.appendChild(timetext);
            //Remove
            removebutton = document.createElement('button');
            removebutton.style.fontSize = "28px"
            removebutton.classList.add("side-item")
            removebutton.id = 'remove-' + selector;
            removebutton.innerHTML = "<span>x</span>"

            sidediv.appendChild(resetbutton);
            sidediv.appendChild(backbutton);
            sidediv.appendChild(movesdiv);
            sidediv.appendChild(timediv);
            sidediv.appendChild(removebutton);

            game_containerdiv.appendChild(resultdiv);
            game_containerdiv.appendChild(inlinediv);
            game_containerdiv.appendChild(sidediv);
            //Score Container
            tile_containerdiv = document.createElement('div');
            tile_containerdiv.classList.add("tileContainer");
            //Row 2
            row2div = document.createElement('div');
            row2div.classList.add("row")
            //Col 4
            col3div = document.createElement('div');
            col3div.classList.add("column")
            //Tab 1
            tiletabdiv1 = document.createElement('div');
            tiletabdiv1.classList.add("scoretab");
            //Title
            tiletitlediv = document.createElement('div');
            tiletitlediv.classList.add("score-title");
            tiletitlediv.innerHTML = "<strong>Current Best:</strong>";
            //Span  w data
            scoreSpan = document.createElement('span');
            scoreSpan.id = "best-" + selector;
            scoreSpan.innerHTML = "2";
            tiletabdiv1.appendChild(tiletitlediv);
            tiletabdiv1.appendChild(scoreSpan);
            col3div.appendChild(tiletabdiv1);
            //Col 2
            col4div = document.createElement('div');
            col4div.classList.add("column")
            //Tab 1
            scoretabdiv4 = document.createElement('div');
            scoretabdiv4.classList.add("scoretab");
            //Title
            htiletitlediv = document.createElement('div');
            htiletitlediv.classList.add("hscore-title");
            htiletitlediv.innerHTML = "<strong>Alltime Best:</strong>";
            //Span  w data
            hscoreSpan = document.createElement('span');
            hscoreSpan.id = "hbest-" + selector;
            //Spawn w add
            scoretabdiv4.appendChild(htiletitlediv);
            scoretabdiv4.appendChild(hscoreSpan);
            col4div.appendChild(scoretabdiv4);
            row2div.appendChild(col3div);
            row2div.appendChild(col4div);
            tile_containerdiv.appendChild(row2div);
            //Replay Controls
            replay_containerdiv = document.createElement('div');
            replay_containerdiv.classList.add("replaycontrols");
            replay_containerdiv.id = "replaycontrol-" + selector;
            //Row 3
            row3div = document.createElement('div');
            row3div.classList.add("row");
            //COntrols Container
            container_contrls = document.createElement('div');
            container_contrls.classList.add("settingrow");
            //Play/Pause
            play_pause = document.createElement('button');
            play_pause.classList.add("play");
            play_pause.id = "play_pause-" + selector;
            play_pause.innerHTML = "Pause"
            //Progress
            progress_div = document.createElement('div');
            progress_div.classList.add("progress");
            //Bar
            bar_div = document.createElement('div');
            bar_div.classList.add("bar");
            bar_div.id = "bar-" + selector;
            bar_div.innerHTML = "1/1"
            //PlayBack Speed
            spped_button = document.createElement('button');
            spped_button.classList.add("play");
            spped_button.id = "speed-" + selector;
            spped_button.innerHTML = "1x"

            progress_div.appendChild(bar_div);

            container_contrls.appendChild(play_pause);
            container_contrls.appendChild(progress_div);
            container_contrls.appendChild(spped_button);
            //Replay Options Controls
            container_contrls_options = document.createElement('div');
            container_contrls_options.classList.add("settingrow");
            //close_replay
            close_replay = document.createElement('button');
            close_replay.classList.add("play");
            close_replay.id = "close_replay-" + selector;
            close_replay.innerHTML = "Close Replay"
            //Share
            share_replay = document.createElement('button');
            share_replay.classList.add("play");
            share_replay.id = "share_replay-" + selector;
            share_replay.innerHTML = "Share Replay"
            //Save
            save_replay = document.createElement('button');
            save_replay.classList.add("play");
            save_replay.id = "save_replay-" + selector;
            save_replay.innerHTML = "Save Replay"
            //Restart
            restart_replay = document.createElement('button');
            restart_replay.classList.add("play");
            restart_replay.id = "restart_replay-" + selector;
            restart_replay.innerHTML = "Restart Replay"

            container_contrls_options.appendChild(close_replay)
            container_contrls_options.appendChild(share_replay)
            container_contrls_options.appendChild(save_replay)
            container_contrls_options.appendChild(restart_replay)

            row3div.appendChild(container_contrls);
            row3div.appendChild(container_contrls_options);
            replay_containerdiv.appendChild(row3div);

            paddingdiv.appendChild(score_containerdiv);
            paddingdiv.appendChild(game_containerdiv);
            paddingdiv.appendChild(tile_containerdiv);
            paddingdiv.appendChild(replay_containerdiv);
            gamespace.appendChild(paddingdiv);
            document.getElementById('goback-' + selector).addEventListener('click', this.goback.bind(this), false); ///BINDING
            document.getElementById('reset-' + selector).addEventListener('click', this.reset3.bind(this), false); ///BINDING
            document.getElementById('remove-' + selector).addEventListener('click', this.remove.bind(this), false); ///BINDING
            document.getElementById('speed-' + selector).addEventListener('click', this.replayspeed.bind(this), false); ///BINDING
            document.getElementById('play_pause-' + selector).addEventListener('click', this.playpause.bind(this), false); ///BINDING
            document.getElementById('close_replay-' + selector).addEventListener('click', function () { location.href = website[0] + ".html"; }, false); ///BINDING
            document.getElementById('share_replay-' + selector).addEventListener('click', begin_sharereplay, false); ///BINDING
            document.getElementById('save_replay-' + selector).addEventListener('click', begin_savereplay, false); ///BINDING
            document.getElementById('restart_replay-' + selector).addEventListener('click', begin_restarting, false); ///BINDING
            this.movesdisplay = document.querySelector('#moves-' + selector);
            this.scoreDisplay = document.querySelector('#score-' + selector);
            this.hscoreDisplay = document.querySelector('#hscore-' + selector);
            this.scoreAddDisplay = document.querySelector('#scoreadd-' + selector);
            this.bestDisplay = document.querySelector('#best-' + selector);
            this.hbestDisplay = document.querySelector('#hbest-' + selector);
            this.scoreResult = document.querySelector('#result-' + selector);
            this.gridDisplay = document.getElementById(this.gridDisplayId);

        },
        remove: function () {
            this.reset();
            document.getElementById("**_" + this.gameId + "_**").remove();
            rezizegameovers();

        },
        goback: function () {
            if (!this.replaying) {
                if (this.backdata.length >= 2) {
                    this.backdata.pop();
                    this.keyPressed = "back";
                    loadgame(this.backdata[this.backdata.length - 1], this, true);
                    this.backdata.splice(this.backdata.length - 1)
                }
            }



        },
        reset: function () {
            resetGame(this, 1);
        },
        reset2: function () {
            resetGame(this, 2);
            this.allowInput = true;

        },
        reset3: function () {
            if (!this.replaying) {
                resetGame(this, 2);
                this.allowInput = true;
            }


        },
        replayspeed: function () {

            spped = document.querySelector('#speed-' + this.gameId);

            if (spped.innerHTML == "1x") {
                spped.innerHTML = "2x";
            } else if (spped.innerHTML == "2x") {
                spped.innerHTML = "4x";
            } else if (spped.innerHTML == "4x") {
                spped.innerHTML = "0.5x";
            } else if (spped.innerHTML == "0.5x") {
                spped.innerHTML = "1x";
            }

        },
        playpause: function () {
            play_pause.html = document.getElementById('play_pause-' + this.gameId);
            if (play_pause.html.innerHTML == "Play") {
                play_pause.html.innerHTML = "Pause";
                replayStep(play_pause.x, play_pause.game, play_pause.replaydata)
            } else {
                play_pause.html.innerHTML = "Play";
            }
        },
        squares: [],
        moves: 0,
        score: 0,
        ctile: 0,
        hscore: 0,
        btile: 0,
        keyPressed: "inital",
        time: {
            min: 0,
            sec: 0,
        },
        paused: false,
        timing: function () {
            setTimeout(function () {
                this.time.sec += 1;
                if (this.time.sec == 60) {
                    this.time.sec = 0;
                    this.time.min += 1;
                }
                timedisplay = document.getElementById('time-' + this.gameId);
                timedisplay.innerHTML = this.time.min + ":" + this.time.sec;
                if (!this.paused)
                    this.timing();
            }.bind(this), 1000);
        },
        continueEnabled: false,
        replaying: false,
        createBoard: function () {
            debug("funct_createboard", 2);
            this.gridDisplay.style.width = width * zoom + "px";
            this.gridDisplay.style.height = width * zoom + "px";
            for (let x = 0; x < width * width; x++) {
                square = document.createElement('div');
                square.className = "squareItem";
                tile = document.createElement("div");
                tile.className = "tile";
                tile.innerHTML = 0;
                if (gamemode == "Upsidedown"){
                    tile.style.transform = "rotate(180deg)";
                }

                square.appendChild(tile)
                this.gridDisplay.appendChild(square);
                this.squares.push(tile);
            }
        },
        generate: function () {
            let randNum = Math.floor(Math.random() * this.squares.length);
            if (this.squares[randNum].innerHTML == 0) {
                var newel = this.squares[randNum].cloneNode(true);
                this.squares[randNum].parentNode.replaceChild(newel, this.squares[randNum]);
                this.squares[randNum] = newel;
                this.squares[randNum].innerHTML = spwantile;

            } else {
                this.generate();
            }
            this.checkGameOver()
        }
    }
    var games = [];

    //--------------------------------------------------------------------------------------------------------------------//
    //_______________________________________________Game-Functions_______________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//

    /////////////////////////MOVEMENT/////////////////
    moveRightFunct = function moveRight() {
        for (let x = 0; x < width * width; x++) {
            if (x % width === 0) {
                let row = [];
                for (let y = 0; y < width; y++) {
                    row.push(parseInt(this.squares[x + y].innerHTML));
                }
                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                for (let y = 0; y < width; y++) {
                    let oldval = parseInt(this.squares[x + y].innerHTML);
                    this.squares[x + y].innerHTML = newRow[0 + y];
                    if (newRow[0 + y] != 0 && oldval != newRow[0 + y]) {
                        this.squares[x + y].parentNode.classList.add("animate-right");

                        this.squares[x + y].parentNode.addEventListener('animationend', function () {
                            this.squares[x + y].parentNode.classList.remove('animate-right');
                        }.bind(this))
                    }
                }
            }
        }

    }


    moveLeftFunct = function moveLeft() {
        for (let x = 0; x < width * width; x++) {
            if (x % width === 0) {
                let row = [];
                for (let y = 0; y < width; y++) {
                    row.push(parseInt(this.squares[x + y].innerHTML));
                }
                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);

                let newRow = filteredRow.concat(zeros);

                for (let y = 0; y < width; y++) {
                    let oldval = parseInt(this.squares[x + y].innerHTML);
                    this.squares[x + y].innerHTML = newRow[0 + y];
                    if (newRow[0 + y] != 0 && oldval != newRow[0 + y]) {
                        this.squares[x + y].parentNode.classList.add("animate-left");
                        this.squares[x + y].parentNode.addEventListener('animationend', function () {
                            this.squares[x + y].parentNode.classList.remove('animate-left');

                        }.bind(this))
                    }
                }
            }
        }

    }

    moveDownFunct = function moveDown() {
        for (let x = 0; x < width; x++) {
            let collum = [];
            for (let y = 0; y < width; y++) {
                collum.push(parseInt(this.squares[x + y * width].innerHTML));
            }
            let filteredCol = collum.filter(num => num);
            let missing = width - filteredCol.length;
            let zeros = Array(missing).fill(0);

            let newCol = zeros.concat(filteredCol);
            for (let y = 0; y < width; y++) {
                let oldval = parseInt(this.squares[x + y * width].innerHTML);
                this.squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
                    this.squares[x + y * width].parentNode.classList.add("animate-down");
                    this.squares[x + y * width].parentNode.addEventListener('animationend', function () {
                        this.squares[x + y * width].parentNode.classList.remove('animate-down');
                    }.bind(this))
                }

            }
        }
    }

    moveUpFunct = function moveUp() {
        for (let x = 0; x < width; x++) {
            let collum = [];
            for (let y = 0; y < width; y++) {
                collum.push(parseInt(this.squares[x + y * width].innerHTML));
            }
            let filteredCol = collum.filter(num => num);
            let missing = width - filteredCol.length;
            let zeros = Array(missing).fill(0);

            let newCol = filteredCol.concat(zeros);
            for (let y = 0; y < width; y++) {
                let oldval = parseInt(this.squares[x + y * width].innerHTML);
                this.squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
                    this.squares[x + y * width].parentNode.classList.add("animate-up");
                    this.squares[x + y * width].parentNode.addEventListener('animationend', function () {
                        this.squares[x + y * width].parentNode.classList.remove('animate-up');
                    }.bind(this))
                }
            }
        }
    }
    /////////////////////////COMBINE/////////////////
    combineRowFunct = function combineRow(mode) {
        for (let x = 0; x < (width * width) - 1; x++) {

            if (this.squares[x].innerHTML === this.squares[x + 1].innerHTML) {
                dontdo = false
                let combinedTotal = 0;
                if (reverse)
                    combinedTotal = parseInt(this.squares[x].innerHTML) / 2;
                else
                    combinedTotal = parseInt(this.squares[x].innerHTML) + parseInt(this.squares[x + 1].innerHTML);
                if (mode != "nocheck") {
                    if (combinedTotal != 0) {

                        if ((x + 1) % width == 0) {
                            dontdo = true;
                        }
                        if (!dontdo) {
                            this.scoreAddDisplay.innerHTML = "+" + combinedTotal;
                            this.scoreAddDisplay.className = "class_scoreadd scoreanimate";
                            setTimeout(function () {
                                this.scoreAddDisplay.className = "class_scoreadd";
                                this.scoreAddDisplay.innerHTML = "";
                            }.bind(this), 500);
                        }


                    }

                    this.score += combinedTotal;
                }

                this.scoreDisplay.innerHTML = this.score;
                this.checkhigh();
                if (!dontdo) {
                    this.squares[x].innerHTML = combinedTotal;
                    if (mode != "nocheck")
                        this.checkbest();
                    this.squares[x + 1].innerHTML = 0;
                    if (mode == "left") {

                        if (parseInt(this.squares[x].innerHTML) != 0) {
                            this.squares[x].parentNode.classList.add("animate-pop");
                            this.squares[x].parentNode.addEventListener('animationend', function () {
                                this.squares[x].parentNode.classList.remove('animate-pop');
                            }.bind(this))
                        }
                    } else {

                        if (parseInt(this.squares[x].innerHTML) != 0) {

                            this.squares[x + 1].parentNode.classList.add("animate-pop");
                            this.squares[x + 1].parentNode.addEventListener('animationend', function () {
                                this.squares[x + 1].parentNode.classList.remove('animate-pop');
                            }.bind(this))
                        }
                    }
                }


            }

        }
        if (mode != "nocheck")
            this.checkWin();
    }

    combineColFunct = function combineCol(mode) {
        for (let x = 0; x < (width * width) - width; x++) {
            if (this.squares[x].innerHTML === this.squares[x + width].innerHTML) {
                let combinedTotal = 0;
                if (reverse)
                    combinedTotal = parseInt(this.squares[x].innerHTML) / 2;
                else
                    combinedTotal = parseInt(this.squares[x].innerHTML) + parseInt(this.squares[x + width].innerHTML);
                if (mode != "nocheck") {
                    if (combinedTotal != 0) {
                        this.scoreAddDisplay.innerHTML = "+" + combinedTotal;
                        this.scoreAddDisplay.className = "class_scoreadd scoreanimate";
                        setTimeout(function () {
                            this.scoreAddDisplay.className = "class_scoreadd";
                            this.scoreAddDisplay.innerHTML = "";
                        }.bind(this), 500);

                    }

                    this.score += combinedTotal;
                }
                this.scoreDisplay.innerHTML = this.score;
                this.checkhigh();
                this.squares[x].innerHTML = combinedTotal;
                if (mode == "up") {
                    if (parseInt(this.squares[x].innerHTML) != 0) {
                        this.squares[x].parentNode.classList.add("animate-pop");
                        this.squares[x].parentNode.addEventListener('animationend', function () {
                            this.squares[x].parentNode.classList.remove('animate-pop');
                        }.bind(this))
                    }
                } else {
                    if (parseInt(this.squares[x].innerHTML) != 0) {
                        this.squares[x + width].parentNode.classList.add("animate-pop");
                        this.squares[x + width].parentNode.addEventListener('animationend', function () {
                            this.squares[x + width].parentNode.classList.remove('animate-pop');
                        }.bind(this))
                    }
                }
                if (mode != "nocheck")
                    this.checkbest();

                this.squares[x + width].innerHTML = 0;
            }

        }
        if (mode != "nocheck")
            this.checkWin();
    }
    /////////////////////////GAME STATES/////////////////
    checkGameOverFunc = function checkGameOver() {
        let zeros = 0;

        let tmpsquares = [];
        for (let x = 0; x < this.squares.length; x++) {
            if (this.squares[x].innerHTML == 0) {
                zeros++;

            }
            tmpsquares.push(this.squares[x])
        }
        if (zeros === 0) {
            let possible = false;
            for (let x = 0; x < (width * width) - 1; x++) {
                if (tmpsquares[x].innerHTML === tmpsquares[x + 1].innerHTML) {
                    possible = true;
                }
            }
            for (let x = 0; x < (width * width) - width; x++) {
                if (this.squares[x].innerHTML === this.squares[x + width].innerHTML) {
                    possible = true;
                }
            }
            if (!possible) {
                game_die(this);
            }


        }
        if (movecap != 0)
            if (this.moves >= movecap) {
                game_die(this);
            }
        function game_die(game) {
            game.paused = true;
            game.scoreResult.style.display = "block";
            game.scoreResult.style.left = game.gridDisplay.getBoundingClientRect().left + "px";
            game.scoreResult.style.width = (width * zoom) + 8 + "px";
            game.scoreResult.style.height = (width * zoom) + 8 + "px";
            game.scoreResult.className = "result gameoverbg";
            if (!game.replaying) {
                game.scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Lose</h1><button id='replay-" + game.gameId + "'>Restart</button><br><button id='watchreplay-" + game.gameId + "'>Watch Replay</button><button id='savereplay-" + game.gameId + "'>Save Replay</button>";
            } else {
                game.scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Lose</h1><button id='replay-" + game.gameId + "'>Close Replay</button>";
            }
            document.getElementById('replay-' + game.gameId).addEventListener('click', function () {
                if (!game.replaying) {
                    addtoreplayhistory(game);
                } else {
                    location.href = website[0] + ".html";
                    return;
                }
                game.replaying = false;
                game.reset2();
                game.scoreResult.style.display = "none";
            }.bind(game), false); ///BINDING
            if (!game.replaying) {
                document.getElementById('watchreplay-' + game.gameId).addEventListener('click', function () {
                    if (!game.replaying) {
                        addtoreplayhistory(game);
                    }
                    replay(game, genarateReplay(game, "json"))
                }.bind(game), false); ///BINDING
                document.getElementById('savereplay-' + game.gameId).addEventListener('click', function () {
                    genarateReplay(game, "file")
                }.bind(game), false); ///BINDING
            }
            autoplayCheck.checked = false;
            autoplayCheck.removeEventListener("change", autoplay);
            game.allowInput = false;
        }

    }

    continueGameFunct = function continueGame(game) {
        game.scoreResult.style.display = "none";
        game.continueEnabled = true;
        game.allowInput = true;
        game.paused = false;
        game.timing();
        autoplayCheck.addEventListener("change", autoplay);
    }

    checkWinFunct = function checkWin() {
        for (let x = 0; x < this.squares.length; x++) {
            if (this.squares[x].innerHTML == goal && !this.continueEnabled) {
                this.paused = true;
                this.scoreResult.style.display = "block";
                this.allowInput = false;
                this.scoreResult.style.left = this.gridDisplay.getBoundingClientRect().left + "px";
                this.scoreResult.style.width = (width * zoom) + 8 + "px";
                this.scoreResult.style.height = (width * zoom) + 8 + "px";
                this.scoreResult.className = "result gamewinbg";
                if (!this.replaying) {
                    this.scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Win!</h1>   <button id='replay-" + this.gameId + "'>Restart</button><button id='cont'>Continue</button><br><button id='watchreplay-" + this.gameId + "'>Watch Replay</button><button id='savereplay-" + this.gameId + "'>Save Replay</button>"
                } else {
                    this.scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Win!</h1>   <button id='replay-" + this.gameId + "'>Close Replay</button>"
                }
                document.getElementById('replay-' + this.gameId).addEventListener('click', function () {
                    if (!this.replaying) {
                        addtoreplayhistory(this);
                    } else {
                        location.href = website[0] + ".html";
                        return;
                    }
                    this.replaying = false;
                    this.reset2();
                    this.scoreResult.style.display = "none";
                }.bind(this), false);
                if (!this.replaying) {
                    document.getElementById("cont").addEventListener("click", function () {
                        this.continueGame(this);
                    }.bind(this)); document.getElementById('watchreplay-' + this.gameId).addEventListener('click', function () {
                        if (!this.replaying) {
                            addtoreplayhistory(this);
                        }
                        replay(this, genarateReplay(this, "json"))
                    }.bind(this), false); ///BINDING
                    document.getElementById('savereplay-' + this.gameId).addEventListener('click', function () {
                        genarateReplay(this, "file")
                    }.bind(this), false); ///BINDING
                }
                autoplayCheck.checked = false;
                autoplayCheck.removeEventListener("change", autoplay);
                this.allowInput = false;
            }

        }
    }


    /////////////////////////SCORES/////////////////
    checkhighFunct = function checkhigh() {
        if (this.hscore == undefined) {
            this.hscore = 0;
        }
        if (!reverse) {
            let current = parseInt(this.scoreDisplay.innerHTML);
            let high = this.hscore;
            if (high != "") {
                if (current >= high) {
                    this.hscore = current;
                }
            } else {
                this.hscore = current;
            }
            this.hscoreDisplay.innerHTML = high;
        } else {
            this.hscoreDisplay.innerHTML = "Unavalible in reverse mode.";
        }

    }

    checkh_bestFunct = function checkh_best() {
        if (this.hscore == undefined) {
            this.hscore = 0;
        }
        if (!reverse) {

            let current = parseInt(this.bestDisplay.innerHTML);
            let high = this.btile
            if (high != "") {
                if (current >= high) {
                    this.btile = current;
                }
            } else {
                this.btile = current;
            }

            this.hbestDisplay.innerHTML = high;

        } else {
            this.hbestDisplay.innerHTML = "Unavalible in reverse mode.";
        }


    }

    checkbestFunct = function checkbest() {
        let current = parseInt(this.bestDisplay.innerHTML);
        let best = current;
        for (let x = 0; x < this.squares.length; x++) {
            if (reverse) {
                best = 2048;
                if (parseInt(this.squares[x].innerHTML) <= best) {
                    if (parseInt(this.squares[x].innerHTML) == 0) {

                    } else {
                        best = parseInt(this.squares[x].innerHTML);
                    }

                }
            } else {
                if (parseInt(this.squares[x].innerHTML) >= best) {
                    best = parseInt(this.squares[x].innerHTML);
                }
            }

        }
        this.checkh_best();
        this.ctile = best;
        this.bestDisplay.innerHTML = best;


    }

    /////////////////////////LOAD/SAVE/RESET/////////////////
    function savegame(game, dontback = false) {
        let loadedGame = {
            "boards": []
        };
        let cookiedGame = getCookie("savedgames");
        if (cookiedGame != "") {
            loadedGame = JSON.parse(cookiedGame);
        }

        function SaveData(gameId, saveData, hscore, besttile, movekeys, time, keyPressed) {
            this.id = gameId;
            this.data = saveData;
            this.hscore = hscore;
            this.btile = besttile;
            this.movekeys = movekeys;
            this.time = time;
            this.keyPressed = keyPressed;
        }
        exists = false;
        for (let x = 0; x < loadedGame.boards.length; x++) {
            if (parseInt(loadedGame.boards[x].id) == game.gameId) {
                scoredata = loadedGame.boards[x].data;
                scoredata.length = 0;
                for (let x = 0; x < game.squares.length; x++) {

                    scoredata.push(game.squares[x].innerHTML);
                }

                scoredata.push(game.moves);
                scoredata.push(game.score);
                loadedGame.boards[x].hscore = game.hscore;
                loadedGame.boards[x].btile = game.btile;
                loadedGame.boards[x].time = game.time;
                loadedGame.boards[x].keyPressed = game.keyPressed;
                if (!dontback)
                    game.backdata.push(loadedGame.boards[x]);
                exists = true;

            }
        }
        if (!exists) {
            scoredata = [];

            for (let x = 0; x < game.squares.length; x++) {
                scoredata.push(game.squares[x].innerHTML);
            }
            scoredata.push(game.moves);
            scoredata.push(game.score);
            savedData = new SaveData(game.gameId, scoredata, game.hscore, game.btile, game.keycodes, game.time, game.keyPressed);
            if (!dontback)
                game.backdata.push(savedData);
            loadedGame.boards.push(savedData)
        }
        localStorage.setItem(game.gameId + '_backdata', JSON.stringify(game.backdata));
        setCookie("savedgames", JSON.stringify(loadedGame), 31)

    }



    function loadgame(gamedata, game, isback = false) {

        if (gamedata != "") {

            scoredata = gamedata.data;
            game.btile = gamedata.btile;
            game.hscore = gamedata.hscore;
            game.time = gamedata.time;
            game.keycodes = gamedata.movekeys;
            undefinedinc = false;
            for (let x = 0; x < scoredata.length; x++) {

                if (scoredata[x] == "undefined") {
                    undefinedinc = true
                }
            }

            if (!undefinedinc) {
                for (let x = 0; x < game.squares.length; x++) {
                    game.squares[x].innerHTML = scoredata[x];
                }
            }

            game.moves = parseInt(scoredata[scoredata.length - 2])
            game.score = parseInt(scoredata[scoredata.length - 1])
            game.movesdisplay.innerHTML = game.moves;
            game.scoreDisplay.innerHTML = game.score;
            game.hbestDisplay.innerHTML = game.btile;
            game.hscoreDisplay.innerHTML = game.hscore;
            timedisplay = document.getElementById('time-' + game.gameId);
            timedisplay.innerHTML = game.time.min + ":" + game.time.sec;
            if (!isback) {
                game.backdata = JSON.parse(localStorage.getItem(game.gameId + '_backdata'));
            }
            game.checkGameOver();
            game.checkWin();

        }



        if (customThemeActive) {
            game.themeBoard(cus_theme);
        } else {
            game.themeBoard(def_theme);
        }
        if (!isback)
            savegame(game, false);


    }

    function intialLoad(game) {
        loadedGame = {};
        let cookiedGame = getCookie("savedgames");
        if (cookiedGame != "") {
            loadedGame = JSON.parse(cookiedGame);
            for (let x = 0; x < loadedGame.boards.length; x++) {
                if (parseInt(loadedGame.boards[x].id) == game.gameId) {
                    if (savemode)
                        loadgame(loadedGame.boards[x], game)
                }
            }

        }

    }

    function resetGame(game, mode) {

        loadedGame = {};
        let cookiedGame = getCookie("savedgames");
        if (cookiedGame != "") {
            loadedGame = JSON.parse(cookiedGame);
            for (let x = 0; x < loadedGame.boards.length; x++) {
                if (loadedGame.boards[x].id = game.gameId) {
                    loadedGame.boards.splice(x);

                }
            }
        }
        setCookie("savedgames", JSON.stringify(loadedGame))
        game.squares.length = 0;
        game.moves = 0;
        game.score = 0;
        game.backdata = [];
        game.squares = [];
        game.time = {
            min: 0,
            sec: 0,
        }
        game.paused = false;
        game.replaying = false;
        game.keyPressed = "inital"
        game.scoreResult.style.display = "none";
        game.bestDisplay.innerHTML = "2";
        game.movesdisplay.innerHTML = game.moves;
        game.scoreDisplay.innerHTML = game.score;

        document.getElementById("replaycontrol-" + game.gameId).style.display = "none";
        game.gridDisplay.innerHTML = "";
        if (mode != 1) {
            game.createBoard();
            game.generate();
            game.generate();
            game.timing();
            if (customThemeActive) {
                game.themeBoard(cus_theme);
            } else {
                game.themeBoard(def_theme);
            }
            savegame(game);
        }


    }

    function ReloadPage() {
        location.href = website[0] + ".html";
        setCookie("reloadRequest", "yes", 1)
    }
    /////////////////////////INPUT/////////////////
    function control(e) {
        for (let g = 0; g < games.length; g++) {
            if (games[g].allowInput) {
                if (e.keyCode === games[g].keycodes[1]) {
                    games[g].keyPressed = "right";
                    games[g].keyRight();
                    games[g].moves += 1;
                    games[g].movesdisplay.innerHTML = games[g].moves;
                } else if (e.keyCode === games[g].keycodes[0]) {
                    games[g].keyPressed = "left";
                    games[g].keyLeft();
                    games[g].moves += 1;
                    games[g].movesdisplay.innerHTML = games[g].moves;
                } else if (e.keyCode === games[g].keycodes[2]) {
                    games[g].keyPressed = "up";
                    games[g].keyup();
                    games[g].moves += 1;
                    games[g].movesdisplay.innerHTML = games[g].moves;
                } else if (e.keyCode === games[g].keycodes[3]) {
                    games[g].keyPressed = "down";
                    games[g].keydown();
                    games[g].moves += 1;
                    games[g].movesdisplay.innerHTML = games[g].moves;
                }
                if (customThemeActive) {
                    games[g].themeBoard(cus_theme);
                } else {
                    games[g].themeBoard(def_theme);
                }

                if (savemode)
                    savegame(games[g]);
            }

        }
    }
    document.addEventListener('keyup', control);

    function autoplay() {
        if (autoplayCheck.checked) {
            for (let g = 0; g < games.length; g++) {
                setTimeout(function () {
                    let min = Math.ceil(1);
                    let max = Math.floor(5);
                    let rand = Math.floor(Math.random() * (max - min) + min); //The
                    if (rand == 1) {
                        games[g].keyPressed = "left";
                        games[g].keyLeft();
                    }
                    else if (rand == 2) {
                        games[g].keyPressed = "right";
                        games[g].keyRight();
                    }
                    else if (rand == 3) {
                        games[g].keyPressed = "up";
                        games[g].keyup();
                    }
                    else if (rand == 4) {
                        games[g].keyPressed = "down";
                        games[g].keydown();
                    }

                    if (customThemeActive) {
                        games[g].themeBoard(cus_theme); //FIX LATER
                    } else {
                        games[g].themeBoard(def_theme); //FIX LATER
                    }
                    games[g].moves += 1;
                    games[g].movesdisplay.innerHTML = games[g].moves;
                    if (savemode)
                        savegame(games[g]);
                    autoplay();

                }, 100);
            }
        } else {
            document.addEventListener('keyup', control);
        }

    }


    keyUpfunct = function keyup() {
        this.moveUp();
        this.combineCol("up");
        this.moveUp();
        this.generate();
    }

    keyDonwFunct = function keydown() {
        this.moveDown();
        this.combineCol("down");
        this.moveDown();
        this.generate();
    }

    keyRightFunct = function keyRight() {

        this.moveRight();
        this.combineRow("right");
        this.moveRight();
        this.generate();
    }

    keyLeftFunct = function keyLeft() {
        this.moveLeft();
        this.combineRow("left");
        this.moveLeft();
        this.generate();
    }

    Upsidedown_keyUpfunct = function keydown() {
        this.moveDown();
        this.combineCol("down");
        this.moveDown();
        this.generate();
    }

    Upsidedown_keyDonwFunct = function keyup() {
        this.moveUp();
        this.combineCol("up");
        this.moveUp();
        this.generate();
    }

    Upsidedown_keyRightFunct = function keyLeft() {
        this.moveLeft();
        this.combineRow("left");
        this.moveLeft();
        this.generate();
    }

    Upsidedown_keyLeftFunct = function keyRight() {

        this.moveRight();
        this.combineRow("right");
        this.moveRight();
        this.generate();
    }

    //--------------------------------------------------------------------------------------------------------------------//
    //_________________________________________________Game-Setup_________________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    //Load Theme

    //ThemeLoading
    setSettings();
    setTHeming()
    loadallfromsave();
    tilenum = 2;
    loadtilefromsave();
    makeintotile();
    tilenum = 2;

    function SetUpGame(game, keys) {
        game.keycodes = keys;
        game.moveLeft = moveLeftFunct;
        game.moveRight = moveRightFunct;
        game.moveDown = moveDownFunct;
        game.moveUp = moveUpFunct;
        game.combineCol = combineColFunct;
        game.combineRow = combineRowFunct;
        game.checkGameOver = checkGameOverFunc;
        game.checkWin = checkWinFunct;
        game.continueGame = continueGameFunct;
        game.checkhigh = checkhighFunct;
        game.checkh_best = checkh_bestFunct;
        game.checkbest = checkbestFunct;
        game.themeBoard = themeBoardFunct;
        if (gamemode == "Upsidedown") {
            game.keyLeft = Upsidedown_keyLeftFunct;
            game.keydown = Upsidedown_keyDonwFunct;
            game.keyRight = Upsidedown_keyRightFunct;
            game.keyup = Upsidedown_keyUpfunct;
        } else {
            game.keyLeft = keyLeftFunct;
            game.keydown = keyDonwFunct;
            game.keyRight = keyRightFunct;
            game.keyup = keyUpfunct;
        }
        game.squares = [];
        game.allowInput = true;
        //Run Functs
        //Settings

        //Game

        return game;
    }

    function StartingGameFunctions(game) {
        game.createBoard();
        game.generate();
        game.generate();
        intialLoad(game);
        game.checkbest();
        game.checkhigh();
        game.timing();
        //Theme it
        if (customThemeActive) {
            game.themeBoard(cus_theme);
        } else {
            game.themeBoard(def_theme);
        }
    }

    for (let g = 0; g < games.length; g++) {
        games[g] = SetUpGame(games[g]);
    }

    function CreateNewGameData(id) {
        tempgame = Object.assign({}, GameClass);
        tempgame.createboardhtml(id);
        games.push(tempgame)
    }
    makeNewGame = function makeNewGameFunct(id, keys) {
        CreateNewGameData(id);
        SetUpGame(games[id], keys);
        StartingGameFunctions(games[id]);
    }
    makeNewGame(games.length, [37, 39, 38, 40]);

    function loadOtherGames() {
        loadedGame = {};
        let cookiedGame = getCookie("savedgames");
        if (cookiedGame != "") {
            loadedGame = JSON.parse(cookiedGame);
            for (let x = 1; x < loadedGame.boards.length; x++) {
                makeNewGame(games.length, loadedGame.boards[x].movekeys)
            }
        }
    }
    loadOtherGames()

    function rezizegameovers() {
        games[0].checkGameOver();
        games[0].checkWin();
    }
    rezizegameovers();
    window.onresize = rezizegameovers;
    updatezoom();
    newboardButton = document.querySelector(".newboard");
    newboardButton.addEventListener("click", function () {
        makenew();
        rezizegameovers();
    });

    function makenew() {
        keydiv = document.querySelector(".newboarddiv");
        keytext = document.querySelector(".newboardtect");
        keydiv.style.display = "block"

        document.addEventListener('keyup', inputmapping);
        mappedkeys = [];
        modekeys = ["Left", "Right", "Up", "Down"];
        mode = 0;
        keytext.innerHTML = 'Press key for "' + modekeys[mode] + '"';

        function inputmapping(key) {
            mappedkeys.push(key.keyCode);
            mode += 1;
            if (mode == 4) {
                makeNewGame(games.length, mappedkeys);
                document.removeEventListener('keyup', inputmapping);
                keydiv.style.display = "none";
            }
            keytext.innerHTML = 'Press key for "' + modekeys[mode] + '"';
        }

    }


    ////////////////////////////////////////////////////////OTHER////////////////////////////////////////////////////////////
    //--------------------------------------------------------------------------------------------------------------------//
    //_________________________________________________OTHER-FUNCTIONS____________________________________________________//
    //--------------------------------------------------------------------------------------------------------------------//
    function debug(text, bugfixingid) { }
    if (getCookie("reloadRequest") == "yes") {
        setCookie("reloadRequest", "no", 1)
        location.href = website[0] + ".html";
        //STFU ik its a hack
    }

    function getUrlVar(varible) {
        debug("funct_geturl", 2);
        vars = window.location.search.split("?");
        for (let x = 0; x < vars.length; x++) {
            varibleData = vars[x].split("=");
            if (varibleData[0] == varible) {
                return varibleData[1];
            }
        }

    }

    function howToPlay() {
        setTimeout(function () {
            howtoplaytext = [];
            if (!settingsData.hotoplay_closed) {
                howtoplaytext.push("Here is information explaining each section of the game. If you are a new or even a returing 2048 player I would recomend reading this entirely as it explains some features that you might not have used previuosly.")
                howtoplaytext.push("")
                howtoplaytext.push("<strong>Gamemode: </strong>" + gamemode);
                if (reverse) {
                    type = "subtract"
                } else {
                    type = "combine"
                }
                if (gamemode == "Upsidedown") {
                    howtoplaytext.push("Same as regular " + goal + " but instead the controls have been inverted and the tiles have been flipped upside down");
                } else {
                    howtoplaytext.push("Using the arrow keys " + type + " tiles until one of them reaches " + goal + ". When you press a key all the tiles on the board move in that direction.");
                }
                howtoplaytext.push("")
                howtoplaytext.push("<strong>Score: </strong>" + games[0].score);
                howtoplaytext.push("The score increases everytime you combine a tile with another tile, it increases by the sum of that tile");
                howtoplaytext.push("")
                howtoplaytext.push("<strong>Current Best: </strong>" + games[0].ctile);
                howtoplaytext.push("This is the tile on the board that is closest to your goal");
                howtoplaytext.push("")
                howtoplaytext.push("<strong>Board's Side Tabs: </strong>");
                howtoplaytext.push("Press the '&#x21bb' button to reset the board. Press the '&#8592' button to go back one step. This counter '" + games[0].moves + "' displays your moves. This is your time: '" + games[0].time.min + ":" + games[0].time.sec + "'");
                howtoplaytext.push("")
                if (games[0].scoreResult.style.display == "block") {
                    howtoplaytext.push("<strong>Result Screen: </strong> Active");
                    howtoplaytext.push("The game is over and you have either won or lost, press restart to have another attempt, press watch replay to watch a replay of your game, press save replay to download your replay.");
                } else {
                    howtoplaytext.push("<strong>Result Screen: </strong> In-Active");
                    howtoplaytext.push("This is shown when game is over and you have either won or lost, press restart to have another attempt, press watch replay to watch a replay of your game, press save replay to download your replay.");

                }
                howtoplaytext.push("")
                if (settingsData.replayopened) {
                    howtoplaytext.push("<strong>Replay Controls: </strong> Open");
                } else {
                    howtoplaytext.push("<strong>Replay Controls: </strong> Closed");
                }
                howtoplaytext.push("Using these controls you can open a replay file that has been saved from your computer or you can input a shared replay that has been shared via text. You can also veiw a list of all your past games and their replays Note: this does not include replays that you have chosen to save to your computer.")
                howtoplaytext.push("")
                if (settingsData.opened) {
                    howtoplaytext.push("<strong>Customization Controls: </strong> Open");
                } else {
                    howtoplaytext.push("<strong>Customization Controls: </strong> Closed");
                }
                howtoplaytext.push("Use the customization settingns to recreate the game to your desire. Using theese controls you can change the goal, board size, spawn tile, move cap, gamemode and much more.")
                howtoplaytext.push("")
                howtoplaytext.push("<strong>New Board: </strong>" + games.length);
                howtoplaytext.push("Use the this button (which is located at the bottom of the customization options) to create a new board for multiple players at once. Set the keys for input and I would recomend changing the zoom so all games fit on the screen")
                howtoplaytext.push("")
                if (settingsData.theme_opened) {
                    howtoplaytext.push("<strong>Theme Maker [Game]: </strong> Open");
                } else {
                    howtoplaytext.push("<strong>Theme Maker [Game]: </strong> Closed");
                }
                howtoplaytext.push("Using the controls in the game section of the Theme Maker you are able to set the colour of: empty tiles, board color, text color, tabs color. Other optioal settings are the tagline and also real-time which allows the theme to be previewed in realtime before being set. Note you must Apply Theme before reloading or progress wont be saved.  ")
                howtoplaytext.push("")
                howtoplaytext.push("<strong>Theme Maker [Tile]: </strong>" + modename[currentmode]);
                if (modename[currentmode] == "Image") {
                    howtoplaytext.push("Using the Image controls in the game section of the Theme Maker you are able to set the background of a tile of your choosing to what ever image you have a direct URL to. Please Note: When cycling through tiles, images may temporally be out of sync - this is a bug so dont be alarmed.")
                } else {
                    howtoplaytext.push("Using the Image controls in the game section of the Theme Maker you are able to set the colours of various parts of the tile such as text, backgroud or glow colour. The glow amount is also customsiable.");
                }
                howtoplaytext.push("")
                if (settingsData.theme_opened) {
                    howtoplaytext.push("<strong>Theme Maker [Bottom]: </strong> Open");
                } else {
                    howtoplaytext.push("<strong>Theme Maker [Bottom]: </strong> Closed");
                }
                howtoplaytext.push("The buttons at the bottom of the Theme Maker are used to share your current theme or to load a recived theme. Additionaly you can load a pre-set or reset to the default via those buttons.")
            }
            howtoplaytext.push("")
            document.getElementById("howToPlay").innerHTML = howtoplaytext.join("<br>");
            howToPlay();
        }, 600)

    }
    howtoplay_open_close = document.getElementById("howToPlay_top");
    howtoplay_open_close.addEventListener('click', function () {
        if (!settingsData.hotoplay_closed) {
            settingsData.hotoplay_closed = true;
            howtoplay_open_close.innerHTML = "Show";
        } else {
            settingsData.hotoplay_closed = false;
            howtoplay_open_close.innerHTML = "Hide";
        }

        setCookie("settingsData", JSON.stringify(settingsData), 265)
    });
    if (!settingsData.hotoplay_closed) {
        howtoplay_open_close.innerHTML = "Hide";
    } else {
        howtoplay_open_close.innerHTML = "Show";
    }
    howToPlay();
    var descriptionBoard = {
        gridDisplay: document.getElementById("themeTiles"),
        squares: [],
        tileNum: settingsData.spwantile,
        createBoard: function () {
            for (let x = 0; x < 10; x++) {
                square = document.createElement('div');
                square.className = "squareItem";
                tile = document.createElement("div");
                tile.className = "tile";
                this.tileNum += this.tileNum;
                tile.innerHTML = this.tileNum;
                if (gamemode == "Upsidedown"){
                    tile.style.transform = "rotate(180deg)";
                }

                square.appendChild(tile)
                this.gridDisplay.appendChild(square);
                this.squares.push(tile);
            }
        },};
    descriptionBoard.themeBoard = themeBoardFunct;
    descriptionBoard.createBoard();
    var numBoard = {
        gridDisplay: document.getElementById("themeNumTiles"),
        squares: [],
        tileNum: settingsData.spwantile,
        createBoard: function () {
            for (let x = 0; x < 10; x++) {
                square = document.createElement('div');
                square.className = "squareItem";
                tile = document.createElement("div");
                tile.className = "tile";
                this.tileNum += this.tileNum;
                tile.innerHTML = this.tileNum;
                if (gamemode == "Upsidedown"){
                    tile.style.transform = "rotate(180deg)";
                }

                square.appendChild(tile)
                this.gridDisplay.appendChild(square);
                this.squares.push(tile);
            }
        },};
    numBoard.themeBoard = themeBoardFunct;
    numBoard.createBoard();
    function themingDescription() {
        setTimeout(function () {
            themdescripttext = [];
            if (customThemeLoaded) {
                if(jsonedTheme.gamethem[5] == "Cupcakes"){
                    themdescripttext.push("<strong>Active Theme: </strong> Cupcakes");
                    themdescripttext.push("This is a custom theme based around various cupcakes that was desgined by the developer of this website. It was based of the orginal cupcakes theme by <a href='https://0x0800.github.io/2048-CUPCAKES/'>This Person.</a>");
                }else if(jsonedTheme.gamethem[5] == "Doughnuts"){
                    themdescripttext.push("<strong>Active Theme: </strong> Doughnuts");
                    themdescripttext.push("This is a custom theme based around various Doughnuts that was desgined by the developer of this website.");
                }else if(jsonedTheme.gamethem[5] == "Sushi"){
                    themdescripttext.push("<strong>Active Theme: </strong> Sushi");
                    themdescripttext.push("This is a custom theme based around various Sushi pecies that was desgined by the developer of this website.");
                }else{
                    themdescripttext.push("<strong>Active Theme: </strong> Custom");
                    themdescripttext.push("This is a custom theme that you or another user has designed using the Theme Maker on the right. ");
                }
            } else {
                themdescripttext.push("<strong>Active Theme: </strong> Default");
                themdescripttext.push("This is the default theme loaded with the game. It is a boring theme and I recomend you change it.");
            }
            themdescripttext.push("")
            if (customThemeLoaded) {
                themdescripttext.push("<strong>Tiles: </strong> Custom");
            }else{
                themdescripttext.push("<strong>Tiles: </strong> Default");
            }
            numBoard.themeBoard(def_theme);
            if (customThemeActive) {
                descriptionBoard.themeBoard(cus_theme);
            } else {
                descriptionBoard.themeBoard(def_theme);
            }
            themdescripttext.push("")
            document.getElementById("themeInfo").innerHTML = themdescripttext.join("<br>");
            themingDescription();
        }, 800)
    }
    numBoard.themeBoard(def_theme);
    if (customThemeActive) {
        descriptionBoard.themeBoard(cus_theme);
    } else {
        descriptionBoard.themeBoard(def_theme);
    }
    howtotheme_open_close = document.getElementById("themeInfo_top");
    themeInfoContainer = document.getElementById("themeInfoContainer");
    howtotheme_open_close.addEventListener('click', function () {
        if (!settingsData.themeInfo_closed) {
            settingsData.themeInfo_closed = true;
            howtotheme_open_close.innerHTML = "Show";
            themeInfoContainer.style.display = "none";
        } else {
            settingsData.themeInfo_closed = false;
            howtotheme_open_close.innerHTML = "Hide";
            themeInfoContainer.style.display = "block";
        }

        setCookie("settingsData", JSON.stringify(settingsData), 265)
    });
    if (!settingsData.themeInfo_closed) {
        howtotheme_open_close.innerHTML = "Hide";
        themeInfoContainer.style.display = "block";
    } else {
        howtotheme_open_close.innerHTML = "Show";
        themeInfoContainer.style.display = "none";
    }
    themingDescription();

    var passedTheme = getUrlVar("rawTheme")
    if (passedTheme != undefined) {
        sharethemeinputbox.value = passedTheme;
        loadthemedata();
    }
    var passedReplay = getUrlVar("rawReplay")
    if (passedReplay != undefined) {

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


function resetTheme() {
    setCookie("customTheme", "", 365);
    location.href = website[0] + ".html";
}

//2000+ lines with a messed  up spacekey
//3000+ lines for replay and dynamic creation, with much less of a headache then from theme-ing