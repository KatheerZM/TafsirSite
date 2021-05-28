function testSheet()
{
    var excel;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            data = this.responseText;
            //document.getElementById("testfill").innerHTML = data;
            excel = JSON.parse(data.split("testSheet(")[1].substring(0, data.split("testSheet(")[1].length - 2));
            document.getElementById("testfill").innerHTML = excel.feed.entry[3].content.$t;
        }
    }
    var url1 = "https://spreadsheets.google.com/feeds/cells/1oZWY-SndpVyPrDMILjtHf6EeGkmj4rnmeMnDge89IqA/1/public/full?alt=json-in-script&min-col=1&max-col=2&callback=testSheet";
    var url2 = "index.html";
    xhttp.open("GET", url1, true);
    xhttp.send();
}

//Cell: https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/2/public/values/R1C2?alt=json-in-script&callback=testSheet
//Range: https://spreadsheets.google.com/feeds/cells/1J33_LY1UxA0MzL66e_lAHjTQPk4Jzut_w44NAyIOaDo/1/public/full?alt=json-in-script&callback=testSheet&min-row=3&max-row=3