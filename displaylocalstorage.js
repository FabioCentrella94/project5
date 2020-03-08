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

console.log(cart)

let arrayOfId = [];
for (i = 0; i < cart.length; i++) {
    arrayOfId.push(cart[i]);
}

console.log(arrayOfId)

for (i = 0; i < cart.length; i++) {
    let itemContainer = document.createElement('figure');
    let image = document.createElement('img');
    image.src = cart[i].image;
    itemContainer.appendChild(image);
    let figcaption = document.createElement('figcaption');
    itemContainer.appendChild(figcaption);
    let color = document.createElement('p');
    color.textContent = cart[i].color;
    figcaption.appendChild(color);
    let quantityContainer = document.createElement('div');
    quantityContainer.style.display = 'flex';
    quantityContainer.style.justifyContent = 'space-around';
    quantityContainer.style.alignItems = 'center';
    figcaption.appendChild(quantityContainer);
    let minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.value = cart[i].color;
    minusButton.name = cart[i].id;
    minusButton.setAttribute('class', 'minusbutton');
    quantityContainer.appendChild(minusButton);
    let quantity = document.createElement('p');
    quantity.textContent = cart[i].quantity;
    quantityContainer.appendChild(quantity);
    let plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.value = cart[i].color;
    plusButton.name = cart[i].id;
    plusButton.setAttribute('class', 'plusbutton');
    quantityContainer.appendChild(plusButton);
    let price = document.createElement('p');
    price.textContent = '$' + (cart[i].price / 100).toFixed(2);
    figcaption.appendChild(price);
    let removeItemButton = document.createElement('button');
    removeItemButton.setAttribute('class', 'removeitem');
    removeItemButton.textContent = 'Remove Item';
    removeItemButton.value = cart[i].color;
    removeItemButton.name = cart[i].id;
    figcaption.appendChild(removeItemButton);
    let displayCart = document.getElementById('cart');
    displayCart.appendChild(itemContainer);
}

let reduceQuantity = document.querySelectorAll('.minusbutton');
for (i = 0; i < reduceQuantity.length; i++) {
    reduceQuantity[i].addEventListener('click', ($event) => {
        let totalItem = localStorage.getItem('totalitemincart');
        totalItem = parseInt(totalItem);
        localStorage.setItem('totalitemincart', totalItem - 1);
        itemInCart = localStorage.getItem($event.target.name);
        itemInCart = JSON.parse(itemInCart);
        let totalCost = localStorage.getItem('totalcost');
        totalCost = parseInt(totalCost);
        localStorage.setItem('totalcost', totalCost - itemInCart[$event.target.value].price);
        if (itemInCart[$event.target.value].quantity > 1) {
            itemInCart[$event.target.value].quantity -= 1; 
        } else {
            delete itemInCart[$event.target.value];
        }
        localStorage.setItem($event.target.name, JSON.stringify(itemInCart));
        location.reload();
    })
}

let increaseQuantity = document.querySelectorAll('.plusbutton');
for (i = 0; i < increaseQuantity.length; i++) {
    increaseQuantity[i].addEventListener('click', ($event) => {
        let totalItem = localStorage.getItem('totalitemincart');
        totalItem = parseInt(totalItem);
        localStorage.setItem('totalitemincart', totalItem + 1);
        itemInCart = localStorage.getItem($event.target.name);
        itemInCart = JSON.parse(itemInCart);
        itemInCart[$event.target.value].quantity += 1;
        localStorage.setItem($event.target.name, JSON.stringify(itemInCart));
        let totalCost = localStorage.getItem('totalcost');
        totalCost = parseInt(totalCost);
        localStorage.setItem('totalcost', totalCost + itemInCart[$event.target.value].price);
        location.reload();
    })
}


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
        location.reload();
    })
}