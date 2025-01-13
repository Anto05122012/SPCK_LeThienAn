
// Dữ liệu mẫu cho giỏ hàng
let cart = [
    { product_image_path: "../img/banh-tet.jpg", product_title: "Bánh Chưng Truyền Thống", product_price: 165, quantity: 2 },
    { product_image_path: "../img/ao-dai-nam.jpg", product_title: "Áo Dài Truyền Thống Nam", product_price: 400, quantity: 1 },
    { product_image_path: "../img/den-long.jpg", product_title: "Đèn Lồng Tết", product_price: 120, quantity: 3 }
];

// Hàm tính tổng tiền
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    document.getElementById("total-price").innerText = `Tổng tiền: ${total}k`;
}

// Hàm hiển thị giỏ hàng
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ

    cart.forEach((item, index) => {
        const { product_image_path, product_title, product_price, quantity } = item;

        const cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td><img src="${product_image_path}" alt="${product_title}" style="width: 80px; height: auto;"></td>
            <td>${product_title}</td>
            <td>${product_price}k</td>
            <td>
                <input type="number" min="1" value="${quantity}" class="form-control form-control-sm quantity-input" data-index="${index}">
            </td>
            <td>${product_price * quantity}k</td>
            <td>
                <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Xóa</button>
            </td>
        `;
        cartItemsContainer.appendChild(cartRow);
    });

    calculateTotal(); // Cập nhật tổng tiền
}

// Xử lý thay đổi số lượng
document.addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = event.target.getAttribute("data-index");
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            renderCart(); // Cập nhật lại giao diện
        }
    }
});

// Xử lý xóa sản phẩm
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        renderCart(); // Cập nhật lại giao diện
    }
});

// Gọi hàm hiển thị khi trang được tải
document.addEventListener("DOMContentLoaded", renderCart);

