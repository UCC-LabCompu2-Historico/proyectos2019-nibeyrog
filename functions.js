//Se dibujara un grafico que establece la relacion entre el cromosoma 9 y el 22, del tipo chord diagram simple
function dibujarGrafico () {
    var canvas = document.getElementById("graficoLMC");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;

//Dibujo del circulo en canvas
    ctx.fillStyle = "#000";
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    drawNumbers(ctx, radius);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2-35, 0, 2 * Math.PI);
    ctx.fill();
    drawLine(ctx);
    ctx.closePath();

}

//Dibujo de la linea que conecta los cromosomas
function drawLine (ctx) {
    ctx.resetTransform();
    ctx.moveTo(70,45);
    ctx.lineTo(145,145);
    ctx.stroke();
}

//Posicionamiento de los cromosomas alrededor del circulo
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    var numLabel;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 25; num++){
        ang = num * Math.PI / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        if (num === 23) {
            numLabel = "x";
            ctx.fillText(numLabel, 0, 0);
        }
        else if (num === 24) {
            numLabel = "y";
            ctx.fillText(numLabel, 0, 0);
        } else {
            ctx.fillText(num.toString(), 0, 0);
        }

        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

/**
 * Descripción
 * @method calcularRespuesta
 * @param meses
 * @param metafasesAnalizadas
 * @param metafasesPh
 * @return respuestaC
 * @return respuestaT
 */
function calcularRespuesta () {

    var meses = document.getElementById("meses").value;
    var metafasesAnalizadas = document.getElementById("metafasesAnalizadas").value;
    var metafasesPh = document.getElementById("metafasesPh").value;
    var porcentajePh;
    var respuestaC;
    var respuestaT;

    //Se mostrara un mensaje de alerta, ya que las metafases Ph+ no pueden superar las metafases totales, ademas se sale de la funcion y se blanquean los campos
    if (metafasesAnalizadas<metafasesPh) {
        alert("Los datos ingresados son incorrectos, el total de metafases analizadas debe ser mayor a la cantidad de metafases Ph+");
        document.getElementById("metafasesAnalizadas").value = " ";
        document.getElementById("metafasesPh").value = " ";
        return;
    }

    porcentajePh = metafasesPh*100/metafasesAnalizadas;

    //En base a los porcentajes de metafases Ph+ se calcula la respuesta citogenetica
    if (porcentajePh == 0) {
        respuestaC = "RCCompleta";
    }
    else if (porcentajePh < 36) {
        respuestaC = "RCMayor";
    }
    else if (porcentajePh < 66) {
        respuestaC = "RCMenor";
    }
    else if (porcentajePh < 96) {
        respuestaC = "RCMinima";
    }
    else {
        respuestaC = "RCNula";
    }

    document.getElementById("respuestaCitogenetica").value = respuestaC;

    //En base al porcentaje de metafases Ph+ y los meses que hace que el paciente inicio su tratamiento, se evalua la respuesta global
    if (meses == 3) {
        if (porcentajePh < 36) {
            respuestaT = "Optima";
        }
        else if (porcentajePh > 95) {
            respuestaT = "Falla";
        }
        else {
            respuestaT = "Monitorear";
        }
    }
    else if (meses == 6) {
        if (porcentajePh == 0) {
            respuestaT = "Optima";
        }
        else if (porcentajePh > 35) {
            respuestaT = "Falla";
        }
        else {
            respuestaT = "Monitorear";
        }
    }
    else {
        if (porcentajePh > 0) {
            respuestaT = "Falla";
        }
        else {
            respuestaT = "Optima";
        }
    }

    document.getElementById("respuestaTratamiento").value = respuestaT;
}

//Se mostrara un cartel de alerta cuando la cantidad de metafases sea menor que la recomendada, pero se calcularan de todos modos las respuestas
function alertaMetafases () {

    var metafasesAnalizadas = document.getElementById("metafasesAnalizadas").value;

    if (metafasesAnalizadas<20) {
        alert("La cantidad de metafases recomendada es mayor igual a 20, es posible que el resultado no sea representativo");
    }

}