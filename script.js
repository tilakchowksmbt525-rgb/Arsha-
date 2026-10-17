
let cart = [];

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
}

function changeQuantity(name, amount) {
  const item = cart.find(product => product.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.name !== name);
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const countElement = document.getElementById("cart-count");

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
  } else {
    cartItems.innerHTML = cart.map(item => {
      total += item.price * item.quantity;
      count += item.quantity;

      return `
        <div class="cart-row">
          <span>${item.name} × ${item.quantity}</span>
          <span>₹${item.price * item.quantity}</span>
          <button onclick="changeQuantity('${item.name}', -1)">−</button>
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
        </div>
      `;
    }).join("");
  }

  totalElement.textContent = total;
  countElement.textContent = count;
}

function placeOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (cart.length === 0) {
    alert("Please add at least one nail design to your cart.");
    return;
  }

  if (!name || !address) {
    alert("Please enter your name and delivery address.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const orderDetails = cart.map(item =>
    `${item.name} x ${item.quantity} = Rs. ${item.price * item.quantity}`
  ).join("\n");

  const message =
    `Hello Pink Tips! I want to place an order.\n\n` +
    `Name: ${name}\n` +
    `Address: ${address}\n\n` +
    `Order:\n${orderDetails}\n\n` +
    `Total: Rs. ${total}`;

  // Replace this with your WhatsApp number:
  const whatsappNumber = "919876543210";

  const url = "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

updateCart();
