let singleItem = document.getElementById('item');
let loadingGif = document.getElementById('loadinggif');
let teddyDetails = document.getElementById('teddydetails');
let alertMessage = document.getElementById('alert');

// if there is Internet Connection:
if (navigator.onLine = true) {

    // Promise:
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
    // if Promise resolve create a teddy image, with his name, description and price:
    promise.then((response) => {
        // remove loading gif:
        singleItem.removeChild(loadingGif);
        // display teddy description with price, name, quantity selection, color dropdown and button to add to the cart:
        teddyDetails.removeAttribute('hidden');
        // display teddy image:
        document.getElementById('imagecontainer').removeAttribute('hidden');
        let name = document.getElementById('name');
        name.textContent = response.name;
        let image = document.getElementById('image');
        image.src = response.imageUrl;
        let description = document.getElementById('description');
        description.textContent = response.description;
        let price = document.getElementById('price');
        price.textContent = '$' + (response.price / 100).toFixed(2);
        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart otherwise show the value of the key 'totalitemincart' in the LocalStorage: 
        if (localStorage.getItem("totalitemincart") === null) {
            let displayTotalItemInCart = document.getElementById('displaytotalitem');
            displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
        } else {
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
        }

        // set an object with properties equal to the response got from the server:
        let teddy = {
            id: response._id,
            image: response.imageUrl.replace('http://localhost:3000/', '../'),
            color: response.colors[0],
            quantity: 1,
            price: response.price
        }

        // minus quantity button:
        let quantityToAdd = document.getElementById('quantitytoadd');
        let minusButton = document.getElementById('minusbutton');
        minusButton.addEventListener('click', () => {
            // if the quantity is equal or greater than 2 decrease quantity by one when minus button is pressed:
            if (teddy.quantity >= 2 && quantityToAdd.textContent >= 2) {
                teddy.quantity = teddy.quantity - 1;
                quantityToAdd.textContent = Number(quantityToAdd.textContent) - 1;
            // if quantity is lower than 2 set the quantity to 1 and don't decrease it:
            } else {
                teddy.quantity = teddy.quantity;
                quantityToAdd = quantityToAdd;
            }
        });

        // increase quantity button by 1 when pressed:
        let plusButton = document.getElementById('plusbutton');
        plusButton.addEventListener('click', () => {
            teddy.quantity = teddy.quantity + 1;
            quantityToAdd.textContent = Number(quantityToAdd.textContent) + 1;
        });

        // set the text content for the color dropdown button:
        let colorDrop = document.getElementById('colorbutton');
        colorDrop.textContent = response.colors[0];

        // set the colors in colors dropdown:
        let dropdown = document.getElementById('colors');
        for (i = 0; i < response.colors.length; i++) { 
            let colorsOption = document.createElement('p');
            colorsOption.textContent = response.colors[i];
            colorsOption.setAttribute('class', 'dropdown-item')
            dropdown.appendChild(colorsOption); 
            colorsOption.setAttribute('class', 'choosecolors')              
        }

        // if teddy has just one variant of color the dropdown is not showed:
        if (dropdown.childElementCount <= 1) {
            dropdown.setAttribute('hidden', 'true');
        }

        // the text of the color dropdown button is equal to the text of the clicked color:
        let chooseColors = document.querySelectorAll('.choosecolors');        
        for (i = 0; i < chooseColors.length; i++) {
            chooseColors[i].addEventListener('click', ($event) => {
                teddy.color = $event.target.textContent;
                colorDrop.textContent = $event.target.textContent;
            })
        } 

        // create a figurecaption containing the button to add the item to the cart:
        let addToCartButton = document.createElement('button');
        addToCartButton.type = 'button';
        addToCartButton.setAttribute('class', 'btn btn-secondary text-light mt-5 mb-5');
        teddyDetails.appendChild(addToCartButton);
        addToCartButton.textContent = 'Add To Cart';
        addToCartButton.addEventListener('click', () => {
            // remove hidden attribute to the message that show that the item has been added to the cart:
            alertMessage.removeAttribute('hidden');
            // after 1000ms the message 'Item Added To Cart' disappear:
            setTimeout(() => { 
                alertMessage.setAttribute('hidden', 'true'); 
            }, 1000);
            totalItemInCart();
            addItemToCart();
            totalCost();
            // set the quantity showed in the basket equal to the value of the key 'totalitemincart' in the LocalStorage:
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
            // when the button to add item to the cart is pressed, the colors dropdown and the menu to choose the quantity get resetted:
            colorDrop.textContent = response.colors[0];
            teddy.quantity = 1;
            teddy.color = response.colors[0];
            quantityToAdd.textContent = 1; 
        });

        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart otherwise show the value of the key 'totalitemincart' in the LocalStorage: 
        const totalItemInCart = () => {
            let totalItem = localStorage.getItem('totalitemincart');
            totalItem = parseInt(totalItem);
            if (totalItem) {
                localStorage.setItem('totalitemincart', totalItem + teddy.quantity);
            } else {
                localStorage.setItem('totalitemincart', teddy.quantity);
            }
        }

        // set a key in local storage equal to the Id of the teddy, the value of the key in an object containing the different colors of teddys added to the cart:
        const addItemToCart = () => {
            // itemInCart is the value of the key (teddy id) in LocalStorage, itemInCart is an object:
            itemInCart = localStorage.getItem(response._id);
            // check if the key is already set in localStorage:
            itemInCart = JSON.parse(itemInCart);
            // if itemincart already contains objects in it:
            if (itemInCart !== null ) {
                // if the teddy we are trying to add is not in localStorage (itemInCart) yet, create a new object but keeps what was already in it:
                if (itemInCart[teddy.color] == undefined) {

                    // second teddy with same Id but different color was being added twice showing the quantity added times 2, so added the following line to fix that:
                    teddy.quantity /= 2;

                    itemInCart = {
                        ...itemInCart,
                        [teddy.color] : teddy
                    }              
                }

            // increase quantity by the quantity selected if the teddy we are trying to add is already in localStorage (itemInCart):
            itemInCart[teddy.color].quantity += teddy.quantity; 
            
            // if itemInCart is empty add a new property to it, the property added is an object named like the colour of the teddy we are trying to add:
            } else {
                itemInCart = {
                    [teddy.color] : teddy 
                }          
            }

            // set a key in localStorage (teddy Id), it's value is the object 'itemInCart':
            localStorage.setItem(response._id, JSON.stringify(itemInCart));
        }

        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart otherwise show the value of the key 'totalitemincart' in the LocalStorage: 
        const totalCost = () => {
            let cartCost = localStorage.getItem('totalcost');
            if (cartCost != null) {
                cartCost = parseInt(cartCost);
                localStorage.setItem('totalcost', cartCost + (teddy.price * teddy.quantity));
            } else {
                localStorage.setItem('totalcost', teddy.price * teddy.quantity);
            }
        }
        // if the Promise doesn't resolve:
    }).catch((error) => {
        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart otherwise show the value of the key 'totalitemincart' in the LocalStorage: 
        if (localStorage.getItem("totalitemincart") === null) {
            let displayTotalItemInCart = document.getElementById('displaytotalitem');
            displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
          } else {
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
          }
        console.log(error);
        // remove loading gif:
        singleItem.removeChild(loadingGif);
        // remove hidden attribute to teddydetails section in order to show the error:
        teddyDetails.removeAttribute('hidden');
        // if it doesn't get response from server show 'Network Error' otherwise show the response from the server:
        if (!error) {
            let errorMessage = document.getElementById('teddydetails');
            errorMessage.classList.remove('col-xl-6');
            errorMessage.className = 'overflow-auto text-center m-auto p-5'
            singleItem.removeChild(errorMessage.previousElementSibling);
            errorMessage.innerHTML = 'Error: Network Error';
        } else {
            let errorMessage = document.getElementById('teddydetails');
            errorMessage.classList.remove('col-xl-6');
            errorMessage.className = 'overflow-auto text-center m-auto p-5'
            let singleItem = document.getElementById('item');
            singleItem.removeChild(errorMessage.previousElementSibling);
            errorMessage.innerHTML = error;
        }
    });
// if there is not connection to internet show error 'No Connection':
} else {
    // remove loading gif:
    singleItem.removeChild(loadingGif);
    // remove hidden attribute to teddydetails section in order to show the error:
    teddyDetails.removeAttribute('hidden');
    window.document.addEventListener('DOMContentLoaded', () => {
        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart otherwise show the value of the key 'totalitemincart' in the LocalStorage: 
        if (localStorage.getItem("totalitemincart") === null) {
            let displayTotalItemInCart = document.getElementById('displaytotalitem');
            displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
          } else {
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
          }
        let errorMessage = document.getElementById('teddydetails');
        errorMessage.classList.remove('col-xl-6');
        errorMessage.className = 'overflow-auto text-center m-auto p-5'
        let singleItem = document.getElementById('item');
        // remove the section containing the image:
        singleItem.removeChild(errorMessage.previousElementSibling);
        errorMessage.innerHTML = 'No connection';
    }); 
}