<?php 
    header('Content-Type: application/json'); 
    $products = [ 
        ['id' => 1, 'name' => 'Laptop', 'price' => 999, 'stock' => 10],
        ['id' => 2, 'name' => 'Smartphone', 'price' => 599, 'stock' => 5],
        ['id' => 3, 'name' => 'Tablet', 'price' => 399, 'stock' => 8],
    ]; 
    echo json_encode($products); 
?>