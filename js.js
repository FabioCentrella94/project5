function getTeddies(){
    fetch('http://localhost:3000/api/teddies')
    .then((res) => res.json())
    .then((data) => {
      let itemsForSale = '<h1>Salelist</h1>';
      data.forEach(function(teddy){
        itemsForSale += ` 
            <figure>
                <h2>${teddy.name}</h2>    
                <img src = '${teddy.imageUrl}' width = 300px height = 300px></img>
                <figcaption>
                    <button class = 'viewitem'>View Item</button>
                </figcaption>
            </figure>
        `;
      });
      document.getElementById('salelist').innerHTML = itemsForSale;
    })
  };

 getTeddies();

 



