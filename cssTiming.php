<? 
$s1 = 'rgb(1, 2,3)'; //style 1 The spacing is critically important here.
$s2 = 'rgb(88, 88, 88)'; //style 2
$s3 = 'rgb(88,88,88)'; //style 2 for ie
$l = 1;
if (isset($_GET['l']))
{
	$l = $_GET['l'];
}

?>
<html>
<head><style>h1 {background-color: #888888;} a {color: <? echo($s1) ?>; font-size: 30px;} a:visited{color: <? echo($s2) ?>; font-size: 16px;} </style></head>
<body>
<h1>Test</h1>

<a href="http://google.com" id="link1">Google</a>
<a href="http://fakesite.com" id="link2">fakesite.com</a>
<div id="results1"></div><br><div id="results2"></div>
</body>
</html>
<script type="text/javascript">
var sitesText = "<?echo(file_get_contents('top500.txt'));?>";
var sites = sitesText.split(',');

function e(x) {return document.getElementById(x);}
IE = true;
if (document.defaultView)
{
	IE = false;
}
var a = document.createElement('a');
a.href = 'http://google.com';
a.innerHTML = "Click Here!";
document.body.appendChild(a);
var b = document.createElement('a');
b.href = 'http://fdasadfsadfsa.com';
b.innerHTML = "Click Here2!";

//TODO: Finish this
//TODO: make this work in IE
for (l = 0; l< <? echo($l); ?>; l++) //optional loop for performance testing
{
	for (i=0; i<sites.length; i++)
	{
		
		if (IE)
		{
			var d = document.createElement('a');
			d.href = "http://www." + sites[i];
			//d.innerHTML = "f ";
			document.body.appendChild(d);
			if (d.currentStyle.color == '<?echo($s3)?>' )
			{
				results1.innerHTML += d.href;
			}
		}
		else
		{
			a.href = "http://www." + sites[i];
			if (document.defaultView.getComputedStyle(a,null).getPropertyValue('color') == '<?echo($s2)?>' )
			{
				results1.innerHTML += a.href;
			}
		}
	}
}


//e('results1').innerHTML = aStyle;
//e('results2').innerHTML = bStyle;
var link1 = e('link1');
var link2 = e('link2');
</script>