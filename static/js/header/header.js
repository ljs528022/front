// 로그인 버튼 부분
const loginButton = document.querySelector("div.UserProfile-Button-Wrapper");
const loginBtnContent = loginButton.firstElementChild;
const loginBtnArrow = document.querySelector(
    "div.UserProfile-Button-Wrapper svg",
);
const likeBtn = document.querySelector(`div[aria-label="찜한 상품"]`);
const alertBtn = document.querySelector(`div[aria-label="알림"]`);

// 유저 메뉴바 부분
const userMenu = document.querySelector("div.UserProfile-Menu-Wrapper");

// 카테고리 부분
const headerLayout = document.querySelector(".Header-Layout");
const categoryDiv = document.querySelector(".Category-Section-Region");
const cateExtendDiv = document.querySelector(".Header-BottomExtended-Region");
const cateSvg = categoryDiv.firstElementChild;
const tempColor = categoryDiv.firstElementChild.style.color;

// 로그인 버튼 클릭 여부
let isClicked = false;

// 임시 유저 확인용 값
let userToken = true;

// 토글용 값
let isActive = false;

// 페이지 로딩 되었을 때 이벤트
document.addEventListener("DOMContentLoaded", (e) => {
    if (userToken) {
        // user 정보가 있을 시, 해당 유저 프로필 사진으로 변경
        loginButton.classList.add("onlogin");
        loginBtnContent.innerHTML = `<img src="" alt="profile-img">`;

        // 좋아요 div, 알림 div 표시
        likeBtn.style.display = "flex";
        alertBtn.style.display = "flex";
    } else {
        // user 정보가 없을 시, 로그인 페이지로 이동,
        loginButton.classList.remove("onlogin");
    }
});

// 로그인 버튼 클릭 시 이벤트
loginButton.addEventListener("click", (e) => {
    if (!userToken) {
        // 로그인 하지 않은 상태일 경우, 로그인 페이지로 이동
    } else {
        // 로그인 되어 있을 경우 메뉴바 표시
        if (!isClicked) {
            userMenu.style.display = "flex";
            userMenu.firstElementChild.firstElementChild.innerHTML = `
            <img src=${""} alt="유저 프로필 이미지" class="MenuList-UserProfile-img">
            <div class="MenuList-UserProfile-name">
                <p class="MenuList-UserProfile-p">${"홍길동"}</p>
            </div>
            `;
        } else {
            userMenu.style.display = "none";
        }
    }

    // 로그인 버튼 옆 화살표 애니메이션
    if (!isClicked) {
        loginBtnArrow.style.transform = "rotate(180deg)";
        loginBtnArrow.style.transition = `transform 0.5s`;
    } else {
        loginBtnArrow.style.transform = "rotate(0deg)";
        loginBtnArrow.style.transition = `transform 0.5s`;
    }
    isClicked = !isClicked;
});

const toggleCategoryStyle = () => {
    isActive = !isActive;

    cateExtendDiv.style.display = isActive ? "flex" : "none";
    cateSvg.style.color = isActive ? "rgb(254, 95, 76)" : tempColor;
    cateSvg.style.transition = "0.2s ease-in-out";
    headerLayout.style.boxShadow = isActive
        ? "none"
        : "rgba(0, 0, 0, 0.08) 0px 1px 6px";
};

// 카테고리 부분 hover 이벤트
[categoryDiv, cateExtendDiv].forEach((el) => {
    el.addEventListener("mouseenter", () => toggleCategoryStyle());
    el.addEventListener("mouseleave", () => toggleCategoryStyle());
});

categoryDiv.addEventListener("click", toggleCategoryStyle);
