function str (a)
{
	return a.toString();
}

var StatType =
{
	Verse: 0, 
	PhraseWord: 1, 
	SubWord: 2
}
class StatContent
{
	/*public int[] stats;
	public string term;
	StatType stattype;*/
	
	constructor(st)
	{
		this.term;
		this.stattype = st;
		this.stats = []; //new int[2 + this.stattype];
		for (var i = 0; i < 2 + this.stattype; i++)
		{
			this.stats.push(0);
		}
		for (var i = 0; i < length; i++)
			this.stats[i] = 0;
	}
	get length()
	{
		return this.stats.length;
	}
	get surahs()
	{
		return this.stats[0]; 
	}
	set surahs(value)
	{
		this.stats[0] = value;
	}
	
	get sString()
	{
		return this.surahs.toString();
	}
	
	
	get verses()
	{
		return this.stats[1]; 
	}
	set verses(value)
	{
		this.stats[1] = value;
	}
	
	get vString()
	{
		if (this.stats.length < 2) return "";
		else return this.verses.toString();
	}
	
	get phrases()
	{
		return this.stats[2];
	}
	set phrases(value)
	{
		this.stats[2] = value;
	}
	
	get pString()
	{
		if (this.stats.length < 3) return "";
		else return this.phrases.toString();
	}
	
	get subwords()
	{
		return this.stats[3];
	}
	set subwords(value)
	{
		this.stats[3] = value;
	}
	
	
	get swString()
	{
		if (this.stats.length < 4) return "";
		else return this.subwords.toString();
	}
	
	
	Add(other)
	{
		for (var i = 1; i < this.length || i < other.length; i++)
		{
			this.stats[i] += other.stats[i];
		}
		return this;
	}
	
	
	ToString()
	{
		if (this.stattype == StatType.Verse)
		{
			return "The search term " + this.term + " matches " + str(this.verses) + " verses and " + str(this.surahs) + " surahs.";
		}
		else if (stattype == StatType.PhraseWord)
		{
			return "The search term " + this.term + " appears " + str(this.phrases) + " times in " + str(this.verses) + " verses and " + str(this.surahs) + " surahs.";
		}
		else
		{
			return "The search term " + this.term + " appears " + str(this.subwords) + " times in " + str(this.phrases) + " words and " + str(this.verses) + " verses and " + str(this.surahs) + " surahs.";
		}
	}
}
class SResult
{
	/*public int surah, ayah; public string word, sname = "";
	public string ayahText = "", tranText = "";
	public string[] allWords = { };*/
	constructor(s, v, w, name, atext, ttext)
	{
		this.surah = s;
		this.ayah = v;
		this.word = w;
		this.sname = name;
		this.ayahText = atext;
		this.tranText = ttext;
		this.allWords = [];
	}
	ToString()
	{
		return (this.surah+1).toString() + ":" + (this.ayah+1).toString();
	}
	Line1(name)
	{
		if (name)
			return this.ToString() + " (" + this.sname + ")" + ": " + this.word + "\n";
		else
			return this.ToString()+ ": " + this.word + "\n";
	}
	Line2()
	{
		return this.ayahText + "\n";
	}
	Line3()
	{
		return this.tranText + "\n";
	}
}