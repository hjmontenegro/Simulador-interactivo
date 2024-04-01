/*
Programa para calcular un préstamo personal, cálculo de cuotas mensuales
y detalle de los mismos.
tambiense van a pedir, monto entre valores. Cantidad de cuotas.
*/

function calcularPorcentajeMensual(pCuotas){
    //6 y 9 - 123% y 12 - 141%
    if(pCuotas === 6 || pCuotas === 9)
        return 123;
    else if(pCuotas === 12)
        return 141;
}

function ValidarDatos(pMonto, pCuotas){
    let mensajeError = "";
    if (!(pMonto >= 50000 && pMonto <= 1000000))
        mensajeError += "\n* - Verificar Monto ya que esta fuera del rango pedido.";

    if(pCuotas != 3 && pCuotas != 6 && pCuotas != 9 && pCuotas != 12)
        mensajeError += "\n* - Cuotas Fuera del rango pedido.";

    return mensajeError;
}

function menu() {
    let opcion;
    let salida = false;
    let monto = 0;
    let total = 0;

    let mensajeMonto = "Calculo de cuotas para prestamo \
                \n1 - Ingrese monto entre $50.000 y $1.000.000";
    
    let mensajeCuotas = "Calculo de cuotas para prestamo \
                \n2 - Ingrese Cantidad de cuotas, 6, 9 o 12";

    do {
        monto = Number(prompt(mensajeMonto));

        cuotas = Number(prompt(mensajeCuotas));

        let resultadoValidacion = ValidarDatos(monto, cuotas);
        if (resultadoValidacion != "")
        {
            let resultado = prompt("Error/es:\n" + resultadoValidacion + "\n\n1 - para volver a calcular.\n0 - para Salir.");
            
            salida = false;

            if(resultado == 1)
                salida = true;
        }
        else
        {
            let mensajeSalida = "El resultado del prestamo pedido es: \n\n";
            let valorMensual = monto / cuotas;
            let porcentajeMensaual = calcularPorcentajeMensual(cuotas);
            
            const cuota = (monto + (monto * (porcentajeMensaual * 0.01))) / cuotas; 
            
            var fecha = new Date();
            var fechaN = new Date(fecha.setMonth(fecha.getMonth() + 1));

            mensajeSalida   += "\nEl prestamo de " + cuotas + " cuotas, tiene una cuota promedio de $" + cuota.toString().replace(".",",") + ".-";

            let resultadoFinal  = prompt(mensajeSalida +  "\n\n1 - para volver a calcular.\n0 - para Salir.");

            salida = false;

            if(resultadoFinal == 1)
                salida = true;

        }

    } while (salida)
}

menu();