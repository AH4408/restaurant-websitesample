// Helper function to get current order from localStorage
function getOrder() {
    return JSON.parse(localStorage.getItem('order')) || [];
}

// Helper function to save updated order to localStorage
function saveOrder(order) {
    localStorage.setItem('order', JSON.stringify(order));
}

// Add event listeners after DOM is fully loaded
window.onload = function () {
    
 // Only clear order once per session
 if (!sessionStorage.getItem('orderCleared')) {
    localStorage.removeItem('order');
    sessionStorage.setItem('orderCleared', 'true');
}
    const addButtons = document.querySelectorAll('.add-button');
    const removeButtons = document.querySelectorAll('.remove-button');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.menu-item');
            const name = item.querySelector('h3').innerText.trim();
            const priceText = item.querySelector('.price').innerText.trim();
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

            let order = getOrder();

            let existingItem = order.find(i => i.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                order.push({ name, price, quantity: 1 });
            }

            saveOrder(order);
            alert(`${name} added to order`);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.menu-item');
            const name = item.querySelector('h3').innerText.trim();

            let order = getOrder();

            // ❗ Filter out only the selected item
            order = order.filter(i => i.name !== name);

            saveOrder(order);
            alert(`${name} removed from order`);
        });
    });
     const clearOrderBtn = document.getElementById('clear-order-btn');
    if (clearOrderBtn) {
        clearOrderBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear the order?")) {
                localStorage.removeItem('order');
                sessionStorage.removeItem('orderCleared');
                alert("Order has been cleared.");
            }
        });
    }

};
