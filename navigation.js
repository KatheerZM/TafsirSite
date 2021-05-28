var CurrentSurah = null;
var CurrentVerse = null;
var CurrentTafsir = null;

var texisters = 
{
    "ibnkathir": exist_ibnkathir,
    "maarif": exist_maarif,
    "maududi": exist_maududi,
    "jalalayn": exist_jalalayn,
    "muqbil": exist_muqbil
};

var tafasir = 
[
    'ibnkathir',
    'maarif',
    'maududi',
    'jalalayn',
    //'muqbil',
];

function surahsChanged()
{
    var vchoose = document.getElementById("v-choose");
    var schoose = document.getElementById("s-choose");
    var chosensur = schoose.value;
    
    if (isValidSurah(chosensur))
    {
        var snum;
        /*try
        {*/
            var options = '';
            snum = parseInt(schoose.value.split(".")[0]) - 1;
            
            document.getElementById('verses').innerHTML = options;
            vchoose.disabled = false;
            vchoose.max = surahs[snum].length;
            if (!isNaN(vchoose.value)) CurrentVerse = vchoose.value;
            if (!isValidVerse(CurrentVerse))
            {
                vchoose.value = 1;
                CurrentVerse = 1;
            }
            
            
            CurrentSurah = snum;
            
            loadAll();
            versesChanged();
    }
    else
    {
        vchoose.disabled = true;
        vchoose.value = "";
        CurrentSurah = null;
        CurrentVerse = null;
    }

}
function surahsChangeder()
{
    surahsChanged();
    window.history.pushState(null, '', "/" + (parseInt(CurrentSurah) + 1).toString() + "/" + CurrentVerse.toString());
}
function versesChangeder()
{
    versesChanged();
    window.history.pushState(null, '', "/" + (parseInt(CurrentSurah) + 1).toString() + "/" + CurrentVerse.toString());
}
function versesChanged()
{
    var vchoose = document.getElementById("v-choose");
    var artext = document.getElementById("arabic-verse");
    var entext = document.getElementById("eng-translation");
    var box = document.getElementById("full-verse");
    var forarrow = document.getElementById("vfor");
    var backarrow = document.getElementById("vbac");

    var chosenver = vchoose.value;
    //console.log(chosenver);
    
    if (isValidVerse(chosenver))
    {
        verbox = document.getElementById('vbox');
        console.log((parseInt(CurrentSurah) + 1).toString() + "/" + CurrentVerse.toString());
        CurrentVerse = chosenver;
        setVerses (CurrentVerse, CurrentVerse);
        forarrow.style.visibility = "hidden";
        backarrow.style.visibility = "hidden";
        if (parseInt(CurrentVerse) > 1)
        {
            forarrow.style.visibility = "visible";
        }
        if (parseInt(CurrentVerse) < surahs[CurrentSurah].length)
        {
            backarrow.style.visibility = "visible";
        }
        loadVerse();
        document.getElementById("title").innerHTML = 
        `<a target="_blank" href="https://tafsir.app/${parseInt(CurrentSurah) + 1}/${CurrentVerse}">
        تفاسير القرآن</a><br/>Exegeses of the Quran
        `;
        if (!firstLoad)
            window.history.pushState(null, '', "/" + (parseInt(CurrentSurah) + 1).toString() + "/" + CurrentVerse.toString());

    }
    else
    {
        verbox.innerHTML = "";
        artext.innerHTML = "";
        entext.innerHTML = "";
    }
}

function setVerses(start, end)
{
    var artext = document.getElementById("arabic-verse");
    var entext = document.getElementById("eng-translation");
    var title = document.getElementById("verse-title");
    var box = document.getElementById("full-verse");
    artext.innerHTML = ayahWithNumbers(start, end);
    entext.innerHTML = verseWithNumbers(start, end);
    fillWordTranslations(start, end);
    box.className = "whitebox";
    
    if (start == end)
    {
        title.innerHTML = "<u>"
            + "Verse " 
            + (CurrentSurah+1).toString()
            + ":"
            + start.toString()
            + "</u>";
    }
    else 
    {
        title.innerHTML = "<u>"
            + "Verse " 
            + (CurrentSurah+1).toString()
            + ":"
            + start.toString()
            + "-"
            + end.toString()
            + "</u>";
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
    if (chosenver >= 1 && chosenver <= surahs[CurrentSurah].length)
    {
        return true;
    }
    else return false;
}

function ayahWithNumbers(start, end)
{
    var content = "";
    for (var i = start; i <= end; i++)
    {
        var words = surahs[CurrentSurah][i - 1].split(" ");
        for (var w = 0; w < words.length; w++)
        {
            content += "<span onclick='pressWord(this)' class='arword' id='v" + i.toString() + "w" + w.toString() + "'>" 
                + words[w] + " </span>";
        }
        content += " " + "\ufd3f" + i.toString() + "\ufd3e\u200f ";
    }
    return content;
}
function verseWithNumbers(start, end)
{
    var content = "<u><b>Sahih International</b></u>: ";
    for (var i = start; i <= end; i++)
    {
        content += tsurahs[CurrentSurah][i - 1] 
            + " " + "(" + i.toString() + ") ";
    }
    return content;
}
function fillWordTranslations(start, end)
{
    for (var i = start; i <= end; i++)
    {
        var words = surahs[CurrentSurah][i - 1].split(" ");
        for (var w = 0; w < words.length; w++)
        {
            document.getElementById("v" + i.toString() + "w" + w.toString()).title = wtsurahs[CurrentSurah][i - 1][w];
        }
    }
}

function pressWord(wordspan)
{
    console.log("helo");
    var id = wordspan.id;
    var wordword = document.getElementById("word-word");
    var word = parseInt(id.split('w')[1]);
    var words = surahs[CurrentSurah][CurrentVerse - 1].split(" ");
    var roots = rsurahs[CurrentSurah][CurrentVerse - 1].split(" ");
    
    var link = "";
    if (lane_roots.includes(arabicToLane(rootizer(roots[word]))))
    {
        link = `
        <div><a href="javascript:openLane('${rootizer(roots[word])}')">See Lane Lexicon</a></div>
        `;
    }
    
    
    wordword.innerHTML = `
        <div style="text-align: center;">
            <div class="arabic-font">${words[word]} (${rootizer(roots[word])})</div>
            <div>${wtsurahs[CurrentSurah][CurrentVerse - 1][word]}</div>
            ${link}
        </div>
        `;
}

function rootizer(root)
{
    if (root.length > 1 && root.charAt(root.length - 1) == root.charAt(root.length - 2))
    {
        return root.substring(0, root.length - 1);
    }
    else return root;
}