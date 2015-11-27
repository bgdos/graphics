//drawing
function createSVG(drawingType, attributes) { //Recibe el tipo de grafico que se requiere y los atributos para crearlo
    var svg = document.createElementNS('http://www.w3.org/2000/svg', drawingType); // se crea la figura
    for (var k in attributes)
        if (attributes.hasOwnProperty(k)) svg.setAttribute(k, attributes[k]);
    return svg;
}
//create line
function drawingLine(x1, y1, x2, y2, color)
{
    //create attributes
    var attributes = {x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, strokewidth: '1px' };
	//create line
	var line = createSVG('line', attributes);
	return line;
}
//create Rectangle
function drawingRectangle(x, y, width, height, colorline, fillColor, rx, ry)
{
    //create attributes
    var attributes = {x: x, y: y, rx: rx, ry: ry, height: height, width: width, stroke: colorline, strokewidth: '1px', fill: fillColor};
	//create rectangle
	var rect = createSVG('rect', attributes);
	return rect;
}
//create Circle
function drawingCircle(cx, cy, stroke, fill, r)
{
    //create attributes
    r = (r != undefined)? r: 5;//the radio of the circle
    var attributes = {cx: cx, cy: cy, stroke: stroke, fill: fill, r: r, strokewidth: '2px' };//cx & cy are the start of the circle
	//create circle
	var c = createSVG('circle', attributes);
	return c;
}
// create text
function drawingText(text, x, y, anchor, size, color, borderColor, strokeWidth, fontWeight)
{
    //create attributes
    var attributes = {x: x, y: y, 'text-anchor': anchor, 'font-family': 'Verdana', 'font-size': size + 'pt', stroke: borderColor, strokewidth: strokeWidth, 'font-weight': fontWeight, fill: color, stroke: borderColor};
	//create text
	var t = createSVG('text', attributes);
	//text
	t.innerHTML = text;
	//color
	/*t.style.fill = color;
    t.style.stroke = borderColor;*/
    t.setAttribute("id", "textSVG");
    //t.style.strokeWidth = strokeWidth;
	//regresar text
	return t;
}
//Dibujar Poligono
function dibujarPoligono()
{
	//crear poligono
	var p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
	//generar atributo de puntos
	var puntos = [ [200,200], [300,200], [300,300], [400,300], [400,400], [200,400] ];
	var puntosString = '';
	for (var i = 0; i < puntos.length; i++)
	{
		puntosString += puntos[i][0] + ',' + puntos[i][1] + ' ';
	}
	puntosString += puntos[0][0] + ',' + puntos[0][1]; //regresar a punto original
	p.setAttribute('points',puntos);
	//estilo
	p.style.stroke = '#822'; //color de line
	p.style.strokeWidth = '1px'; //grosor de la line
	p.style.fill = '#A55'; //color de relleno
	//agregar poligono a svg
	s.appendChild(p);
}
