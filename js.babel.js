'use strict';

var apiRequest = new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/teddies');
apiRequest.send();

apiRequest.onreadystatechange = function () {

  if (apiRequest.readyState === 4) {

    var response = JSON.parse(apiRequest.response);

    for (i = 0; i < response.length; i++) {
      var imageBlock = document.createElement('figure');
      var salelist = document.getElementById('salelist');
      salelist.appendChild(imageBlock);
      var teddyName = document.createElement('h2');
      teddyName.textContent = response[i].name;
      imageBlock.appendChild(teddyName);
      var teddyImage = document.createElement('img');
      teddyImage.src = response[i].imageUrl;
      imageBlock.appendChild(teddyImage);
      var blockCaption = document.createElement('figcaption');
      imageBlock.appendChild(blockCaption);
      var viewItemButton = document.createElement('button');
      viewItemButton.setAttribute('class', 'buttons');
      viewItemButton.textContent = 'View Item';
      var link = document.createElement('a');
      link.href = 'singleitem.html';
      link.appendChild(viewItemButton);
      blockCaption.appendChild(link);
    }
  }
};
