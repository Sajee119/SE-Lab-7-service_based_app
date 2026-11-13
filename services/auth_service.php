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