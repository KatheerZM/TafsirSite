class Term
{
	/*bool include;
	bool diacs;
	Phrase[] phrases;
	public StatType statType;*/
	constructor(term)
	{
		this.include = true;
		if (term.length >= 3 && term.substring(0, 3) == "-_ ")
		{
			this.include = false;
			term = term.substring(3).trim();
		}
		else this.include = true;
		
		this.diacs = true;
		if (term.length >= 3 && term.substring(0, 3) == ":: ")
		{
			this.diacs = false;
			term = term.substring(3).trim();
		}
		else this.diacs = true;

		var termsplit = term.split("&");
		var phraseList = []; //new List<Phrase>();
		for (var i = 0; i < termsplit.length; i++)
		{
			if (termsplit[i].trim() != "")
			{
				phraseList.push(new Phrase(termsplit[i].trim(), this.diacs));
			}
		}
		for (var i = phraseList.length - 1; i >= 0; i--)
		{
			if (phraseList[i].isEmpty())
				phraseList.splice(i, 1);
		}
		this.phrases = phraseList;

		if (this.phrases.length == 0) ;
		else if (this.phrases.length > 1 || !this.phrases[0].include || !this.include)
		{
			this.setStatTypes(StatType.Verse);
			this.statType = StatType.Verse;
		}
		else if (!this.phrases[0].isLoneWord())
		{
			this.setStatTypes(StatType.PhraseWord);
			this.statType = StatType.PhraseWord;
		}
		else if (!this.phrases[0].first().isSubwordType())
		{
			this.setStatTypes(StatType.PhraseWord);
			this.statType = StatType.PhraseWord;
		}
		else
		{
			this.setStatTypes(StatType.SubWord);
			this.statType = StatType.SubWord;
		}
	}
	setStatTypes(st)
	{
		this.statType = st;
		for (var i = 0; i < this.phrases.length; i++)
			this.phrases[i].setStatTypes(st);
	}
	Match(verse, roots, tran)
	{
		var match = true;
		var matching = "";
		var sc = new StatContent(this.statType);

		for (var phrase of this.phrases)
		{
			var result = phrase.MatchGeneral(verse, roots, tran);
			if (result[0])
			{
				matching += " & " + result[1];
				if (this.statType > StatType.Verse)
				{
					sc = sc.Add(result[2]);
				}
			}
			else match = false;
		}

		if (!match) matching = "";
		else if (!this.include) matching = "";
		if (matching != "") matching = matching.substring(3);

		if (match == this.include)
		{
			sc.verses += 1;
		}

		//              Match   No Match
		//Include       True    False
		//No Include    False   True

		return [match == this.include, matching, sc];
	}
	isEmpty()
	{
		return this.phrases.length == 0;
	}
	ToString()
	{
		var RTLMark = "\u200F";
		var LTRMark = "\u200E";
		var sign = "";
		if (!this.include) sign = "-_ ";
		var joined = "";
		if (this.isEmpty()) return "";
		for (var p of this.phrases)
		{
			joined += " " + LTRMark + "& " + p.ToString();
		}
		return RTLMark + sign + joined.substring(3);
	}
}