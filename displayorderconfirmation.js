// show the response from the post request stored in the session storage and the totalcost of the cart:
const displayOrderConfirmation = ('DOMContentLoaded', () => {
    let orderConfirmation = document.getElementById('orderconfirmation');
    let thankYouText = document.createElement('h1');
    thankYouText.setAttribute('class', 'mb-5')
    thankYouText.textContent = 'Thanks for your order!';
    orderConfirmation.appendChild(thankYouText);
    let productsList = JSON.parse(sessionStorage.getItem('orderdetail')).products;
    let contactInformation = JSON.parse(sessionStorage.getItem('orderdetail')).contact;
    let orderIdText = document.createElement('h2');
    orderIdText.textContent = 'Order Number:';
    orderConfirmation.appendChild(orderIdText);
    let orderNumber = document.createElement('p');
    orderNumber.textContent = JSON.parse(sessionStorage.getItem('orderdetail')).orderId;
    orderConfirmation.appendChild(orderNumber);
    let totalCostText = document.createElement('h2');
    totalCostText.textContent = 'Total Cost:';
    orderConfirmation.appendChild(totalCostText);
    let totalCost = document.createElement('p');
    totalCost.textContent = '$' + (sessionStorage.getItem('ordertotalprice') / 100).toFixed(2);
    orderConfirmation.appendChild(totalCost);
    let productsListText = document.createElement('h2');
    productsListText.textContent = 'Products List:';
    orderConfirmation.appendChild(productsListText);

    // split the name of every teddy with a comma and add the dot for the last teddy name:
    let productsNameTemporary = [];
    for (i = 0; i < productsList.length; i++) {
        productsNameTemporary.push(productsList[i].name);
    }
    if (productsNameTemporary.length >= 2) {
        let productsName = productsNameTemporary.slice(0, -1).join(', ') + ', ' + productsNameTemporary.slice(-1) + '.';
        console.log(productsName);
        let nameToDisplay = document.createElement('p');
        nameToDisplay.innerHTML = productsName;
        orderConfirmation.appendChild(nameToDisplay);    
    } else {
        productsName = productsNameTemporary.slice(0) + '.';
        let nameToDisplay = document.createElement('p');
        nameToDisplay.innerHTML = productsName;
        orderConfirmation.appendChild(nameToDisplay); 
    }

    let addressText = document.createElement('h2');
    addressText.textContent = 'Contact Information:';
    orderConfirmation.appendChild(addressText);
    let name = document.createElement('p');
    name.textContent = contactInformation.firstName;
    orderConfirmation.appendChild(name);
    let surname = document.createElement('p');
    surname.textContent = contactInformation.lastName;
    orderConfirmation.appendChild(surname);
    let address = document.createElement('p');
    address.textContent = contactInformation.address;
    orderConfirmation.appendChild(address);
    let city = document.createElement('p');
    city.textContent = contactInformation.city;
    orderConfirmation.appendChild(city);
    let email = document.createElement('p');
    email.textContent = contactInformation.email;
    orderConfirmation.appendChild(email);
    let displayTotalItemInCart = document.getElementById('displaytotalitem');
    displayTotalItemInCart.textContent = 'Cart' + ' ' + '(' + 0 + ')';
});

displayOrderConfirmation();