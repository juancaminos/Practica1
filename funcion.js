var item, tile, author, publisher, bookLink, bookImg;
var outputList = document.getElementById("list-output");
var placeHldr = '<img src="https://via.placeholder.com/150">';
var url = "https://www.googleapis.com/books/v1/volumes?q=";

function cargar(){

	outputList.innerHTML = null;

	var searchBook = document.getElementById("search-box").value;

	//Si no se ha introducido un libro, sale una alerta
	if(searchBook === "" || searchBook === null) {
       displayError();
       return 0;
     }

	fetch(url+searchBook,{
		method: "GET",
		mode: "cors"
	})
	.then(function(res) {
	  return res.json();
	})
	.then(function(result) {
	  displayResults(result);
	  return 0;
	})
	.catch(error =>  {
	  showError(error);
	});
}

//extraemos la informacion de los resultados
function displayResults(response) {
    for (var i = 0; i < response.items.length; i+=2) {
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publisher1 = item.volumeInfo.publisher;
        bookLink1 = item.volumeInfo.previewLink;
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;

        item2 = response.items[i+1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        publisher2 = item2.volumeInfo.publisher;
        bookLink2 = item2.volumeInfo.previewLink;
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;

        //insertamos los libros en el espacio que hemos dejado libre
        outputList.innerHTML += '<div class="row mt-4">' +
                                formatOutput(bookImg1, title1, author1, publisher1, bookLink1) +
                                formatOutput(bookImg2, title2, author2, publisher2, bookLink2) +
                                '</div>';

        console.log(outputList);
    }
}

//constructor de formato de salida
function formatOutput(bookImg, title, author, publisher, bookLink) {

     var htmlCard = `<div class="col-lg-6">
       <div class="card" style="">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Autor: ${author}</p>
               <p class="card-text">Editorial: ${publisher}</p>
             </div>
           </div>
         </div>
       </div>
     </div>`
     return htmlCard;
}

//muestra el error por consola
function showError(err) { 
  console.log('muestor error', err);
}

//mensaje de error
function displayError() {
    alert("No ha introducido un libro");
}

