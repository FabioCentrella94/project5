let url = window.location.search.replace('?', '');

let teddyRequest = new XMLHttpRequest();

teddyRequest.open('GET', 'http://localhost:3000/api/teddies/' + url);
teddyRequest.send();

teddyRequest.onreadystatechange = () => {

    if (teddyRequest.readyState === 4) {

        if (teddyRequest.status === 500) {

            return alert('error');

        } else {

            const response = JSON.parse(teddyRequest.response);

            let name = document.getElementById('name');
            name.textContent = response.name;
            let image = document.getElementById('image');
            image.src = response.imageUrl;
            let description = document.getElementById('description');
            description.textContent = response.description;
            let price = document.getElementById('price');
            price.textContent = '$' + (response.price / 100).toFixed(2);
        
            let numbers = [1, 2, 3];

            let teddy = {
                id: response._id,
                image: response.imageUrl,
                color: '',
                quantity: 1,
                price: response.price
            }

            for (i = 0; i < numbers.length; i++) { 
                let chooseQuantity = document.createElement('p');
                chooseQuantity.textContent = numbers[i];
                let dropdown = document.getElementById('quantity');
                dropdown.appendChild(chooseQuantity);
                chooseQuantity.setAttribute('class', 'quantityoption')                         
            }

            let quantityOption = document.querySelectorAll('.quantityoption');

            for (i = 0; i < quantityOption.length; i++) {
                quantityOption[i].addEventListener('click', ($event) => {
                teddy.quantity = Number($event.target.textContent);
                    let quantityDropdown = document.getElementById('quantitybutton');
                    quantityDropdown.textContent = $event.target.textContent;                  
                })
            }   

            for (i = 0; i < response.colors.length; i++) { 
                let colorsOption = document.createElement('p');
                colorsOption.textContent = response.colors[i];
                let dropdown = document.getElementById('color');
                dropdown.appendChild(colorsOption); 
                colorsOption.setAttribute('class', 'choosecolors')                 
            }

            let chooseColors = document.querySelectorAll('.choosecolors'); 
        
            for (i = 0; i < chooseColors.length; i++) {
                chooseColors[i].addEventListener('click', ($event) => {
                    teddy.color = $event.target.textContent;
                    let colorDrop = document.getElementById('colorbutton');
                    colorDrop.textContent = $event.target.textContent;
                })
            }  

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
            });

            const totalItemInCart = () => {
                let totalItem = localStorage.getItem('totalitemincart');
                totalItem = parseInt(totalItem);
                if (totalItem) {
                    localStorage.setItem('totalitemincart', totalItem + teddy.quantity);
                } else {
                    localStorage.setItem('totalitemincart', teddy.quantity);
                }
            }

            const addItemToCart = () => {
                itemInCart = localStorage.getItem(response._id);
                itemInCart = JSON.parse(itemInCart);
                if (itemInCart !== null ) {
                    if (itemInCart[teddy.color] == undefined) {
                        teddy.quantity /= 2;
                        itemInCart = {
                            ...itemInCart,
                            [teddy.color] : teddy
                        }              
                    }

                itemInCart[teddy.color].quantity += teddy.quantity; 

                } else {
                    itemInCart = [
                        teddy.color = {teddy} 
                    ]          
                }

                localStorage.setItem(response._id, JSON.stringify(itemInCart));  
            }

            const totalCost = () => {
                let cartCost = localStorage.getItem('totalcost');
                if (cartCost != null) {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem('totalcost', cartCost + (teddy.price * teddy.quantity));
                } else {
                    localStorage.setItem('totalcost', teddy.price * teddy.quantity);
                }
            }
        }
    }
}