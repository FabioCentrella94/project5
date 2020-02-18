let apiRequest = new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/teddies');
apiRequest.send();

apiRequest.onreadystatechange = () => {

  if (apiRequest.readyState === 4) {

    const response = JSON.parse(apiRequest.response);

    for (i = 0; i < response.length; i++) { 
      let figure = document.createElement('figure');
      let salelist = document.getElementById('salelist');
      salelist.appendChild(figure);  
      let nameList = document.createElement('h2');
      nameList.textContent = response[i].name;
      figure.appendChild(nameList);
      let imageList = document.createElement('img');
      imageList.src = response[i].imageUrl;
      figure.appendChild(imageList);
      let figureCaption = document.createElement('figcaption');
      figure.appendChild(figureCaption);
      let link = document.createElement('a');
      link.href = 'singleitem.html' + '?' + response[i]._id;
      figureCaption.appendChild(link);
      let viewItemButton = document.createElement('button');     
      viewItemButton.textContent = 'View Item';
      link.appendChild(viewItemButton); 
    }
  }
}



  
    



