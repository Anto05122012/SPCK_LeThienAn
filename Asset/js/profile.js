// Load Accounts into Table
function loadAccounts() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("account-table-body");

    tableBody.innerHTML = ""; // Clear existing rows

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editAccount('${user.username}')">Chỉnh Sửa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit Account
function editAccount(username) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username);

    if (user) {
        document.getElementById("edit-username").value = user.username;
        document.getElementById("edit-email").value = user.email;
        document.getElementById("edit-password").value = user.password;
        document.getElementById("edit-section").style.display = "block";
    }
}

// Save Updated Account
document.getElementById("save-btn").addEventListener("click", () => {
    const username = document.getElementById("edit-username").value;
    const password = document.getElementById("edit-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
        users[userIndex].password = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Cập nhật thành công!");
        location.reload(); // Reload the page to refresh data
    } else {
        alert("Không tìm thấy tài khoản!");
    }
});

// Initialize Accounts on Page Load
document.addEventListener("DOMContentLoaded", loadAccounts);
