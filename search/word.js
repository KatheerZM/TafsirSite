var WordType = 
{ 
	Arabic: 0, 
	English: 1 
}

class Word
{
	/*WordType type;
	bool include;
	bool diacs;
	WordReq[] reqs;
	StatType statType;*/
	constructor(rs, english, dia)
	{
		this.include = true;
		if (rs.length >= 2 && rs.substring(0, 2) == "-_")
		{
			this.include = false;
			rs = rs.substring(2);
		}
		else this.include = true;

		this.diacs = true;
		if (rs.length >= 2 && rs.substring(0, 2) == "::")
		{
			this.diacs = false;
			rs = rs.substring(2);
		}
		else this.diacs = true;
		if (!dia) this.diacs = false;

		var wordsplit = rs.split("/");
		var reqList = []; //new List<WordReq>();
		for (var i = 0; i < wordsplit.length; i++)
		{
			var newwr = new WordReq(wordsplit[i], english, dia);
			if (!newwr.isEmpty()) reqList.push(newwr);
		}
		this.reqs = reqList;
		
		if (english) this.type = WordType.English;
		else this.type = WordType.Arabic;
	}
	Match(word, root)
	{
		var sc = new StatContent(this.statType);
		var match = false;
		for (var wr of this.reqs)
		{
			if (this.type == WordType.Arabic)
			{
				var result = wr.MatchBoth(word, root);
				if (result[0] == false)
				{
					return [!this.include, sc];
				}
				else
				{
					if (this.statType == StatType.Verse)
					{

					}
					else if (this.statType == StatType.PhraseWord)
					{

					}
					else
					{
						sc = sc.Add(result[1]);
					}
					match = true;
				}
			}
			else if (this.type == WordType.English)
			{
				var result = wr.MatchOne(word);
				if (result[0] == false)
				{
					return [!this.include, sc];
				}
				else
				{
					if (this.statType == StatType.Verse)
					{

					}
					else if (this.statType == StatType.PhraseWord)
					{

					}
					else
					{
						sc = sc.Add(result[1]);
					}
					match = true;
				}
			}
		}
		return [this.include, sc];
	}
	setStatTypes(st)
	{
		this.statType = st;
		for (var i = 0; i < this.reqs.length; i++)
			this.reqs[i].setStatTypes(st);
	}
	isEmpty()
	{
		return this.reqs.length == 0;
	}
	ToString()
	{
		var joined = "";
		var sign = "";
		if (!this.include) sign = "-_";
		for (var wr of this.reqs)
		{
			joined += "/" + wr.ToString();
		}
		return sign + joined.substring(1);
	}
	isSubwordType()
	{
		if (this.reqs.length > 1)
		{
			return false;
		}
		else if (this.reqs[0].getType() == WordReqType.Root)
		{
			return false;
		}
		else if (!this.reqs[0].include)
		{
			return false;
		}
		else if (!this.include)
		{
			return false;
		}
		else return true;
	}
}