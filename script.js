const products = {
  gpu:{name:"GPU Performance X",price:2899,category:"Placas de vídeo"},
  cpu:{name:"CPU Core Boost 7",price:1599,category:"Processadores"},
  board:{name:"Placa-mãe Nexus Pro",price:899,category:"Placas-mãe"},
  ram:{name:"Kit Essential",price:699,category:"Memória e armazenamento"},
  ssd:{name:"SSD NVMe M.2",price:449,category:"Memória e armazenamento"}
};
let cart = JSON.parse(localStorage.getItem("nexusCart") || "{}");
const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $ = s => document.querySelector(s);
function saveCart(){localStorage.setItem("nexusCart",JSON.stringify(cart));renderCart();}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();const count=Object.values(cart).reduce((a,b)=>a+b,0);$("#cartCount").textContent=count;}
function renderCart(){
  const entries=Object.entries(cart).filter(([id,q])=>products[id]&&q>0);
  const count=entries.reduce((a,[id,q])=>a+q,0);$("#cartCount").textContent=count;
  const target=$("#cartItems");
  if(!entries.length){target.innerHTML='<p class="empty-cart">Seu carrinho está vazio. Explore a loja para adicionar produtos.</p>';}
  else target.innerHTML=entries.map(([id,q])=>`<div class="cart-row"><div><h4>${products[id].name}</h4><small>${money(products[id].price)} por unidade</small></div><div class="quantity"><button data-action="minus" data-id="${id}" aria-label="Diminuir">−</button><b>${q}</b><button data-action="plus" data-id="${id}" aria-label="Aumentar">+</button></div><strong>${money(products[id].price*q)}</strong><button class="remove" data-action="remove" data-id="${id}">Remover</button></div>`).join("");
  const total=entries.reduce((a,[id,q])=>a+products[id].price*q,0);$("#subtotal").textContent=money(total);$("#total").textContent=money(total);
}
document.addEventListener("click",e=>{
 const add=e.target.closest(".add-cart");if(add){addToCart(add.dataset.id);add.textContent="Adicionado ✓";setTimeout(()=>{add.textContent=add.dataset.id==="gpu"?"Adicionar ao carrinho — R$ 2.899":"Adicionar ao carrinho";},1100);}
 const action=e.target.closest("[data-action]");if(action){const id=action.dataset.id;if(action.dataset.action==="plus")cart[id]=(cart[id]||0)+1;if(action.dataset.action==="minus")cart[id]=Math.max(0,(cart[id]||0)-1);if(action.dataset.action==="remove")delete cart[id];if(cart[id]===0)delete cart[id];saveCart();}
});
$("#headerCart").addEventListener("click",()=>$("#carrinho").scrollIntoView({behavior:"smooth"}));
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav");nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",nav.classList.contains("open"));});
$("#mainNav").addEventListener("click",e=>{if(e.target.tagName==="A"){$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}});
function filterProducts(){const term=$("#searchInput").value.toLowerCase();const cat=$("#categoryFilter").value;let shown=0;document.querySelectorAll(".product-card").forEach(card=>{const ok=card.dataset.name.toLowerCase().includes(term)&&(cat==="all"||card.dataset.category===cat);card.classList.toggle("hidden",!ok);if(ok)shown++;});$("#resultCount").textContent=`${shown} produto(s) encontrado(s)`;$("#emptyState").classList.toggle("hidden",shown!==0);}
$("#searchInput").addEventListener("input",filterProducts);$("#categoryFilter").addEventListener("change",filterProducts);
$("#suggestionForm").addEventListener("submit",e=>{e.preventDefault();$("#formFeedback").textContent="Sugestão registrada nesta demonstração. Obrigado por compartilhar sua ideia!";e.target.reset();});
$("#checkoutBtn").addEventListener("click",()=>{if(!Object.keys(cart).length){alert("Seu carrinho está vazio. Adicione algum produto primeiro.");return;}alert("Esta é uma loja demonstrativa. Para comprar, entre em contato pelo WhatsApp (38) 99751-3319.");});
renderCart();