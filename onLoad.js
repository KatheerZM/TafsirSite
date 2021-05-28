
var firstLoad = false;
function useUrl()
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
            console.log("Tafsirs finished...");
            document.getElementById("verse-title").innerHTML = "Choose Surah and Verse";

            var url = decodeURIComponent(document.location.toString());
            //document.getElementById('vbox').innerHTML = "Hello";

            var p = removeEmpty(url.split(".com/"));
            //document.getElementById('vbox').innerHTML = p;
            if (p.length > 1)
            {
                var splitted = removeEmpty(p[1].split('/'));
                if (splitted.length == 2 && !isNaN(splitted[0]) && !isNaN(splitted[1]))
                {
                    CurrentSurah = parseInt(splitted[0]) - 1;
                    CurrentVerse = parseInt(splitted[1]);
                    if (CurrentSurah > 113 || CurrentSurah < 0)
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        window.history.pushState(null, '', '/');
                        return;
                    }
                    
                    if (isValidVerse(CurrentVerse))
                    {
                        updateFront();
                    }
                    else
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        window.history.pushState(null, '', '/');
                    }
                }
                /*else if (splitted.length == 2)
                {
                    CurrentRoot = laneToArabic(splitted[1]);
                    var givendict = splitted[0];
                    //changeTab('tabs')
                    if (!dictionaries.includes(givendict))
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        CurrentRoot = null;
                        window.history.pushState(null, '', '/');
                        return;
                    }
                    if (!lane_roots.includes(arabicToLane(CurrentRoot)))
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        CurrentRoot = null;
                        window.history.pushState(null, '', '/');
                        return;
                    }
                    //updateThings(false);
                    changeTab("tabd");
                    var rbox = document.getElementById("root-choose");
                    rbox.value = CurrentRoot;
                    verifyDictionaries();
                    openDict(givendict);

                }*/
                else if (splitted.length == 3 && !isNaN(splitted[1]) && !isNaN(splitted[2]))
                {
                    CurrentSurah = parseInt(splitted[1]) - 1;
                    CurrentVerse = parseInt(splitted[2]);
                    var giventafsir = splitted[0];
                    
                    if (CurrentSurah > 113 || CurrentSurah < 0)
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        window.history.pushState(null, '', '/');
                        return;
                    }
                    if (!isValidVerse(CurrentVerse))
                    {
                        CurrentSurah = null;
                        CurrentSurah = null;
                        window.history.pushState(null, '', '/');
                        return;
                    }
                    CurrentTafsir = giventafsir;
                    firstLoad = true;
                    updateFront();

                    /*if (giventafsir == "ibraham")
                    {
                        openTafsir("ibnkathir");
                        setIbrahim();
                    }
                    else openTafsir(giventafsir);*/ 
                }
                else
                {
                    CurrentSurah = null;
                    CurrentSurah = null;
                    CurrentTafsir = null;
                    window.history.pushState(null, '', '/');
                    return;
                }
                //useParams(url)
            }
            document.getElementById("s-choose").disabled = false;
        }
    }
    var url2 = "https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/" + sheetID + "/public/full?alt=json-in-script&min-col=1&max-col=5&callback=testSheet";
    xhttp.open("GET", url2, true);
    xhttp.send();

    

}

function removeEmpty(givenarray)
{
    var sentarray = [];
    for (var i = 0; i < givenarray.length; i++)
    {
        if (givenarray[i].trim() != "") sentarray.push(givenarray[i]);
    }
    return sentarray;
}

function updateFront()
{
    document.getElementById('s-choose').value = (CurrentSurah + 1).toString() + ". " + snames[CurrentSurah];
    document.getElementById('v-choose').value = (CurrentVerse).toString();
    surahsChanged();

}