window.onload=function(){

	var oCalMain = document.getElementById('cal-main');
	var aLi = oCalMain.getElementsByTagName('li');
	var allP = oCalMain.getElementsByTagName('p');
	var allSpan = oCalMain.getElementsByTagName('span');
	var oCalLeftTop = document.getElementById('cal-left-top');
	var oLDate = document.getElementById('L-date');
	var oUl = oCalMain.getElementsByTagName('ul');
	var oSelYear = oCalLeftTop.children[0];
	var oSelMonth = oCalLeftTop.children[1].children[1];
	var oSelFev = oCalLeftTop.children[2];

//初始化 选择区
	
//定义当前农历所需数据
	
    var CalendarData = new Array(100);
    var madd = new Array(12);
  
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";

    var cYear, cMonth, cDay, TheDate;

    CalendarData = new Array
    (	0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6,
	    0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5,
		0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D,
		0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B,
		0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA,
	    0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B,
		0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 
		0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55,
		0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 
		0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 
		0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 
		0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 
		0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D,
		0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 
		0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95,
		0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 
		0x60A57, 0x52B, 0xA93, 0x40E95 );

    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
        return (m >> n) & 1;
    }

//年份

	var iYear = 1921;

	for(var i = iYear;i < 2050;i++)
	{
		var oYear = document.createElement('option');

		oYear.innerHTML = i+'年';
		oYear.value = i;
		oSelYear.appendChild(oYear);
	}

//月份

	var arrMonth=['一月','二月','三月','四月','五月','六月','七月',
	'八月','九月','十月','十一月','十二月'];

	for(var i = 0;i < arrMonth.length;i++)
	{
		var oMonth = document.createElement('option');

		oMonth.innerHTML = arrMonth[i];
		oMonth.value = i;
		oSelMonth.appendChild(oMonth);
	}

//获得当前时刻

	var myTime = new Date();

	function toTow(n)
	{
		return n<10 ? '0'+n : ''+n;
	}

	var nowYear = myTime.getFullYear();
	var nowMonthIndex = myTime.getMonth();
	var nowWeek = myTime.getDay();
	var nowDate = myTime.getDate();

//初始化cal-right（日历右侧）及选择区

//初始化选择区
	oSelYear.value = nowYear;
	oSelMonth.value = nowMonthIndex;

//初始化cal-right
	function fnNowTime()
	{
		var myTime = new Date();
		var nowHour = myTime.getHours();
		var nowMin = myTime.getMinutes();
		var nowSec = myTime.getSeconds();
		var oNowTime = document.getElementById('nowtime');

		oNowTime.children[1].innerHTML = nowHour+':'+toTow(nowMin)+':'+toTow(nowSec);	
	}

	fnNowTime();

	setInterval(fnNowTime,1000);

	var oDates = document.getElementById('dates');
	var oDateWeek = document.getElementById('date-week');
	var arrWeek = ['日','一','二','三','四','五','六'];
	var oDay = document.getElementById('day');

	oDateWeek.children[0].innerHTML = arrWeek[nowWeek];
	oDay.innerHTML = nowDate;
	oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(nowDate);	

//初始化属相和农历年份

	var oLYear = document.getElementById('L-year');
	var oImg = document.getElementById('img').children[0];

	var arrAnimal = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴'
					,'鸡','狗','猪'];
	var arrAnimalImg = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg",
						"img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg",
						"img/9.jpg","img/10.jpg","img/11.jpg","img/12.jpg"]
	
	var arrAnimalYear = [];
	var arrLunarYear = [];

	for(var i = 0;i < 12;i++)
		arrAnimalYear.push(1900+i);

	for(var i = 0;i < 60;i++)
		arrLunarYear.push(1864+i);

	var arrLunarName = ['甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉'
					  ,'甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛己','壬午','癸未'
					  ,'甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳'
					  ,'甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸丑'
					  ,'甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑'
					  ,'甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'];
	
	function setChangeLunarYear()
	{
		for(var i = 0;i < arrAnimalYear.length;i++)
		{
			if((oSelYear.value-arrAnimalYear[i])%12==0)
			{
				oLYear.children[1].innerHTML = arrAnimal[i];
				oImg.src = arrAnimalImg[i];
				break;
			}
		}

		for(var i = 0;i < arrLunarYear.length;i++)
		{
			if((oSelYear.value-arrLunarYear[i])%60==0)
			{
				oLYear.children[0].innerHTML = arrLunarName[i];
				break;
			}
		}
	}

	setChangeLunarYear();

