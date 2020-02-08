let apiRequest = new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/teddies');
apiRequest.send();

apiRequest.onreadystatechange = () => {

  if (apiRequest.readyState === 4) {

    const response = JSON.parse(apiRequest.response);

    // Display Teddy Names in main page
    let displayTeddyNamesList = document.querySelectorAll('.teddyname');
      for(var i=0; i< displayTeddyNamesList.length; i++){
        displayTeddyNamesList[i].textContent = response[i].name;
      }

    // Display Teddy Images in main page
    let displayTeddyImagesList = document.querySelectorAll('.teddyimage');
      for(var i=0; i< displayTeddyImagesList.length; i++){
        displayTeddyImagesList[i].src = response[i].imageUrl;
      }

    // Create name for every teddy to display in dynamic page
    let displaySingleTeddyName = document.querySelectorAll('.singleteddyname');
      for(var i=0; i< displaySingleTeddyName.length; i++){
        displaySingleTeddyName[i].textContent = response[i].name;
      }

    // Create image for every teddy to display in dynamic page
    let displaySingleTeddyImage = document.querySelectorAll('.singleteddyimage');
      for(var i=0; i< displaySingleTeddyImage.length; i++){
        displaySingleTeddyImage[i].src = response[i].imageUrl;
      }

    // Create description for every teddy to display in dynamic page
    let displaySingleTeddyDescription = document.querySelectorAll('.singleteddydescription');
      for(var i=0; i< displaySingleTeddyDescription.length; i++){
        displaySingleTeddyDescription[i].textContent = response[i].description;
      }

    // Create price for every teddy to display in dynamic page
    let displaySingleTeddyPrice = document.querySelectorAll('.singleteddyprice');
      for(var i=0; i< displaySingleTeddyPrice.length; i++){
        displaySingleTeddyPrice[i].textContent = '$' + response[i].price;
      }

  // Parse the URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Give the parameter a variable name
  let dynamicContent = getParameterByName(':_id');

  $(document).ready(function() {

    // Check if the URL parameter is equal to the first teddy id
    if (dynamicContent == '5be9c8541c9d440000665243' ) {
      $('#firstteddy').show();

      let firstTeddyValueRadioButton = document.querySelectorAll('.first-teddy-color-value');
      for(let i=0; i < firstTeddyValueRadioButton.length; i++) {
        firstTeddyValueRadioButton[i].value = response[0].colors[i];
      }
  
      let firstTeddyButtonText = document.querySelectorAll('.first-teddy-color-text');
      for(let i=0; i < firstTeddyButtonText.length; i++) {
        firstTeddyButtonText[i].textContent = response[0].colors[i];
      }
    }

    // Check if the URL parameter is equal to the second teddy id
    else if (dynamicContent == '5beaa8bf1c9d440000a57d94') {
      $('#secondteddy').show();

      let secondTeddyValueRadioButton = document.querySelectorAll('.second-teddy-color-value');
      for(let i=0; i < secondTeddyValueRadioButton.length; i++) {
        secondTeddyValueRadioButton[i].value = response[1].colors[i];
      }
  
      let secondTeddyButtonText = document.querySelectorAll('.second-teddy-color-text');
      for(let i=0; i < secondTeddyButtonText.length; i++) {
        secondTeddyButtonText[i].textContent = response[1].colors[i];
      }
    } 

    // Check if the URL parameter is equal to the third teddy id
    else if (dynamicContent == '5beaaa8f1c9d440000a57d95') {
      $('#thirdteddy').show();

      let thirdTeddyValueRadioButton = document.querySelectorAll('.third-teddy-color-value');
      for(let i=0; i < thirdTeddyValueRadioButton.length; i++) {
        thirdTeddyValueRadioButton[i].value = response[2].colors[i];
      }
  
      let thirdTeddyButtonText = document.querySelectorAll('.third-teddy-color-text');
      for(let i=0; i < thirdTeddyButtonText.length; i++) {
        thirdTeddyButtonText[i].textContent = response[2].colors[i];
      }

    }

    // Check if the URL parameter is equal to the fourth teddy id
    else if (dynamicContent == '5beaabe91c9d440000a57d96') {
      $('#fourthteddy').show();

      let fourthTeddyValueRadioButton = document.querySelectorAll('.fourth-teddy-color-value');
      for(let i=0; i < fourthTeddyValueRadioButton.length; i++) {
        fourthTeddyValueRadioButton[i].value = response[3].colors[i];
      }
  
      let fourthTeddyButtonText = document.querySelectorAll('.fourth-teddy-color-text');
      for(let i=0; i < fourthTeddyButtonText.length; i++) {
        fourthTeddyButtonText[i].textContent = response[3].colors[i];
      }

    } 

    // Check if the URL parameter is equal to the fifth teddy id
    else if (dynamicContent == '5beaacd41c9d440000a57d97') {
      $('#fifthteddy').show();

      let fifthTeddyValueRadioButton = document.querySelectorAll('.fifth-teddy-color-value');
      for(let i=0; i < fifthTeddyValueRadioButton.length; i++) {
        fifthTeddyValueRadioButton[i].value = response[4].colors[i];
      }
  
      let fifthTeddyButtonText = document.querySelectorAll('.fifth-teddy-color-text');
      for(let i=0; i < fifthTeddyButtonText.length; i++) {
        fifthTeddyButtonText[i].textContent = response[4].colors[i];
      }
  
    }

  })
                
  }

}