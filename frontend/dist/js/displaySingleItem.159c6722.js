(self.webpackChunkproject5_frontend=self.webpackChunkproject5_frontend||[]).push([[606],{104:function(){let t=document.getElementById("item"),e=document.getElementById("loadingGif"),n=document.getElementById("teddyDetails"),o=document.getElementById("alert");if(navigator.onLine){new Promise(((t,e)=>{let n=window.location.search.replace("?",""),o=new XMLHttpRequest;o.open("GET","https://project5-backend.myportfolio.training/api/teddies/"+n),o.send(),o.onreadystatechange=()=>{4===o.readyState&&(200===o.status?t(JSON.parse(o.response)):e(o.response))}})).then((l=>{if(t.removeChild(e),n.removeAttribute("hidden"),document.getElementById("imageContainer").removeAttribute("hidden"),document.getElementById("name").textContent=l.name,document.getElementById("image").src=l.imageUrl.replace("http://localhost:3000/","./"),document.getElementById("description").textContent=l.description,document.getElementById("price").textContent="$"+(l.price/100).toFixed(2),null===localStorage.getItem("totalItemInCart")){document.getElementById("displayTotalItem").textContent="Cart (0)"}else document.getElementById("displayTotalItem").textContent="Cart ("+localStorage.getItem("totalItemInCart")+")";let a={id:l._id,image:l.imageUrl.replace("https://project5-backend.myportfolio.training/","./"),color:l.colors[0],quantity:1,price:l.price},r=document.getElementById("quantityToAdd");document.getElementById("minusButton").addEventListener("click",(()=>{a.quantity>=2&&r.textContent>=2?(a.quantity=a.quantity-1,r.textContent=Number(r.textContent)-1):a.quantity=a.quantity})),document.getElementById("plusButton").addEventListener("click",(()=>{a.quantity=a.quantity+1,r.textContent=Number(r.textContent)+1}));let m=document.getElementById("colorButton");m.textContent=l.colors[0];let d=document.getElementById("colors");for(i=0;i<l.colors.length;i++){let t=document.createElement("p");t.textContent=l.colors[i],t.setAttribute("class","dropdown-item"),d.appendChild(t),t.setAttribute("class","chooseColors")}d.childElementCount<=1&&d.setAttribute("hidden","true");let c=document.querySelectorAll(".chooseColors");for(i=0;i<c.length;i++)c[i].addEventListener("click",(t=>{a.color=t.target.textContent,m.textContent=t.target.textContent}));let s=document.createElement("button");s.type="button",s.setAttribute("class","btn btn-secondary text-light mt-5 mb-5"),n.appendChild(s),s.textContent="Add To Cart",s.addEventListener("click",(()=>{o.removeAttribute("hidden"),setTimeout((()=>{o.setAttribute("hidden","true")}),1e3),u(),I(),g(),document.getElementById("displayTotalItem").textContent="Cart ("+localStorage.getItem("totalItemInCart")+")",m.textContent=l.colors[0],a.quantity=1,a.color=l.colors[0],r.textContent=1}));const u=()=>{let t=localStorage.getItem("totalItemInCart");t=parseInt(t),t?localStorage.setItem("totalItemInCart",t+a.quantity):localStorage.setItem("totalItemInCart",a.quantity)},I=()=>{itemInCart=localStorage.getItem(l._id),itemInCart=JSON.parse(itemInCart),null!==itemInCart?(null==itemInCart[a.color]&&(a.quantity/=2,itemInCart={...itemInCart,[a.color]:a}),itemInCart[a.color].quantity+=a.quantity):itemInCart={[a.color]:a},localStorage.setItem(l._id,JSON.stringify(itemInCart))},g=()=>{let t=localStorage.getItem("totalCost");null!=t?(t=parseInt(t),localStorage.setItem("totalCost",t+a.price*a.quantity)):localStorage.setItem("totalCost",a.price*a.quantity)}})).catch((o=>{if(null===localStorage.getItem("totalItemInCart")){document.getElementById("displayTotalItem").textContent="Cart (0)"}else document.getElementById("displayTotalItem").textContent="Cart ("+localStorage.getItem("totalItemInCart")+")";if(console.log(o),e.setAttribute("hidden","true"),n.removeAttribute("hidden"),o){let t=document.getElementById("teddyDetails");t.classList.remove("col-xl-6"),t.className="overflow-auto text-center m-auto p-5",document.getElementById("item").removeChild(t.previousElementSibling),t.innerHTML="Teddy Not Found"}else{let e=document.getElementById("teddyDetails");e.classList.remove("col-xl-6"),e.className="overflow-auto text-center m-auto p-5",t.removeChild(e.previousElementSibling),e.innerHTML="Error: Network Error"}}))}else t.removeChild(e),n.removeAttribute("hidden"),window.document.addEventListener("DOMContentLoaded",(()=>{if(null===localStorage.getItem("totalItemInCart")){document.getElementById("displayTotalItem").textContent="Cart (0)"}else document.getElementById("displayTotalItem").textContent="Cart ("+localStorage.getItem("totalItemInCart")+")";let t=document.getElementById("teddyDetails");t.classList.remove("col-xl-6"),t.className="overflow-auto text-center m-auto p-5",document.getElementById("item").removeChild(t.previousElementSibling),t.innerHTML="No connection"}))}},function(t){var e;e=104,t(t.s=e)}]);