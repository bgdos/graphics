/** asign enter to a element**/
function enterButton(element)//receive element name
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             getElement(element).focus();
			getElement(element).onclick();
        }
    }
}
/** get element **/
function getElement(e)//receive element name or css selector (#id, .class, p, etc.)
{
    var element;
    try
    {
        element = document.getElementById(e);
        if (element == null)
            element = document.querySelector(e);
    }
    catch(err)
    {
        console.log(err.message);
    }
    
    return element;
}
/** array maximum **/
function arrayMaximum(array)
{
    var max = Math.max.apply(Math, array);
    return max;
}
/** array minimum **/
function arrayMinimum(array)
{
    var min = Math.min.apply(Math, array);
    return min;
}
/** modal window**/
var dg = true;
function dialogBox(text) { 
    var dialog;
    if (dg) { dialog = document.createElement('dialog'); document.body.appendChild(dialog); dg = false;}
    else { dialog = getElement('dialog');}
    dialog.innerHTML = text;
    dialog.showModal();
    //document.body.removeChild(dialog); 
} 
/** generate a random number **/ 
function getRandomColor() {//refference http://stackoverflow.com/a/1484514/4225925
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/* pop-up window */
function popInfo(header, message, timeout)
{
	getElement('popheader').innerHTML = header;
    getElement('pop-message').innerHTML = message;
	openPopup();
	if (timeout > 0)// to auto close the popup
		setTimeout(function(){closePopup();},timeout);
}
function openPopup(){
    getElement('.popup').style.display = 'inline'; 
    var pi = getElement('.info');
    var wh = document.documentElement.clientHeight;
    var ph = pi.clientHeight;
    var p = ((100/ wh) * ph) / 2;
    p = (50 - p) + "%"
    pi.style.top = p;
    var ww = document.documentElement.clientWidth;
    var pw = pi.clientWidth;
    var p = ((100/ ww) * pw) / 2;
    p = (50 - p) + "%"
    pi.style.left = p;
    return false;
	
}
function closePopup(){
    getElement('.info').style.top = '-100%';
    setTimeout(function(){getElement('.popup').style.display = 'none'; }, 250);
    return false;
}
