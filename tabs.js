function changeTab(tabid)
{
    var oldtab = document.getElementsByClassName('tabchosen')[0];
    var newtab = document.getElementById(tabid);
    
    oldtab.className = "tab";
    newtab.className = "tabchosen";

    oldtab.setAttribute("onclick", "changeTab('" + oldtab.id + "');");
    newtab.setAttribute("onclick", "");

    document.getElementById(oldtab.id + "content").style.display = "none";
    document.getElementById(newtab.id + "content").style.display = "inline";
}