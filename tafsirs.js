var Tafsirs = [];
var pageIDs = [];
var verseNos = [];
var existers = [];
var safeToLoad = false;
var xhttp = new XMLHttpRequest();
var surahcells;
function loadTafsirList()
{
    var excel;
    var sheetID = "1";
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            for (var i = 2; i <= excel.feed.entry[excel.feed.entry.length - 1].gs$cell.row; i++)
            {
                Tafsirs.push(["", "", "", "", ""]);
            }
            for (var i = 5; i < excel.feed.entry.length; i++)
            {
                for (var j = 1; j <= 5; j++)
                {
                    if (excel.feed.entry[i].gs$cell.col == j.toString())
                    {
                        Tafsirs[parseInt(excel.feed.entry[i].gs$cell.row) - 2][parseInt(excel.feed.entry[i].gs$cell.col) - 1] = excel.feed.entry[i].gs$cell.inputValue;
                    }
                }
                
            }
            console.log("Tafsirs finished...")
            document.getElementById("verse-title").innerHTML = "Choose Surah and Verse"
        }
    }
    var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-col=1&max-col=5&callback=testSheet";
    xhttp.open("GET", url, true);
    xhttp.send();
}
var startTime;

function loadAll()
{
    var excel;
    var sheetID = (CurrentSurah + 2).toString();
    document.getElementById("loading").innerHTML = "Checking for more tafsirs...";
    document.getElementById("tafsir-options").innerHTML = "";
    safeToLoad = false;

    for (var i = 0; i < 4; i++)
    {
        if (texisters[tafasir[i]][CurrentSurah][CurrentVerse])
        {
            document.getElementById("main-" + (i+1).toString()).className = "option";
            document.getElementById("main-" + (i+1).toString()).onclick = function() {
                tafsirGet(tafasir[i])
            };
        }
        
    }
    
    /*for (var i = 0; i < tafasir.length; i++)
    {
        if (texisters[tafasir[i]][CurrentSurah][CurrentVerse])
        {
            document.getElementById("tafsir-options").innerHTML += ""
                + "<div class='t-option' onclick='testSheet()'>"
                + getTafsir(tafasir[i])[0] + "</div>";
        }
        
    }*/
    
    startTime = performance.now();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            surahcells = excel;
            pageIDs = [];
            verseNos = [];
            existers = [];
            var endTime = performance.now();
            console.log(endTime - startTime);
            var verserow = -1;
            for (var i = 0; i < excel.feed.entry.length; i++)
            {
                if (parseInt(excel.feed.entry[i].gs$cell.col) >= 4 && excel.feed.entry[i].gs$cell.row == "1")
                    pageIDs.push(excel.feed.entry[i].gs$cell.inputValue);
                else if (parseInt(excel.feed.entry[i].gs$cell.row) >= 3 && excel.feed.entry[i].gs$cell.col == "1")
                {
                    var vnum = parseInt(excel.feed.entry[i].gs$cell.inputValue);
                    //console.log(i, excel.feed.entry[i].gs$cell);
                    verseNos.push(vnum);
                    if (vnum == CurrentVerse && verserow == -1)
                    {
                        verserow = excel.feed.entry[i].gs$cell.row;
                        for (var j = 0; j < pageIDs.length; j++)
                        {
                            existers.push(false);
                        }
                    }
                }
                if (parseInt(excel.feed.entry[i].gs$cell.col) >= 4 && excel.feed.entry[i].gs$cell.row == verserow)
                {
                    existers[parseInt(excel.feed.entry[i].gs$cell.col) - 4] = true;
                }
            }

            /*for (var i = 0; i < pageIDs.length; i++)
            {
                if (existers[i])
                {
                    document.getElementById("tafsir-options").innerHTML += ""
                        + "<div class='t-option' onclick=\"tafsirGet('" + pageIDs[i] + "')\">"
                        + getTafsir(pageIDs[i])[0] + "</div>";
                }
                
            }*/
            //console.log(pageIDs);
            //console.log(existers);
            safeToLoad = true;
            loadVerse(CurrentTafsir);
        }
    }
    var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&callback=testSheet";
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadVerse()
{
    var excel = surahcells;
    var verserow = (3 + firstIndex (CurrentVerse)).toString();

    if (!safeToLoad) return;
    existers = [];
    for (var i = 0; i < excel.feed.entry.length; i++)
    {
        if (parseInt(excel.feed.entry[i].gs$cell.col) >= 4 && excel.feed.entry[i].gs$cell.row == verserow)
        {
            existers[parseInt(excel.feed.entry[i].gs$cell.col) - 4] = true;
        }
    }
    for (var i = 0; i < 4; i++)
    {
        if (existers[pageIDs.indexOf(tafasir[i])])
        {
            document.getElementById("main-" + (i+1).toString()).className = "option";
            document.getElementById("main-" + (i+1).toString()).setAttribute("onclick",  `tafsirGet('${tafasir[i]}')`);
        }
        
    }
    var table = document.getElementById("tafsir-options");
    table.innerHTML = "";
    var tnum = 0;
    //console.log("Hello1");
    for (var i = 0; i < pageIDs.length; i++)
    {
        if (!tafasir.includes(pageIDs[i]))
        {
            //console.log("Hello2");
            if (existers[i])
            {
                console.log("Hello3");
                if (tnum % 4 == 0)
                {
                    table.innerHTML += `<tr id="row${Math.floor(tnum / 4)}"></tr>`;
                    for (var j = 0; j < 4; j++)
                        document.getElementById(`row${Math.floor(tnum / 4)}`).innerHTML += `<td style="width: 23%;" id="row${Math.floor(tnum / 4)}-col${j.toString()}"/>`;
                }
                //console.log(getTafsir(pageIDs[i]));
                
                var cell = document.getElementById(`row${Math.floor(tnum / 4)}-col${tnum % 4}`);
                cell.setAttribute("onclick",  `tafsirGet('${pageIDs[i]}')`);
                cell.className = "option";
                cell.innerHTML = `
                <a class="optionlink">
                    <div class="tafsirTitle" id="extra-title-${tnum}">${getTafsir(pageIDs[i])[0]}</div>
                    <div class="tafsirAuthor" id="extra-author-${tnum}">${getTafsir(pageIDs[i])[2]}</div>
                </a>
                `;
                /*row.innerHTML += 
                `
                <td style="width: 23%;" onclick="tafsirGet('${pageIDs[i]}')" class="option" id="extra-${tnum}">
                    <a class="optionlink">
                        <div class="tafsirTitle" id="extra-title-${tnum}">${getTafsir(pageIDs[i])[0]}</div>
                        <div class="tafsirAuthor" id="extra-author-${tnum}">${getTafsir(pageIDs[i])[2]}</div>
                    </a>
                </td>
                `;*/
                tnum++;
                /*document.getElementById("tafsir-options").innerHTML += ""
                    //+ 
                    + "<div class='t-option' onclick=\"tafsirGet('" + pageIDs[i] + "')\">"
                    + getTafsir(pageIDs[i])[0] + "</div>";*/
            }

        }
    }
    if (tnum == 0) document.getElementById("loading").innerHTML = "No other tafsirs found.";
    else document.getElementById("loading").innerHTML = "";
    if (firstLoad)
    {
        if (pageIDs.includes(CurrentTafsir) && existers[pageIDs.indexOf(CurrentTafsir)])
        {
            console.log(CurrentTafsir);
            tafsirGet(CurrentTafsir);
        }
        else
        {
            CurrentTafsir = null;
            window.history.pushState(null, '', `/${(parseInt(CurrentSurah) + 1).toString()}/${CurrentVerse.toString()}`);
        }
        firstLoad = false;
    }
}

