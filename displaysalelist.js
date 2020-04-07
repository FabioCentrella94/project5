// check if there is Internet Connection:
if (navigator.onLine) {

  // fetch data from the server and then for every product create figure containing image and name and append it to the carousel slide:
  const promise = new Promise((resolve, reject) => {
    let apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
    apiRequest.send();
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
        resolve(JSON.parse(apiRequest.response));
        } else {
          reject(apiRequest.response)
        }
      }
    }
  })
  promise.then((response) => {
    for (i = 0; i < response.length; i++) { 
      let carouselItem = document.createElement('div');
      if (i === 0) {
        carouselItem.className = 'carousel-item active';
      } else {
        carouselItem.className = 'carousel-item';
      }
      let carouselSlide = document.getElementById('carouselslide');
      carouselSlide.appendChild(carouselItem);
      let carouselItemName = document.createElement('h2');
      carouselItemName.textContent = response[i].name;
      carouselItemName.className = 'mb-3 my-3 my-md-5';
      carouselItem.appendChild(carouselItemName);
      let carouselItemLink = document.createElement('a');
      carouselItemLink.href = 'singleitem.html' + '?' + response[i]._id;
      carouselItem.appendChild(carouselItemLink);
      let carouselItemImage = document.createElement('img');
      carouselItemImage.className = 'border border-secondary';
      carouselItemImage.src = response[i].imageUrl;
      carouselItemLink.appendChild(carouselItemImage);   
    } 
    // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart: 
    if (localStorage.getItem("totalitemincart") === null) {
      let displayTotalItemInCart = document.getElementById('displaytotalitem');
      displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
    } else {
      document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
    }
  }).catch((error) => {
    let salelist = document.getElementById('salelist');
    salelist.className = 'm-auto overflow-auto p-5 text-center';
    salelist.innerHTML = error; 
  });
} else {
  window.document.addEventListener('DOMContentLoaded', () => {
    let salelist = document.getElementById('salelist');
    salelist.className = 'p-5 text-center';
    salelist.innerHTML = 'No Connection';
  })
};



     
  

