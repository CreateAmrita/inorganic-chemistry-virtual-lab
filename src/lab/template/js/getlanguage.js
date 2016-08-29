/**get the language from the url and translate the source string to the defined language*/
var srcUrl,xmlhttp_lan,flag =false;
var language = getParameterByName('lan');
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/**set default language as English*/
CheckFileExists(window.location.pathname+"locale/"+language+"/messages.po");

function CheckFileExists(url){
	if(language==""){
		language="en-IN"; 
		flag=false;
	}	
	else{
		language = getParameterByName('lan');
		srcUrl=url;	
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp_lan=new XMLHttpRequest();
		}	else{// code for IE6, IE5
			xmlhttp_lan=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp_lan.onreadystatechange=function()	{	
		if ( xmlhttp_lan.readyState == 4 && xmlhttp_lan.status==200 ) 
		{
			flag=true;
		}
		else  if ( xmlhttp_lan.readyState == 4 &&xmlhttp_lan.status==404){
			flag=false;
		}
	}
	xmlhttp_lan.open('GET', srcUrl, false);
	xmlhttp_lan.send(null);
	}
	if(flag){
		document.write("<link rel='gettext' type='application/x-po' href='./locale/"+language+"/messages.po'/>");
	}else{
		document.write("<link rel='gettext' type='application/x-po' href='./locale/en-IN/messages.po'/>");
	}

}


//creating an object for the Gettext
var gt = new Gettext({
	domain: "messages"
});

/// create a shortcut variable to access the Gettext file 
var _ = function(a) {
	return gt.gettext(a);
};
