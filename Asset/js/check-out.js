document.addEventListener('DOMContentLoaded', function () {
    const deliveryCost = 30000; // Phí vận chuyển cố định
    const cartItemsContainer = document.getElementById("cart-items");
    const itemTotalElement = document.getElementById("item-total");
    const totalPriceElement = document.getElementById("total-price");
    const cardDetails = document.getElementById("card-details");
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');

    const carts = JSON.parse(localStorage.getItem("carts")) || [];

    // Hiển thị giỏ hàng
    if (carts.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Giỏ hàng trống</td></tr>';
        itemTotalElement.innerText = "0₫";
        totalPriceElement.innerText = "0₫";
        return;
    }

    fetch("/products.json")
        .then(response => response.json())
        .then(data => {
            const allProducts = Object.values(data.categories).flat();
            let totalItemCost = 0;

            carts.forEach(cartItem => {
                const product = allProducts.find(product => product.product_ID === parseInt(cartItem.id));
                if (product) {
                    const itemCost = product.product_price * 1000 * cartItem.quantity;
                    totalItemCost += itemCost;

                    const row = `
                        <tr>
                            <td><img src="${product.product_image_path}" alt="${product.product_title}"></td>
                            <td>${product.product_title}</td>
                            <td>${(product.product_price * 1000).toLocaleString()}₫</td>
                            <td>${cartItem.quantity}</td>
                            <td>${itemCost.toLocaleString()}₫</td>
                        </tr>
                    `;
                    cartItemsContainer.innerHTML += row;
                }
            });

            itemTotalElement.innerText = `${totalItemCost.toLocaleString()}₫`;
            totalPriceElement.innerText = `${(totalItemCost + deliveryCost).toLocaleString()}₫`;
        })
        .catch(error => console.error("Lỗi khi tải sản phẩm:", error));

    // Hiển thị thông tin thẻ khi chọn thanh toán qua thẻ
    paymentMethods.forEach(method => {
        method.addEventListener('change', function () {
            cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
        });
    });

    // Xử lý nút Đặt Hàng
    document.querySelector('.btn-danger').addEventListener('click', function () {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedMethod) {
            alert("Vui lòng chọn phương thức thanh toán!");
            return;
        }

        const order = {
            items: carts,
            deliveryCost: deliveryCost,
            totalPrice: document.getElementById("total-price").innerText,
            paymentMethod: selectedMethod.value,
            orderDate: new Date().toISOString(),
        };

        if (selectedMethod.value === 'card') {
            const cardNumber = document.getElementById("card-number").value.trim();
            const expiryDate = document.getElementById("expiry-date").value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (!cardNumber || !expiryDate || !cvv) {
                alert("Vui lòng điền đầy đủ thông tin thẻ!");
                return;
            }

            if (!/^\d{16}$/.test(cardNumber)) {
                alert("Số thẻ không hợp lệ! (phải là 16 chữ số)");
                return;
            }

            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                alert("Ngày hết hạn không hợp lệ! (định dạng MM/YY)");
                return;
            }

            if (!/^\d{3}$/.test(cvv)) {
                alert("CVV không hợp lệ! (phải là 3 chữ số)");
                return;
            }
        }

        // Lưu đơn hàng vào localStorage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Xóa giỏ hàng sau khi đặt hàng
        localStorage.removeItem("carts");

        // Chuyển hướng sang trang thanh toán thành công
        window.location.href = "../html/success.html";
    });
});
