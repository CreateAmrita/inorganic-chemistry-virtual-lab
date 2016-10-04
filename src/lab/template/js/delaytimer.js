/** Stop watch function using createjs and javascript */
var rate = 1; /** Rate change depend upon the value from the experiment */

var clockContainer;

var pause_flag = true;

var milli_sec, timer_hr, timer_min, timer_sec, timer_millisec, milli;

/**clock interval runs between 1 ms and 0.1ms */
function createStopwatch(stage,x,y,interval) {
	/** Creating  container */	
	interval<=0?rate=0.1:(interval>1?rate=1:rate=interval);
	clockContainer=new createjs.Container();
	clockContainer.name="container";
	stage.addChild(clockContainer);
	load_stopwatch_image("bg","../template/images/stopwatch.svg",x,y);
	load_stopwatch_image("play","../template/images/play.svg",x+100,y+95);
	load_stopwatch_image("pause","../template/images/stop.svg",x+100,y+95);	
	load_stopwatch_image("reset","../template/images/reset.svg",x+140,y+95);	
	getName("pause").visible=false;
	setText("stopWatchHr",x+66,y+73);	
	setText("stopWatchMin",x+100,y+73);
	setText("stopWatchSec",x+135,y+73);	
	setText("stopWatchmilli",x+170,y+73);
	variableInitialization(stage);
	/** Load images */
	function load_stopwatch_image(name,src,xPos,yPos){
		var image = new Image();
		image.src = src;
		var _bitmap = new createjs.Bitmap(image).set({});
		_bitmap.x=xPos;
		_bitmap.y=yPos;
		_bitmap.name=name;	
		clockContainer.addChild(_bitmap);
	}
	/**initialize the variables in the stopwatch*/
	function variableInitialization(stage){
		milli_sec=0;
		timer_hr=0;
		timer_min=0;
		timer_sec=0;
		timer_millisec=0;
		milli=0;
		initializeText("0","0","0","0",stage);
	}
	/**remove clock from the stage*/
	removeClock = function(){
		stage.removeChild(clockContainer);
	}
	/**add clock to the stage*/
	showClock = function(){
		stage.addChild(clockContainer);
	}
	/** Time text in watch */
	function setText(name,textX,textY){  
		var text = new createjs.Text();
		text.x=textX;
		text.y=textY;
		text.textBaseline="alphabetic";
		text.name=name;
		text.font ="1.8em digiface";
		text.color="#000000";
		clockContainer.addChild(text);
	}	
	/** Stop or pause */
	pauseWatch = function() {
		getName("play").visible=true;
		getName("pause").visible=false;	
		pause_flag = true;
		stage.update();		
	}
	/** Reset the watch */
	resetWatch = function() {		
		variableInitialization(stage);
		pauseWatch();
	}
	stage.update();
}

/** Initialize text of the reading */
initializeText = function(hr, min, sec, milli,stage) {
	/**Initially zero will be added along with single digit time*/
	clockContainer.getChildByName("stopWatchmilli").text=milli<10?"0"+milli:milli;
	clockContainer.getChildByName("stopWatchSec").text=sec<10?"0"+sec:sec;
	clockContainer.getChildByName("stopWatchMin").text=min<10?"0"+min:min;
	clockContainer.getChildByName("stopWatchHr").text=hr<10?"0"+hr:hr;
	stage.update();
}

/** function to return chiled element of container */
getName = function(chldName){
	return clockContainer.getChildByName(chldName);
}

/**start delay timer here */
function delayTimer(stage)	{
	milli_sec++;
	timer_millisec++;
	/**Calculate seconds from milliseconds and update second*/
	if(timer_millisec>99){
		timer_millisec=0;
		timer_sec++;
	}
	/**Calculate minute from seconds and update minute*/
	if(timer_sec>=59){
		timer_sec=1
		timer_min++;	
	}
	/**Calculate hour from minute and update hour*/
	if(timer_min>=59)
	{
		timer_min=1;
		timer_hr++;
	}
	/**Pass values for hour, minute, second and millisecond to initialize text function */
	initializeText(timer_hr,timer_min,timer_sec,timer_millisec,stage);
}