document.addEventListener('DOMContentLoaded', loaded);
if (!window.location.href.includes("index.html")) {
    window.location.href = "index.html";
}
//FINAL
//make ai, ai give hint or image

//NEXT:
//Preset themes
//Other customizations: addition or combine mode,game saving and loading, undo,
//May have  to remake tiles  and animations before gamemodes
//modes: splitscreen multiplayer, flappy, tertirs, 3d maybe,
//Gamemode exporting

//BUGS mostly theming ofc
//cant set/load bg when in image  mode
//Image beign weird when cycling through ("MOST LIKELY BC OF MODES")
//theme needs  a change for inputted theme bgdata to load


//ORGANISE CODE b4 GAMEMODES


function loaded() {
    function debug(text, bugfixingid) {

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
    //SPAWN
    const spawnDisplay = document.querySelector('#spawn');
    const spawnincrease = document.querySelector('#spawnincrease');
    const spawndecrease = document.querySelector('#spawndecrease');
    let spwantile = 2;
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
    //Spawn tile
    let spawntilecook = getCookie("spawn");
    if (spawntilecook != "") {
        spwantile = parseInt(spawntilecook);

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
    if (reverse) {
        goal = 2;
        spwantile = 2048;

    }

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


    //	//console.log(reverse)
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
    ////Example game theme data: Empty Board Background Body
    def_gametheme = [def_0, "#cacece", "#72b182ab", "#776e65"];
    def_theme = new Theme(def_0, def_2, def_4, def_8, def_16, def_32, def_64, def_128, def_256, def_512, def_1024, def_2048, der_morethen2048, def_morele, def_gametheme);
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
    cus_gametheme = [cus_0, "#cacece", "#72b182ab", "#776e65"];
    cus_morele = [
        [],
        []
    ];
    cus_theme = new Theme(cus_0, cus_2, cus_4, cus_8, cus_16, cus_32, cus_64, cus_128, cus_256, cus_512, cus_1024, cus_2048, der_morethen2048, cus_morele, cus_gametheme);
    ///////////UI
    customThemeLoaded = false;
    default_glowamt = 0;
    default_textcol = "#000000";
    default_bgcol = "#FFFFFF";
    default_glowCol = "#FFFFFF";
    zerocol = "rgb(128, 190, 128)"
    boardcol = "#cacece"
    bodytextcol = "#776e65"
    bodybgcol = "#72b182ab"
    //OpenClose
    const themeMakerDisplay = document.querySelector('.themepannel');
    const themeMakerClose = document.querySelector('.theme_closebtn');
    const themeMakerOpen = document.querySelector('.theme_openbtn');

    themeMakerOpen.addEventListener("click", openThemeMaker);
    themeMakerClose.addEventListener("click", closeThemeMaker);

    function openThemeMaker() {
        debug("funct_openthememaker", 2);
        themeMakerDisplay.style.width = "250px";
        setCookie("theme-open", "yes", 1);
    }

    function closeThemeMaker() {
        debug("funct_closethememaker", 2);
        themeMakerDisplay.style.width = "0";
        setCookie("theme-open", "no", 1);
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
    var tempnum = spwantile;
    if (reverse)
        tempnum = goal
    themeTilelDisplay.innerHTML = "<p>" + tempnum + "</p>";

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
        debug("funct_setreal", 2);
        setCookie("realtime", realtimeCheck.checked, 1);
    }
    if (realtime) {
        realtimeCheck.checked = true
    } else if (!realtime) {
        realtimeCheck.checked = false
    }
    realtimeCheck.addEventListener("change", setreal);

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

    function themeModeincrese() {
        //console.log("Increase");
        for (let y = 0; y < modes.length; y++) {

            if (y == currentmode) {
                modes[y].style.display = "block";

            } else {
                modes[y].style.display = "none";
            }
        }
        themeModeDisplay.innerHTML = "<p>" + modename[currentmode] + "</p>";
        if (currentmode + 1 == modes.length) {
            currentmode = 0;
        } else {
            currentmode += 1;
        }
    }

    function themeModedecrese() {
        //console.log("Decrease");
        for (let y = 0; y < modes.length; y++) {
            if (y == currentmode) {
                modes[y].style.display = "block";
            } else {
                modes[y].style.display = "none";
            }
        }
        themeModeDisplay.innerHTML = "<p>" + modename[currentmode] + "</p>";
        if (currentmode - 1 == -1) {
            currentmode = modes.length - 1;
        } else {
            currentmode -= 1;
        }
    }
    themeModeincrese();


    //////Image
    //Image Source
    const urlinput = document.querySelector('#imgurl');

    var urldata = "";

    function seturl() {
        urldata = urlinput.value;
        if (realtime) {
            makeintotile();
        }
    }
    urlinput.addEventListener("change", seturl);

    //Image Positioning on  tile
    ///////Colours
    //TextColour
    var textcolpciker = new iro.ColorPicker('#textcolpciker', {
        width: 150,
        color: default_textcol
    });
    textcol = textcolpciker.color.hexString;
    textcolpciker.on('color:change', function() {
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
    bgcolpciker.on('color:change', function() {
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
        debug("funct_glowincraese", 2);
        glowAmtnum += 2;
        themeglowAmtlDisplay.innerHTML = "<p>" + glowAmtnum + "px</p>";
        if (realtime) {
            makeintotile();
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
        }
    }
    //GlowCol
    var glowcolpciker = new iro.ColorPicker('#glowcolpciker', {
        width: 150,
        color: default_glowCol
    });
    glowCol = glowcolpciker.color.hexString;
    glowcolpciker.on('color:change', function() {
        glowCol = glowcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });

    function loadtilefromsave(initial = false) {
        debug("loadfromsave", 1);
        storedtheme = getCookie("customTheme");


        if (storedtheme != "") {
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
                if(jsonedTheme.elementMore[0].length != 0){
                    cus_morele = jsonedTheme.elementMore;

                }

                for (let y = 0; y < jsonedTheme.elementMore[0].length; y++) {
                    if (stpnum == parseInt(jsonedTheme.elementMore[0][y])) {

                        boxshadow = jsonedTheme.elementMore[1][y].boxshadow;
                        if (boxshadow != "") {
                            glowData = boxshadow.split(" ");
                            default_glowCol = glowData[4]
                            default_glowamt = parseInt(glowData[3].replace('px', ''));
                        }
                        default_textcol = jsonedTheme.elementMore[1][y].textcol;
                        default_bgcol = jsonedTheme.elementMore[1][y].bg;
                        bgcolpciker.color.set(default_bgcol);
                        textcolpciker.color.set(default_textcol);
                        glowcolpciker.color.set(default_glowCol);
                        if (jsonedTheme.elementMore[1][y].imagemode) {
                            currentmode = 0;
                            urldata = jsonedTheme.elementMore[1][y].imageurl;
                        } else {
                            currentmode = 1;

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
                            default_glowamt = parseInt(glowData[3].replace('px', ''));
                        }
                        //console.log(jsonedTheme.options[y].textcol)
                        default_textcol = jsonedTheme.options[y].textcol;
                        default_bgcol = jsonedTheme.options[y].bg;
                        bgcolpciker.color.set(default_bgcol);
                        textcolpciker.color.set(default_textcol);
                        glowcolpciker.color.set(default_glowCol);
                        if (jsonedTheme.options[y].imagemode) {
                            currentmode = 0;
                            urldata = jsonedTheme.options[y].imageurl;
                        } else {
                            currentmode = 1;

                        }


                    }
                }
            }
        }
        //console.log("LOADEE")
    }

    //ZeroCol
    var zerocolpciker = new iro.ColorPicker('#zeropicker', {
        width: 150,
        color: zerocol
    });
    zerocol = zerocolpciker.color.hexString;
    zerocolpciker.on('color:change', function() {
        zerocol = zerocolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    var boardcolpciker = new iro.ColorPicker('#boardpicker', {
        width: 150,
        color: boardcol
    });
    boardcol = boardcolpciker.color.hexString;
    boardcolpciker.on('color:change', function() {
        boardcol = boardcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    var bodybgcolpciker = new iro.ColorPicker('#worldbgpicker', {
        width: 150,
        color: bodybgcol
    });
    bodybgcol = bodybgcolpciker.color.hexString;
    bodybgcolpciker.on('color:change', function() {
        bodybgcol = bodybgcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    var bodytextcolpciker = new iro.ColorPicker('#worldtextpicker', {
        width: 150,
        color: bodytextcol
    });
    bodytextcol = bodytextcolpciker.color.hexString;
    bodytextcolpciker.on('color:change', function() {
        bodytextcol = bodytextcolpciker.color.hexString;
        if (realtime) {
            makeintotile();
        }
    });
    const submitbutton = document.querySelector('.makeTile');
    if (!realtime) {
        submitbutton.innerHTML = "Set Tile"
    } else {
        submitbutton.innerHTML = "Apply Theme"
    }
    submitbutton.addEventListener("click", function() {
        if (!realtime) {
            makeintotile();
            applytheme();
        } else {
            applytheme();
        }

    });
    if (customThemeLoaded) {
        makeintotile();
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
            boardcol = jsonedTheme.gamethem[1];
            bodybgcol = jsonedTheme.gamethem[2];
            bodytextcol = jsonedTheme.gamethem[3];
            // makeintotile(); THIS LINE  WAS CAUSING THE MF 2 not beign coloure corclty BUG, I  STG 2 HRS WASTED UGHHHHHHHHHHH
        }

    }
    loadallfromsave();

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
            //shits reversed bc i change the number at the end cbf fixing it
            element = "";

            if (modename[currentmode] == "Colour") {

                element = new BoardElement(bgcol, textcol, "0 0 " + glowAmtnum + "px " + glowAmtnum + "px " + glowCol, true, urldata)
            } else
                element = new BoardElement(bgcol, textcol, "0 0 " + glowAmtnum + "px " + glowAmtnum + "px " + glowCol, false, "none")
            return element;
        }
        cus_gametheme[1] = boardcol;
        cus_gametheme[2] = bodybgcol;
        cus_gametheme[3] = bodytextcol;
        cus_theme = new Theme(cus_0, cus_2, cus_4, cus_8, cus_16, cus_32, cus_64, cus_128, cus_256, cus_512, cus_1024, cus_2048, der_morethen2048, cus_morele, cus_gametheme);
        debug(cus_theme, 1)
        debug("cus_theme", 1)
        themeData = JSON.stringify(cus_theme);
        setCookie("storedTheme", "cus_theme", 365);
        setCookie("storedTheme", cus_theme, 365);
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
            debug("Parsed JSON", 1);
            debug(jsonedTheme, 1);
            var encoded = btoa(JSON.stringify(jsonedTheme));
            sharethemeinputbox.value = encoded;
            sharetext.innerHTML = "Copy this text and share it with whoever. (Click inside and press ctrl-a then copy) or share this link <a href='" + website[0] + ".html?rawTheme=" + encoded + "'>Link to Theme</a>";
        } else {
            sharetext.innerHTML = "Please note you need a theme to use this tool."
        }
    }

    function closeshare() {
        sharethemediv.style.display = "none";
    }

    function loadtheme() {
        debug("funct_loadtheme", 2);
        makeintotile();
        sharethemediv.style.display = "block";
        loadbutton.style.display = "block";
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

    function createBoard() {
        debug("funct_createboard", 2);
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

    function BoardElement(bg, textcol, boxshadow, imagemode, imageurl) {
        this.bg = bg;
        this.textcol = textcol;
        this.boxshadow = boxshadow;
        this.imagemode = imagemode;
        this.imageurl = imageurl;
    }

    function Theme(zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight, more2048, elemore, gameThemeData) {
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
        this.number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        this.options = [zero, two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyeight, twofiftysix, fivetwelve, oneohtwentyfour, twozerofoureight];
        this.moreenabled = more2048;
        this.elementMore = elemore;
        this.gamethem = gameThemeData;
        this.encodedproperly = "it_works_pls_dont_mess_with_this_otherwise_it_breaks";
    }

    function themeBoard(Theme) {
        debug("funct_themetheboard", 2);
        debug(Theme, 1);
        debug("CHECK POINT", 1);
        gameTheme = Theme.gamethem;
        for (let x = 0; x < squares.length; x++) {
            tinum = parseInt(squares[x].innerHTML);
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

                        squares[x].style.fontSize = "0px";
                        squares[x].style.background = "white"; //Fixed for transparancy
                        squares[x].style.boxShadow = Theme.options[y].boxshadow;
                        squares[x].style.backgroundSize = "cover";
                        squares[x].style.backgroundImage = "url('" + Theme.options[y].imageurl + "')";
                    } else {

                        squares[x].style.fontSize = "40px";
                        squares[x].style.color = Theme.options[y].textcol;
                        squares[x].style.background = Theme.options[y].bg;
                        squares[x].style.boxShadow = Theme.options[y].boxshadow;
                    }

                }

            }
            if (stpnum > 11) {
                if (Theme.moreenabled) {
                    themedtile = false;
                    for (let y = 0; y < Theme.elementMore[0].length; y++) {
                        if (stpnum == parseInt(Theme.elementMore[0][y])) {
                            if (Theme.elementMore[1][y].imagemode) {

                                squares[x].style.fontSize = "0px";
                                squares[x].style.background = Theme.elementMore[1][y].bg;

                                squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                                squares[x].style.backgroundSize = "cover";
                                squares[x].style.backgroundImage = "url('" + Theme.elementMore[1][y].imageurl + "')";
                            } else {

                                squares[x].style.fontSize = "40px";
                                squares[x].style.color = Theme.elementMore[1][y].textcol;
                                squares[x].style.background = Theme.elementMore[1][y].bg;

                                squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                            }
                            themedtile = true;
                        }
                    }
                    if (!themedtile) {
                        if (Theme.elementMore[1][y].imagemode) {

                            squares[x].style.fontSize = "0px";
                            squares[x].style.background = Theme.elementMore[1][y].bg;
                            squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                            squares[x].style.backgroundSize = "cover";
                            squares[x].style.backgroundImage = "url('" + Theme.elementMore[1][y].imageurl + "')";
                        } else {

                            squares[x].style.fontSize = "40px";
                            squares[x].style.color = Theme.elementMore[1][y].textcol;
                            squares[x].style.background = Theme.elementMore[1][y].bg;
                            squares[x].style.boxShadow = Theme.elementMore[1][y].boxshadow;
                        }
                    }
                } else {
                    squares[x].style.color = Theme.options[Theme.options.length - 1].textcol;
                    squares[x].style.background = Theme.options[Theme.options.length - 1].bg;
                    squares[x].style.boxShadow = Theme.options[Theme.options.length - 1].boxshadow;
                }

            }
        }

        if (gameTheme != undefined) {
            console.log("data")
            document.body.style.background = gameTheme[2];
            document.body.style.color = gameTheme[3];
            gridDisplay.style.border = "5px solid " + gameTheme[1];
            gridDisplay.style.backgroundColor = zerocol;
            tilestotheme = gridDisplay.children;
            for (let y = 0; y < tilestotheme.length; y++) {
                tilestotheme[y].style.backgroundColor = gameTheme[1];
            }
            // document.getElementsByClassName("grid")
        }
    }

    createBoard();
    if (customThemeActive) {
        themeBoard(cus_theme);
    } else {
        themeBoard(def_theme);
    }


    //SPAWN
    function setspawn(mode) {
        ////console.log("Clicked");
        if (mode == 1) {
            if (spwantile != 1)
                spwantile -= 1;
            else
                spwantile = 1;
        }
        if (mode == 2) {
            spwantile += 1;
        }
        spawnDisplay.innerHTML = "<p>" + spwantile + "</p>";
        setCookie("spawn", spwantile, 1);
        if (mode != 0) {
            window.location.reload();
        }
    }
    spawnincrease.addEventListener("click", function() {
        setspawn(2);
    });
    spawndecrease.addEventListener("click", function() {
        setspawn(1);
    });
    setspawn(0);
    //GOAL
    function setgoal(mode) {
        ////console.log("Clicked");

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
                goal = goal / 2;
                setCookie("steps", setps - 1, 1);
            } else
                goal = 2;
        }
        if (mode == 2) {
            goal = goal * 2;
            setCookie("steps", setps + 1, 1);
        }
        headertext.innerHTML = goal;
        headertext2.innerHTML = goal;
        goalDisplay.innerHTML = "<p>" + goal + "</p>";
        document.title = goal + " | Max Tyson";
        setCookie("goal", goal, 1);
    }
    goalincrease.addEventListener("click", function() {
        setgoal(2);
    });
    goaldecrease.addEventListener("click", function() {
        setgoal(1);
    });
    setgoal(0);

    function setsize(mode) {
        ////console.log("Clicked");
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
    sizeDisplay.innerHTML = "<p>" + width + "</p>";

    function setreverse() {

        setCookie("reverse", reverseCheck.checked, 1);
        if (reverseCheck.checked) {
            setCookie("goal", 2, 1);
        } else {
            setCookie("goal", 2048, 1);
            setCookie("spawn", 2, 1);
        }
        location.reload();
    }
    if (reverse) {
        reverseCheck.checked = true
    } else if (!reverse) {
        reverseCheck.checked = false
    }
    //	//console.log(reverseCheck.checked +"="+reverse);
    reverseCheck.addEventListener("change", setreverse);
    autoplayCheck.addEventListener("change", autoplay);


    function generate() {
        debug("genarate", 2);
        let randNum = Math.floor(Math.random() * squares.length);
        if (squares[randNum].innerHTML == 0) {
            var newel = squares[randNum].cloneNode(true);
            squares[randNum].parentNode.replaceChild(newel, squares[randNum]);
            squares[randNum] = newel;
            squares[randNum].innerHTML = spwantile;

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
                    let oldval = parseInt(squares[x + y].innerHTML);
                    squares[x + y].innerHTML = newRow[0 + y];
                    if (newRow[0 + y] != 0 && oldval != newRow[0 + y]) {
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
                let oldval = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
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
                let oldval = parseInt(squares[x + y * width].innerHTML);
                squares[x + y * width].innerHTML = newCol[0 + y];
                if (newCol[0 + y] != 0 && oldval != newCol[0 + y]) {
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
                if (mode != "nocheck")
                    score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkhigh();
                squares[x].innerHTML = combinedTotal;
                if (mode != "nocheck")
                    checkbest();
                squares[x + 1].innerHTML = 0;
                if (mode == "left") {
                    ////console.log("Left: "+x)
                    if (parseInt(squares[x].innerHTML) != 0) {
                        squares[x].parentNode.classList.add("animate-pop");
                        squares[x].parentNode.addEventListener('animationend', function() {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                } else {

                    if (parseInt(squares[x].innerHTML) != 0) {

                        squares[x + 1].parentNode.classList.add("animate-pop");
                        squares[x + 1].parentNode.addEventListener('animationend', function() {
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
                        squares[x].parentNode.addEventListener('animationend', function() {
                            squares[x].parentNode.classList.remove('animate-pop');
                        })
                    }
                } else {
                    if (parseInt(squares[x].innerHTML) != 0) {
                        squares[x + width].parentNode.classList.add("animate-pop");
                        squares[x + width].parentNode.addEventListener('animationend', function() {
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
        // //console.log("CHECKING")
        for (let x = 0; x < squares.length; x++) {
            if (squares[x].innerHTML == goal && !continueEnabled) {
                scoreResult.style.display = "block";
                scoreResult.style.width = (width * 100) + "px";
                scoreResult.style.height = width * 100 + "px";
                scoreResult.style.background = "lightgreen";
                scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Win!</h1><button onclick='location.reload()'>Replay</button><button id='cont'>Continue</button>"
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
                scoreResult.innerHTML = "<h1 style='font-size: " + width * 10 + "px;'>You Lose</h1><button onclick='location.reload()'>Replay</button>";
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
            setTimeout(function() {
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
                if (customThemeActive) {
                    themeBoard(cus_theme);
                } else {
                    themeBoard(def_theme);
                }
                autoplay();
            }, 100);
        } else {
            document.addEventListener('keyup', control);
        }

    }
    var passedTheme = getUrlVar("rawTheme")
    if (passedTheme != undefined) {
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

function resetTheme() {
    setCookie("customTheme", "", 365);
    location.reload();
}

//Customisable theming was a mistake, im drowing in errors, aint gonna  bother to fix it in this commit, like where tf is the purple coming fromg ???????!?!?!??!?!?!?!?!?!!?!?!?!?!!?!?!?!?!??!?!?