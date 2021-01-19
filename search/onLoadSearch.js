var url = decodeURIComponent(document.location.toString());
var p = url.length; 
//window.onpopstate = () => setTimeout(backForward, 0);

if (url.includes("?s="))
{
    p = url.indexOf("?s=");
    useParams(url);
}

function useParams()
{
    //param = u.slice(p + 3);
    //document.getElementById("inp").value = param.replaceAll("%20", " ");
    textchanged();
    doSearch();
}

function buttonPressed()
{
    var bare = url.slice(0, p);
    var cSearch = document.getElementById("inp").value;
    //document.location.href = bare + "?s=" + cSearch.replaceAll(" ", "%20");
    //window.history.pushState(null, '', "?s=" + cSearch.replaceAll(" ", "%20"));
    //url = decodeURIComponent(document.location.toString());
    useParams();
}

function backForward2()
{
    url = decodeURIComponent(document.location.toString());
    if (url.includes("?s="))
    {
        p = url.indexOf("?s=");
        useParams(url);
    }
    else
    {
        document.getElementById("results").innerHTML = "";
    }
}
