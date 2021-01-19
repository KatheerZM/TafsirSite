class Search
{
	constructor (search)
	{
		search = search.trim();
		var termsplit = search.split(";");
		this.terms = [];
		for (var i = 0; i < termsplit.length; i++)
		{
			this.terms.push(new Term(termsplit[i]));
		}
		for (var i = this.terms.length - 1; i >= 0; i--)
		{
			if (this.terms[i].isEmpty())
				this.terms.splice(i, 1);
		}
	}
	Matches(surahs, roots, tran, names, smin, smax)
	{
		var sr = [];
		var sc = []; //new StatContent[terms.length];
		for (var i = 0; i < this.terms.length; i++)
		{
			sc.push(new StatContent(this.terms[i].statType));
			sc[i].term = this.terms[i].ToString();
		}
		for (var s = smin; s <= smax; s++)
		{
			var surahfound = []; //new bool[terms.length];
			for (var i = 0; i < this.terms.length; i++)
			{ 
				surahfound.push( false);
			}

			for (var v = 0; v < surahs[s].length - 1; v++)
			{
				var match = false;
				var matching = "";
				for (var t = 0; t < this.terms.length; t++)
				{
					var term = this.terms[t];
					var result = term.Match(surahs[s][v], roots[s][v], tran[s][v]);
					if (result[0])
					{
						match = true;
						matching += " ; " + result[1];
						surahfound[t] = true;
						sc[t] = sc[t].Add(result[2]);
					}
				}
				if (match)
				{
					sr.push(new SResult(s, v, matching.substring(3), snames[s], surahs[s][v], tran[s][v]));
				}
			}
			for (var i = 0; i < surahfound.length; i++)
			{
				if (surahfound[i])
				{
					sc[i].surahs++;
				}
			}
		}
		return [sr, sc];
	}
	isEmpty()
	{
		return this.terms.length == 0;
	}
	ToString()
	{
		var joined = "";
		var LTRMark = "\u200E";
		if (this.isEmpty()) return "";
		for (var t of this.terms)
		{
			joined += " " + LTRMark + "; " + t.ToString();
		}
		return joined.substring(3);
	}
}
