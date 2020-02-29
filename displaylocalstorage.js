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

for (i = 0; i < cart.length; i++) {
    let itemContainer = document.createElement('div');
    itemContainer.style.display = 'flex';
    itemContainer.style.flexFlow = 'row wrap';
    itemContainer.style.justifyContent = 'space-around'
    let image = document.createElement('img');
    image.src = cart[i].image;
    itemContainer.appendChild(image);
    let color = document.createElement('p');
    color.textContent = cart[i].color;
    itemContainer.appendChild(color);
    let price = document.createElement('p');
    price.textContent = '$' + (cart[i].price / 100).toFixed(2);
    itemContainer.appendChild(price);
    let quantity = document.createElement('p');
    quantity.textContent = cart[i].quantity;
    itemContainer.appendChild(quantity);
    let totalPricePerItem = document.createElement('p');
    totalPricePerItem.textContent = '$' + (cart[i].price * cart[i].quantity / 100).toFixed(2);
    itemContainer.appendChild(totalPricePerItem);
    let displayCart = document.getElementById('cart');
    displayCart.appendChild(itemContainer);
}

