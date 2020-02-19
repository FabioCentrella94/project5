let url = window.location.search;

let teddyId = url.replace('?', '');

let teddyRequest = new XMLHttpRequest();

teddyRequest.open('GET', 'http://localhost:3000/api/teddies/' + teddyId);
teddyRequest.send();

teddyRequest.onreadystatechange = () => {

    if (teddyRequest.readyState === 4) {

        const response = JSON.parse(teddyRequest.response);

        let name = document.getElementById('name');
        name.textContent = response.name;
        let image = document.getElementById('image');
        image.src = response.imageUrl;
        let description = document.getElementById('description');
        description.textContent = response.description;
        let price = document.getElementById('price');
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

        let linebreak = document.createElement("br");
        document.getElementById('figcaption').appendChild(linebreak);
        let addToCart = document.createElement('button');
        addToCart.textContent = 'Add To Cart';
        document.getElementById('figcaption').appendChild(addToCart);

    }

}
