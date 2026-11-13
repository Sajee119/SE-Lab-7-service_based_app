<?php
// services/order_service.php
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