// Tìm kiếm sản phẩm từ JSON
document.getElementById("search-icon").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.trim().toLowerCase();

    // Fetch dữ liệu từ JSON
    fetch('../../products.json') // Thay bằng đường dẫn chính xác đến tệp JSON
        .then(response => response.json())
        .then(data => {
            // Lấy toàn bộ sản phẩm từ tất cả các danh mục
            const allProducts = Object.values(data.categories).flat();

            // Lọc sản phẩm dựa trên từ khóa tìm kiếm
            const results = allProducts.filter(product =>
                product.product_title.toLowerCase().includes(query)
            );

            // Hiển thị kết quả
            if (results.length > 0) {
                alert(`Tìm thấy sản phẩm: ${results.map(product => product.product_title).join(", ")}`);
            } else {
                alert("Không tìm thấy sản phẩm nào!");
            }
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu JSON:", error));
});