function loadThree()
{
    var excel;
    var sheetID = (CurrentSurah + 2).toString();
    startTime = performance.now();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            pageIDs = [];
            for (var i = 0; i < excel.feed.entry.length; i++)
            {
                if (parseInt(excel.feed.entry[i].gs$cell.col) >= 4)
                    pageIDs.push(excel.feed.entry[i].gs$cell.inputValue);                
            }
            var endTime = performance.now();
            console.log(endTime - startTime);
            loadTwo();
        }
    }
    var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-row=1&max-row=1&callback=testSheet";
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadTwo()
{
    
    var excel;
    var sheetID = (CurrentSurah + 2).toString();
    console.log(sheetID);
    
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            verseNos = [];
            for (var i = 2; i < excel.feed.entry.length; i++)
            {
                verseNos.push(parseInt(excel.feed.entry[i].gs$cell.inputValue));                
            }
            
            loadOne();
        }
    }
    var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-col=1&max-col=1&callback=testSheet";
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadOne()
{
    var excel;
    var row = "3";
    for (var i = 0; i < verseNos.length; i++)
    {
        if (verseNos[i] == CurrentVerse)
        {
            row = (i + 3).toString();
        }
    }
    var sheetID = (CurrentSurah + 2).toString();
    console.log(sheetID);
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            existers = [];
            for (var i = 0; i < pageIDs.length; i++)
            {
                existers.push(false);
            }
            
            for (var i = 0; i < excel.feed.entry.length; i++)
            {
                if (parseInt(excel.feed.entry[i].gs$cell.col) >= 4)
                {
                    existers[parseInt(excel.feed.entry[i].gs$cell.col) - 4] = true;
                }
            }
            
            document.getElementById("tafsir-options").innerHTML = "";
            for (var i = 0; i < pageIDs.length; i++)
            {
                if (existers[i])
                {
                    document.getElementById("tafsir-options").innerHTML += ""
                        + "<div class='t-option' onclick='testSheet()'>"
                        + getTafsir(pageIDs[i])[1] + "</div>";
                }
                
            }
            //console.log(pageIDs);
            //console.log(existers);
            
        }
    }
    var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-row=" + row + "&max-row=" + row + "&callback=testSheet";
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getTafsir(tid)
{
    for (var i = 0; i < Tafsirs.length; i++)
    {
        if (Tafsirs[i][1] == tid) return Tafsirs[i];
    }
}

