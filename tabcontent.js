//Hello4
//Assalamualaik
var CurrentSurah = null;
var CurrentVerse = null;
var CurrentRoot = null;
var TNAME = null;
var DNAME = null;

var tafasir = 
[
    'ibnkathir',
    'jalalayn',
    'maududi',
    'maarif',
    'muqbil'
];
var tafasir_footer = 
{
    'ibnkathir': 'Abridged translation by Darussalam',
    'jalalayn': 'English Translation',
    'maududi': 'Written by Abul-Aala Maududi',
    'maarif': 'Written by Mufti Muhammad Shafi',
    'muqbil': 'Traanslated by me'
};
var tafasir_title = 
{
    'ibnkathir': 'Tafsir Ibn Kathir',
    'jalalayn': 'Tafsir Jalalayn',
    'maududi': 'Tafsir Maududi',
    'maarif': 'Maariful Quran',
    'muqbil': 'Sahih Narrations of the Reasons of Revelation'
};
var groupers_all =
[
    ibnkathir_grouper,
    jalalayn_grouper,
    maududi_grouper,
    maarif_grouper,
    muqbil_grouper
];

var existers_all =
[
    exist_ibnkathir,
    exist_jalalayn,
    exist_maududi,
    exist_maarif,
    exist_muqbil
];

function pressTafsir (tname)
{
    openTafsir(tname);
    window.history.pushState(null, '', "/" + tname + "/" + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString())
    //window.location.pathname = "/" + tname + "/" + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString();
    
}

function openTafsir (tname)
{
    TNAME = tname;
    var titler = document.getElementById("tafsirTitle");
    var footer = document.getElementById("tafsirFooter");
    titler.innerHTML = tafasir_title[tname];
    //footer.innerHTML = tafasir_footer[tname];
    document.getElementById("tafsirText").innerHTML = "Loading..."

    url = "http://tafsir.fussilat.com/" + tname + "_final/s" + (CurrentSurah+1).toString() + "/v" 
        + CurrentVerse.toString() + ".txt"; 

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
        
        if (data.charAt(0) != '=')
        {
            var texter = document.getElementById("tafsirText");
            data = "<p>" + data.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
                .replaceAll ("\n", "</p><p>")
                .replaceAll("#", " ")
                .replaceAll("  ", " ")
                .replaceAll("DIVIDER", "<hr>")
                + "</p>"
            var content = "";
            try{
            
            var group = ibnkathir_grouper;
            for (var i = 0; i < groupers_all.length; i++)
            {
                if (tname == tafasir[i])
                {
                    group = groupers_all[i];
                }
            }
            /*if (tname == 'ibnkathir') group = ibnkathir_grouper;
            else if (tname == 'maududi') group = maududi_grouper;
            else if (tname == 'jalalayn') group = jalalayn_grouper;
            else if (tname == 'maarif') group = maarif_grouper;*/
            var range = group[CurrentSurah][CurrentVerse];
            
            //Arabic Verses
            content = "<p style=\"text-align: right;\"><b>";
            for (var i = range[0]; i <= range[1]; i++)
            {
                content += surahs[CurrentSurah][i - 1] 
                    + " " + "\ufd3f" + i.toString() + "\ufd3e\u200f ";
            }
            
            content += "</b></p>";
            //English Translation
            content += "<p><b><u>Sahih International</u>: ";
            for (var i = range[0]; i <= range[1]; i++)
            {
                content += tsurahs[CurrentSurah][i - 1] 
                    + " " + "(" + i.toString() + ") ";
            }
            content += "</b></p>";


            content += data;
            }
            catch (err)
            {
                document.getElementById("vbox").innerHTML = 
                    err + "<br/>"
                    + tname;
            }
            texter.innerHTML = content;
        }
        else
        {
            secondTry(data, tname);
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    

}

function secondTry(data, tname)
{
    var xhttp2 = new XMLHttpRequest();
    var newvnum = parseInt(data.split('=')[1]);
    //document.getElementById("tafsirText").innerHTML = data;
    url2 = "http://tafsir.fussilat.com/" + tname + "_final/s" + (CurrentSurah+1).toString() + "/v" 
        + newvnum.toString() + ".txt";
    xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            data2 = this.responseText;
            
            var texter2 = document.getElementById("tafsirText");
            data2 = "<p>" + data2.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
                .replaceAll("DIVIDER", "<hr>")
                .replaceAll ("\n", "</p><p>")
                .replaceAll("#", " ")
                .replaceAll("  ", " ")
                + "</p>"
            var content = "";
            var group = ibnkathir_grouper;
            for (var i = 0; i < groupers_all.length; i++)
            {
                if (tname == tafasir[i])
                {
                    group = groupers_all[i];
                }
            }
            /*if (tname == 'ibnkathir') group = ibnkathir_grouper;
            else if (tname == 'maududi') group = maududi_grouper;
            else if (tname == 'jalalayn') group = jalalayn_grouper;*/
            var range = group[CurrentSurah][CurrentVerse];
            
            //Arabic Verses
            content = "<p style=\"text-align: right;\"><b>";
            for (var i = range[0]; i <= range[1]; i++)
            {
                content += surahs[CurrentSurah][i - 1] 
                    + " " + "\ufd3f" + i.toString() + "\ufd3e\u200f ";
            }
            
            content += "</b></p>";
            //English Translation
            content += "<p><b><u>Sahih International</u>: ";
            for (var i = range[0]; i <= range[1]; i++)
            {
                content += tsurahs[CurrentSurah][i - 1] 
                    + " " + "(" + i.toString() + ") ";
            }
            content += "</b></p>";


            content += data2;
            texter2.innerHTML = content;
        }
    }
    xhttp2.open("GET", url2, true);
    xhttp2.send();
}

