# Lab Manual: Commercial Aspects and Economy of Service-Based Architectures

## Objective

Understand the commercial aspects and economic benefits of service-based architectures. Experience how modularity and reusability in services can lead to cost savings. Implement a simple web application using HTML, CSS, JavaScript, and PHP that demonstrates a service-based architecture.

## Lab Overview

In this lab, you will build a simple web application that simulates a service-based architecture. The application will consist of separate services for user authentication, product catalog management, and order processing. By the end of the lab, you'll understand how separating functionalities into services can lead to economic benefits such as reduced development costs and improved scalability.

## Lab Steps

### Part 1: Setup (10 minutes)

#### 1. Create Project Structure

Create a new folder named `service_based_app`. Inside this folder, create the following subfolders:

```
service_based_app/
├── css/
├── images/
├── js/
├── services/
└── index.html
```

#### 2. Initialize Files

- In the `css` folder, create a file named `style.css`.
- In the `js` folder, create a file named `app.js`.
- In the `services` folder, you'll add PHP files later.

### Part 2: Front-End Development (15 minutes)

#### 1. `index.html`

Open `index.html` and set up the basic HTML structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title>Service-Based App</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">Order</a></li>
    </ul>
  </nav>
  <section id="home">
    <h2>Welcome to Our Store</h2>
    <form id="loginForm">
      <h3>Login</h3>
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </section>
  <section id="products" style="display:none;">
    <h2>Product Catalog</h2>
    <div id="productList"></div>
  </section>
  <section id="order" style="display:none;">
    <h2>Place an Order</h2>
    <form id="orderForm">
      <select name="product_id" required></select>
      <input type="number" name="quantity" placeholder="Quantity" min="1" required>
      <button type="submit">Order Now</button>
    </form>
  </section>
  <script src="js/app.js"></script>
</body>
</html>
```

#### 2. `style.css`

```css
/* style.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

nav {
    background-color: #333;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

nav li {
    float: left;
}

nav li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

nav li a:hover {
    background-color: #111;
}

section {
    padding: 20px;
}

form {
    max-width: 300px;
    margin: auto;
}

input, select {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
}

button:hover {
    background-color: #218838;
}
```

### Part 4: PHP Service Creation (20 minutes)

#### 1. Authentication Service (`auth_service.php`)

```php
<?php
header('Content-Type: application/json');
$valid_user = 'admin';
$valid_pass = 'password';
$username = $_POST['username'];
$password = $_POST['password'];
if ($username === $valid_user && $password === $valid_pass) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'fail']);
}
?>
```

#### 2. Product Catalog Service (`product_service.php`)

```php
<?php
header('Content-Type: application/json');
$products = [
    ['id' => 1, 'name' => 'Laptop', 'price' => 999],
    ['id' => 2, 'name' => 'Smartphone', 'price' => 599],
    ['id' => 3, 'name' => 'Tablet', 'price' => 399],
];
echo json_encode($products);
?>
```

#### 3. Order Processing Service (`order_service.php`)

```php
<?php
header('Content-Type: application/json');
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];
if ($product_id && $quantity) {
    $order = [
        'order_id' => uniqid(),
        'product_id' => $product_id,
        'quantity' => $quantity,
        'status' => 'confirmed',
    ];
    echo json_encode($order);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
```

### Part 5: Front-End and Back-End Integration (15 minutes)

#### JavaScript for User Authentication

In `app.js`, handle the login process.

```javascript
// js/app.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    fetch('services/auth_service.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Login successful!');
            document.getElementById('home').style.display = 'none';
            document.getElementById('products').style.display = 'block';
            loadProducts();
        } else {
            alert('Login failed. Try again.');
        }
    })
    .catch(error => console.error('Error:', error));
});
```

#### JavaScript for Loading Products

Add the `loadProducts` function to fetch and display products.

```javascript
function loadProducts() {
    fetch('services/product_service.php')
    .then(response => response.json())
    .then(products => {
        let productList = document.getElementById('productList');
        let productSelect = document.querySelector('#orderForm select');

        products.forEach(product => {
            // Display products
            let productItem = document.createElement('div');
            productItem.innerHTML = `<strong>${product.name}</strong> - ${product.price}`;
            productList.appendChild(productItem);

            // Populate select options
            let option = document.createElement('option');
            option.value = product.id;
            option.text = product.name;
            productSelect.add(option);
        });
    })
    .catch(error => console.error('Error:', error));
}
```

#### JavaScript for Order Processing

Handle order submissions.

```javascript
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    fetch('services/order_service.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(order => {
        if (order.status === 'confirmed') {
            alert(`Order ${order.order_id} confirmed!`);
        } else {
            alert('Order failed. ' + order.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
```

#### Navigation Handling (Optional)

Add event listeners to navigation links to show/hide sections.

```javascript
// Optional: Simple navigation
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
        let target = this.getAttribute('href').substring(1);
        document.getElementById(target).style.display = 'block';
    });
});
```

> **Note:** The JavaScript code for "Loading Products," "Order Processing," and "Navigation Handling" should be placed in the `app.js` file in the `js` folder, as it's the main JavaScript file for this lab. Here's how to organize the code:
>
> 1. **JavaScript for Loading Products:** This code should be included within the `app.js` file and can be placed after the user authentication code. It's triggered after a successful login to dynamically load products from the product service.
> 2. **JavaScript for Order Processing:** Place this code in `app.js` after the "Loading Products" code. This code handles form submissions for the order form and should be added so it can be executed when a user places an order.
> 3. **JavaScript for Navigation Handling (Optional):** This code can be placed at the end of `app.js` and is responsible for navigating between different sections of the page when users click links. This part is optional and is intended to improve the user experience by showing or hiding different sections.

### Part 6: Discussion and Reflection (10 minutes)

After completing the implementation, take time to reflect on the commercial aspects and economic benefits of the service-based architecture you just built.

#### 1. Discussion Points

- **Modularity:** How did separating functionalities into different services affect the development process? Discuss how this modularity can reduce development time and costs in a real-world scenario.
- **Reusability:** Consider how these services could be reused in other applications. How does reusability contribute to cost savings?
- **Scalability:** How can each service be scaled independently based on demand? What are the economic advantages of being able to scale services individually?
- **Maintenance:** How does having separate services simplify updates and maintenance? Discuss the potential cost benefits of easier maintenance.
- **Challenges and Trade-offs:** Were there any challenges in integrating the services? What trade-offs might exist between the initial development cost and long-term economic benefits?

## Deliverables

1. **Completed Code Files:** Submit your `index.html`, `style.css`, `app.js`, and all PHP service scripts.