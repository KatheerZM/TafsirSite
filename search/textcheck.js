var pages = [];
var cpage = 0;
function textchanged()
{  
	var srch = document.getElementById("inp").value;
	this.search = new Search(srch);
	if (search.isEmpty())
	{
		document.getElementById("inp").style.backgroundColor = "white";
		document.getElementById("findb").disabled = true;
		document.getElementById("prev").innerHTML = "";
	}
	else if (bracketsCorrect(srch))
	{
		document.getElementById("inp").style.backgroundColor = "white";
		
		var test = search.ToString();
		document.getElementById("prev").innerHTML = test;
		document.getElementById("findb").disabled = false;
		
	}
	else
	{
		document.getElementById("inp").style.backgroundColor = "LightCoral";
		document.getElementById("findb").disabled = true;
	}
}

function bracketsCorrect(t)
{
	var b = 0;
	for (var i = 0; i < t.length; i++)
	{
		if (t[i] == '[') b++;
		else if (t[i] == ']') b--;
		if (b < 0 || b > 1) return false;
	}
	if (b == 0) return true;
	else return false;
}

function doSearch ()
{
	var code = "";
	if (!this.search.isEmpty())
	{
		result = this.search.Matches(surahs, rsurahs, tsurahs, snames, 0, 113);
		
		/*code += "<style> </style><table class='stattable' style=\"width:100%\"> <tr > <th>Search Term</th> <th>Surahs</th> <th>Verses</th> <th>Phrases/Words</th> <th>Letters</th> </tr>";
		for (var sc of result[1])
		{	
			code += "<tr> <th>"
				+ sc.term 
				+ "</th> <th>"
				+ sc.sString
				+ "</th> <th>"
				+ sc.vString
				+ "</th> <th>"
				+ sc.pString
				+ "</th> <th>"
				+ sc.swString
				+ "</th></tr>"
		}
		code += "</table>";
		document.getElementById("results").innerHTML = code;*/
		document.getElementById("results").innerHTML = "";
		pages = new Array()
		for (var i = 0; i < result[0].length; i++)
		{
			sr = result[0][i];
			var vs = sr.ToString();
			document.getElementById("results").innerHTML += "<div data-current=\"" + vs + "\" id=\"res" + vs + "\" style=\"padding-top: 5px; padding-bottom: 5px; margin-top: 10px; padding-right: 5px; padding-left: 5px; border-style: solid; background-color: Bisque; width: 90%;\">"
				+ "<div id=\"view" + vs + "\" style=\" line-height: 24px; \">"
				+ sr.Line1(true)
				+ "<br />"
				+ sr.Line2()
				+ "<br />"
				+ sr.Line3() + " <a href=\"javascript:context('" + vs + "')\" id=\"context" + vs + "\">Context</a>"
				+ "<br />"
				+ "<button onclick=\"vselect('" + vs + "')\" id=\"n" + vs + "\" style=\"display: inline; \">Select</button>"
				+ "</div>"
				+ "<div id=\"verse" + vs + "\" style=\" line-height: 24px;\"></div>"
				+ "</div>";
			if (result[0].length > 500)
			{
				
			}
		}

	}
	//document.getElementById("results").innerHTML = code;
}

