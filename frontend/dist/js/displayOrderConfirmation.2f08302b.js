"use strict";(self.webpackChunkproject5_frontend=self.webpackChunkproject5_frontend||[]).push([[198],{4310:function(t,e,n){n.r(e);n(1454);let r=document.getElementById("orderConfirmation"),o=document.getElementById("displayTotalItem");if(navigator.onLine){(()=>{let t=document.createElement("h1");t.setAttribute("class","mb-5"),t.textContent="Thanks for your order!",r.appendChild(t);let e=JSON.parse(sessionStorage.getItem("orderDetail")).products,n=JSON.parse(sessionStorage.getItem("orderDetail")).contact,a=document.createElement("h2");a.textContent="Order Number:",r.appendChild(a);let d=document.createElement("p");d.textContent=JSON.parse(sessionStorage.getItem("orderDetail")).orderId,r.appendChild(d);let c=document.createElement("h2");c.textContent="Total Cost:",r.appendChild(c);let l=document.createElement("p");l.textContent="$"+(sessionStorage.getItem("orderTotalPrice")/100).toFixed(2),r.appendChild(l);let u=document.createElement("h2");u.textContent="Products List:",r.appendChild(u);let p=[];for(i=0;i<e.length;i++)p.push(e[i].name);var s={};p.forEach((t=>{s[t]=(s[t]||0)+1}));let m=document.createElement("p");m.textContent=Object.keys(s).map((t=>t+" x "+s[t])).join(", ")+".",r.appendChild(m);let h=document.createElement("h2");h.textContent="Contact Information:",r.appendChild(h);let f=document.createElement("p");f.textContent=n.firstName,r.appendChild(f);let C=document.createElement("p");C.textContent=n.lastName,r.appendChild(C);let x=document.createElement("p");x.textContent=n.address,r.appendChild(x);let v=document.createElement("p");v.textContent=n.city,r.appendChild(v);let E=document.createElement("p");E.textContent=n.email,r.appendChild(E),o.textContent="Cart (0)"})()}else window.document.addEventListener("DOMContentLoaded",(()=>{o.textContent="Cart (0)",r.innerHTML="No Connection"}))},6319:function(t,e,n){var r=n(8551),o=n(9539);t.exports=function(t,e,n,a){try{return a?e(r(n)[0],n[1]):e(n)}catch(e){o(t,"throw",e)}}},2529:function(t){t.exports=function(t,e){return{value:t,done:e}}},6279:function(t,e,n){var r=n(6840);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},9462:function(t,e,n){var r=n(9565),o=n(2360),a=n(6699),i=n(6279),d=n(8227),c=n(1181),l=n(5966),u=n(7657).IteratorPrototype,p=n(2529),s=n(9539),m=d("toStringTag"),h="IteratorHelper",f="WrapForValidIterator",C=c.set,x=function(t){var e=c.getterFor(t?f:h);return i(o(u),{next:function(){var n=e(this);if(t)return n.nextHandler();try{var r=n.done?void 0:n.nextHandler();return p(r,n.done)}catch(t){throw n.done=!0,t}},return:function(){var n=e(this),o=n.iterator;if(n.done=!0,t){var a=l(o,"return");return a?r(a,o):p(void 0,!0)}if(n.inner)try{s(n.inner.iterator,"normal")}catch(t){return s(o,"throw",t)}return o&&s(o,"normal"),p(void 0,!0)}})},v=x(!0),E=x(!1);a(E,m,"Iterator Helper"),t.exports=function(t,e){var n=function(n,r){r?(r.iterator=n.iterator,r.next=n.next):r=n,r.type=e?f:h,r.nextHandler=t,r.counter=0,r.done=!1,C(this,r)};return n.prototype=e?v:E,n}},713:function(t,e,n){var r=n(9565),o=n(9306),a=n(8551),i=n(1767),d=n(9462),c=n(6319),l=d((function(){var t=this.iterator,e=a(r(this.next,t));if(!(this.done=!!e.done))return c(t,this.mapper,[e.value,this.counter++],!0)}));t.exports=function(t){return a(this),o(t),new l(i(this),{mapper:t})}},1701:function(t,e,n){var r=n(6518),o=n(713);r({target:"Iterator",proto:!0,real:!0,forced:n(6395)},{map:o})},1454:function(t,e,n){n(1701)}},function(t){t.O(0,[4],(function(){return e=4310,t(t.s=e);var e}));t.O()}]);