function loadDoc(url) 
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        document.getElementById("vbox").innerHTML = 
            "<div>" + data[0].length + "</div>"
            + "<div>" + this.responseText + "</div>";
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function surahsChanged()
{
    var vchoose = document.getElementById("v-choose");
    var schoose = document.getElementById("s-choose");
    var chosensur = schoose.value;
    
    if (isValidSurah(chosensur))
    {
        var snum;
        try{
        var options = '';
        snum = parseInt(schoose.value.split(".")[0]) - 1;
        /*for (var i = 0; i < surahs[snum].length; i++)
        {
            options += '<option value="' + (i + 1) + '" />';
        }*/
        document.getElementById('verses').innerHTML = options;
        vchoose.disabled = false;
        vchoose.max = surahs[snum].length;
        vchoose.value = 1;
        CurrentSurah = snum;
        CurrentVerse = 1;
        
        versesChanged();
        
        }
        catch(err)
        {
            verbox.innerHTML += err.message
                + "<br/>" + err
                + "<br/>" + err.lineNumber
                + "<br/>" + snum.toString()
                + "<br/>" + surahs[snum].length.toString();
        }
    }
    else
    {
        vchoose.disabled = true;
        vchoose.value = "";
        CurrentSurah = null;
        CurrentVerse = null;
    }

}

function is_valid_datalist_value(idDataList, inputValue) {
    var option = document.querySelector("#" + idDataList + " option[value='" + inputValue + "']");
    if (option != null) {
      return option.value.length > 0;
    }
    return false;
}
function isValidSurah (chosensur)
{
    for (var i = 0; i < 114; i++)
    {
        if (chosensur == (i + 1).toString() + ". " + snames[i])
        {
            return true;
        }
    }
    return false;
}


function isValidVerse(chosenver)
{
    //console.log(CurrentSurah);
    if (chosenver >= 1 && chosenver <= surahs[CurrentSurah].length)
    {
        return true;
    }
    else return false;
}
function versesChanged()
{
    //var vchoose = document.getElementById("v-choose");
    //var chosenver = vchoose.value;
    //CurrentVerse = chosenver;
    //window.location.pathname = "/" + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString();
    versesChangeder();
}
function versesChangeder()
{
    var vchoose = document.getElementById("v-choose");
    var artext = document.getElementById("vbox-ar");
    var entext = document.getElementById("vbox-en");
    var forarrow = document.getElementById("vfor");
    var backarrow = document.getElementById("vbac");
    var chosenver = vchoose.value;
    console.log(chosenver);
    if (isValidVerse(chosenver))
    {
        
        verbox = document.getElementById('vbox');
        CurrentVerse = chosenver;
        updateThings(true);
        /*
        var arverse = surahs[CurrentSurah][CurrentVerse - 1];
        var enverse = tsurahs[CurrentSurah][CurrentVerse - 1];
        artext.value = arverse;
        entext.value = enverse;
        
        forarrow.style.visibility = "hidden";
        backarrow.style.visibility = "hidden";
        //
        if (parseInt(CurrentVerse) > 1)
        {
            forarrow.style.visibility = "visible";
        }
        if (parseInt(CurrentVerse) < surahs[CurrentSurah].length)
        {
            console.log("Hello");
            backarrow.style.visibility = "visible";
        }

        verifyTafasir()*/
        //window.location.pathname = "/" + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString();
        //verbox.innerHTML = "<p>" + arverse + "</ap>" 
        //    + "<p>" + enverse + "</ap>";
    }
    else
    {
        verbox.innerHTML = "";
        artext.value = "";
        entext.value = "";
    }
}

function forwardVerse()
{
    var vchoose = document.getElementById("v-choose");
    vchoose.value = parseInt(vchoose.value) + 1;
    versesChanged();
}

