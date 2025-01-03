// Chuyển đổi giữa đăng ký và đăng nhập
const toggleForm = document.getElementById("toggle-form");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

toggleForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (registerForm.style.display === "none") {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        toggleForm.textContent = "Đã có tài khoản? Đăng nhập";
    } else {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        toggleForm.textContent = "Chưa có tài khoản? Đăng ký";
    }
});

// Xử lý đăng ký
document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Lưu thông tin vào LocalStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
        alert("Email này đã được sử dụng!");
    } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
        document.getElementById("toggle-form").click();
    }
});

// Xử lý đăng nhập
document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra thông tin trong LocalStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        alert("Đăng nhập thành công!");
        // Chuyển hướng đến trang khác sau khi đăng nhập thành công
        window.location.href = "../html/home.html";
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
});
