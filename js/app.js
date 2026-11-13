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

function loadProducts() { 
    fetch('services/product_service.php') 
    .then(response => response.json()) 
    .then(products => { 
        let productList = document.getElementById('productList'); 
        let productSelect = document.querySelector('#orderForm select'); 
        products.forEach(product => { 
            // Display products 
            let productItem = document.createElement('div'); 
            productItem.innerHTML = `<strong>${product.name}</strong> - ${product.price} (Stock: ${product.stock})`; 
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

// Optional: Simple navigation 
document.querySelectorAll('nav ul li a').forEach(link => { 
    link.addEventListener('click', function(e) { 
        e.preventDefault(); 
        document.querySelectorAll('section').forEach(sec => sec.style.display = 'none'); 
        let target = this.getAttribute('href').substring(1); 
        document.getElementById(target).style.display = 'block'; 
    }); 
});