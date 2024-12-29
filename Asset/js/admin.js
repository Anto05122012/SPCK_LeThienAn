document.getElementById("account-management-link").addEventListener("click", (event) => {
    event.preventDefault();

    const password = prompt("Nhập mật khẩu để truy cập:");
    const correctPassword = "admin123"; // Replace with your password

    if (password === correctPassword) {
        window.location.href = "/Asset/html/profile.html";
    } else {
        alert("Mật khẩu không đúng!");
    }
});
