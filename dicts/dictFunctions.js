var dictionaries = 
[
    'lane'
]
var roots_all = 
[
    lane_roots
]
var dicts_title =
{
    'lane': 'Lane Lexicon'
};
function verifyDictionaries()
{
    var rbox = document.getElementById("root-choose");
    CurrentRoot = rbox.value;
    for (var i = 0; i < dictionaries.length; i++)
    {
        var option = document.getElementById("dict-" + dictionaries[i]);
        if (lane_roots.includes(arabicToLane(CurrentRoot)))
        {
            option.className = "option";
            option.setAttribute("onclick",  "pressDict('" + dictionaries[i] + "');"); ;
        }
        else
        {
            option.className = "option-none";
            option.setAttribute("onclick",  "");
        }
    }
    
}

function pressDict(dname)
{
    window.history.pushState(null, '', "/" + dname + "/" + arabicToLane(CurrentRoot))
    openDict(dname);
}

function openDict (dname)
{
    DNAME = dname;
    var titler = document.getElementById("dictTitle");
    var footer = document.getElementById("dictFooter");
    titler.innerHTML = dicts_title[dname];
    //footer.innerHTML = tafasir_footer[tname];
    document.getElementById("dictText").innerHTML = "Loading..."

    var durl = "http://tafsir.fussilat.com/dicts/" + dname + "/" + arabicToLane(CurrentRoot) + "_" + lane_roots.indexOf(arabicToLane(CurrentRoot)).toString() + ".txt"; 
    console.log(durl);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
        
        if (data.charAt(0) != '=')
        {
            var texter = document.getElementById("dictText");
            data = "<p>" + data.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
                .replaceAll ("\n", "</p><p>")
                .replaceAll("#", " ")
                .replaceAll("  ", " ")
                .replaceAll("DIVIDER", "<hr>")
                + "</p>"
            var content = "";
            try{
                        
                //Arabic Verses
                content = data;
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
            //secondTry(data, tname);
        }
      }
    };
    xhttp.open("GET", durl, true);
    xhttp.send();

    // Get the modal
    var modal = document.getElementById("dictModal");
    modal.style.display = "block";
    

}

function openLane (CurrentRoot)
{
    var dname = "lane"; 
    DNAME = dname;
    var titler = document.getElementById("dictTitle");
    var footer = document.getElementById("dictFooter");
    titler.innerHTML = dicts_title[dname];
    //footer.innerHTML = tafasir_footer[tname];
    document.getElementById("dictText").innerHTML = "Loading..."

    var durl = "http://tafsir.fussilat.com/dicts/" + dname + "/" + arabicToLane(CurrentRoot) + "_" + lane_roots.indexOf(arabicToLane(CurrentRoot)).toString() + ".txt"; 
    //console.log(durl);
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            console.log("Here one");
            if (data.charAt(0) != '=')
            {
            var texter = document.getElementById("dictText");
            data = "<p>" + data.replaceAll ("FTNT", "<sup>").replaceAll ("FEND", "</sup>")
            .replaceAll ("\n", "</p><p>")
            .replaceAll("#", " ")
            .replaceAll("  ", " ")
            .replaceAll("DIVIDER", "<hr>")
            + "</p>"
            var content = "";
            try{
                
            //Arabic Verses
            content = data;
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
            //secondTry(data, tname);
            }
        }
    };
    xhttp2.open("GET", durl, true);
    xhttp2.send();

    // Get the modal
    var modal = document.getElementById("dictModal");
    modal.style.display = "block";
    

}

function arabicToLane(arword)
{
    var letters = "AbtvjHxdcrzsXSDTZEgfqklmnhwy";
    var arletters = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
    var letsplit = Array.from(letters);
    var arlsplit = Array.from(arletters);
    for (var i = 0; i < letsplit.length; i++)
    {
        arword = arword.replaceAll(arlsplit[i], letsplit[i]);
    }
    return arword;
}

function laneToArabic(arword)
{
    var letters = "AbtvjHxdcrzsXSDTZEgfqklmnhwy";
    var arletters = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
    var letsplit = Array.from(letters);
    var arlsplit = Array.from(arletters);
    for (var i = 0; i < letsplit.length; i++)
    {
        arword = arword.replaceAll(letsplit[i], arlsplit[i]);
    }
    return arword;
}

function selectRoot (elem)
{
    CurrentRoot = elem.innerHTML;
    var rbox = document.getElementById("root-choose");
    rbox.value = CurrentRoot;
    verifyDictionaries();
}

function rootsChanged()
{
    verifyDictionaries();
}

function toggleDef(def)
{
    var idname = "sec" + def.toString();
    var elem = document.getElementById (idname);
    
    if (elem.style.display == "none") elem.style.display = "inline";
    else elem.style.display = "none";
}