// fetch different data from server based on the query string and displaying the product with image, name, description, price, color personalisation, quantity and button to add it to the cart:
const promise = new Promise((resolve, reject) => {
    let url = window.location.search.replace('?', '');
    let apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'http://localhost:3000/api/teddies/' + url);
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
    let name = document.getElementById('name');
    name.textContent = response.name;
    let image = document.getElementById('image');
    image.src = response.imageUrl;
    let description = document.getElementById('description');
    description.textContent = response.description;
    let price = document.getElementById('price');
    price.textContent = '$' + (response.price / 100).toFixed(2);
        
    let numbers = [1, 2, 3];

    // set an object with different properties equal to the response got from the server:
    let teddy = {
        id: response._id,
        image: response.imageUrl,
        color: response.colors[0],
        quantity: 1,
        price: response.price
    }

    // for each number in the array number create a 'p' element and append them to the dropdown to choose the quantity:
    for (i = 0; i < numbers.length; i++) { 
        let chooseQuantity = document.createElement('p');
        chooseQuantity.textContent = numbers[i];
        let dropdown = document.getElementById('quantity');
        dropdown.appendChild(chooseQuantity);
        chooseQuantity.setAttribute('class', 'quantityoption')                         
    }

    // set the displayed quantity of the dropdown equal to choose the quantity equal to the selected quantity in the dropdown:
    let quantityOption = document.querySelectorAll('.quantityoption');
    for (i = 0; i < quantityOption.length; i++) {
        quantityOption[i].addEventListener('click', ($event) => {
        teddy.quantity = Number($event.target.textContent);
            let quantityDropdown = document.getElementById('quantitybutton');
            quantityDropdown.textContent = $event.target.textContent;                  
        })
    } 

    // for each color in the array colors in the response object create a 'p' element and append them to the dropdown to choose the color:
    for (i = 0; i < response.colors.length; i++) { 
        let colorsOption = document.createElement('p');
        colorsOption.textContent = response.colors[i];
        let dropdown = document.getElementById('color');
        dropdown.appendChild(colorsOption); 
        colorsOption.setAttribute('class', 'choosecolors')                 
    }

    // set the displayed color of the dropdown to choose the color equal to the selected color in the dropdown:
    let chooseColors = document.querySelectorAll('.choosecolors');        
    for (i = 0; i < chooseColors.length; i++) {
        let colorDrop = document.getElementById('colorbutton');
        colorDrop.textContent = response.colors[0];
        chooseColors[i].addEventListener('click', ($event) => {
            teddy.color = $event.target.textContent;
            colorDrop.textContent = $event.target.textContent;
        })
    } 

    // create a figurecaption containing the button add the item to the cart:
    let figCaption = document.getElementById('figcaption'); 
    let linebreak = document.createElement("br");
    document.getElementById('figcaption').appendChild(linebreak);
    let addToCart = document.createElement('button');
    document.getElementById('figcaption').appendChild(addToCart);
    addToCart.textContent = 'Add To Cart';
    addToCart.addEventListener('click', () => {
        totalItemInCart();
        addItemToCart();
        totalCost();
        location.reload();   
    });

      // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart: 
    if (localStorage.getItem("totalitemincart") === null) {
        let displayTotalItemInCart = document.getElementById('displaytotalitem');
        displayTotalItemInCart.textContent = 0;
    } else {
        document.getElementById('displaytotalitem').textContent = localStorage.getItem('totalitemincart');
    }

    // set a key in local showing the total number of item in the cart:
    const totalItemInCart = () => {
        let totalItem = localStorage.getItem('totalitemincart');
        totalItem = parseInt(totalItem);
        if (totalItem) {
            localStorage.setItem('totalitemincart', totalItem + teddy.quantity);
        } else {
            localStorage.setItem('totalitemincart', teddy.quantity);
        }
    }

    // set a key in local storage equal to the Id of the teddy, the value of the key in a object containing the different colors of teddys added to the cart:
    const addItemToCart = () => {
        itemInCart = localStorage.getItem(response._id);
        itemInCart = JSON.parse(itemInCart);
        if (itemInCart !== null ) {
            if (itemInCart[teddy.color] == undefined) {

                // second teddy with same Id but different color was being added twice showing the quantity added times 2, so added the following line to fix that:
                teddy.quantity /= 2;

                itemInCart = {
                    ...itemInCart,
                    [teddy.color] : teddy
                }              
            }

        itemInCart[teddy.color].quantity += teddy.quantity; 

        } else {
            itemInCart = {
                [teddy.color] : teddy 
            }          
        }

        localStorage.setItem(response._id, JSON.stringify(itemInCart));  
    }

    // set a key in local storage showing the total cost of the item in the cart:
    const totalCost = () => {
        let cartCost = localStorage.getItem('totalcost');
        if (cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalcost', cartCost + (teddy.price * teddy.quantity));
        } else {
            localStorage.setItem('totalcost', teddy.price * teddy.quantity);
        }
    }
}).catch((error) => {
    alert(error);
})