//填充日历的内容

	function calSContent()
	{
		var num = 1;
		var dates = getDates(Number(oSelMonth.value));

		if(oSelYear.value%4!=0&&oSelMonth.value==1)
			dates = 28;

		var monthOne = getMonthOne(Number(oSelMonth.value));

		for(var j = 0;j < monthOne;j++)
			{
				allP[j].innerHTML = '';
				allSpan[j].innerHTML = '';
			}

		for(var n = dates+monthOne;n < allP.length;n++)
		{
			allP[n].innerHTML = '';
			allSpan[n].innerHTML = '';
		}

		for(var i = monthOne;i < (dates+monthOne);i++)
		{
			allP[i].innerHTML = num;
			num++;
		}
	}

	calSContent();

//选取当前的是几号，加样式
	var oldNowP = 0;
	function  getNowDate()
	{	
		aLi[oldNowP].className = '';
		
		var dates = getDates(oSelMonth.value);

		if(oSelYear.value%4!=0&&oSelMonth.value==1)
			dates = 28;

		var monthOne = getMonthOne(oSelMonth.value);

		if(oDay.innerHTML==nowDate)
		{		
			for(var i = monthOne;i < (dates+monthOne);i++)
			{
				if(allP[i].innerHTML==nowDate)
				{
					aLi[i].className = 'li1';
					var myTime = new Date(oSelYear.value,Number(oSelMonth.value),Number(allP[i].innerHTML));

					oDateWeek.children[0].innerHTML = arrWeek[myTime.getDay()];
					oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(allP[i].innerHTML));

					if(oLDate.children[0].innerHTML.split('').length==3)
						oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';

					oldNowP = i;
					break;
				}
			}
		}	
	}

	getNowDate();

//选择区的内容改变，对应cal-right改变及日历内容改变

	oSelYear.onchange=function()
	{

		oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(nowDate);	
		
		oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(oDay.innerHTML))
		if(oLDate.children[0].innerHTML.split('').length==3)
			oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';
		
		setChangeLunarYear();
		calSContent();
		calLContent();
		getNowDate();		
		getOldLColor();
		clickCal();
		clearClickClass();
		
	}
	

	oSelMonth.onchange=function()
	{
		oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(oDay.innerHTML);
		
		oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(oDay.innerHTML))
		if(oLDate.children[0].innerHTML.split('').length==3)
			oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';
		
		calSContent();
		getNowDate();
		calLContent();
		getOldLColor();
		clearClickClass();
		
	}

//月份选择的左右点击
	
	var num=oSelMonth.value;

	var oMonthLeft = document.getElementById('month-left');
	var oMonthRight = document.getElementById('month-right');

	oMonthLeft.onclick = function()
	{
		num--;

		oSelMonth.value = oSelMonth.value-1;
		
		oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(oDay.innerHTML))
		if(oLDate.children[0].innerHTML.split('').length==3)
			oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';

		oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(oDay.innerHTML);
		
		if(!oSelMonth.value||num==-1)
		{
			oSelMonth.value = 11;
			num=oSelMonth.value;
		}

		 calSContent();
		 getNowDate();
		 calLContent();	
		 getOldLColor();
		 clickCal();
		 clearClickClass();
		 
	}

	oMonthRight.onclick = function()
	{
		num++;

		oSelMonth.value = Number(oSelMonth.value)+1;
		
		oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(oDay.innerHTML))
		if(oLDate.children[0].innerHTML.split('').length==3)
			oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';
		
		oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(oDay.innerHTML);

		if(!oSelMonth.value||num==12)
		{
			oSelMonth.value = 0;
			num=oSelMonth.value;
		}
					
		 calSContent();
		 getNowDate();
		 calLContent();	 
		 clickCal();  
		 getOldLColor();		 
		 clearClickClass();
		
	}

