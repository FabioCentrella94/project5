let url = window.location.search;

switch (url) {
    case '?5be9c8541c9d440000665243':
        let firstTeddyRequest = new XMLHttpRequest();

        firstTeddyRequest.open('GET', 'http://localhost:3000/api/teddies/5be9c8541c9d440000665243');
        firstTeddyRequest.send();

        firstTeddyRequest.onreadystatechange = () => {

            if (firstTeddyRequest.readyState === 4) {

                const response = JSON.parse(firstTeddyRequest.response);

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

    break;

    case '?5beaa8bf1c9d440000a57d94':
        let secondTeddyRequest = new XMLHttpRequest();

        secondTeddyRequest.open('GET', 'http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94');
        secondTeddyRequest.send();

        secondTeddyRequest.onreadystatechange = () => {

            if (secondTeddyRequest.readyState === 4) {

                const response = JSON.parse(secondTeddyRequest.response);

                let name = document.getElementById('name');
                name.textContent = response.name;
                let image = document.getElementById('image');
                image.src = response.imageUrl;
                let description = document.getElementById('description');
                description.textContent = response.description;
                let price = document.getElementById('price');
                price.textContent = '$' + (response.price / 100).toFixed(2);;
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

        break;

        case '?5beaaa8f1c9d440000a57d95':
        let thirdTeddyRequest = new XMLHttpRequest();

        thirdTeddyRequest.open('GET', 'http://localhost:3000/api/teddies/5beaaa8f1c9d440000a57d95');
        thirdTeddyRequest.send();

        thirdTeddyRequest.onreadystatechange = () => {

            if (thirdTeddyRequest.readyState === 4) {

                const response = JSON.parse(thirdTeddyRequest.response);

                let name = document.getElementById('name');
                name.textContent = response.name;
                let image = document.getElementById('image');
                image.src = response.imageUrl;
                let description = document.getElementById('description');
                description.textContent = response.description;
                let price = document.getElementById('price');
                price.textContent = '$' + (response.price / 100).toFixed(2);;
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

    break;

    case '?5beaabe91c9d440000a57d96':
        let fourthTeddyRequest = new XMLHttpRequest();

        fourthTeddyRequest.open('GET', 'http://localhost:3000/api/teddies/5beaabe91c9d440000a57d96');
        fourthTeddyRequest.send();

        fourthTeddyRequest.onreadystatechange = () => {

            if (fourthTeddyRequest.readyState === 4) {

                const response = JSON.parse(fourthTeddyRequest.response);

                let name = document.getElementById('name');
                name.textContent = response.name;
                let image = document.getElementById('image');
                image.src = response.imageUrl;
                let description = document.getElementById('description');
                description.textContent = response.description;
                let price = document.getElementById('price');
                price.textContent = '$' + (response.price / 100).toFixed(2);;
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

        break;

        case '?5beaacd41c9d440000a57d97':
            let fifthTeddyRequest = new XMLHttpRequest();
    
            fifthTeddyRequest.open('GET', 'http://localhost:3000/api/teddies/5beaacd41c9d440000a57d97');
            fifthTeddyRequest.send();
    
            fifthTeddyRequest.onreadystatechange = () => {
    
                if (fifthTeddyRequest.readyState === 4) {
    
                    const response = JSON.parse(fifthTeddyRequest.response);
    
                    let name = document.getElementById('name');
                    name.textContent = response.name;
                    let image = document.getElementById('image');
                    image.src = response.imageUrl;
                    let description = document.getElementById('description');
                    description.textContent = response.description;
                    let price = document.getElementById('price');
                    price.textContent = '$' + (response.price / 100).toFixed(2);;
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
}