function tafsirGet(tid)
{
    var titler = document.getElementById("tafsirTitle");
    var texter = document.getElementById("tafsirText");
    var modal = document.getElementById("tafsirModal");
    console.log(tid, Tafsirs);
    titler.innerHTML = getTafsir(tid)[0];
    texter.innerHTML = "";
    texter.innerHTML = "Loading tafsir text...";
    modal.style.display = "block";
    CurrentTafsir = tid;

    var tcol = 4 + pageIDs.indexOf(tid);
    var arow1 = 3 + firstIndex(CurrentVerse);
    var arow2 = 3 + lastIndex(CurrentVerse);

    if (!safeToLoad)
    {
        return;
    }
    var excel = [];
    for (var i = 0; i < surahcells.feed.entry.length; i++)
    {
        if (surahcells.feed.entry[i].gs$cell.col == tcol.toString() && parseInt(surahcells.feed.entry[i].gs$cell.row) >= arow1)
            excel.push(surahcells.feed.entry[i]);
    }
    
    var endverse = CurrentVerse;
    for (var i = 1; i < excel.length; i++)
    {
        if (verseNos[ parseInt(excel[i - 1].gs$cell.row) - 3 ] != verseNos[parseInt(excel[i].gs$cell.row) - 3])
        {
            if (excel[i].gs$cell.inputValue.charAt(0) == '=')
            {
                endverse++;
            }
            else
            {
                break;
            }
        }
    }                
    //console.log(CurrentVerse, endverse);
    //console.log (excel.feed.entry);
    if (excel[0].gs$cell.inputValue.charAt(0) != '=')
    {
        var tafsirtext = "";
        for (var i = 0; i < excel.length && parseInt(excel[i].gs$cell.row) <= arow2; i++)
        {
            //console.log(i);
            //console.log (parseInt(excel.feed.entry[i].gs$cell.row), arow2);
            tafsirtext += excel[i].gs$cell.inputValue + "\n";                
        }
        
        
        
        tafsirtext = "<p>" + tafsirtext.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
            .replaceAll ("\n", "</p><p>")
            .replaceAll("#", " ")
            .replaceAll("  ", " ")
            .replaceAll("DIVIDER", "<hr>")
            + "</p>";
        texter.innerHTML = "<p><b>" + ayahWithNumbers(CurrentVerse, endverse) + "</b></p>" 
            + "<p><b>" + verseWithNumbers(CurrentVerse, endverse) + "</b></p>" 
            + tafsirtext;
    }
    else
    {
        secondGet (tid, parseInt(excel[0].gs$cell.inputValue.split('=')[1]), endverse);
    }

    
    //console.log(arow1, arow2, CurrentVerse);
    
    /*var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-col=" + tcol.toString() + "&max-col=" + tcol.toString() + "&min-row=" + arow1.toString() + "&callback=testSheet";
    console.log (url);
    xhttp.open("GET", url, true);
    xhttp.send();*/
    window.history.pushState(null, '', `/${tid}/${(parseInt(CurrentSurah) + 1).toString()}/${CurrentVerse.toString()}`);
}

