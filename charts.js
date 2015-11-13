//var titulosY =  [ 35, 30, 25, 20, 15];
//var titulosX =  [ 'Precio', 'Calidad', 'Tiempo', 'Confiabilidad', 'Atención'];
var colores = ['#1787ce', '#db6262', '#b64ed9', 'rgb(111, 103, 103)', '#256462' ];
var columnColor = "#5e91c6";
var columnToday = "#519f4a";
var mainColor = "#13748b";
//mostrar gráficas
function barras(element, datos, titulosY)
{
    var svgBarra = document.getElementById(element);
    //var maxval = Math.max.apply(Math, datos), series = maxval / 5;
    while (svgBarra.firstChild) {
        svgBarra.removeChild(svgBarra.firstChild);
    }
    var linea = dibujarLinea(130, 50, 130,300, "#1f7dd2" ); svgBarra.appendChild(linea);
    linea = dibujarLinea(130, 300, 480,300, "#1f7dd2" ); svgBarra.appendChild(linea);
    var texto = dibujarTexto("0", 130, 320, "middle", 12, "#1f7dd2"); svgBarra.appendChild(texto);
    texto = dibujarTexto("0", 130, 45, "middle", 12, "#1f7dd2"); svgBarra.appendChild(texto);
    
    var x = 50;
    var y = 165;
    for (var i = 0; i < titulosY.length; i++)
	{
		linea = dibujarLinea(130, x, 480,x, "#d3d3d3" ); svgBarra.appendChild(linea);
        texto = dibujarTexto(titulosY[i], 10, x +30, "right", 12, "#1f7dd2"); svgBarra.appendChild(texto);
        x += 50;
        linea = dibujarLinea(y, 50, y,305, "#d3d3d3" ); svgBarra.appendChild(linea);
        y += 35;
        linea = dibujarLinea(y, 50, y,305, "#d3d3d3" ); svgBarra.appendChild(linea);
        texto = dibujarTexto(i+1, y, 320, "middle", 12, "#1f7dd2"); svgBarra.appendChild(texto);
        texto = dibujarTexto(i+1, y, 45, "middle", 12, "#1f7dd2"); svgBarra.appendChild(texto);
        y += 35;
	}
    x = 50;
    y = 110;
    for (var i = 0; i < titulosY.length; i++)
	{	
        var rectangulo = dibujarRectangulo(130, x +5, datos[i]*70, 40, "#5e91c6", colores[i], 0, 0); svgBarra.appendChild(rectangulo);
        texto = dibujarTexto(datos[i], y + (datos[i] *70) , x +30, "middle", 12, "#CCCCCC"); svgBarra.appendChild(texto); // testo dentro de la barra
        x += 50;
	}
}
//columns
function columns(element, datos, titulosY, titulosX, min, max)
{
    titulosY.reverse();
    var svgBarra = document.getElementById(element);
    //var maxval = Math.max.apply(Math, datos), series = maxval / 5;
    while (svgBarra.firstChild) {
        svgBarra.removeChild(svgBarra.firstChild);
    }
    //Drawing lines
    var linea = dibujarLinea(65, 50, 65,300, mainColor ); svgBarra.appendChild(linea);
    linea = dibujarLinea(65, 300, 65 + (100 * titulosX.length),300, mainColor ); svgBarra.appendChild(linea);
    var texto = dibujarTexto(min, 15, 300, "middle", 12, "#13748b"); svgBarra.appendChild(texto);
    var y = 50;
    var x = 100;
    var interval = 250 / titulosY.length;
    //titles x
     for (var i = 0; i < titulosX.length; i++)
	{
        texto = dibujarTexto(titulosX[i].substring(0, 3), x+10, 320, "middle", 12, mainColor); svgBarra.appendChild(texto);
        texto = dibujarTexto(titulosX[i].substring(0, 3), x+10, 45, "middle", 12, mainColor); svgBarra.appendChild(texto);
        linea = dibujarLinea(x+65, 50, x+65,305, "#d3d3d3" ); svgBarra.appendChild(linea);
        x += 100;
	}
    //title y
    y = 50;
    x = 165;
    for (var i = 0; i < titulosY.length; i++)
	{
		linea = dibujarLinea(65, y, 65 + (100 * titulosX.length) , y, "#d3d3d3" ); svgBarra.appendChild(linea);
        texto = dibujarTexto(titulosY[i], 10, y, "right", 12, mainColor); svgBarra.appendChild(texto);
        y += interval;
	}
    x = 65;
    y = 250;
    var size = 65;
    for (var i = 0; i < datos.length; i++)
	{	
        var color = columnColor;
        /*var weekday;
        if (i == date.weekday)
            color = columnToday;*/
        var colValue = 250-(((datos[i]- min) / ((max - min) /titulosY.length)) * interval);
        var rectangulo = dibujarRectangulo(x+15, 50+colValue , size, y-colValue, mainColor, colores[i], 0, 0); svgBarra.appendChild(rectangulo);
        texto = dibujarTexto(datos[i], x + 45 , 70 + colValue, "middle", 12, "#CCCCCC"); svgBarra.appendChild(texto); // testo dentro de la barra
        x += 100;
	}
}
//Funcion para dibujar los arcos
function pie(element, datos){//recive elemento donde se va a dibujar y arreglo de datos
    var svgPie = document.getElementById(element), dibujos = [];
    while (svgPie.firstChild) {
        svgPie.removeChild(svgPie.firstChild);
    }
    var total = datos.reduce(function (accu, that) { return that + accu; }, 0);
    var anguloSector = datos.map(function (v) { return 360 * v / total; });
    
    x= 20; y=35;
    
    for (var i = 0; i < titulosY.length; i++)
	{
        texto = dibujarTexto(titulosY[i],x, y , "right", 12, "#1f7dd2"); svgPie.appendChild(texto);
        var rectangulo = dibujarRectangulo(x-15, y-10, 10, 10, "#5e91c6", colores[i], 0, 0); svgPie.appendChild(rectangulo);
        x += 120;
        
	}

    var anguloInicio = 0;
    var anguloFin = 0;
    for (var i=0; i<anguloSector.length; i++){
        anguloInicio = anguloFin;
        anguloFin = anguloInicio + anguloSector[i];
        var x = 250;
        var y = 200;
        var r = 150;

        var x1,x2,y1,y2 ;

        x1 = parseInt(Math.round(x + r * Math.cos(Math.PI*anguloInicio/180)));
        y1 = parseInt(Math.round(y + r * Math.sin(Math.PI*anguloInicio/180)));

        x2 = parseInt(Math.round(x + r*Math.cos(Math.PI*anguloFin/180)));
        y2 = parseInt(Math.round(y + r*Math.sin(Math.PI*anguloFin/180)));
        
        

        var d = "M"+x +","+y+"  L" + x1 + "," + y1 + "  A"+r+","+r+" 0 " + 
                ((anguloFin-anguloInicio > 180) ? 1 : 0) + ",1 " + x2 + "," + y2 + " z";
        //alert(d); // muestra las coordenadas
        var c = parseInt(i / anguloSector.length * 360);
        var arcos = crearSVG("path", {d: d, fill: colores[i], stroke:"#CCCCCC", strokewidth:"2px"}); 
        svgPie.appendChild(arcos);
        //dibujar tiquetas
        var texto = dibujarTexto(titulosY[i] + " : " + ((100/total)*datos[i]).toFixed(2)+"%", (x1+x2) /2, ((y1+y2)/2) ,"middle", "15", "#1f7dd2");
        var rectangulo = dibujarRectangulo(texto.getAttribute("x")-100, texto.getAttribute("y")-18, 200, 25, "#0e96eb", "#d3d3d3", 5, 5);
        texto.style.display = "none";
        texto.style.zIndex = "5";
        rectangulo.style.display = "none";
        rectangulo.style.zIndex = "5";
        dibujos.push({arcos, rectangulo, texto});
    }
    //desplegar las etiquetas al pasar el raton
    for (var i = 0; i < dibujos.length; i++)
    {
        svgPie.appendChild(dibujos[i].rectangulo);
        svgPie.appendChild(dibujos[i].texto);
        tooltip(dibujos[i].arcos, dibujos[i].rectangulo, dibujos[i].texto);
    }
    
}
//Grafica Lineal
function lineal(element, datosY, datosX, maxval, labelY, labelX, gridX, average)
{
    //var maxval = Math.max.apply(Math, datos);
    var svgLinea = document.getElementById(element), dibujos = [];
    while (svgLinea.firstChild) {
        svgLinea.removeChild(svgLinea.firstChild);
    }
    var chartStartX= 20;
    var chartEndX= 270;
    var chartStartY= 130;
    var chartEndY= 130;
    //crear grid
    var linea = dibujarLinea(chartStartY, chartStartX, chartEndY,chartEndX, mainColor ); svgLinea.appendChild(linea);
    linea = dibujarLinea(chartStartY, chartEndX, chartEndY+ ((gridX-1)*100) ,chartEndX, mainColor ); svgLinea.appendChild(linea);
    var texto = dibujarTexto("0", 90, chartEndX, "middle", 12, mainColor); svgLinea.appendChild(texto);
    texto = dibujarTexto(labelY, chartStartX+20, 150, "middle", 12, mainColor, "" ,"" ,"bold"); texto.style.writingMode = "tb";
    texto.style.glyphOrientationVertical = 0;svgLinea.appendChild(texto);
    texto = dibujarTexto(labelX, 400, 310, "middle", 12, mainColor, "" ,"" ,"bold");svgLinea.appendChild(texto);
    //Dibujar
    var x = 20;
    var y = 180;
    //lineas x
    for (var i = 0; i < 5; i++)
	{
		linea = dibujarLinea(130, x, 130 + ((gridX-1)*100),x, "#d3d3d3" ); svgLinea.appendChild(linea);
        texto = dibujarTexto(Math.round(maxval - (i * (maxval/5))), 80, x+5, "right", 12, mainColor); svgLinea.appendChild(texto);
        x += 50;
	}
    var y = 180;
    //lineas y
    for (var i = 0; i < gridX-1; i++)
	{
        linea = dibujarLinea(y, 20, y,275, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
        linea = dibujarLinea(y, 20, y,275, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
	}
    var y = 230;
    //datos y
    for (var i = 0; i < gridX; i++)
	{
        if (datosY[i] != null)//solo dibuja el texto si contiene datos
            texto = dibujarTexto(datosX[i], y-100, 290, "middle", 12, mainColor); svgLinea.appendChild(texto);
        y += 100;
	}
    //crear lineas de datos y circulos
    x = 130;
    y = 270;
    var x1 = 0, y1 = 0, x2= 0, y2=0;
    var fill = "", circles = [];
    for (var i = 0; i < datosY.length; i++)//genera arrglo de datos
	{	
        x1 = x + (i * 100);
        y1 = y - ((datosY[i] / maxval)*250);
        fill += " L"+x1+","+y1;
        circles.push({x1, y1});
	}
    var graph = crearSVG("path", {d: "M130,270 " + fill + " L"+ circles[datosY.length-1].x1 + ",270", fill: "rgba(203, 94, 94, 0.53)", stroke:"#5e91c6", strokewidth:"2px"});
    svgLinea.appendChild(graph);
    for (var i = 0; i < datosY.length; i++)
    {	
        var circulo = dibujarCirculo(circles[i].x1, circles[i].y1, "#0e96eb", "#bcd0e2"); svgLinea.appendChild(circulo);
        texto = dibujarTexto("Hour: " + datosX[i] + ", Calls: " + datosY[i], circles[i].x1, circles[i].y1-15, "right", 8, "#114a7e");
        var rectangulo = dibujarRectangulo(texto.getAttribute("x")-10, texto.getAttribute("y")-18, 170, 25, mainColor, "rgba(203, 94, 94, 0.53", 0, 0);
        texto.style.display = "none";
        rectangulo.style.display = "none";
        svgLinea.appendChild(rectangulo);
        svgLinea.appendChild(texto);
        dibujos.push({circulo, rectangulo, texto});
	}
    //desplegar las etiquetas al pasar el raton
    for (var i = 0; i < dibujos.length; i++)
    {
        svgLinea.appendChild(dibujos[i].rectangulo);
        svgLinea.appendChild(dibujos[i].texto);
        tooltip(dibujos[i].circulo, dibujos[i].rectangulo, dibujos[i].texto);
    }
    //if (average > 0) {linea = dibujarLinea(130, x, 130 + ((gridX-1)*100),x, "#d3d3d3" ); svgLinea.appendChild(linea);}
        
        
    
}
function points(element, datosY, datosX, maxval, labelY, labelX, gridX, average)
{
    //var maxval = Math.max.apply(Math, datos);
    var svgLinea = document.getElementById(element), dibujos = [];
    while (svgLinea.firstChild) {
        svgLinea.removeChild(svgLinea.firstChild);
    }
    var chartStartX= 20;
    var chartEndX= 270;
    var chartStartY= 130;
    var chartEndY= 130;
    //crear grid
    var linea = dibujarLinea(chartStartY, chartStartX, chartEndY,chartEndX, mainColor ); svgLinea.appendChild(linea);
    linea = dibujarLinea(chartStartY, chartEndX, chartEndY+ ((gridX-1)*100) ,chartEndX, mainColor ); svgLinea.appendChild(linea);
    var texto = dibujarTexto("0", 90, chartEndX, "middle", 12, mainColor); svgLinea.appendChild(texto);
    texto = dibujarTexto(labelY, chartStartX+20, 150, "middle", 12, mainColor, "" ,"" ,"bold"); texto.style.writingMode = "tb";
    texto.style.glyphOrientationVertical = 0;svgLinea.appendChild(texto);
    texto = dibujarTexto(labelX, 400, 320, "middle", 12, mainColor, "" ,"" ,"bold");svgLinea.appendChild(texto);
    //Dibujar
    var x = 20;
    var y = 180;
    //lineas x
    for (var i = 0; i < 5; i++)
	{
		linea = dibujarLinea(130, x, 130 + ((gridX-1)*100),x, "#d3d3d3" ); svgLinea.appendChild(linea);
        texto = dibujarTexto(Math.round(maxval - (i * (maxval/5))), 80, x+5, "right", 12, mainColor); svgLinea.appendChild(texto);
        x += 50;
	}
    var y = 180;
    //lineas y
    for (var i = 0; i < gridX-1; i++)
	{
        linea = dibujarLinea(y, 20, y,270, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
        linea = dibujarLinea(y, 20, y,270, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
	}
    var y = 230;
    //datos y
    for (var i = 0; i < datosX.length; i+=6)
	{
        if (datosX[i] != null)//solo dibuja el texto si contiene datos
            texto = dibujarTexto(datosX[i], y-100, 290, "middle", 12, mainColor); svgLinea.appendChild(texto);
        y += 100;
	}
    //crear lineas de datos y circulos
    x = 130;
    y = 270;
    var x1 = 0, y1 = 0, x2= 0, y2=0;
    var fill = "", circles = [];
    for (var i = 0; i < datosY.length; i++)//genera arrglo de datos
	{	
        x1 = x + (i * (100/6));
        y1 = y - ((datosY[i] / maxval)*250);
        fill += " L"+x1+","+y1;
        circles.push({x1, y1});
	}
    if (datosY.length > 0)
    {
        var graph = crearSVG("path", {d: "M130,270 " + fill + " L"+ circles[datosY.length-1].x1 + ",270", fill: "rgba(203, 94, 94, 0.68)", stroke:mainColor, strokewidth:"2px"});
        svgLinea.appendChild(graph);
        for (var i = 0; i < datosY.length; i++)
        {	
            var circulo = dibujarCirculo(circles[i].x1, circles[i].y1, "rgba(14, 150, 235, 0)", "rgba(188, 208, 226, 0)"); svgLinea.appendChild(circulo);
            texto = dibujarTexto("Hour: " + datosX[i] + ", Calls: " + datosY[i], circles[i].x1, circles[i].y1-15, "right", 8, "#114a7e");
            var rectangulo = dibujarRectangulo(texto.getAttribute("x")-10, texto.getAttribute("y")-18, 170, 25, mainColor, "rgba(203, 94, 94, 0.69)", 0, 0);
            texto.style.display = "none";
            rectangulo.style.display = "none";
            svgLinea.appendChild(rectangulo);
            svgLinea.appendChild(texto);
            dibujos.push({circulo, rectangulo, texto});
        }
        //desplegar las etiquetas al pasar el raton
        for (var i = 0; i < dibujos.length; i++)
        {
            svgLinea.appendChild(dibujos[i].rectangulo);
            svgLinea.appendChild(dibujos[i].texto);
            tooltip(dibujos[i].circulo, dibujos[i].rectangulo, dibujos[i].texto);
        }
        //if (average > 0) {linea = dibujarLinea(130, x, 130 + ((gridX-1)*100),x, "#d3d3d3" ); svgLinea.appendChild(linea);}
    }
}
function linear(element, datosY, datosX, maxval, labelY, labelX, gridX, average, labelYComplement)
{
    //var maxval = Math.max.apply(Math, datos);
    var svgLinea = document.getElementById(element), dibujos = [];
    while (svgLinea.firstChild) {
        svgLinea.removeChild(svgLinea.firstChild);
    }
    var chartStartX= 20;
    var chartEndX= 270;
    var chartStartY= 130;
    var chartEndY= 130;
    //crear grid
    var linea = dibujarLinea(chartStartY, chartStartX, chartEndY,chartEndX, mainColor ); svgLinea.appendChild(linea);
    linea = dibujarLinea(chartStartY, chartEndX, chartEndY+ ((gridX-1)*100) ,chartEndX, mainColor ); svgLinea.appendChild(linea);
    var texto = dibujarTexto("0" + labelYComplement, 100, chartEndX, "middle", 12, mainColor); svgLinea.appendChild(texto);
    texto = dibujarTexto(labelY, chartStartX+20, 150, "middle", 12, mainColor, "" ,"" ,"bold"); texto.style.writingMode = "tb";
    texto.style.glyphOrientationVertical = 0;svgLinea.appendChild(texto);
    texto = dibujarTexto(labelX, 400, 310, "middle", 12, mainColor, "" ,"" ,"bold");svgLinea.appendChild(texto);
    //Dibujar
    var x = 20;
    var y = 180;
    //lineas x
    for (var i = 0; i < 5; i++)
	{
		linea = dibujarLinea(130, x, 130 + ((gridX-1)*100),x, "#d3d3d3" ); svgLinea.appendChild(linea);
        texto = dibujarTexto(Math.round(maxval - (i * (maxval/5))) + labelYComplement, 80, x+5, "right", 12, mainColor); svgLinea.appendChild(texto);
        x += 50;
	}
    var y = 180;
    //lineas y
    for (var i = 0; i < gridX-1; i++)
	{
        linea = dibujarLinea(y, 20, y,275, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
        linea = dibujarLinea(y, 20, y,275, "#d3d3d3" ); svgLinea.appendChild(linea);
        y += 50;
	}
    var y = 230;
    //Etiquetas x
    for (var i = 0; i < datosX.length; i++)
	{
        if (datosX[i] != null)//solo dibuja el texto si contiene datos
            texto = dibujarTexto(datosX[i].substring(0,3), y-100, 290, "middle", 12, mainColor); svgLinea.appendChild(texto);
        y += 100;
	}
    //crear lineas de datos y circulos
    x = 130;
    y = 270;
    var x1 = 0, y1 = 0, x2= 0, y2=0;
    var fill = "", circles = [];
    for (var i = 0; i < datosY.length; i++)//genera arreglo de datos
	{	
        x1 = x + (i * 100);
        y1 = y - ((datosY[i] / maxval)*250);
        fill += " L"+x1+","+y1;
        circles.push({x1, y1});
	}
    var graph = crearSVG("path", {d: "M130,270 " + fill + " L"+ circles[datosY.length-1].x1 + ",270", fill: "rgba(203, 94, 94, 0.53)", stroke:"#5e91c6", strokewidth:"2px"});
    svgLinea.appendChild(graph);
    for (var i = 0; i < datosY.length; i++)
    {	
        var circulo = dibujarCirculo(circles[i].x1, circles[i].y1, mainColor, "#bcd0e2"); svgLinea.appendChild(circulo);
        texto = dibujarTexto("Day: " + datosX[i] + ", Minutes: " + datosY[i], circles[i].x1, circles[i].y1-15, "right", 8, "#114a7e");
        var rectangulo = dibujarRectangulo(texto.getAttribute("x")-10, texto.getAttribute("y")-18, 170, 25, mainColor, "rgba(203, 94, 94, 0.53", 0, 0);
        texto.style.display = "none";
        rectangulo.style.display = "none";
        svgLinea.appendChild(rectangulo);
        svgLinea.appendChild(texto);
        dibujos.push({circulo, rectangulo, texto});
	}
    //desplegar las etiquetas al pasar el raton
    for (var i = 0; i < dibujos.length; i++)
    {
        svgLinea.appendChild(dibujos[i].rectangulo);
        svgLinea.appendChild(dibujos[i].texto);
        tooltip(dibujos[i].circulo, dibujos[i].rectangulo, dibujos[i].texto);
    }
    x=130;
    if (average > 0) {linea = dibujarLinea(x, 270 - ((average/2) * 50), 730, 270 - ((average/2)*50), "#5d1a1a" ); svgLinea.appendChild(linea);}
        
        
    
}
function tooltip(trigger, display, display2)
{
    trigger.onmouseover = (function(){
            display.style.display = "inline";
            display2.style.display = "inline";
        });
    trigger.onmouseout = (function(){
            display.style.display = "none";
            display2.style.display = "none";
        });
}
//dibujar el pie
function crearSVG(grafico, atributos) { //Recibe el tipo de grafico que se requiere y los atributos para crearlo
    var svg = document.createElementNS('http://www.w3.org/2000/svg', grafico); // se crea la figura
    for (var k in atributos)
        if (atributos.hasOwnProperty(k)) svg.setAttribute(k, atributos[k]);
    return svg;
}
//Dibujar Linea
function dibujarLinea(x1, y1, x2, y2, color)
{
	//crear linea
	var linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	//punto inicial
	linea.setAttribute('x1', x1); linea.setAttribute('y1', y1); 
	//punto final
	linea.setAttribute('x2', x2); linea.setAttribute('y2', y2);
	//estilo linea
	linea.style.stroke = color; //color de linea
	linea.style.strokeWidth = '1px'; //grosor de la linea
	//regresar linea
	return linea;
}
//Dibujar Rectángulo
function dibujarRectangulo(x, y, alto, ancho, colorLinea, colorRelleno, rx, ry)
{
	//crear rectángulo
	var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	//punto inicial
	rect.setAttribute('x', x); rect.setAttribute('y', y); 
    rect.setAttribute('rx', rx);rect.setAttribute('ry', ry);
	//ancho y alto
	rect.setAttribute('height', ancho); rect.setAttribute('width', alto);
	//estilo rectangulo
	rect.style.stroke = colorLinea; //color de linea
	rect.style.strokeWidth = '1px'; //grosor de la linea
	rect.style.fill = colorRelleno; //relleno
	//regresar rectángulo
	return rect;
}
//Dibujar Circulo
function dibujarCirculo(cx, cy, stroke, fill)
{
	//crear circulo
	var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	//centro
	c.setAttribute('cx', cx); c.setAttribute('cy', cy); 
	//radio
	c.setAttribute('r', 5); 
	//estilo del circulo
	c.style.stroke = stroke; //color de linea
	c.style.strokeWidth = '2px'; //grosor de la linea
	c.style.fill = fill; //color de relleno
	//agregar circulo a svg
	return c;
}
// Dibujar Texto
function dibujarTexto(texto, x, y, ancla, tamano, color, borde, anchoborde, weight)
{
	//crear texto
	var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	//texto
	t.innerHTML = texto;
	//posición
	t.setAttribute('x', x); t.setAttribute('y', y);
	//alineacion
	t.setAttribute('text-anchor', ancla);
	//font
	t.setAttribute('font-family', 'Verdana');
	t.setAttribute('font-size', tamano + 'pt');
    t.setAttribute("font-weight", weight)
	//color
	t.style.fill = color;
    t.style.stroke = borde;
    //t.setAttribute("id", "textSVG");
    t.style.strokeWidth = anchoborde;
	//regresar texto
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
	p.style.stroke = '#822'; //color de linea
	p.style.strokeWidth = '1px'; //grosor de la linea
	p.style.fill = '#A55'; //color de relleno
	//agregar poligono a svg
	s.appendChild(p);
}
