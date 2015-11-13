var int;
var minimo;
var maximo;
var intervalo;
var titulosX = ['Mon','Tue','Thu','Wed','Fri']
//function columns(element, datos, titulosY, titulosX)
function makeGraphics()
{
    var array = [];
    for (var i = 1; i <= 5; i++)
    {
        var n = parseFloat(document.getElementById('value' + i).value);
        if (!isNaN(n))
            array.push(n);
    }
    if (array.length > 0)
    {
        var textarea = document.getElementById('datasheet');
        textarea.innerHTML = '';
        var max = Math.max.apply(Math, array);
        textarea.value = 'Maximum: ' + max + '\n';
        var min = Math.min.apply(Math, array);
        textarea.value += 'Minimum: ' + min + '\n';
        //multiplicador
        var multi = .00001;
        //encontrar el maximo del multiplicador
        while (max > multi)
        {
            multi = multi * 10;
        }
        //determinar el maximo
        var maximum = 0;
        var rounded = Math.round(max / 10);
        if (max < 1)
            maximum = multi;
        else if (max <= 100 & min >= 1)
            maximum = (rounded > max / 10) ? rounded * 10 : (rounded + 1) * 10;
        else while (maximum <= max)
            maximum += (multi / 100);
        //determinar el minimo
        var zero = document.getElementById('zero');
        var minimum = 0;
        if (min <= multi & min <= 100 || zero.checked)
            minimum = 0;
        else while (min > minimum + multi / 100)
                    minimum += multi / 100;
        var interval = (maximum - minimum) / 10;
        //desplegar resultados para grafica en consola
        textarea.value += 'Multiplicator : ' + multi + '\n';
        textarea.value += 'Calculated Maximum : ' + maximum + '\n';
        textarea.value += 'Calculated Minimum : ' + minimum + '\n';
        textarea.value += 'Calculated Interval: ' + interval + '\n';
        //llenar los intervalos
        var intervals = []
        for (var i = 1; i <= 10; i++)
            intervals.push(i * interval + minimum);
        columns('columns', array, intervals, titulosX, minimum, maximum);
    }
}
function exportToImage()
{
    var svg = document.getElementById("columns");
    var canvas = document.getElementById('canvas');
    canvg(canvas, unescape(svg.outerHTML));  
    var theImage = canvas.toDataURL('image/png');
    /*document.write('<img src="'+theImage+'"/>');
    var a = document.createElement('a');
    a.href     = theImage;
    a.download = 'chart';
    a.target   = '_blank';
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a);*/
}
function enterButton(element)
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             document.getElementById(element).focus();
			document.getElementById(element).onclick();
        }
    }
}
