// check if there is Internet Connection:
if (navigator.onLine) {

    let displayCart = document.getElementById('cart');
    // if the key 'totalitemincart' in localstorage is not set the basket show 0 as item in in cart:
    if (localStorage.getItem("totalitemincart") === null) {
        let displayTotalItemInCart = document.getElementById('displaytotalitem');
        displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
    } else {
        document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
    }

    // loop through the key in local storage and if their value is an object push it in the array localStorageValues:
    let localStorageValues = [];
    for (let i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            localStorageValues.push(JSON.parse(localStorage[i]));
        } 
    }

    // loop through the object in the array localStorageValues and push the properties (objects in this case) of each object in the array named Cart:
    let cart = [];
    localStorageValues.forEach(function(obj) {   
        Object.keys(obj).forEach(key => {
            cart.push(obj[key]);
        })   
    })

    // loop through each object in the Cart array and for each object create a new array inside the array arraysOfId containing the Id key of the object times the quantity key of the object and the concatenate all the arrays of Id contained in arraysOfId:
    let arraysofId = [];
    for (i = 0; i < cart.length; i++) {
        arraysofId[i] = new Array(cart[i].quantity).fill(cart[i].id);
    }
    let products = [].concat.apply([], arraysofId);

    // for each object in the array Cart create a figurecaption containing the image of the object, the price, the quantity, the plus and minus quantity buttons, the total cost and the remove item button:
    for (i = 0; i < cart.length; i++) {
    let itemContainer = document.createElement('figure');
    itemContainer.setAttribute('class', 'col-12')
    let image = document.createElement('img');
    image.src = cart[i].image;
    itemContainer.appendChild(image);
    let figcaption = document.createElement('figcaption');
    itemContainer.appendChild(figcaption);
    let color = document.createElement('p');
    color.textContent = cart[i].color;
    figcaption.appendChild(color);
    let price = document.createElement('p');
    price.textContent = '$' + (cart[i].price / 100).toFixed(2);
    figcaption.appendChild(price);
    let quantityContainer = document.createElement('div');
    quantityContainer.style.display = 'flex';
    quantityContainer.style.justifyContent = 'space-around';
    quantityContainer.style.alignItems = 'center';
    figcaption.appendChild(quantityContainer);
    let minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.value = cart[i].color;
    minusButton.name = cart[i].id;
    minusButton.setAttribute('class', 'minusbutton bg-secondary text-light rounded-circle');
    quantityContainer.appendChild(minusButton);
    let quantity = document.createElement('p');
    quantity.textContent = cart[i].quantity;
    quantityContainer.appendChild(quantity);
    let plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.value = cart[i].color;
    plusButton.name = cart[i].id;
    plusButton.setAttribute('class', 'plusbutton bg-secondary text-light rounded-circle');
    quantityContainer.appendChild(plusButton);
    let totalPrice = document.createElement('p');
    totalPrice.textContent = '$' + ((cart[i].price * cart[i].quantity) / 100).toFixed(2);
    figcaption.appendChild(totalPrice);
    let removeItemButton = document.createElement('button');
    removeItemButton.setAttribute('class', 'removeitem bg-secondary text-light');
    removeItemButton.textContent = 'Remove Item';
    removeItemButton.value = cart[i].color;
    removeItemButton.name = cart[i].id;
    figcaption.appendChild(removeItemButton);
    let displayCart = document.getElementById('cart');
    displayCart.appendChild(itemContainer);
    }

    // code for the functionality of the minus button, reduce quantity of one target item:
    let reduceQuantity = document.querySelectorAll('.minusbutton');
    for (i = 0; i < reduceQuantity.length; i++) {
        reduceQuantity[i].addEventListener('click', ($event) => {
            let totalItem = localStorage.getItem('totalitemincart');
            totalItem = parseInt(totalItem);
            localStorage.setItem('totalitemincart', totalItem - 1);
            itemInCart = localStorage.getItem($event.target.name);
            itemInCart = JSON.parse(itemInCart);
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
            let totalCost = localStorage.getItem('totalcost');
            totalCost = parseInt(totalCost);
            localStorage.setItem('totalcost', totalCost - itemInCart[$event.target.value].price);
            if (itemInCart[$event.target.value].quantity > 1) {
                itemInCart[$event.target.value].quantity -= 1;
                $event.target.parentElement.nextElementSibling.textContent = '$' + ((itemInCart[$event.target.value].price * itemInCart[$event.target.value].quantity) / 100).toFixed(2);
            } else {
                delete itemInCart[$event.target.value];
            }
            localStorage.setItem($event.target.name, JSON.stringify(itemInCart));
            if (localStorage.getItem($event.target.name) == '{}') {
                localStorage.removeItem($event.target.name)
            }
            $event.target.nextSibling.textContent = Number($event.target.nextSibling.textContent) - 1; 
            if ($event.target.nextSibling.textContent < 1) {
                displayCart.removeChild($event.target.parentElement.parentElement.parentElement);
            }
            if (displayCart.childNodes.length < 1) {
                location.reload();
            }
        })
    }

    // code for the functionality of the plus button, increase quantity of one target item:
    let increaseQuantity = document.querySelectorAll('.plusbutton');
    for (i = 0; i < increaseQuantity.length; i++) {
        increaseQuantity[i].addEventListener('click', ($event) => {
            let totalItem = localStorage.getItem('totalitemincart');
            totalItem = parseInt(totalItem);
            localStorage.setItem('totalitemincart', totalItem + 1);
            itemInCart = localStorage.getItem($event.target.name);
            itemInCart = JSON.parse(itemInCart);
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
            itemInCart[$event.target.value].quantity += 1;
            $event.target.parentElement.nextElementSibling.textContent = '$' + ((itemInCart[$event.target.value].price * itemInCart[$event.target.value].quantity) / 100).toFixed(2);
            localStorage.setItem($event.target.name, JSON.stringify(itemInCart));
            let totalCost = localStorage.getItem('totalcost');
            totalCost = parseInt(totalCost);
            localStorage.setItem('totalcost', totalCost + itemInCart[$event.target.value].price);
            $event.target.previousSibling.textContent = Number($event.target.previousSibling.textContent) + 1;
        })
    }

    // code for the functionality of the remove item button:
    let removeItem = document.querySelectorAll('.removeitem');
    for (i = 0; i < removeItem.length; i++) {
        removeItem[i].addEventListener('click', ($event) => {
            let totalItem = localStorage.getItem('totalitemincart');
            totalItem = parseInt(totalItem);
            itemInCart = localStorage.getItem($event.target.name);
            itemInCart = JSON.parse(itemInCart);
            let totalCost = localStorage.getItem('totalcost');
            totalCost = parseInt(totalCost);
            localStorage.setItem('totalcost', totalCost - (itemInCart[$event.target.value].price * itemInCart[$event.target.value].quantity));
            localStorage.setItem('totalitemincart', totalItem - itemInCart[$event.target.value].quantity);
            delete itemInCart[$event.target.value];      
            localStorage.setItem($event.target.name, JSON.stringify(itemInCart));
            document.getElementById('displaytotalitem').textContent = 'Cart' + ' ' + '(' + localStorage.getItem('totalitemincart') + ')';
            if (localStorage.getItem($event.target.name) == '{}') {
                localStorage.removeItem($event.target.name);
            }
            displayCart.removeChild($event.target.previousSibling.parentElement.parentElement);
            if (displayCart.childNodes.length < 1) {
                location.reload();
            }
        })
    }

    let contact = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: ''
    }

    // for each input element create a p element:
    let formInputField = document.querySelectorAll('.form-group');
    for (i = 0; i < formInputField.length; i++) {
        let alertText = document.createElement('p');
        formInputField[i].appendChild(alertText);
        }

    // check if the array products is empty, if so the input form is hidden otherwise not, and check if the value of each input text is greater than 0 and match is respective pattern:
    let checkoutButton = document.getElementById('submitorder');
    let checkoutInputField = document.querySelectorAll('input');
    let checkoutForm = document.getElementById('inputform');
    let formContainer = document.getElementById('formcontainer');
    if (products.length >= 1) {
        checkoutForm.removeAttribute('hidden');
        for (i = 0; i < checkoutInputField.length; i++) {
            checkoutInputField[i].addEventListener('input', ($event) => {
                inputValidation($event);
            })
            checkoutInputField[i].addEventListener('blur', ($event) => {
                inputValidation($event);
            })
        }
    } else {
        checkoutForm.setAttribute('hidden', 'true');
        let text = document.createElement('p');
        text.setAttribute('class', 'font-weight-bold mt-5');
        text.textContent = 'Your Cart Is Empty';
        formContainer.appendChild(text);
    }
    const inputValidation = ($event) => {
        if ($event.target.value.length < 1) {
            $event.target.style.border = '2px solid red';
            $event.target.nextElementSibling.style.color = 'red';
            $event.target.nextElementSibling.textContent = 'Field Required';  
        } else if ($event.target.value.length >= 1 && !$event.target.value.match($event.target.pattern)) {
            $event.target.style.border = '2px solid red';
            $event.target.nextElementSibling.style.color = 'red';
            $event.target.nextElementSibling.textContent = 'Format Not Valid';
        } else {
            $event.target.style.border = '2px solid greenyellow';
            $event.target.nextElementSibling.style.color = 'green';
            $event.target.nextElementSibling.textContent = 'Valid' + ' ' + $event.target.name; 
        }
    }

    // check if the value of each input text if is greater than 0 and match its respective pattern, if so the submit order button is enabled, otherwise not:
    for (i = 0; i < checkoutInputField.length; i++) {
        checkoutInputField[i].addEventListener('input', () => {
            if (checkoutInputField[0].value.length >= 1 && checkoutInputField[0].value.match(checkoutInputField[0].pattern) && checkoutInputField[1].value.length >= 1 && checkoutInputField[1].value.match(checkoutInputField[1].pattern) && checkoutInputField[2].value.length >= 1 && checkoutInputField[2].value.match(checkoutInputField[2].pattern) && checkoutInputField[3].value.length >= 1 && checkoutInputField[3].value.match(checkoutInputField[3].pattern) && checkoutInputField[4].value.length >= 1 && checkoutInputField[4].value.match(checkoutInputField[4].pattern)) {
                checkoutButton.removeAttribute('hidden');

            } else {
                checkoutButton.setAttribute('hidden', 'true');
            }
        })
    }

    checkoutButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        setContactValues();
        if (checkoutInputField[0].value.length >= 1 && checkoutInputField[0].value.match(checkoutInputField[0].pattern) && checkoutInputField[1].value.length >= 1 && checkoutInputField[1].value.match(checkoutInputField[1].pattern) && checkoutInputField[2].value.length >= 1 && checkoutInputField[2].value.match(checkoutInputField[2].pattern) && checkoutInputField[3].value.length >= 1 && checkoutInputField[3].value.match(checkoutInputField[3].pattern) && checkoutInputField[4].value.length >= 1 && checkoutInputField[4].value.match(checkoutInputField[4].pattern)) {
            submitOrder();
        }
    })

    // set the value of the properties of the contact object equal to the value of the input text form:
    const setContactValues = () => {
        contact.firstName = checkoutInputField[0].value;
        contact.lastName = checkoutInputField[1].value;
        contact.address = checkoutInputField[2].value;
        contact.city = checkoutInputField[3].value;
        contact.email = checkoutInputField[4].value;
    }


    // submit order function that refresh the array 'products' containing the id of all the teddies before to be sent to the server:
    const submitOrder = () => {
        const promise = new Promise((resolve, reject) => {
            let localStorageValues = [];
            for (let i in localStorage) {
                if (localStorage.hasOwnProperty(i)) {
                    localStorageValues.push(JSON.parse(localStorage[i]));
                } 
            }
            let cart = [];
            localStorageValues.forEach(function(obj) {   
                Object.keys(obj).forEach(key => {
                    cart.push(obj[key]);
                })   
            })
            let arraysofId = [];
            for (i = 0; i < cart.length; i++) {
                arraysofId[i] = new Array(cart[i].quantity).fill(cart[i].id);
            }
            let products = [].concat.apply([], arraysofId);
            let postRequest = new XMLHttpRequest();
            let data = {contact: contact, products: products}
            let url = 'http://localhost:3000/api/teddies/order';
            postRequest.open('POST', url, true);
            postRequest.setRequestHeader('Content-type', 'application/json');
            postRequest.send(JSON.stringify(data));
            postRequest.onreadystatechange = () => {
                if (postRequest.readyState === 4) {
                    if (postRequest.status === 201) {
                        resolve(JSON.parse(postRequest.response));
                    } else {
                        reject(postRequest.response);
                    }
                }
            }
        })
        promise.then((response) => {
            sessionStorage.setItem('ordertotalprice', localStorage.getItem('totalcost'));
            localStorage.clear();
            sessionStorage.setItem('orderdetail', JSON.stringify(response));

            // when pressed back button from the orderconfirmation page to the cart page the input text field still contained previous informations, so fixed with the follow lines:
            for (i = 0; i < checkoutInputField.length; i++) {
                checkoutInputField[i].value = '';
            }

            location.href = 'orderconfirmation.html';

        }).catch((error) => {
            if (!error.response) {
                let errorMessage = document.createElement('p');
                errorMessage.textContent = 'Error: Network Error';
                let cartPage = document.getElementById('cartpage');
                cartPage.removeChild(cartPage.childNodes[1]);
                checkoutForm.setAttribute('hidden', 'true');
                formContainer.className = 'col-12 text-center pt-5'
                formContainer.appendChild(errorMessage);
            } else {
                let errorMessage = document.createElement('p');
                errorMessage.textContent = error;
                let cartPage = document.getElementById('cartpage');
                cartPage.removeChild(cartPage.childNodes[1]);
                checkoutForm.setAttribute('hidden', 'true');
                formContainer.className = 'col-12 text-center pt-5'
                formContainer.appendChild(errorMessage);
            }

        })
    }
} else {
    window.document.addEventListener('DOMContentLoaded', () => {
        let cartPage = document.getElementById('cartpage');
        cartPage.removeChild(cartPage.childNodes[1]);
        let checkoutForm = document.getElementById('inputform');
        checkoutForm.setAttribute('hidden', 'true');
        let formContainer = document.getElementById('formcontainer');
        formContainer.className = 'col-12 text-center pt-5'
        formContainer.innerHTML = 'No Connection';
    })
}