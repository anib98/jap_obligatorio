const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
var CurrentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//Función que filtra según un criterio
//(Por nombre- Ascendente y descendente, por cantidad de vendidos)
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

//Función que muestra la lista de productos, recorriendo la lista del JSON (procesado más abajo),
//luego hace append del resultado en el HTML (products.html) en el div correspondiente
function showProductList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < CurrentProductArray.length; i++){
        let product = CurrentProductArray[i];

        //Undefined es el valo inicial, en ese caso siempre entra en el if
        //pero si se agregó valor en la parte de min o max count, toma eso como valor y lo compara al Sold Count (parseInt)
        //Si el SoldCount entra en el rango entonces entre en el if 
        //Más abajo se define el parseInt
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))){
            
            //Crea el contenido para el append del HTML
            //Selecciona Imagen, Descripción
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.cost + ` ` + product.currency + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

// Hace que si hay un criterio de filtro seleccionado se muestre la lista con ese filtro aplicado
//Asocia a la función ya definida más arriba (sortProducts) a la nueva función sortAndShowProducts 
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        CurrentProductArray = productsArray;
    }

    CurrentProductArray = sortProducts(currentSortCriteria, CurrentProductArray);

    //Llama a la función showProductList
    showProductList();
}

//Esto se ejecuta una vez que el documento se encuentra cargado y funcionando.
//PRODUCTS_URL está definido en init.js
//Se asocian las funciones con los eventos clicks para que se ejecuten los filtros
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        //Llama a la función showProductList
        showProductList();
    });

    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría, Y asocio la función al HTML
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        
        //Llama a la función showProductList
        showProductList();
    });
});