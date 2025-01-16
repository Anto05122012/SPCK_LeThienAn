// Hàm tính tổng tiền
function calculateTotal(carts) {
    const total = carts.reduce((sum, item) => sum + item.product_price * 1000 * item.quantity, 0);
    document.getElementById("total-price").innerText = `Tổng tiền: ${total.toLocaleString()}₫`;
}

// Hàm hiển thị giỏ hàng
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");

    // Lấy danh sách carts từ localStorage
    const carts = JSON.parse(localStorage.getItem("carts")) || [];

    if (carts.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng trống</td></tr>';
        document.getElementById("total-price").innerText = "Tổng tiền: 0₫";
        return;
    }

    // Fetch dữ liệu sản phẩm từ JSON
    fetch('/products.json')
        .then(response => response.json())
        .then(data => {
            const allProducts = Object.values(data.categories).flat();
            const enrichedCarts = carts.map(cartItem => {
                const product = allProducts.find(product => product.product_ID === parseInt(cartItem.id));
                return { ...product, quantity: cartItem.quantity };
            });

            // Hiển thị giỏ hàng
            cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ
            enrichedCarts.forEach((item, index) => {
                const { product_image_path, product_title, product_price, quantity } = item;

                const cartRow = document.createElement("tr");
                cartRow.innerHTML = `
                    <td><img src="${product_image_path}" alt="${product_title}" style="width: 80px; height: auto;"></td>
                    <td>${product_title}</td>
                    <td>${(product_price * 1000).toLocaleString()}₫</td>
                    <td>
                        <input type="number" min="1" value="${quantity}" class="form-control form-control-sm quantity-input" data-index="${index}">
                    </td>
                    <td>${(product_price * 1000 * quantity).toLocaleString()}₫</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Xóa</button>
                    </td>
                `;
                cartItemsContainer.appendChild(cartRow);
            });

            // Cập nhật tổng tiền
            calculateTotal(enrichedCarts);
        })
        .catch(error => console.error("Error fetching products:", error));
}

document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('orderButton');

    orderButton.addEventListener('click', () => {
        // Lấy danh sách carts từ localStorage
        const carts = JSON.parse(localStorage.getItem('carts')) || [];
        
        if (carts.length === 0) {
            // Hiển thị thông báo
            alert('Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
            return; // Ngừng thực hiện và không chuyển hướng
        }

        // Nếu giỏ hàng không trống, chuyển hướng
        window.location.href = '../html/check-out.html'; // Thay bằng đường dẫn trang bạn muốn chuyển tới
    });
});


// Xử lý thay đổi số lượng
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = parseInt(event.target.getAttribute("data-index"), 10);
        const newQuantity = parseInt(event.target.value, 10);

        if (newQuantity > 0) {
            const carts = JSON.parse(localStorage.getItem("carts")) || [];
            carts[index].quantity = newQuantity;

            localStorage.setItem("carts", JSON.stringify(carts)); // Lưu lại vào localStorage
            renderCart(); // Cập nhật lại giao diện
        }
    }
});

// Xử lý xóa sản phẩm
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const index = parseInt(event.target.getAttribute("data-index"), 10);

        const carts = JSON.parse(localStorage.getItem("carts")) || [];
        carts.splice(index, 1); // Xóa sản phẩm khỏi mảng

        localStorage.setItem("carts", JSON.stringify(carts)); // Lưu lại vào localStorage
        renderCart(); // Cập nhật lại giao diện
    }
});

// Gọi hàm hiển thị khi trang được tải
document.addEventListener("DOMContentLoaded", renderCart);