//获得当前月份的天数

	function getDates(M)
	{
		var myTime = new Date();

		myTime.setMonth(M+1);
		myTime.setDate(0);

		return myTime.getDate();
	}

//获得当前年当前月第一天是星期几

	function getMonthOne(M)
	{
		var myTime = new Date(oSelYear.value,M,1);

		return myTime.getDay();
	}

//点击返回今天按钮

	var oInput = oCalLeftTop.getElementsByTagName('input')[0];
	
	oInput.onclick = function()
	{
		oSelYear.value = nowYear;
		oSelMonth.value = nowMonthIndex;

		oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(nowDate);
		oDay.innerHTML = nowDate;
	
		oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,nowDate);
		if(oLDate.children[0].innerHTML.split('').length==3)
			oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';
		
		calLContent();
		calSContent();
		getNowDate();
		getOldLColor();
		clearClickClass();
		setChangeLunarYear();
		judgeMotherFather();

		oDateWeek.children[0].innerHTML = arrWeek[nowWeek];
	}

//选中日历页面的内容

	var oldClickCal = 0;
	var nowClickCal = 0;
	function clickCal()
	{
		var dates = getDates(Number(oSelMonth.value));

		if(oSelYear.value%4!=0&&oSelMonth.value==1)
			dates = 28;

		var monthOne = getMonthOne(Number(oSelMonth.value));

		for(var i = monthOne;i < (monthOne+dates);i++)
		{
			aLi[i].index = i;
			aLi[i].onclick = function()
			{
				if(allP[oldClickCal].innerHTML!=nowDate)
					aLi[oldClickCal].className = '';

				oDates.children[0].innerHTML = oSelYear.value+'-'+toTow(Number(oSelMonth.value)+1)+'-'+toTow(allP[this.index].innerHTML);
				
				oDay.innerHTML = allP[this.index].innerHTML;
				
				var myTime = new Date(oSelYear.value,Number(oSelMonth.value),Number(allP[this.index].innerHTML));
				oDateWeek.children[0].innerHTML = arrWeek[myTime.getDay()];
				
				oldClickCal = this.index;
				
				oLDate.children[0].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(allP[this.index].innerHTML))
				if(oLDate.children[0].innerHTML.split('').length==3)
					oLDate.children[0].innerHTML = oLDate.children[0].innerHTML.substring(0,2)+'二十';
				
				aLi[this.index].className='li1';
				
				nowClickCal = this.index;
			}
		}	
	}

	clickCal();

	var oldclearClickClass = 0;

	function clearClickClass()
	{
		aLi[oldclearClickClass].className = '';
		aLi[nowClickCal].className = '';

		for(var i = 0;i < allP.length;i++)
		{
			if(allP[i].innerHTML==oDay.innerHTML)
			{
				aLi[i].className = 'li1';

				var myTime = new Date(oSelYear.value,Number(oSelMonth.value),Number(allP[i].innerHTML));
				oDateWeek.children[0].innerHTML = arrWeek[myTime.getDay()];
				
				oldclearClickClass = i;
			}
		}
	}

//星期六，天颜色改变

	function weekendColor()
	{
		var aUl = oCalMain.getElementsByTagName('ul');

		for(var i = 0;i < aUl.length;i++)
		{
			var aP = aUl[i].getElementsByTagName('p');

			for(var j = 0;j < aP.length;j++)
			{
				if(j==0||j==6)
					aP[j].style.color = '#E02D2D';
			}
		}
	}

	weekendColor();

