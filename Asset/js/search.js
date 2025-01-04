// Lấy danh sách sản phẩm giả lập
const products = [
    { id: 1, name: "Bánh Chưng Truyền Thống" },
    { id: 2, name: "Hộp Mứt Tết Thập Cẩm" },
    { id: 3, name: "Trà Sen Tết" }
];

// Xử lý tìm kiếm
document.getElementById("search-icon").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const results = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );// Lấy danh sách sản phẩm giả lập
    const products = [
        { id: 1, name: "Bánh Chưng Truyền Thống" },
        { id: 2, name: "Hộp Mứt Tết Thập Cẩm" },
        { id: 3, name: "Trà Sen Tết" }
    ];
    
    // Xử lý tìm kiếm
    document.getElementById("search-icon").addEventListener("click", () => {
        const query = document.getElementById("search-input").value.trim().toLowerCase();
        const results = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
    
        if (results.length > 0) {
            alert(`Tìm thấy sản phẩm: ${results.map(product => product.name).join(", ")}`);
        } else {
            alert("Không tìm thấy sản phẩm nào!");
        }
    });
    

    if (results.length > 0) {
        alert(`Tìm thấy sản phẩm: ${results.map(product => product.name).join(", ")}`);
    } else {
        alert("Không tìm thấy sản phẩm nào!");
    }
});
