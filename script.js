const products = [
  {id:1,name:"X-Burger",cat:"hamburgueres",price:24.90,emoji:"🍔",desc:"Pão, hambúrguer, queijo e molho especial."},
  {id:2,name:"X-Salada",cat:"hamburgueres",price:27.90,emoji:"🥬",desc:"Hambúrguer, queijo, salada e molho."},
  {id:3,name:"X-Bacon",cat:"hamburgueres",price:29.90,emoji:"🥓",desc:"Hambúrguer, queijo, bacon e molho."},
  {id:4,name:"Sanduíche Especial",cat:"sanduiches",price:26.90,emoji:"🥪",desc:"Sanduíche artesanal com recheio especial."},
  {id:5,name:"Porção de Batata",cat:"porcoes",price:18.90,emoji:"🍟",desc:"Batatas crocantes para acompanhar."},
  {id:6,name:"Batata com Bacon",cat:"porcoes",price:27.90,emoji:"🍟",desc:"Batata, bacon e queijo."},
  {id:7,name:"Refrigerante",cat:"bebidas",price:7.00,emoji:"🥤",desc:"Escolha o seu sabor."},
  {id:8,name:"Suco",cat:"bebidas",price:9.00,emoji:"🧃",desc:"Bebida refrescante."},
  {id:9,name:"Água",cat:"bebidas",price:4.00,emoji:"💧",desc:"Água mineral."}
];

let cart = [];

const productsEl = document.getElementById("products");
const countEl = document.getElementById("cartCount");
const modal = document.getElementById("cartModal");

function money(v){
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function renderProducts(category="todos"){
  productsEl.innerHTML = products
    .filter(p => category==="todos" || p.cat===category)
    .map(p=>`
      <article class="product">
        <div class="product-img">${p.emoji}</div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="product-row">
            <span class="price">${money(p.price)}</span>
            <button class="add" onclick="addToCart(${p.id})">+</button>
          </div>
        </div>
      </article>
    `).join("");
}

function addToCart(id){
  const item = products.find(p=>p.id===id);
  cart.push(item);
  updateCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

function updateCart(){
  countEl.textContent=cart.length;

  const items=document.getElementById("cartItems");
  const total=cart.reduce((sum,p)=>sum+p.price,0);

  items.innerHTML=cart.length
    ? cart.map((p,i)=>`
      <div class="cart-line">
        <span>${p.emoji} ${p.name}</span>
        <span>
          ${money(p.price)}
          <button onclick="removeFromCart(${i})">remover</button>
        </span>
      </div>
    `).join("")
    : `<p style="color:#77746d;font-size:13px;padding:15px 0">
        Seu pedido está vazio.
      </p>`;

  document.getElementById("cartTotal").textContent=money(total);
}

document.querySelectorAll(".categories button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".categories button")
      .forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

document.getElementById("cartBtn").onclick=()=>{
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
};

document.getElementById("closeCart").onclick=()=>{
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
};

modal.addEventListener("click",e=>{
  if(e.target===modal) modal.classList.remove("show");
});

document.getElementById("whatsappBtn").onclick=()=>{
  if(!cart.length){
    return alert("Adicione pelo menos um item ao pedido.");
  }

  const total=cart.reduce((s,p)=>s+p.price,0);

  const lines=cart
    .map(p=>`• ${p.name} — ${money(p.price)}`)
    .join("\n");

  const message=
    `Olá! Gostaria de fazer um pedido na Nova Major:\n\n` +
    `${lines}\n\n` +
    `Total: ${money(total)}`;

  const phone="5511999999999";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

document.getElementById("menuBtn").onclick=()=>{
  document.getElementById("nav").classList.toggle("open");
};

document.querySelectorAll(".nav a").forEach(a=>{
  a.onclick=()=>{
    document.getElementById("nav").classList.remove("open");
  };
});

renderProducts();
updateCart();