function secondGet(tid, verse, endverse)
{
    var arow1 = 3 + firstIndex(verse);
    var arow2 = 3 + lastIndex(verse);
    var titler = document.getElementById("tafsirTitle");
    var texter = document.getElementById("tafsirText");
    var modal = document.getElementById("tafsirModal");
    titler.innerHTML = getTafsir(tid)[0];
    texter.innerHTML = "";
    texter.innerHTML = "Loading tafsir text...";
    modal.style.display = "block";
    var tcol = 4 + pageIDs.indexOf(tid);
    
    var excel = [];
    for (var i = 0; i < surahcells.feed.entry.length; i++)
    {
        if (surahcells.feed.entry[i].gs$cell.col == tcol.toString() && parseInt(surahcells.feed.entry[i].gs$cell.row) >= arow1 && parseInt(surahcells.feed.entry[i].gs$cell.row) <= arow2)
            excel.push(surahcells.feed.entry[i]);
    }
    var sheetID = (CurrentSurah + 2).toString();
    console.log (excel);
    
    var tafsirtext = "";
    for (var i = 0; i < excel.length; i++)
    {
        tafsirtext += excel[i].gs$cell.inputValue + "\n";                
    }
    
    if (tafsirtext.charAt(0) != '=')
    {
        tafsirtext = "<p>" + tafsirtext.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
            .replaceAll ("\n", "</p><p>")
            .replaceAll("#", " ")
            .replaceAll("  ", " ")
            .replaceAll("DIVIDER", "<hr>")
            + "</p>";
        texter.innerHTML = "<p><b>" + ayahWithNumbers(verse, endverse) + "</b></p>" 
            + "<p><b>" + verseWithNumbers(verse, endverse) + "</b></p>" 
            + tafsirtext;
    }
    else
    {
        secondGet (tid, parseInt(tafsirtext.split('=')[1]));
    }

    //console.log(verseNos);
    //console.log([1,2,3].indexOf(1));
    
    //console.log(arow1, arow2, verse);
    
    /*var url = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-col=" + tcol.toString() + "&max-col=" + tcol.toString() + "&min-row=" + arow1.toString() + "&max-row=" + arow2.toString() + "&callback=testSheet";
    console.log (url);
    xhttp.open("GET", url, true);
    xhttp.send();*/
}

function firstIndex (a)
{
    for (var i = 0; i < verseNos.length; i++)
    {
        if (verseNos[i] == a)
        {
            return i;
        }
    }
}

function lastIndex (a)
{
    for (var i = verseNos.length - 1; i >= 0; i--)
    {
        if (verseNos[i] == a)
        {
            return i;
        }
    }
}

function forwardTaf()
{
    var excel = [];
    var tcol = 4 + pageIDs.indexOf(CurrentTafsir);
    for (var i = 0; i < surahcells.feed.entry.length; i++)
    {
        if (surahcells.feed.entry[i].gs$cell.col == tcol.toString() && parseInt(surahcells.feed.entry[i].gs$cell.row) >= parseInt(CurrentVerse) + 3 && surahcells.feed.entry[i].gs$cell.inputValue.charAt(0) != '=')
            excel.push(surahcells.feed.entry[i]);
    }
    // && parseInt(surahcells.feed.entry[i].gs$cell.row) >= 2 + CurrentVerse && surahcells.feed.entry[i].gs$cell.inputValue.charAt(0) != '='
    //console.log(parseInt(CurrentVerse) + 2, excel);
    if (excel.length > 0)
    {
        CurrentVerse = parseInt(excel[0].gs$cell.row) - 2;
        document.getElementById("v-choose").value = CurrentVerse;
        versesChanged();
        tafsirGet(CurrentTafsir);
    }
}

function backwardTaf()
{
    var excel = [];
    var tcol = 4 + pageIDs.indexOf(CurrentTafsir);
    for (var i = 0; i < surahcells.feed.entry.length; i++)
    {
        if (surahcells.feed.entry[i].gs$cell.col == tcol.toString() && parseInt(surahcells.feed.entry[i].gs$cell.row) >= 3 && parseInt(surahcells.feed.entry[i].gs$cell.row) < parseInt(CurrentVerse) + 2 && surahcells.feed.entry[i].gs$cell.inputValue.charAt(0) != '=')
            excel.push(surahcells.feed.entry[i]);
    }
    // && parseInt(surahcells.feed.entry[i].gs$cell.row) >= 2 + CurrentVerse && surahcells.feed.entry[i].gs$cell.inputValue.charAt(0) != '='
    //console.log(parseInt(CurrentVerse) + 2, excel);
    if (excel.length > 0)
    {
        CurrentVerse = parseInt(excel[excel.length - 1].gs$cell.row) - 2;
        document.getElementById("v-choose").value = CurrentVerse;
        versesChanged();
        tafsirGet(CurrentTafsir);
    }
}


//function firstRow(excel, )