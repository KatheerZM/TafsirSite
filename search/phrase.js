var PhraseType =
{ 
	Arabic: 0, 
	English: 1 
};

class Phrase
{
	/*PhraseType type;
	public bool include;
	bool diacs;
	StatType statType;
	Word[] words;*/
	constructor (phrase, dia)
	{
		this.include = true;
		if (phrase.length >= 2 && phrase.substring(0, 2) == "- ")
		{
			this.include = false;
			phrase = phrase.substring(2).trim();
		}
		else this.include = true;
		
		this.type = PhraseType.Arabic;
		if (phrase.length >= 1 && phrase.substring(0, 1) == ">")
		{
			this.type = PhraseType.English;
			phrase = phrase.substring(1).trim();
		}
		else this.type = PhraseType.Arabic;

		this.diacs = true;
		if (phrase.length >= 2 && phrase.substring(0, 2) == ": ")
		{
			this.diacs = false;
			phrase = phrase.substring(2).trim();
		}
		else this.diacs = true;
		if (!dia) this.diacs = false;

		phrase = this.spaceRemover(phrase);
		var phrasesplit = phrase.split(" ");
		var wordList = []; //new List<Word>();

		for (var i = 0; i < phrasesplit.length; i++)
		{
			var newword = new Word(phrasesplit[i], this.type == PhraseType.English, this.diacs);
			if (!newword.isEmpty()) wordList.push(newword);
		}
		this.words = wordList;
	}
	spaceRemover(phrase)
	{
		phrase = phrase.trim();
		while (phrase.includes("  "))
		{
			phrase = phrase.replaceAll("  ", " ");
		}
		return phrase;
	}
	MatchGeneral (verse, roots, tran)
	{
		var a = 1;
		if (this.type == PhraseType.Arabic)
			return this.MatchArabic(verse, roots);
		else if (this.type == PhraseType.English)
			return this.MatchEng(tran);
		else return [false, "ERROR", new StatContent(StatType.PhraseWord)];
	}
	//Assumes type is Arabic
	MatchArabic(verse, roots)
	{
		var vwords = verse.split(" ");
		var rwords = roots.split(" ");
		var sc = new StatContent(this.statType);

		var starters = []; //new List<int>();
		for (var i = 0; i < vwords.length; i++)
		{
			if (this.words[0].Match(vwords[i], rwords[i])[0])
				starters.push(i);
		}
		starters = starters.reverse();
		var match = false;
		var matching = "";
		var end_match = "";
		for (var s of starters)
		{
			matching = "";
			for (var i = s; i < vwords.length; i++)
			{
				var result = this.words[i - s].Match(vwords[i], rwords[i]);
				if (result[0])
				{
					matching += vwords[i] + " ";
					if (i - s == this.words.length - 1)
					{
						match = true;
						end_match = matching;
						if (this.statType == StatType.Verse)
						{

						}
						else if (this.statType == StatType.PhraseWord)
						{
							sc.phrases++;
						}
						else
						{
							sc.phrases++;
							sc = sc.Add(result[1]);
						}
						break;
					}
				}
				else
				{
					matching = "";
					break;
				}
			}
		}

		if (!match) end_match = "";
		else if (!this.include) end_match = "";
		if (matching != "") end_match = end_match.trimEnd();

		//              Match   No Match
		//Include       True    False
		//No Include    False   True

		return [match == this.include, end_match, sc];
	}
	//Assumes type is English
	MatchEng(tran)
	{
		var twords = tran.split(" ");
		var sc = new StatContent(this.statType);

		var starters = []; //new List<int>();
		for (var i = 0; i < twords.length; i++)
		{
			if (this.words[0].Match(twords[i], "")[0])
				starters.push(i);
		}

		var match = false;
		var matching = "";
		for (var s of starters)
		{
			for (var i = s; i < twords.length; i++)
			{
				var result = this.words[i - s].Match(twords[i], "");
				if (result[0])
				{
					matching += twords[i] + " ";
					if (i - s == this.words.length - 1)
					{
						match = true;
						sc = sc.Add(result[1]);
						if (this.statType == StatType.Verse)
						{

						}
						else if (this.statType == StatType.PhraseWord)
						{
							sc.phrases++;
						}
						else
						{
							sc = sc.Add(result[1]);
						}
						break;
					}
				}
				else
				{
					matching = "";
					break;
				}
			}
			if (match) break;
		}

		if (!match) matching = "";
		else if (!this.include) matching = "";

		//              Match   No Match
		//Include       True    False
		//No Include    False   True

		return [match == this.include, matching, sc];
	}
	setStatTypes(st)
	{
		this.statType = st;
		for (var i = 0; i < this.words.length; i++)
			this.words[i].setStatTypes(st);
	}
	isEmpty()
	{
		return this.words.length == 0;
	}
	ToString()
	{
		var LTRMark = "\u200E";
		var RTLMark = "\u200F";
		var sign = "";
		if (!this.include) sign = "- ";
		var joined = "";
		for (var w of this.words)
		{
			joined += " " + w.ToString();
		}
		if (this.type == PhraseType.English)
		{
			return LTRMark + sign + joined.substring(1);
		}
		else
		{
			return sign + joined.substring(1);
		}
	}
	isLoneWord()
	{
		if (this.words.length == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	first()
	{
		return this.words[0];
	};
}