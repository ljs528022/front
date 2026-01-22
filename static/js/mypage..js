// 메뉴바 밑의 색상선 움직이게 하기.
document.addEventListener("DOMContentLoaded", (e) => {
    const menus = document.querySelectorAll(".Navigation-Span");
    const underbar = document.querySelector(".menu-bar");
    const currnetSpan = document.querySelector(".Navigation-Span.current");

    const moveUnderBar = (element) => {
        const left = element.offsetLeft;
        const width = element.offsetWidth;
        underbar.style.left = `${left}px`;
        underbar.style.width = `${width}px`;
    };

    if (currnetSpan) {
        moveUnderBar(currnetSpan);
    }

    menus.forEach((menu) => {
        menu.addEventListener("click", (e) => {
            e.preventDefault();

            menus.forEach((m) => m.classList.remove("current"));
            menu.classList.add("current");

            moveUnderBar(menu);
        });
    });
});

// 프로필 편집 버튼 누르면 페이지 이동
const modifyBtn = document.querySelector(".ModifyBtn-Button");
modifyBtn.addEventListener("click", (e) => {});
