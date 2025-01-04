let lastScrollTop = 0; // Vị trí cuộn trước đó
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Nếu cuộn xuống, ẩn navbar
        navbar.classList.add("hidden");
    } else {
        // Nếu cuộn lên, hiện navbar
        navbar.classList.remove("hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Đặt lại vị trí cuộn
});