//农历转换

    function e2c() 
    {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getFullYear();

        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1){
            total++;
        }

        for (m = 0; ; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;

            for (n = k; n >= 0; n--) 
            {
                if (total <= 29 + GetBit(CalendarData[m], n)) 
                {
                    isEnd = true; break;
                }

                total = total - 29 - GetBit(CalendarData[m], n);
            }

            if (isEnd) break;
        }

        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;

        if (k == 12) 
        {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) 
            {
                cMonth = 1 - cMonth;
            }
           
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) 
            {
                cMonth--;
            }
            
        }
    }

//显示农历年

    function GetcDateString() 
    {
        var tmp = "";
      
        if (cMonth < 1) 
        {
            tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1);
        } 
        else
        {
            tmp += monString.charAt(cMonth - 1);
        }

        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        
        if (cDay % 10 != 0 || cDay == 10)
        {
            tmp += numString.charAt((cDay - 1) % 10);
        }

        return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) 
    {
        
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString();       
    }

//调用
		
      oLDate.children[0].innerHTML = GetLunarDay(nowYear,nowMonthIndex+1,nowDate);

//填充农历日期

    function calLContent()
    {
    	var num = 1;
    	var dates = getDates(Number(oSelMonth.value));

		if(oSelYear.value%4!=0&&oSelMonth.value==1)
			dates = 28;

		var monthOne = getMonthOne(Number(oSelMonth.value));
		
		for(var i = monthOne;i < (monthOne+dates);i++)
		{
			allSpan[i].innerHTML = GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,num).substring(2,4);
			
			if(allSpan[i].innerHTML=='廿')
				allSpan[i].innerHTML = '二十';
			
			num++;
		}
    }

    calLContent();
       
//填充二十四节气

	var arrOldColor = [];
	var arrRemoveNode = [];

	var  solarTerm  =  new  Array("小寒","大寒","立春","雨水","惊蛰","春分",
								  "清明","谷雨","立夏","小满","芒种","夏至",
								  "小暑","大暑","立秋","处暑","白露","秋分",
								  "寒露","霜降","立冬","小雪","大雪","冬至") ;
	var  sTermInfo  =  new  Array(0,21208,42467,63836,85337,107014,
								  128867,150921,173149,195551,218072,240693,
								  263343,285989,308563,331033,353350,375494,
								  397447,419210,440795,462224,483532,504758) ;
	
	function sTerm(year,n) 
	{
		var offDate  =   new  Date( (  31556925974.7 * (year- 1900 )  +  sTermInfo[n] * 60000   )  +  Date.UTC( 1900 , 0 , 6 , 2 , 5 ) );
 		
 		return (offDate.getUTCDate());
	} 

	function getsolar()
	{
		judgeSolar(Number(oSelMonth.value));
	}

	function judgeSolar(month)
	{
	
		for(var i = 0;i<allP.length;i++)
			{
				if(allP[i].innerHTML==sTerm(Number(oSelYear.value),month*2))
				{
					allSpan[i].innerHTML = solarTerm[month*2];
					allSpan[i].style.color = 'red';
					arrOldColor.push(i);
				}

				else if(allP[i].innerHTML==sTerm(Number(oSelYear.value),(month*2+1)))
				{
					allSpan[i].innerHTML = solarTerm[month*2+1];
					allSpan[i].style.color = 'red';
					arrOldColor.push(i);					
				}
			}
	}

//判断清明节

	function judgeQM()
	{
		if(oSelMonth.value==3)
		{
			for(var n = 0;n < allSpan.length;n++)
				{
					if(allSpan[n].innerHTML=='清明')
						{
							allSpan[n].innerHTML = '清明节';
							
							if(oSelYear.value==nowYear)
							{
								for(var j = n;j < (n+3);j++)
								{
									fnFtv(j);
								}
							}

							break;
						}
				}
		}
	}

//关于假期节日