function backwardVerse()
{
    var vchoose = document.getElementById("v-choose");
    vchoose.value = parseInt(vchoose.value) - 1;
    versesChanged();
}

function verifyTafasir()
{
    var existers = existers_all;
    for (var i = 0; i < existers.length; i++)
    {
        exist = existers[i][CurrentSurah][CurrentVerse];
        if (exist)
        {
            var option = document.getElementById(tafasir[i]);
            option.className = "option";
            option.setAttribute("onclick",  "pressTafsir('" + tafasir[i] + "')"); ;
        }
        else
        {
            var option = document.getElementById(tafasir[i]);
            option.className = "option-none";
            option.setAttribute("onclick",  "");
        }
    }
}

function backForward()
{
    //console.log("Back Hello");
    var url = decodeURIComponent(document.location.toString());
    var vchoose = document.getElementById("v-choose");
    var schoose = document.getElementById("s-choose");
    var artext = document.getElementById("vbox-ar");
    var entext = document.getElementById("vbox-en");
    var wbwbox = document.getElementById("wbw");
    var p = url.split(".com/");
    //document.getElementById("vbox").innerHTML = p;
    if (p.length == 1 || p[1] == '')
    {
        CurrentSurah = null;
        CurrentVerse = null;
        schoose.value = "";
        vchoose.value = "";
        artext.value = "";
        entext.value = "";
        wbwbox.innerHTML = "<h3 style='margin-bottom: 0em;'>Word by Word Translation</h3>";
        vchoose.disabled = true;
        modal.style.display = "none";
    }
    else if (p.length == 2)
    {
        var splitted = p[1].split('/');
        if (splitted.length == 2)
        {
            CurrentSurah = parseInt(splitted[0]) - 1;
            CurrentVerse = parseInt(splitted[1]);
            modal.style.display = "none";
            vchoose.disabled = false;
            schoose.value = (CurrentSurah + 1).toString() + ". " + snames[CurrentSurah];
            vchoose.value = CurrentVerse;
            versesChangeder();
        }
        else if (splitted.length == 3)
        {
            document.getElementById("vbox").value = splitted;
            CurrentSurah = parseInt(splitted[1]) - 1;
            CurrentVerse = parseInt(splitted[2]);
            var giventafsir = splitted[0];
            openTafsir(giventafsir);
            vchoose.disabled = false;
            schoose.value = (CurrentSurah + 1).toString() + ". " + snames[CurrentSurah];
            vchoose.value = CurrentVerse;
            versesChangeder();
            openTafsir(giventafsir);
        }
    }
}

function forwardTaf()
{
    var tname = TNAME;
    var group = ibnkathir_grouper;
    for (var i = 0; i < groupers_all.length; i++)
    {
        if (tname == tafasir[i])
        {
            group = groupers_all[i];
        }
    }
    
    var cgroup = group[CurrentSurah][CurrentVerse];
    news = CurrentSurah;
    newv = CurrentVerse;
    olds = CurrentSurah;
    oldv = CurrentVerse;
    for (var s = CurrentSurah; s < 114; s++)
    {
        var v;
        if (s == CurrentSurah) v = CurrentVerse;
        else v = 1;
        for (v = v; v <= surahs[s].length; v++)
        {
            if ((group[s][v][0] != cgroup[0] || s != CurrentSurah) && group[s][v][0] != 0)
            {
                news = s;
                newv = v;
                break;
            }
        }
        if (news != olds || newv != oldv)
        {
            break;
        }
    }
    CurrentSurah = news;
    CurrentVerse = newv;
    updateThings(true);
    pressTafsir(TNAME);
}

function backwardTaf()
{
    var tname = TNAME;
    var group = ibnkathir_grouper;
    for (var i = 0; i < groupers_all.length; i++)
    {
        if (tname == tafasir[i])
        {
            group = groupers_all[i];
        }
    }
    
    var cgroup = group[CurrentSurah][CurrentVerse];
    news = CurrentSurah;
    newv = CurrentVerse;
    olds = CurrentSurah;
    oldv = CurrentVerse;
    for (var s = CurrentSurah; s >= 0; s--)
    {
        var v;
        if (s == CurrentSurah) v = CurrentVerse;
        else v = surahs[s].length;
        for (v = v; v > 0; v--)
        {
            if ((group[s][v][0] != cgroup[0] || s != CurrentSurah) && group[s][v][0] != 0)
            {
                news = s;
                newv = v;
                break;
            }
        }
        if (news != olds || newv != oldv)
        {
            break;
        }
    }
    CurrentSurah = news;
    CurrentVerse = newv;
    updateThings(true);
    pressTafsir(TNAME);
}

