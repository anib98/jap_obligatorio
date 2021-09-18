var product = {};
var productInfo = [];
let comment = [];
let newCommentInfo = {};

//Esta función recibe y recorre un array y agrega en el HTML (en el ID productImagesGallery) imágenes 
function showImagesGallery(array) {
	let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		htmlContentToAppend +=
			`
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
			imageSrc +
			`" alt="">
            </div>
        </div>
        `;

		document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
	}
}

//Esta función recibe y recorre un array y agrega en el HTML (en el ID relatedProducts) imagen, nombre y descripción
function productRel(array) {
	let htmlContentToAppend = "";

	for (let dato of array) {
		//product está definido ...
		let relatedProductsIndex = product[dato];

		// `lo que esté acá adentro es un literal template ` y eso puede contener placeholders (${expression})
		// el contendio dentro del placeholder pasa como función 
		htmlContentToAppend += `
        <span class="card mr-3" style="width: 18rem; display: inline-block">
  					<img src="${relatedProductsIndex.imgSrc}" class="card-img-top">
  				<div class="card-body">
    				<h5 class="card-title">${relatedProductsIndex.name}</h5>
    				<p class="card-text">${relatedProductsIndex.description}</p>
  				</div>
  				<div class="card-body">
    				<a href="#" class="card-link">Ver Producto</a>
  				</div>
			</span>
    `;
	}
	document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

// Este Listener funciona una vez que carga el HTML
document.addEventListener("DOMContentLoaded", function (e) {
	//Obtengo la información JSON del URL definido en init.js y entro al if si no hubieron errores
	getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			productInfo = resultObj.data;

			//Aquí asocio una variable con un lugar del HTML por su id
			let productNameHTML = document.getElementById("productName");
			let productPriceHTML = document.getElementById("productPrice");
			let productCategoryHTML = document.getElementById("productCategory");
			let productDescriptionHTML =
				document.getElementById("productDescription");
			let productCountHTML = document.getElementById("soldCount");

			//Aquí asocio una parte específica de productInfo con el innerHTML de 
			//las variables definidas anteriormente
			productNameHTML.innerHTML = productInfo.name;
			productPriceHTML.innerHTML = productInfo.cost + productInfo.currency;
			productCategoryHTML.innerHTML = productInfo.category;
			productDescriptionHTML.innerHTML = productInfo.description;
			productCountHTML.innerHTML = productInfo.soldCount;

			//Muestro las imagenes en forma de galería usando la función definida en la línea 49
			//(showImagesGallery). Toma todas la imágenes que se encuentran en productInfo)
			showImagesGallery(productInfo.images);
		}

		//Obtengo la información JSON del URL definido en init.js y entro al if si no hubieron errores
		getJSONData(PRODUCTS_URL).then(function (resultObj) {
			if (resultObj.status === "ok") {
				product = resultObj.data;
			}
			//Aquí corro la función productRel (definida anteriormente, linea 27)
			// y le paso los parámetros obtenidos con el JSON
			//productInfo (definido anteriormente, linea 86) y relatedProducts
			productRel(productInfo.relatedProducts);
		});
	});
});
//Esta función recibe y recorre un array y agrega en el HTML (en el ID comments)
//user, score, descripción, día y hora
function showComments(comments) {
	
	let htmlContentToAppend = "";
	
	for (let item of comments) {
		
		htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h6 class="font-weight-bold margin-score">${item.user} ${showScore(item.score)} </h6>
                        <p>${item.description}</p>
                    </div>
                    <small class="text-muted">${item.dateTime}</small>
                </div>
            </div>
        </div>
    	</div>
        `;
		document.getElementById("comments").innerHTML = htmlContentToAppend;
	}
}
//Obtengo la información JSON del URL definido en init.js y entro al if si no hubieron errores
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
	if (resultObj.status === "ok") {
		comment = resultObj.data;
	}
	showComments(comment);
});


//Esta función toma el score del JSON de cada comentario y asocia ese numero a un display
//y así se ve la puntuación asociada al comentario en forma de estrellas
function showScore(score) {
	let stars = "";

	for (let i = 1; i <=5; i++) {
		if (i<=score){
		stars += `<i class="fas fa-star"></i>`;	
		}
		else {
			stars += `<i class="far fa-star"></i>`;
		}
	}
	return stars
}

//DESAFÍATE

//La variable today tendrá la fecha y hora actual con el formato deseado
var today = new Date();
var date = today.getFullYear()+'-'+ (today.getMonth()+1)+'-'+ today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById("currentDayTime").innerHTML = date + ' ' + time

//Esta función agrega un nuevo comentario al resultado del getJSONData(PRODUCT_INFO_COMMENTS_URL)
//con los parámetros que suele tener (usuarios, descripción, puntuación, fecha y hora)
//y los devuelve como un comenario más, solo que al actualizar se elimina
//es decir que no se hace el push en el JSON mismo
function showNewComment(){

	let newCommentScore = document.getElementById("newScore").textContent ;
	let newCommentDescription = document.getElementById("description").value ;
	let newCommentUser = localStorage.getItem("user") ;
	let newCommentTime = document.getElementById("currentDayTime").textContent;
	
	let newCommentInfo = {
		"score": newCommentScore,
		"description": newCommentDescription,
		"user": newCommentUser,
		"dateTime": newCommentTime	
	};

	comment.push(newCommentInfo);
	showComments(comment);
	document.getElementById("description").value = "";	
};