//公历节日

	var sFtvDate = new Array("0101*", "0214","0308", "0312", "0315", "0401",
							"0501*","0504","0512","0601","0701","0801","0910",
							"1001*","1024","1224","1225");
							

	var sFtvName = ["元旦","情人节","妇女节","植树节","消费者...",
					"愚人节","劳动节","青年节","护士节","儿童节","建党节",
					"建军节","教师节","国庆节","联合国...",
					"平安夜","圣诞节"];

	function sFtv()
	{
		for(var i = 0;i < sFtvDate.length;i++)
		{
			if(toTow(Number(oSelMonth.value)+1)==sFtvDate[i].substring(0,2))
			{
				for(var j = 0;j < allP.length;j++)
				{
					if(toTow(Number(allP[j].innerHTML))==sFtvDate[i].substring(2,4))
					{
						allSpan[j].style.color = 'red';
						allSpan[j].innerHTML = sFtvName[i];
						
						if(sFtvDate[i].substring(4,5)=='*'&&oSelYear.value==nowYear)
						{
							if(sFtvDate[i]=="0101*")
							{
								for(var n = j;n < (j+3);n++)
									fnFtv(n);								
							}

							if(sFtvDate[i]=="0501*")
							{
								for(var n = j;n < (j+2);n++)
									fnFtv(n);
							}

							if(sFtvDate[i]=="1001*")
							{
								for(var n = j;n < (j+7);n++)
									fnFtv(n);
							}
						}

						arrOldColor.push(j);
						
					}
				}
			}

		if(oSelMonth.value==3&&oSelYear.value==nowYear)
			fnFtv(34);
		}
	}


	function fnFtv(j)
	{
		var oDiv = document.createElement('div');
		
		allP[j].style.color = 'black';
		
		weekendColor();
		
		oDiv.innerHTML = '休';
		
		aLi[j].appendChild(oDiv);
		
		aLi[j].style.background = '#FFE7E7';
		
		arrRemoveNode.push(j);

	}
	

//农历节日

	var lFtvDate = new Array("腊月初八","正月初一*","正月十五","五月初五*","七月初七","八月十五*","九月初九");
	var lFtvName = ["腊八节","春节","元宵节","端午节","七夕节","中秋节","重阳节"];

	function lFtv()
		{
			for(var i = 0;i < lFtvDate.length;i++)
			{
				for(var j = 0;j < allP.length;j++)
				{
					if(GetLunarDay(Number(oSelYear.value),Number(oSelMonth.value)+1,Number(allP[j].innerHTML))==lFtvDate[i].substring(0,4))
					{
						if(lFtvDate[i].substring(4,5)=='*'&&oSelYear.value==nowYear)
						{
							
							if(lFtvDate[i]=="正月初一*")
							{
				
								for(var n = j-1;n < (j+6);n++)
									fnFtv(n);
							
							}

							if(lFtvDate[i]=="五月初五*"||lFtvDate[i]=="八月十五*")
							{
								for(var n = j;n < (j+3);n++)
									fnFtv(n);
							}
						}

						allSpan[j].innerHTML = lFtvName[i];
						allSpan[j].style.color = 'red';
						arrOldColor.push(j);

						if(lFtvDate[i]=="正月初一*")
						{
							allSpan[j-1].innerHTML="除夕";
							allSpan[j-1].style.color = 'red';
							arrOldColor.push(j-1);
						}
		
					}
				}
			}
		}

//cal内容中，定义农历颜色的改变

	function getOldLColor()
	{
		for(var i = 0;i < arrOldColor.length;i++)
		{
			allSpan[arrOldColor[i]].style.color = '#787777';
		}
		
		for(var j = 0;j < arrRemoveNode.length;j++)
		{
			aLi[arrRemoveNode[j]].style.background = 'white';
			
			var oDiv = aLi[arrRemoveNode[j]].getElementsByTagName('div')[0];
			
			aLi[arrRemoveNode[j]].removeChild(oDiv);
		}
	
		arrOldColor.length = 0;
		arrRemoveNode.length = 0;

		getsolar();
		sFtv();
		lFtv();
		judgeQM();		
	}

	getOldLColor();
}