function vleft (vs)
{
	var cur = parseInt(document.getElementById ("res" + vs).dataset.current.split(":")[1]);
	var def = parseInt(vs.split(":")[1]);
	document.getElementById("view" + vs).style.display = "none";
	document.getElementById("verse" + vs).style.display = "inline";
	if (cur + 1 == def)
	{
		vdefault(vs);
	}
	{
		cur++;
		var sur = parseInt(vs.split(":")[0]);
		vsnew = vs.split(":")[0] + ":" + cur.toString() + " (" + snames[sur - 1] + ")";
		document.getElementById("verse" + vs).innerHTML = 
			vsnew
			+ "<br />"
			+ surahs[sur - 1][cur - 1]
			+ "<br />"
			+ tsurahs[sur - 1][cur - 1]
			+ "<br />"
			+ "<button onclick=\"vselect('" + vs.split(":")[0] + ":" + cur.toString() + "')\" style=\"display: inline;\">Select</button>";
		document.getElementById ("res" + vs).dataset.current = vsnew;
		document.getElementById("res" + vs).style.backgroundColor = "white";
	}
	buttonSet(vs, false)
}
function vdefault(vs)
{
	var cur = parseInt(document.getElementById ("res" + vs).dataset.current.split(":")[1]);
	var def = parseInt(vs.split(":")[1]);
	cur = def;
	document.getElementById("view" + vs).style.display = "inline";
	document.getElementById("verse" + vs).style.display = "none";
	var sur = parseInt(vs.split(":")[0]);
	vsnew = vs.split(":")[0] + ":" + cur.toString() + " (" + snames[sur - 1] + ")";
	document.getElementById ("res" + vs).dataset.current = vsnew;
	document.getElementById("res" + vs).style.backgroundColor = "Bisque";
	buttonSet(vs, false)
}
function vselect(vs)
{
	sver = vs.split(":");
	//console.log(parseInt(sver[0]) - 1);
	//console.log(parseInt(sver[1]));
	CurrentSurah = parseInt(sver[0]) - 1;
	CurrentVerse = parseInt(sver[1]);
	updateThings(true);
}
function vright(vs)
{
	var cur = parseInt(document.getElementById ("res" + vs).dataset.current.split(":")[1]);
	var def = parseInt(vs.split(":")[1]);
	document.getElementById("view" + vs).style.display = "none";
	document.getElementById("verse" + vs).style.display = "inline";
	if (cur - 1 == def)
	{
		vdefault(vs);
	}
	{
		cur--;
		var sur = parseInt(vs.split(":")[0]);
		vsnew = vs.split(":")[0] + ":" + cur.toString() + " (" + snames[sur - 1] + ")";
		document.getElementById("verse" + vs).innerHTML = 
			vsnew
			+ "<br />"
			+ surahs[sur - 1][cur - 1]
			+ "<br />"
			+ tsurahs[sur - 1][cur - 1]
			+ "<br />"
			+ "<button onclick=\"vselect('" + vs.split(":")[0] + ":" + cur.toString() + "')\" style=\"display: inline;\">Select</button>";
		document.getElementById ("res" + vs).dataset.current = vsnew;
		document.getElementById("res" + vs).style.backgroundColor = "white";
	}
	buttonSet(vs, false)
}
function buttonSet(vs, first)
{
	var cur = parseInt(document.getElementById ("res" + vs).dataset.current.split(":")[1]);
	var def = parseInt(vs.split(":")[1]);
	var sur = parseInt(vs.split(":")[0]);
	if (!first)
	{
		document.getElementById("r"+ vs).style.visibility = "visible";
		document.getElementById("l"+ vs).style.visibility = "visible";
		document.getElementById("n"+ vs).style.visibility = "visible";

		if (cur == 1)
		{
			document.getElementById("l"+ vs).style.visibility = "hidden";
		}
		else if (cur == surahs[sur - 1].length)
		{
			document.getElementById("r"+ vs).style.visibility = "hidden";
		}
		if (cur == def)
		{
			document.getElementById("n"+ vs).style.visibility = "hidden";
			document.getElementById("res" + vs).style.backgroundColor = "Bisque";
		}
	}
}

function context (vs)
{
	var def = parseInt(vs.split(":")[1]);
	var sur = parseInt(vs.split(":")[0]);
	var righton = "true";
	var lefton = "true";

	if (def == 1) righton = "false";
	else if (def == surahs[sur].length) lefton = "false";
	document.getElementById("context" + vs).style.display = "none";
	document.getElementById("res" + vs).innerHTML = 
		"<div id=\"buttons" + vs + "\" style=\"width: 100%; float: left; text-align: center;\"><button onclick=\"vright('" + vs + "')\" id=\"l" + vs + "\" style=\"float:left;\">&larr;</button><button onclick=\"vdefault('" + vs + "')\" id=\"n" + vs + "\" style=\"display: inline-block;\">Reset</button><button onclick=\"vleft('" + vs + "')\" id=\"r" + vs + "\" style=\"float: right;\">&rarr;</button></div>"	
		+ document.getElementById("res" + vs).innerHTML;
	buttonSet(vs, false);
}