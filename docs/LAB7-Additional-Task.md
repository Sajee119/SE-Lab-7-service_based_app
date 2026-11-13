# Additional Task: Stock Management in Service-Based Architecture

In addition to the previous lab on *Commercial Aspects and Economy of Service-Based Architectures*, this task adds functionality to manage available stock for products and handle orders that exceed available stock.

This task involves modifying `product_service.php`, `order_service.php`, and `app.js` to track, update, and validate product stock levels when an order is placed. If the ordered quantity is greater than available stock, an error message will display.

## Step 1: Modify `product_service.php` to Include Stock Information

Add a `stock` field to each product to represent available quantities. Example:

```php
// services/product_service.php
<?php
header('Content-Type: application/json');

// Products with stock quantities
$products = [
    ['id' => 1, 'name' => 'Laptop', 'price' => 999, 'stock' => 10],
    ['id' => 2, 'name' => 'Smartphone', 'price' => 599, 'stock' => 5],
    ['id' => 3, 'name' => 'Tablet', 'price' => 399, 'stock' => 8],
];

echo json_encode($products);
?>
```

## Step 2: Modify `order_service.php` to Update and Check Stock Levels

```php
// services/order_service.php
<?php
header('Content-Type: application/json');

// Simulated product inventory (replace with database in a real app)
$products = [
    1 => ['name' => 'Laptop', 'price' => 999, 'stock' => 10],
    2 => ['name' => 'Smartphone', 'price' => 599, 'stock' => 5],
    3 => ['name' => 'Tablet', 'price' => 399, 'stock' => 8],
];

// Get product ID and quantity from the request
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];

// Check if the product exists
if (isset($products[$product_id])) {
    $product = &$products[$product_id]; // Reference the specific product

    // Check stock availability
    if ($quantity <= $product['stock']) {
        // Reduce stock and confirm the order
        $product['stock'] -= $quantity;
        $order = [
            'order_id' => uniqid(),
            'product_id' => $product_id,
            'quantity' => $quantity,
            'status' => 'confirmed',
            'remaining_stock' => $product['stock'],
        ];
        echo json_encode($order);
    } else {
        // If quantity exceeds stock, return an error
        echo json_encode(['status' => 'error', 'message' => 'Requested quantity exceeds available stock.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Product not found']);
}
?>
```

## Step 3: Modify `app.js` to Handle Stock Response

Update the JavaScript file to display an alert if the stock is insufficient. Example:

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
            alert(`Order ${order.order_id} confirmed! Remaining stock: ${order.remaining_stock}`);
        } else if (order.status === 'error') {
            alert('Order failed: ' + order.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
```

> **Note:** The stock level in this demo is reset on every request because the `$products` array is redefined inside `order_service.php`. In a real application, stock would be persisted in a database or file so that it remains consistent across requests.