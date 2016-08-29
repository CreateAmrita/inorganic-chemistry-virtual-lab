<?php
////////
function isSimThemeExists($fileName)
{
	if(substr($fileName,-4)!='.php')
		$fileName.='.php';
		if (file_exists($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/'.$fileName))
			{
				return true;
		}
	return false;
}
/////////////////////////////////////////
function isSimWorksheetExists($fileName)
{
	if(substr($fileName,-4)!='.php')
		$fileName.='.php';
		if (file_exists($GLOBALS['sim_id'].'/'.$fileName))
			{
				return true;
		}
	return false;
}
//////////////////
function isSimNameExists($fileName)
{
	if(substr($fileName,-4)!='.php')
		$fileName.='.php';
		if (file_exists($GLOBALS['sim_id'].'/'.$fileName))
		{
			return true;
		}
	return false;
}
////////////////////
//////
function getHeader() {
	if(isSimThemeExists('header'))
	{
		include($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/header.php');
	}
}
//////
////////////
function getIncludes() {
	if(isSimNameExists('includes'))
	{
		include($GLOBALS['sim_id'].'/includes.php');
	}
}
////////
/////////////			
function getFooter() {
	if(isSimThemeExists('footer'))
	{
		include($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/footer.php');
	}
}
///////////		
////////	
function getTempCss($cssFile)
{
	if(substr($cssFile,-4)!='.css')
	$cssFile.='.css';
		if (file_exists($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/css/'.$cssFile))
		{
			return $GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/css/'.$cssFile;
		}
	return false;
}
function getTempJs($jsFile)
{
	if(substr($jsFile,-3)!='.js')
	$jsFile.='.js';
		if (file_exists($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/js/'.$jsFile))
		{
			return $GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/js/'.$jsFile;
		}
	return false;
}
////////////
function getSimPath(){
	echo($GLOBALS['sim_id'].'/');
}
//////
///////////////////////////

function getSimCss($cssFile)
{
	if(substr($cssFile,-4)!='.css')
	$cssFile.='.css';
		if (file_exists($GLOBALS['sim_id'].'/css/'.$cssFile))
		{
			echo ($GLOBALS['sim_id'].'/css/'.$cssFile);
		}
	return false;
}
///////////
///////////
function getTempImage($imgName)
{
	if(file_exists($GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/images/'.$imgName))
	{
		return $GLOBALS['temp_dir'].$GLOBALS['temp_id'].'/images/'.$imgName;
	}
	return false;
}
function getWorksheet() {
	if(isSimWorksheetExists('worksheet'))
	{
		include($GLOBALS['sim_id'].'/worksheet.php');
	}
	
}
?>