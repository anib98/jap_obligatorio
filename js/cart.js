const _DOLAR_TO_PESOS = 40;
let cartInfo = { articles: [] };

//Acá defino todas las funciones que se encargan de hacer calculos

//Calcula el precio unitario en una sola moneda (transforma UYU a USD)
//necesita el producto y en qué moneda está 
//y devuelve el precio del producto en base a la cantidad seleccionada
function getProductPrice(cartProduct, selectedCurrency) {
    let costoUnitario = cartProduct.unitCost;
    if (cartProduct.currency !== selectedCurrency) {
        costoUnitario = cartProduct.unitCost / _DOLAR_TO_PESOS;
    }
    return costoUnitario * cartProduct.count;
}
//corre la funcion getProductPrice y obtiene el subtotal de cuántos productos se ingresen en el carrito
//y asigna ese valor al subTotal
function calculateSubTotal(cartList){
    const selectedCurrency = "USD";
    let subTotal = 0;
    for (let cartProduct of cartList) {
        subTotal += getProductPrice(cartProduct, selectedCurrency)
    }
    return subTotal;
};
//asigna calculos a las constantes para obtener subtotal, total y precio de envío
//y devuelve los resultados individualmente
//necesita el tipo de envío seleccionado por el usuario
function calculatePrices(shippingFactor) {
    const subtotal = Math.trunc(calculateSubTotal(cartInfo.articles));
    const shippingPrice = Math.trunc(subtotal * shippingFactor);
    const total = subtotal + shippingPrice;

    return {
        subtotal,
        shippingPrice,
        total
    }
}
//iguala el shipping factor con el resultado de la función getShippinMethod()
//que obtiene el factor basado en la eleccion del ususario en el HTML
//Luego crea una nueva constante "prices" que obtiene el resultado de calculatePrices
//con el nuevo shipping method
//finalmente corre showCartPrices con el parámetro prices que equivale a
//subTotal, shippingPrice, total con los nuevos valores
function updateShippingmethod(){
    const shippingFactor = getShippinMethod();
    const prices = calculatePrices(shippingFactor);
    showCartPrices(prices);
}

//Acá defino todas las funciones que se encargan de casos de uso

//actualiza el precio cuando se cambia el valor del input cantidad
function onUpdateQuantity(evt, prodctName) {
    const product = cartInfo.articles.find(product => product.name === prodctName);
    product.count = parseInt(evt.target.value);
    updateShippingmethod();
}
//actualiza el shipping method cuando se cambia la opción corriendo la función updateShippingmethod()
function onUpdateShippingMethod(evt){
    updateShippingmethod();
}
//elimina el producto del carrito al presionar la X
function onRemove( prodctName) {
    const productIndex = cartInfo.articles.findIndex(product => product.name === prodctName);
    cartInfo.articles.splice(productIndex, 1);
    
    updateShippingmethod();
    showCart(cartInfo.articles);
}

//Acá defino todas las funciones que se encargan del manejo del DOM

//Obtiene el shipping method seleccionado por el usuario en el HTML
function getShippinMethod() {
    let select = document.getElementById("shipping");
    let shippingMethod = select.options[select.selectedIndex].value;
    let shippingFactor = 0.05;

    if (shippingMethod === "premium"){
        shippingFactor = 0.15;
    }
    else if (shippingMethod === "express"){
        shippingFactor = 0.07;
    }
    else if (shippingMethod === "standard"){
        shippingFactor = 0.05;
    }
    return shippingFactor;
}
//Define la forma que tendrá el contenido en el HTML con los datos obtenidos ingresados y donde se encontrará
function showCart(cartList) {
	let htmlContentToAppend = "";
	for (let cartProduct of cartList) {
      
        //https://bbbootstrap.com/snippets/bootstrap-ecommerce-shopping-cart-item-summary-44021562
		htmlContentToAppend += `
            <div class="row main align-items-center">
                <div class="col-2"><img class="img-fluid" src="${cartProduct.src}"></div>
                <div class="col">
                    <div class="row">${cartProduct.name}</div>
                </div>
                <div class="col">
                    <input placeholder="${cartProduct.count}" id="cantidad" onchange="onUpdateQuantity(event, '${cartProduct.name}')" type="number" step="1" min="1" name="quantity" class="input-text qty text" size="1">
                </div>
                <div class="col">${cartProduct.currency}${cartProduct.unitCost} <span class="product-removal"> <button type="button" class="btn btn-secondary"onclick="onRemove('${cartProduct.name}')">
                &#10005;</button></span></div>
            </div>
        `;		
	}
    document.getElementById("cart").innerHTML = htmlContentToAppend;
}
//Ingresa las constantes definidas previamente a partes del HTML
function showCartPrices({subtotal = 0, shippingPrice = 0, total = 0}) {
    document.getElementById("shippingPrice").innerHTML = shippingPrice + `USD`
    document.getElementById("subtotal").innerHTML = subtotal + `USD`
    document.getElementById("total").innerHTML = total + `USD`
};

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado
//Y corre las funciones para mostrar el cart y cambair el shipping method
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(CART_INFO_URL_2).then(function (resultObj) {
		if (resultObj.status === "ok") {
			cartInfo = resultObj.data;
			
            showCart(cartInfo.articles);
            updateShippingmethod();
		}
	});
});

//boostrap
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
    })

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado
//Y agrega el mensaje de pago completado a un modal en el HTML   
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            paymentSuccess = resultObj.data;
        }
    document.getElementById("pagoCompletado").innerHTML = paymentSuccess.msg;
    });
});
