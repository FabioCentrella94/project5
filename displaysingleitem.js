// check if there is Internet Connection:
if (navigator.onLine) {

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

        // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart: 
        if (localStorage.getItem("totalitemincart") === null) {
            let displayTotalItemInCart = document.getElementById('displaytotalitem');
            displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
        } else {
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
        }

        // set an object with different properties equal to the response got from the server:
        let teddy = {
            id: response._id,
            image: response.imageUrl,
            color: response.colors[0],
            quantity: 1,
            price: response.price
        }

        // decrease quantity button:
        let quantityToAdd = document.getElementById('quantitytoadd');
        let minusButton = document.getElementById('minusbutton');
        minusButton.addEventListener('click', () => {
            if (teddy.quantity >= 2 && quantityToAdd.textContent >= 2) {
                teddy.quantity = teddy.quantity - 1;
                quantityToAdd.textContent = Number(quantityToAdd.textContent) - 1;
            } else {
                teddy.quantity = teddy.quantity;
                quantityToAdd = quantityToAdd;
            }
            console.log(teddy.quantity);
        });

        // increase quantity button:
        let plusButton = document.getElementById('plusbutton');
        plusButton.addEventListener('click', () => {
            teddy.quantity = teddy.quantity + 1;
            quantityToAdd.textContent = Number(quantityToAdd.textContent) + 1;
        });

        // set the text content for the dropdown button:
        let colorDrop = document.getElementById('colorbutton');
        colorDrop.textContent = response.colors[0];

        // for each color in the array colors in the response object create a 'p' element and append them to the dropdown to choose the color:
        let dropdown = document.getElementById('colors');
        for (i = 0; i < response.colors.length; i++) { 
            let colorsOption = document.createElement('p');
            colorsOption.textContent = response.colors[i];
            colorsOption.setAttribute('class', 'dropdown-item')
            dropdown.appendChild(colorsOption); 
            colorsOption.setAttribute('class', 'choosecolors')              
        }

        // if teddy has just one varian color the dropdown is not showed:
        if (dropdown.childElementCount <= 1) {
            dropdown.setAttribute('hidden', 'true');
        }

        // set the displayed color of the dropdown to choose the color equal to the selected color in the dropdown:
        let chooseColors = document.querySelectorAll('.choosecolors');        
        for (i = 0; i < chooseColors.length; i++) {
            chooseColors[i].addEventListener('click', ($event) => {
                teddy.color = $event.target.textContent;
                colorDrop.textContent = $event.target.textContent;
            })
        } 

        // create a figurecaption containing the button add the item to the cart:
        let teddyDetails = document.getElementById('teddydetails'); 
        let addToCartButton = document.createElement('button');
        addToCartButton.type = 'button';
        addToCartButton.setAttribute('class', 'btn btn-secondary text-light mt-5 mb-5');
        teddyDetails.appendChild(addToCartButton);
        addToCartButton.textContent = 'Add To Cart';
        addToCartButton.addEventListener('click', () => {
            totalItemInCart();
            addItemToCart();
            totalCost();
            location.reload();   
        });

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
        let errorMessage = document.getElementById('teddydetails');
        errorMessage.classList.remove('col-xl-6');
        errorMessage.className = 'overflow-auto text-center m-auto p-5'
        let singleItem = document.getElementById('item');
        singleItem.removeChild(errorMessage.previousElementSibling);
        errorMessage.innerHTML = error;
    });

} else {
    window.document.addEventListener('DOMContentLoaded', () => {
        let errorMessage = document.getElementById('teddydetails');
        errorMessage.classList.remove('col-xl-6');
        errorMessage.className = 'overflow-auto text-center m-auto p-5'
        let singleItem = document.getElementById('item');
        singleItem.removeChild(errorMessage.previousElementSibling);
        errorMessage.innerHTML = 'No connection';
    });
}