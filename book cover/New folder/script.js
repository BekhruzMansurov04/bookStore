let sun = document.querySelector("#sun"),
  moon = document.querySelector("#moon"),
  body = document.querySelector("body"),
  cart = document.querySelector("#cart"),
  closeShopping = document.querySelector(".closeShopping"),
  list = document.querySelector(".product-right-bottom"),
  navMenu = document.getElementById("nav_menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  listCard = document.querySelector(".listCard"),
  quantity = document.querySelector(".quantity"),
  likeButtons = document.querySelectorAll(".ri-heart-line"),
  addToCartButtons = document.querySelectorAll(".addToCart"),
  cartItems = JSON.parse(localStorage.getItem("cart")) || [],
  likedItems = JSON.parse(localStorage.getItem("likes")) || [];

// ============= Menu Bar ==============
navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));

let user = document.getElementById("user1");
user.addEventListener("click", () => window.location.href = "signup.html");

// ============= Dark Mode ==============
const toggleTheme = () => {
  body.classList.toggle("darkLight");
  sun.classList.toggle("hide");
  moon.classList.toggle("hide");
};
sun.addEventListener("click", toggleTheme);
moon.addEventListener("click", toggleTheme);

// ============= Shopping Cart Toggle ==============
cart.addEventListener("click", () => body.classList.toggle("active"));
closeShopping.addEventListener("click", () => body.classList.remove("active"));

// ============= Add to Cart Functionality ==============
function addToCart(index) {
  let book = books[index];
  let itemIndex = cartItems.findIndex((item) => item.id === book.id);
  
  if (itemIndex === -1) {
    cartItems.push({ ...book, quantity: 1 });
  } else {
    cartItems[itemIndex].quantity++;
  }
  
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

// ============= Update Cart UI ==============
function updateCart() {
  listCard.innerHTML = "";
  let totalQuantity = 0;
  
  cartItems.forEach((item, index) => {
    listCard.innerHTML += `
      <li>
        <img src="${item.image}" alt="${item.title}" />
        <span>${item.title}</span>
        <span>Qty: ${item.quantity}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      </li>
    `;
    totalQuantity += item.quantity;
  });
  
  quantity.innerText = totalQuantity;  // Update cart quantity count
}

// ============= Remove From Cart ==============
function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

// ============= Like Functionality ==============
function toggleLike(index, button) {
  let likedIndex = likedItems.indexOf(index);
  
  if (likedIndex === -1) {
    likedItems.push(index);
    button.style.color = "red";
  } else {
    likedItems.splice(likedIndex, 1);
    button.style.color = "black";
  }
  
  localStorage.setItem("likes", JSON.stringify(likedItems));
}

// ============= Fetch Books and Display ==============
function fetchBooks() {
  fetch("https://fakerapi.it/api/v2/books?_quantity=24")
    .then(response => response.json())
    .then(data => displayBooks(data.data))
    .catch(error => console.error("Error fetching books:", error));
}

function displayBooks(books) {
  list.innerHTML = "";

  let randomImages = [
"https://images.unsplash.com/photo-1529590003495-b2646e2718bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2slMjBnZW5yZXN8ZW58MHx8MHx8fDA%3D",
"https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ6EO4caRrtQkHq2YBXezwxuOiYNP4rD1evg&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSumTR2WO4rEfHmeY4sFp6-KMfLIJasCzohZA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnCz7Xe0GujbdQTvtgeVtn7cuuqGJqrZ9-Q&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfxrcUtlaLqSTTpA7N9cWKIopvRNtXngM2A&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykNuuaHS_kE8nVDnfRYGMfW6oO2KSOtFpfw&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzRqLAJzXdQtPqYzdxEVfeb5VZ4US-2RtNew&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7ekxu3OzvIQLn2K9bnYPHvNlHiVnR216eg&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMGbpVtCBhnqK8mnD9c7IyhoH7lJqeLqZtg&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXNdjG4edgJagTsZzf5Os2gRl-rUz-8u70w&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37tp1S08PT_YK24xp3xTsaMB_ScUKAN-Wsw&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFde05zyTI_17rOJ75bLhdNJTabz8DXNk2Q&s",
"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/kindle-ebook-book-cover-path-in-forest-design-template-d89f870c1425191ef3a23a392f7f1fe7_screen.jpg?ts=1637009210",
"https://i0.wp.com/www.paperandsage.com/wp-content/uploads/2020/02/200212TA01.jpg?fit=400%2C630&ssl=1",
"https://thebookcoverdesigner.com/wp-content/uploads/2024/11/t-all-lost-things-324x519.jpg",
"https://thebookcoverdesigner.com/wp-content/uploads/2022/04/departure-from-track-1-324x519.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgfY1xrROsfHRWiS6uCb1Ou5qrvSfK1fmVJL1-G8mn1YMvDHo51q-GKyigl15QJForeg&usqp=CAU",
"https://thebookcoverdesigner.com/wp-content/uploads/2019/11/Apocalypse-Post-Apocalyptic-Action-Military-Premade-Book-Cover-After.jpg",
"https://www.bookcoversart.com/wp-content/uploads/2018/03/Tomorrows-Dawn-4-Post-Apocalyptic-Dystopian-SciFi-SF-Book-Cover.jpg",
"https://m.media-amazon.com/images/I/51XTCop+G0L._SL500_.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fBh3vbGWNnZUtDlqRRv7eqmLM9KQe6tht4FMdVCu0LGjQnbrraw5Ux-UkUSxVq21ltM&usqp=CAU",
"https://dcassetcdn.com/design_img/894043/92203/92203_5562138_894043_image.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWia-gpDhS1GwEOQBa4FYSJ_THZSECDPNle7XOwTrGHDJwyqVdCSvOaGK5NPnh-aMd9_s&usqp=CAU"
  ];

  books.forEach((book, index) => {
    let imageUrl = randomImages[Math.floor(Math.random() * randomImages.length)];

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <div class="book-image">
        <img src="${imageUrl}" alt="Book Cover" class="book-imagish" />
      </div>
      <div class="book-details">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-price">
          <span class="book-price-symbol">$</span>${(Math.random() * 20 + 5).toFixed(2)}
        </div>
        <div class="buttons">
          <button class="addToCart">Add to cart</button>
          <i class="ri-heart-line like-btn"></i>
        </div>
      </div>
    `;

    list.appendChild(bookCard);

    let addToCartButton = bookCard.querySelector(".addToCart");
    let likeButton = bookCard.querySelector(".like-btn");

    addToCartButton.addEventListener("click", function () {
      addToCart(index);
    });

    likeButton.addEventListener("click", function () {
      toggleLike(index, likeButton);
    });

    if (likedItems.includes(index)) {
      likeButton.style.color = "red";  // Keep liked books red after reload
    }
  });
}

// ============= Initialize Everything ==============
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
  updateCart();
});

