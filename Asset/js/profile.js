// Load Accounts into Table
function loadAccounts() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("account-table-body");

    tableBody.innerHTML = ""; // Clear existing rows

    if (users.length === 0) {
        const noAccountRow = document.createElement("tr");
        noAccountRow.innerHTML = `
            <td colspan="4" class="text-center">Không có tài khoản</td>
        `;
        tableBody.appendChild(noAccountRow);
    } else {
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editAccount('${user.username}')">Chỉnh Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAccount('${user.username}')">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
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

// Delete Account
function deleteAccount(username) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((user) => user.username !== username);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Tài khoản đã được xóa thành công!");
    loadAccounts(); // Refresh the table
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