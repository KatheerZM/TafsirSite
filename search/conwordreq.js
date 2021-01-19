var WordReqType = 
{ 
	Arabic: 0, 
	English: 1, 
	Root: 2
}

class WordReq
{
	/*WordReqType type;
	public bool include;
	bool diacs;
	string req;
	StatType statType;*/
	constructor(r, english, dia)
	{
		this.include = true;
		if (r.length >= 1 && r[0] == '-')
		{
			this.include = false;
			r = r.substring(1);
		}
		else this.include = true;

		this.diacs = true;
		if (r.length >= 1 && r[0] == ':')
		{
			this.diacs = false;
			r = r.substring(1);
		}
		else this.diacs = true;
		if (!dia)
		{
			this.diacs = false;
		}

		this.req = r;
		if (english) this.type = WordReqType.English;
		else
		{
			this.req = this.dealSpecialLetters(this.req);
			this.req = this.arabify(this.req);
			this.req = this.dealSpecialLetters(this.req);
			if (!this.diacs) this.req = this.dedi(this.req);
			if (this.req.includes(","))
			{
				this.type = WordReqType.Root;
				this.req.replaceAll(",", "");
			}
			else this.type = WordReqType.Arabic;
		}
	}
	MatchBoth(word, root)
	{
		word = this.dealSpecialLetters(word);
		root = this.dealSpecialLetters(root);
		var sc = new StatContent(this.statType);
		word = "~" + word + "~";
		if (this.type == WordReqType.Arabic)
		{
			if (!this.diacs)
			{
				word = this.dedi(word);
			}
			if (this.statType == StatType.SubWord) sc.subwords += this.Count(word);
			if (word.includes(this.req))
				return [this.include, sc];
			else return [!this.include, sc];
		}
		else if (this.type == WordReqType.English)
		{
			if (this.statType == StatType.SubWord) sc.subwords += this.Count(word);
			if (word.includes(this.req))
				return [this.include, sc];
			else return [!this.include, sc];
		}
		else if (this.type == WordReqType.Root)
		{
			if (root == this.req.replaceAll(",", ""))
				return [this.include, sc];
			else return [!this.include, sc];
		}
		else return [false, sc];
	}
	MatchOne(word)
	{
		word = "~" + word + "~";
		var sc = new StatContent(this.statType);

		if (this.type == WordReqType.English)
		{
			if (this.statType == StatType.SubWord) sc.subwords += this.Count(word);
			if (word.includes(this.req) || word == "*")
				return [this.include, sc];
			else return [!this.include, sc];
		}
		else return [false, sc];
	}
	Count(word)
	{
		return (word.length - word.replaceAll(this.req, "").length) / this.req.length;
	}
	isEmpty()
	{
		return this.req.trim() == "";
	}
	setStatTypes(st)
	{
		this.statType = st;
	}
	dedi(word)
	{
		word = word.replaceAll("\u064E", "");
		word = word.replaceAll("\u0650", "");
		word = word.replaceAll("\u064F", "");

		word = word.replaceAll("\u064D", "");
		word = word.replaceAll("\u064B", "");
		word = word.replaceAll("\u064C", "");

		word = word.replaceAll("\u0652", "");
		word = word.replaceAll("\u0651", "");

		return word;
	}
	arabify(term)
	{
		var word = term;
		word = " " + word + " ";
		word = word.replaceAll("Allah", "!\u0644\u0644\u0651\u064E\u0647");
		word = word.replaceAll("lillah", "\u0644\u0650\u0644\u0651\u064E\u0647");
		word = word.replaceAll("Aa", "@aa");
		word = word.replaceAll("Ee", "@ee");
		word = word.replaceAll("Oo", "@oo");
		word = word.replaceAll("al-", "$");

		word = word.replaceAll(" a", " !");
		word = word.replaceAll(",a", ",!");
		word = word.replaceAll("&a", "&!");
		word = word.replaceAll(";a", ";!");

		word = word.replaceAll("Ai", "@ai");
		word = word.replaceAll("Ao", "@ao");
		word = word.replaceAll("An", "@an");
		word = word.replaceAll("In", "@in");
		word = word.replaceAll("On", "@on");

		word = word.replaceAll("ai", "\u064E\u064A\u0652");

		word = word.replaceAll("nn", "NN");

		word = word.replaceAll("na", "Na");
		word = word.replaceAll("nee", "Nee");
		word = word.replaceAll("ni", "Ni");
		word = word.replaceAll("no", "No");
		word = word.replaceAll("nu", "Nu");
		word = word.replaceAll("n.", "N.");

		// word = word.replaceAll("aa", "\u064E\u0627");
		word = word.replaceAll("aa", "\u064E!");
		word = word.replaceAll("ee", "\u0650\u064A");
		word = word.replaceAll("oo", "\u064F\u0648");
		word = word.replaceAll("ao", "\u064E\u0648\u0652");
		word = word.replaceAll("a.", "a\u0623\u0652");
		word = word.replaceAll("o.", "o\u0624\u0652");
		word = word.replaceAll("i.", "i\u0626.");

		word = word.replaceAll("in", "\u064D");
		word = word.replaceAll("an", "\u064B");
		word = word.replaceAll("on", "\u064C");
		//word = word.replaceAll("A", "[\u0623\u064E,\u0621\u064E,\u0624\u064E,\u0626\u064E]");
		word = word.replaceAll("A", "@a");
		word = word.replaceAll("I", "@i");
		word = word.replaceAll("O", "@o");
		word = word.replaceAll("a", "\u064E");
		word = word.replaceAll("i", "\u0650");
		word = word.replaceAll("o", "\u064F");
		word = word.replaceAll("u", "\u064F");
		word = word.replaceAll(".", "\u0652");
		word = word.replaceAll("-", "\u0652");
		// "\u0627\u0628\u062A\u062B\u062C\u062D\u062E\u062F\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u064A"
		word = word.replaceAll("#", "\u0651");
		word = word.replaceAll("thth", "\u062B\u0651");
		word = word.replaceAll("HH", "\u062D\u0651");
		word = word.replaceAll("khkh", "\u062E\u0651");
		word = word.replaceAll("dhdh", "\u0636\u0651");
		word = word.replaceAll("zhzh", "\u0638\u0651");
		word = word.replaceAll("''", "\u0639\u0651");
		word = word.replaceAll("ghgh", "\u063A\u0651");
		word = word.replaceAll("zz", "\u0630\u0651");
		word = word.replaceAll("ZZ", "\u0632\u0651");
		word = word.replaceAll("shsh", "\u0634\u0651");
		word = word.replaceAll("TT", "\u0637\u0651");
		word = word.replaceAll("bb", "\u0628\u0651");
		word = word.replaceAll("tt", "\u062A\u0651");
		word = word.replaceAll("SS", "\u0635\u0651");
		word = word.replaceAll("ss", "\u0633\u0651");
		word = word.replaceAll("jj", "\u062C\u0651");
		word = word.replaceAll("dd", "\u062F\u0651");
		word = word.replaceAll("rr", "\u0631\u0651");
		word = word.replaceAll("ff", "\u0641\u0651");
		word = word.replaceAll("qq", "\u0642\u0651");
		word = word.replaceAll("kk", "\u0643\u0651");
		word = word.replaceAll("ll", "\u0644\u0651");
		word = word.replaceAll("mm", "\u0645\u0651");
		word = word.replaceAll("nn", "\u0646\u0651");
		word = word.replaceAll("NN", "\u0646\u0651");
		word = word.replaceAll("hh", "\u0647\u0651");
		word = word.replaceAll("vv", "\u0648\u0651");
		word = word.replaceAll("ww", "\u0648\u0651");
		word = word.replaceAll("yy", "\u064A\u0651");
		while (word.includes("$"))
		{
			try
			{
				if (word[word.indexOf("$") + 2] == '\u0651')
				{
					word = this.ReplaceFirst(word, "$", "!\u0644");
				}
				else
				{
					word = this.ReplaceFirst(word, "$", "!\u0644\u0652");
				}
			}
			catch (err)
			{
				if (word.indexOf("$") == word.length - 1)
				{
					word = this.ReplaceFirst(word, "$", "!\u0644");
				}
				else word = this.ReplaceFirst(word, "$", "!\u0644\u0652");
			}

		}

		word = word.replaceAll("th", "\u062B");
		word = word.replaceAll("ht", "\u0629");
		word = word.replaceAll("H", "\u062D");
		word = word.replaceAll("kh", "\u062E");
		word = word.replaceAll("dh", "\u0636");
		word = word.replaceAll("zh", "\u0638");
		word = word.replaceAll("'", "\u0639");
		word = word.replaceAll("gh", "\u063A");
		word = word.replaceAll("z", "\u0630");
		word = word.replaceAll("Z", "\u0632");
		word = word.replaceAll("sh", "\u0634");
		word = word.replaceAll("T", "\u0637");
		word = word.replaceAll("b", "\u0628");
		/*word = word.replaceAll("@", "[\u0623,\u0621,\u0624,\u0626]");
		word = word.replaceAll("A", "[\u0623\u064E,\u0621\u064E,\u0624\u064E,\u0626\u064E]");
		word = word.replaceAll("I", "[\u0625\u0650,\u0621\u0650,\u0626\u0650]");
		word = word.replaceAll("O", "[\u0623\u064F,\u0621\u064F,\u0624\u064F,\u0626\u064F]");
		word = word.replaceAll("E", "\u0627");*/
		word = word.replaceAll("t", "\u062A");
		word = word.replaceAll("S", "\u0635");
		word = word.replaceAll("s", "\u0633");
		word = word.replaceAll("j", "\u062C");
		word = word.replaceAll("d", "\u062F");
		word = word.replaceAll("r", "\u0631");
		word = word.replaceAll("f", "\u0641");
		word = word.replaceAll("q", "\u0642");
		word = word.replaceAll("k", "\u0643");
		word = word.replaceAll("l", "\u0644");
		word = word.replaceAll("m", "\u0645");
		word = word.replaceAll("n", "\u0646");
		word = word.replaceAll("N", "\u0646");
		word = word.replaceAll("h", "\u0647");
		word = word.replaceAll("v", "\u0648");
		word = word.replaceAll("w", "\u0648");
		word = word.replaceAll("y", "\u064A");
		word = word.replaceAll("Y", "\u0649");
		word = word.replaceAll("e", "@");
		return word.trim();
	}
	ReplaceFirst(txt, search, replace)
	{
		var pos = txt.indexOf(search);
		if (pos < 0)
		{
			return txt;
		}
		return txt.substring(0, pos) + replace + txt.substring(pos + search.length);
	}
	displayArabic(term)
	{
		var word = term;
		//"[\u0623\u064E,\u0621\u064E,\u0624\u064E,\u0626\u064E]"
		word = word.replaceAll(",", "");
		word = word.replaceAll(")", "\uFD3F");
		word = word.replaceAll("(", "\uFD3E");
		word = word.replaceAll("!@", "\u0627\u0621");
		word = word.replaceAll("\u064A@", "\u064A\u0621");
		word = word.replaceAll("\u0648@", "\u0648\u0621");
		word = word.replaceAll("\u064A\u0652@", "\u064A\u0652\u0621");
		word = word.replaceAll("\u0648\u0652@", "\u0648\u0652\u0621");
		word = word.replaceAll("@\u064E!", "\u0622");
		word = word.replaceAll("@" + "\u0650", "\u0625\u0650");
		word = word.replaceAll("@" + "\u064E", "\u0623\u064E");
		word = word.replaceAll("@" + "\u064F", "\u0623\u064F");
		word = word.replaceAll("@" + "\u0650\u064A", "\u0625\u0650\u064A");

		word = word.replaceAll("\u064E" + "@\u0652", "\u064E" + "\u0623\u0652");
		word = word.replaceAll("\u064F" + "@\u0652", "\u064F" + "\u0624\u0652");
		word = word.replaceAll("\u0650" + "@\u0652", "\u0650" + "\u0626\u0652");

		word = word.replaceAll("@", "\u0621");


		word = word.replaceAll("!", "\u0627");

		return word;
	}
	dealSpecialLetters(verse)
	{
		verse = verse.replaceAll("\u0626", "@");
		verse = verse.replaceAll("\u0624", "@");
		verse = verse.replaceAll("\u0621", "@");
		verse = verse.replaceAll("\u0623", "@");
		verse = verse.replaceAll("\u0625", "@");
		verse = verse.replaceAll("\u0622", "@" + "\u064E" + "!");

		verse = verse.replaceAll("\u0627", "!");
		verse = verse.replaceAll("\u0670", "!");
		verse = verse.replaceAll("\u0649", "!");

		return verse;
	}
	getType()
	{
		return this.type;
	}
	ToString()
	{
		var RTLMark = "\u200F";
		var sign = "";
		if (!this.include) sign = "-";
		if (this.type == WordReqType.English)
		{
			return this.req;
		}
		else
		{
			return sign + this.displayArabic(this.req) + RTLMark;
		}
	}
}