function updateThings()
{
    console.log("Updating...");
    var vchoose = document.getElementById("v-choose");
    vchoose.disabled = false;
    var artext = document.getElementById("vbox-ar");
    var entext = document.getElementById("vbox-en");
    var forarrow = document.getElementById("vfor");
    var backarrow = document.getElementById("vbac");
    var wbwbox = document.getElementById("wbw");

    document.getElementById('s-choose').value = (CurrentSurah + 1).toString() + ". " + snames[CurrentSurah];
    vchoose.value = CurrentVerse;    
    verbox = document.getElementById('vbox');
    
    var arverse = surahs[CurrentSurah][CurrentVerse - 1];
    var enverse = tsurahs[CurrentSurah][CurrentVerse - 1];
    artext.value = arverse;
    entext.value = enverse;
    forarrow.style.visibility = "hidden";
    backarrow.style.visibility = "hidden";
    //
    if (parseInt(CurrentVerse) > 1)
    {
        forarrow.style.visibility = "visible";
    }
    if (parseInt(CurrentVerse) < surahs[CurrentSurah].length)
    {
        //console.log("Hello");
        backarrow.style.visibility = "visible";
    }
    
    var wbwtext = "<h3 style='margin-bottom: 0em;'>Word by Word Translation</h3>";
    wbwtext += "<div style='font-size: 0.7em;'>Click on a root to select it.</div>"; 
    var arsplit = arverse.split(" ");
    var rootsplit = rsurahs[CurrentSurah][CurrentVerse - 1].split(" ");
    var wtverse = wtsurahs[CurrentSurah][CurrentVerse - 1];
    for (var i = 0; i < wtverse.length; i++)
    {
        wbwtext += "<p><span style='color: darkred; font-size: 1.2em;'>";
        wbwtext += arsplit[i] + "&lrm;</span>";
        if (rootsplit[i] != "none")
        {
            wbwtext += " (<a href='javascript:void(0);' onclick='selectRoot(this)'>";
            wbwtext += rootsplit[i] + "</a>)"
        }
        wbwtext += ": <span style='color: black; font-size: 0.8em;'>";
        wbwtext += wtverse[i] + "</span>";
        wbwtext += "</p>";
    }
    wbwbox.innerHTML = wbwtext;
    //console.log(wbwtext);
    verifyTafasir() 
    window.history.pushState(null, '', '/' + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString());
}
function updateThings(urlUpdate)
{
    console.log("Updating...");
    var vchoose = document.getElementById("v-choose");
    vchoose.disabled = false;
    var artext = document.getElementById("vbox-ar");
    var entext = document.getElementById("vbox-en");
    var forarrow = document.getElementById("vfor");
    var backarrow = document.getElementById("vbac");
    var wbwbox = document.getElementById("wbw");

    document.getElementById('s-choose').value = (CurrentSurah + 1).toString() + ". " + snames[CurrentSurah];
    vchoose.value = CurrentVerse;    
    verbox = document.getElementById('vbox');
    
    var arverse = surahs[CurrentSurah][CurrentVerse - 1];
    var enverse = tsurahs[CurrentSurah][CurrentVerse - 1];
    artext.value = arverse;
    entext.value = enverse;
    forarrow.style.visibility = "hidden";
    backarrow.style.visibility = "hidden";
    //
    if (parseInt(CurrentVerse) > 1)
    {
        forarrow.style.visibility = "visible";
    }
    if (parseInt(CurrentVerse) < surahs[CurrentSurah].length)
    {
        //console.log("Hello");
        backarrow.style.visibility = "visible";
    }
    
    var wbwtext = "<h3 style='margin-bottom: 0em;'>Word by Word Translation</h3>";
    wbwtext += "<div style='font-size: 0.7em;'>Click on a root to select it.</div>"; 
    var arsplit = arverse.split(" ");
    var rootsplit = rsurahs[CurrentSurah][CurrentVerse - 1].split(" ");
    var wtverse = wtsurahs[CurrentSurah][CurrentVerse - 1];
    for (var i = 0; i < wtverse.length; i++)
    {
        wbwtext += "<p><span style='color: darkred; font-size: 1.2em;'>";
        wbwtext += arsplit[i] + "&lrm;</span>";
        if (rootsplit[i] != "none")
        {
            wbwtext += " (<a href='javascript:void(0);' onclick='selectRoot(this)'>";
            wbwtext += rootsplit[i] + "</a>)"
        }
        wbwtext += ": <span style='color: black; font-size: 0.8em;'>";
        wbwtext += wtverse[i] + "</span>";
        wbwtext += "</p>";
    }
    wbwbox.innerHTML = wbwtext;
    //console.log(wbwtext);
    verifyTafasir() 
    if (urlUpdate)
        window.history.pushState(null, '', '/' + (CurrentSurah + 1).toString() + "/" + CurrentVerse.toString());
}