function useUrl()
{
    var url = decodeURIComponent(document.location.toString());
    //document.getElementById('vbox').innerHTML = "Hello";

    var p = url.split(".com/");
    //document.getElementById('vbox').innerHTML = p;
    if (p.length > 1)
    {
        var splitted = p[1].split('/');
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
                updateThings(true);
            }
            else
            {
                CurrentSurah = null;
                CurrentSurah = null;
                window.history.pushState(null, '', '/');
            }
        }
        else if (splitted.length == 2)
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

        }
        else if (splitted.length == 3)
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
            if (!tafasir.includes(giventafsir))
            {
                CurrentSurah = null;
                CurrentSurah = null;
                window.history.pushState(null, '', '/');
                return;
            }
            updateThings(false);
            openTafsir(giventafsir);
        }
        useParams(url)
    }
}
useUrl();
