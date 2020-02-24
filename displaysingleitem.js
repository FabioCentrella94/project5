let url = window.location.search.replace('?', '');

let teddyRequest = new XMLHttpRequest();

teddyRequest.open('GET', 'http://localhost:3000/api/teddies/' + url);
teddyRequest.send();

teddyRequest.onreadystatechange = () => {

    if (teddyRequest.readyState === 4) {

        const response = JSON.parse(teddyRequest.response);

        let name = document.getElementById('name');
        let image = document.getElementById('image');
        let description = document.getElementById('description');
        let price = document.getElementById('price');

        if (name != undefined && image != undefined && description != undefined && price != undefined && response.colors != undefined) {
            name.textContent = response.name;
            image.src = response.imageUrl;
            description.textContent = response.description;
            price.textContent = '$' + (response.price / 100).toFixed(2);
        

            for (i = 0; i < response.colors.length; i++) { 
                let radioButtons = document.createElement('input');
                radioButtons.type = 'radio';
                radioButtons.name = 'color';
                radioButtons.id = response.colors[i];
                radioButtons.value = response.colors[i];
                let radioButtonsText = document.createElement('label');
                radioButtonsText.htmlFor = response.colors[i];
                radioButtonsText.textContent = response.colors[i];
                radioButtonsText.appendChild(radioButtons);           
                let figCaption = document.getElementById('figcaption');
                figCaption.appendChild(radioButtonsText);         
            }

            const teddy = {
                id: response._id,
                image: response.imageUrl,
                color: '',
                quantity: 0,
                price: response.price
            }

            const addItemToCart = () => {
                let teddyInCart = localStorage.getItem(response._id);
                teddyInCart = JSON.parse(teddyInCart);
                
                if (teddyInCart != null) {
                    teddyInCart[teddy.id].quantity += 1;                
                } else {
                    teddy.quantity = 1;
                    teddyInCart = {
                    [teddy.id] : teddy
                }

            }

            localStorage.setItem(response._id, JSON.stringify(teddyInCart));
        }
                     
            let linebreak = document.createElement("br");
            document.getElementById('figcaption').appendChild(linebreak);
            let addToCart = document.createElement('button');
            addToCart.textContent = 'Add To Cart';

            addToCart.addEventListener('click', () => {
                addItemToCart(teddy);    
            })


            document.getElementById('figcaption').appendChild(addToCart);

        }

    }

}