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
		word = word.replaceAll("َ", "");
		word = word.replaceAll("ِ", "");
		word = word.replaceAll("ُ", "");

		word = word.replaceAll("ٍ", "");
		word = word.replaceAll("ً", "");
		word = word.replaceAll("ٌ", "");

		word = word.replaceAll("ْ", "");
		word = word.replaceAll("ّ", "");

		return word;
	}
	arabify(term)
	{
		var word = term;
		word = " " + word + " ";
		word = word.replaceAll("Allah", "!للَّه");
		word = word.replaceAll("lillah", "لِلَّه");
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

		word = word.replaceAll("ai", "َيْ");

		word = word.replaceAll("nn", "NN");

		word = word.replaceAll("na", "Na");
		word = word.replaceAll("nee", "Nee");
		word = word.replaceAll("ni", "Ni");
		word = word.replaceAll("no", "No");
		word = word.replaceAll("nu", "Nu");
		word = word.replaceAll("n.", "N.");

		// word = word.replaceAll("aa", "َا");
		word = word.replaceAll("aa", "َ!");
		word = word.replaceAll("ee", "ِي");
		word = word.replaceAll("oo", "ُو");
		word = word.replaceAll("ao", "َوْ");
		word = word.replaceAll("a.", "aأْ");
		word = word.replaceAll("o.", "oؤْ");
		word = word.replaceAll("i.", "iئ.");

		word = word.replaceAll("in", "ٍ");
		word = word.replaceAll("an", "ً");
		word = word.replaceAll("on", "ٌ");
		//word = word.replaceAll("A", "[أَ,ءَ,ؤَ,ئَ]");
		word = word.replaceAll("A", "@a");
		word = word.replaceAll("I", "@i");
		word = word.replaceAll("O", "@o");
		word = word.replaceAll("a", "َ");
		word = word.replaceAll("i", "ِ");
		word = word.replaceAll("o", "ُ");
		word = word.replaceAll("u", "ُ");
		word = word.replaceAll(".", "ْ");
		word = word.replaceAll("-", "ْ");
		// "ابتثجحخدذرزسشصضطظعغفقكلمنهوي"
		word = word.replaceAll("#", "ّ");
		word = word.replaceAll("thth", "ثّ");
		word = word.replaceAll("HH", "حّ");
		word = word.replaceAll("khkh", "خّ");
		word = word.replaceAll("dhdh", "ضّ");
		word = word.replaceAll("zhzh", "ظّ");
		word = word.replaceAll("''", "عّ");
		word = word.replaceAll("ghgh", "غّ");
		word = word.replaceAll("zz", "ذّ");
		word = word.replaceAll("ZZ", "زّ");
		word = word.replaceAll("shsh", "شّ");
		word = word.replaceAll("TT", "طّ");
		word = word.replaceAll("bb", "بّ");
		word = word.replaceAll("tt", "تّ");
		word = word.replaceAll("SS", "صّ");
		word = word.replaceAll("ss", "سّ");
		word = word.replaceAll("jj", "جّ");
		word = word.replaceAll("dd", "دّ");
		word = word.replaceAll("rr", "رّ");
		word = word.replaceAll("ff", "فّ");
		word = word.replaceAll("qq", "قّ");
		word = word.replaceAll("kk", "كّ");
		word = word.replaceAll("ll", "لّ");
		word = word.replaceAll("mm", "مّ");
		word = word.replaceAll("nn", "نّ");
		word = word.replaceAll("NN", "نّ");
		word = word.replaceAll("hh", "هّ");
		word = word.replaceAll("vv", "وّ");
		word = word.replaceAll("ww", "وّ");
		word = word.replaceAll("yy", "يّ");
		while (word.includes("$"))
		{
			try
			{
				if (word[word.indexOf("$") + 2] == 'ّ')
				{
					word = this.ReplaceFirst(word, "$", "!ل");
				}
				else
				{
					word = this.ReplaceFirst(word, "$", "!لْ");
				}
			}
			catch (err)
			{
				if (word.indexOf("$") == word.length - 1)
				{
					word = this.ReplaceFirst(word, "$", "!ل");
				}
				else word = this.ReplaceFirst(word, "$", "!لْ");
			}

		}

		word = word.replaceAll("th", "ث");
		word = word.replaceAll("ht", "ة");
		word = word.replaceAll("H", "ح");
		word = word.replaceAll("kh", "خ");
		word = word.replaceAll("dh", "ض");
		word = word.replaceAll("zh", "ظ");
		word = word.replaceAll("'", "ع");
		word = word.replaceAll("gh", "غ");
		word = word.replaceAll("z", "ذ");
		word = word.replaceAll("Z", "ز");
		word = word.replaceAll("sh", "ش");
		word = word.replaceAll("T", "ط");
		word = word.replaceAll("b", "ب");
		/*word = word.replaceAll("@", "[أ,ء,ؤ,ئ]");
		word = word.replaceAll("A", "[أَ,ءَ,ؤَ,ئَ]");
		word = word.replaceAll("I", "[إِ,ءِ,ئِ]");
		word = word.replaceAll("O", "[أُ,ءُ,ؤُ,ئُ]");
		word = word.replaceAll("E", "ا");*/
		word = word.replaceAll("t", "ت");
		word = word.replaceAll("S", "ص");
		word = word.replaceAll("s", "س");
		word = word.replaceAll("j", "ج");
		word = word.replaceAll("d", "د");
		word = word.replaceAll("r", "ر");
		word = word.replaceAll("f", "ف");
		word = word.replaceAll("q", "ق");
		word = word.replaceAll("k", "ك");
		word = word.replaceAll("l", "ل");
		word = word.replaceAll("m", "م");
		word = word.replaceAll("n", "ن");
		word = word.replaceAll("N", "ن");
		word = word.replaceAll("h", "ه");
		word = word.replaceAll("v", "و");
		word = word.replaceAll("w", "و");
		word = word.replaceAll("y", "ي");
		word = word.replaceAll("Y", "ى");
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
		//"[أَ,ءَ,ؤَ,ئَ]"
		word = word.replaceAll(",", "");
		word = word.replaceAll(")", "﴿");
		word = word.replaceAll("(", "﴾");
		word = word.replaceAll("!@", "اء");
		word = word.replaceAll("ي@", "يء");
		word = word.replaceAll("و@", "وء");
		word = word.replaceAll("يْ@", "يْء");
		word = word.replaceAll("وْ@", "وْء");
		word = word.replaceAll("@َ!", "آ");
		word = word.replaceAll("@" + "ِ", "إِ");
		word = word.replaceAll("@" + "َ", "أَ");
		word = word.replaceAll("@" + "ُ", "أُ");
		word = word.replaceAll("@" + "ِي", "إِي");

		word = word.replaceAll("َ" + "@ْ", "َ" + "أْ");
		word = word.replaceAll("ُ" + "@ْ", "ُ" + "ؤْ");
		word = word.replaceAll("ِ" + "@ْ", "ِ" + "ئْ");

		word = word.replaceAll("@", "ء");


		word = word.replaceAll("!", "ا");

		return word;
	}
	dealSpecialLetters(verse)
	{
		verse = verse.replaceAll("ئ", "@");
		verse = verse.replaceAll("ؤ", "@");
		verse = verse.replaceAll("ء", "@");
		verse = verse.replaceAll("أ", "@");
		verse = verse.replaceAll("إ", "@");
		verse = verse.replaceAll("آ", "@" + "َ" + "!");

		verse = verse.replaceAll("ا", "!");
		verse = verse.replaceAll("ٰ", "!");
		verse = verse.replaceAll("ى", "!");

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