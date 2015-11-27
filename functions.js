var titulosX = ['Mon','Tue','Thu','Wed','Fri', 'Sat', 'Sun', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom']
/** Menu para la seleccion de tipo de  grafica **/
function displayGraphics()
{
    var c = makeChart();//crear grafica con los datos de la pagina web
    var option = parseInt(getElement('chartType').value);
    switch(option) {//desplegar el tipo de grafica seleccionada
        case 0: popInfo('Error','Select a chart type');
            break;
        case 1: c.bar();
            break;
        case 2: c.columns();
            break;
        case 3:
            c.labelY = getElement('titleY').value;//se agrega el titulo al eje Y
            c.labelX = getElement('titleX').value;//se agrega el titulo al eje X
            c.linear();
            break;
        case 4: c.pie();
            break;
        case 5:
            c.labelY = getElement('titleY').value;//se agrega el titulo al eje Y
            c.labelX = getElement('titleX').value;//se agrega el titulo al eje X
            c.average = getElement('average').value;//se agrega un valor promedio preestablecido
            c.points();
            break;
        default: alert('error', 'Select a chart type');
            break;
    }
}
function makeChart()
{
    var array = [];
    var inputs = getElement('values').querySelectorAll('input');
    for (var i = 1; i <= inputs.length; i++)
    {
        var n = parseFloat(getElement('value' + i).value);
        if (!isNaN(n))
            array.push(n);
    }
    if (array.length > 0)
    {
        var z = getElement('zero').checked;
        var chart = new Chart('columns', array, titulosX, z);
        return chart;
    }
}
function exportToImage()
{
    var svg = getElement("columns").outerHTML;
    //ssvg = unescape(svg);
    var canvas = getElement('canvas');
    canvg(canvas, svg);  
    var theImage = canvas.toDataURL('image/png');
    var img = document.createElement('img');
    img.getAttribute('src', theImage);
    //document.write('<img src="'+theImage+'"/>');
    var a = document.createElement('a');
    a.href     = theImage;
    a.download = 'chart';
    a.target   = '_blank';
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a);
}
function checkOptions(value)
{
    if (value == 5 || value == 3)
        getElement('titleY').style.display = getElement('titleX').style.display = 'inline';
    else getElement('titleY').style.display = getElement('titleX').style.display = 'none';
    if (value == 5)
        getElement('average').style.display = 'inline';
    else getElement('average').style.display = 'none';
    
}
var contador = 7;
function createInput()
{
    var input = document.createElement('input');
    input.setAttribute("id", "value" + contador);
    input.setAttribute("type", 'number');
    input.setAttribute("placeholder", 'value');
    getElement('values').appendChild(input);
    contador ++;
    varColors.push(getRandomColor());
}
