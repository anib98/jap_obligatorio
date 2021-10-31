const ORDER_ASC_BY_PRICE = "MenorPrecio";
const ORDER_DESC_BY_PRICE = "MayorPrecio";
const ORDER_BY_SOLD_COUNT = "Relevancia";
var CurrentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//Función que filtra según un criterio
//(Por precio- Ascendente y descendente, por cantidad de vendidos)
function sortProducts(criteria, array) {
	let result = [];
	if (criteria === ORDER_ASC_BY_PRICE) {
		result = array.sort(function (a, b) {
			if (a.cost < b.cost) {
				return -1;
			}
			if (a.cost > b.cost) {
				return 1;
			}
			return 0;
		});
	} else if (criteria === ORDER_DESC_BY_PRICE) {
		result = array.sort(function (a, b) {
			if (a.cost > b.cost) {
				return -1;
			}
			if (a.cost < b.cost) {
				return 1;
			}
			return 0;
		});
	} else if (criteria === ORDER_BY_SOLD_COUNT) {
		result = array.sort(function (a, b) {
			let aCount = parseInt(a.soldCount);
			let bCount = parseInt(b.soldCount);

			if (aCount > bCount) {
				return -1;
			}
			if (aCount < bCount) {
				return 1;
			}
			return 0;
		});
	}
	return result;
}

//Función que muestra la lista de productos, recorriendo la lista del JSON (procesado más abajo),
//luego hace append del resultado en el HTML (products.html) en el div correspondiente (id="prod-list-container")
function showProductList() {
	let htmlContentToAppend = "";
	for (let i = 0; i < CurrentProductArray.length; i++) {
		let product = CurrentProductArray[i];

		//Undefined es el valor inicial, en ese caso siempre entra en el if
		//pero si se agregó valor en la parte de min o max count, toma eso como valor y lo compara al cost
		//Si el cost entra en el rango entonces entre en el if
		//Más abajo se define el minCount y maxCount
		if ( (minCount == undefined || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
			(maxCount == undefined || (maxCount != undefined && parseInt(product.cost) <= maxCount)) ) 
			{
			//Crea el contenido para el append del HTML
			//Selecciona Imagen, Descripción, nombre del producto, precio y moneda, cantidad de vendidos
			htmlContentToAppend += `
			<div class="col-md-4">
            	<a href="product-info.html" class="row">
                    <div class="row">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="row">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <small class="text-muted">` + product.cost + ` ` + product.currency + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p> <br>
                        <p class="mb-1">` + product.soldCount + ` artículos vendidos</p>
                    </div>
                </a>
			</div>
            `;
		}

		document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
	}
}

// Hace que si hay un criterio de filtro seleccionado se muestre la lista con ese filtro aplicado
//Asocia a la función ya definida más arriba (sortProducts) a la nueva función sortAndShowProducts
function sortAndShowProducts(sortCriteria, productsArray) {
	currentSortCriteria = sortCriteria;

	if (productsArray != undefined) {
		CurrentProductArray = productsArray;
	}

	CurrentProductArray = sortProducts(currentSortCriteria, CurrentProductArray);

	//Llama a la función showProductList
	showProductList();
}

//Esto se ejecuta una vez que el documento se encuentra cargado y funcionando.
//PRODUCTS_URL está definido en init.js
//Se asocian las funciones con los eventos clicks para que se ejecuten los filtros
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
		}
	});

	document.getElementById("sortAsc").addEventListener("click", function () {
		sortAndShowProducts(ORDER_ASC_BY_PRICE);
	});

	document.getElementById("sortDesc").addEventListener("click", function () {
		sortAndShowProducts(ORDER_DESC_BY_PRICE);
	});

	document.getElementById("sortByCount").addEventListener("click", function () {
		sortAndShowProducts(ORDER_BY_SOLD_COUNT);
	});

	document
		.getElementById("clearRangeFilter")
		.addEventListener("click", function () {
			document.getElementById("rangeFilterCountMin").value = "";
			document.getElementById("rangeFilterCountMax").value = "";

			minCount = undefined;
			maxCount = undefined;

			//Llama a la función showProductList
			showProductList();
		});

	//Obtengo el mínimo y máximo de los intervalos ingresados en el HTML
	//y los asocio a minCount y maxCount, que se utilizan más arriba
	document
		.getElementById("rangeFilterCount")
		.addEventListener("click", function () {
			minCount = document.getElementById("rangeFilterCountMin").value;
			maxCount = document.getElementById("rangeFilterCountMax").value;

			if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
				minCount = parseInt(minCount);
			} else {
				minCount = undefined;
			}

			if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
				maxCount = parseInt(maxCount);
			} else {
				maxCount = undefined;
			}

			//Llama a la función showProductList
			showProductList();
		});

	//Desafíte - Search Bar

	//esta constante se crea mediante el contenido del id prod-list-container, que tiene toda la
	//lista de productos según el filtro de ese momento
	const productList = document.getElementById("prod-list-container");
	//esta constante se crea obteniendo el contenido del input ingresado por el ususario en al search bar
	const searchBar = document.getElementById("search-bar");
	let products = [];

	searchBar.addEventListener("keyup", (e) => {
		//esta constante retorna el valor generado por el evento de soltar la tecla
		//y lo pasa a minúsculas
		const searchString = e.target.value.toLowerCase();

		//esta constante retorna los elmentos de "product" que cumplen
		//con las condiciones espcificadas en la cte searchString
		//y retorna el/los resultado de producto/s que cumpla/n con esa condición
		const filteredProducts = products.filter((product) => {
			return product.name.toLowerCase().includes(searchString);
		});
		displayProducts(filteredProducts);
	});

	//esta constante actúa como una función asincrónica
	//que carga los productos desde el URL asociado a PRODUCTS_URL
	//intentamostrar productos y en caso de no poder, un error
	const loadProducts = async () => {
		try {
			const res = await fetch(PRODUCTS_URL);
			products = await res.json();
			displayProducts(products);
		} catch (err) {
			console.error(err);
		}
	};

	//aquí se inserta en el HTML el contenido obtenido según el filtro aplicado con la Search Bar
	const displayProducts = (products) => {
		const htmlString = products
			.map((product) => {
				return (
				`
				<div class="col-md-4">
				<a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="row">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <small class="text-muted">` + product.cost + ` ` + product.currency + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p> <br>
                        <p class="mb-1">` + product.soldCount + ` artículos vendidos</p>
                    </div>
            	</a>
				</div>
            `
				);
			})
			.join("");
		productList.innerHTML = htmlString;
	};

	loadProducts();
});
