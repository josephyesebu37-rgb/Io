
// Simple frontend cart and product logic
const PRODUCTS = [
  {id:1, title:"Murrel Fry Pack (1 kg)", price:120, img:"https://images.unsplash.com/photo-1514516870924-4f8587b6b9a4?q=80&w=1200&auto=format&fit=crop&crop=entropy", category:"Seeds", desc:"High survival fry ideal for new ponds."},
  {id:2, title:"Fingerlings Pack (1 kg)", price:220, img:"https://images.unsplash.com/photo-1506266190280-8b8a5a6b8f9b?q=80&w=1200&auto=format&fit=crop&crop=entropy", category:"Seeds", desc:"Robust fingerlings for stocking and growth."},
  {id:3, title:"Premium Selected Batch (1 kg)", price:350, img:"https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop&crop=entropy", category:"Seeds", desc:"Top genetics for commercial success."},
  {id:4, title:"Fish Feed (5 kg)", price:450, img:"https://images.unsplash.com/photo-1604908177522-0b4d5b2f5b7a?q=80&w=1200&auto=format&fit=crop&crop=entropy", category:"Feed", desc:"High-protein feed for growth."},
  {id:5, title:"Pond Net (1 unit)", price:250, img:"https://images.unsplash.com/photo-1508873696983-2dfd5898f0f4?q=80&w=1200&auto=format&fit=crop&crop=entropy", category:"Equipment", desc:"Durable net for harvesting."}
];

function formatPrice(n){ return "₹" + n.toFixed(0); }
function saveCart(cart){ localStorage.setItem("mf_cart", JSON.stringify(cart)); updateCartCount(); }
function loadCart(){ return JSON.parse(localStorage.getItem("mf_cart") || "[]"); }
function updateCartCount(){ const c = loadCart().reduce((s,i)=>s+i.qty,0); const el = document.getElementById("cartCount"); if(el) el.textContent = c; }

// Render products into a container (by id)
function renderProducts(containerId, products){ const container = document.getElementById(containerId); if(!container) return; container.innerHTML = ""; products.forEach(p=>{ const div=document.createElement("div"); div.className="product"; div.innerHTML = `<img src="${p.img}" alt=""><h3>${p.title}</h3><p class="muted">${p.desc}</p><div class="price">${formatPrice(p.price)}</div><button class="add-btn" onclick="addToCart(${p.id})">Add to cart</button>`; container.appendChild(div); }); }

function addToCart(id){ const p = PRODUCTS.find(x=>x.id===id); if(!p) return; let cart = loadCart(); const existing = cart.find(i=>i.id===id); if(existing){ existing.qty += 1; } else { cart.push({id:p.id,title:p.title,price:p.price,qty:1}); } saveCart(cart); alert(p.title + " added to cart"); }

// Cart page rendering
function renderCart(){ const container = document.getElementById("cartContainer"); if(!container) return; let cart = loadCart(); if(cart.length===0){ container.innerHTML = "<p>Your cart is empty.</p>"; return; } let html = '<table style="width:100%;border-collapse:collapse"><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th><th></th></tr>'; let total=0; cart.forEach(item=>{ const rowTotal = item.price * item.qty; total += rowTotal; html += `<tr><td style="padding:8px">${item.title}</td><td style="text-align:center">${item.qty}</td><td style="text-align:right">${formatPrice(item.price)}</td><td style="text-align:right">${formatPrice(rowTotal)}</td><td style="text-align:center"><button onclick="removeItem(${item.id})">Remove</button></td></tr>`; }); html += `<tr><td colspan="3" style="text-align:right;font-weight:800;padding:8px">Grand Total</td><td style="text-align:right;font-weight:800">${formatPrice(total)}</td><td></td></tr></table>`; html += `<div style="margin-top:12px"><button class="btn" onclick="checkout()">Checkout via WhatsApp</button></div>`; container.innerHTML = html; }

function removeItem(id){ let cart = loadCart(); cart = cart.filter(i=>i.id!==id); saveCart(cart); renderCart(); }

function checkout(){ const cart = loadCart(); if(cart.length===0){ alert("Cart is empty."); return; } let msg = "Order from Murrel Fish Seeds%0A"; cart.forEach(i=>{ msg += `${i.qty}x ${encodeURIComponent(i.title)} - ₹${i.price*i.qty}%0A`; }); msg += "%0ATotal: ₹" + cart.reduce((s,i)=>s+i.price*i.qty,0); const url = "https://wa.me/919505329034?text=" + msg; window.open(url,"_blank"); }
window.addEventListener('load', updateCartCount);
