// 배너들 + 페이지네이션 버튼
const bannerWrapper = document.querySelector(".Banner-Slider-Wrapper");
const banners = document.querySelectorAll(".Banner-Content-Link");
const firstBanner = document.createElement("div");
const lastBanner = document.createElement("div");
const arrows = document.querySelectorAll(".Slider-Button");
const pagination = document.querySelector(".Banner-Slider-Pagination");
const curruntPage = pagination.firstElementChild;

// ---------- 배너 부분 ----------
// 배너 순서용 값
let count = 1;

firstBanner.innerHTML = `
<a href="" class="Banner-Content-Link">
    1
    <img src="../../static/images/haetsal-jangteo-logo.svg" alt="">
</a>`;
lastBanner.innerHTML = `
<a href="" class="Banner-Content-Link">
    4
    <img src="../../static/images/haetsal-jangteo-logo.svg" alt="">
</a>`;

bannerWrapper.appendChild(firstBanner);
bannerWrapper.prepend(lastBanner);

bannerWrapper.style.transform = `translate(-766px)`;
curruntPage.innerHTML = `${count} `;
curruntPage.style.marginRight = "3px";

const autoSlide = () => {
    count++;
    bannerWrapper.style.transform = `translate(-${766 * count}px)`;
    bannerWrapper.style.transition = `transform 0.5s`;

    if (count === 5) {
        setTimeout(() => {
            bannerWrapper.style.transform = `translate(-766px)`;
            bannerWrapper.style.transition = `transform 0s`;
        }, 500);
        count = 1;
    }

    curruntPage.innerHTML = `${count} `;
};

let autoSlideInterval = setInterval(autoSlide, 3000);
let arrowCheck = false;

arrows.forEach((arrow) => {
    const svg = arrow.firstElementChild;
    svg.addEventListener("click", (e) => {
        // 너무 많은 클릭 방지.
        if (arrowCheck) {
            return;
        }
        arrowCheck = true;
        clearInterval(autoSlideInterval);

        const arrowType = arrow.classList[1];
        if (arrowType === "Left") {
            count--;
            bannerWrapper.style.transform = `translate(-${766 * count}px)`;
            bannerWrapper.style.transition = `transform 0.5s`;

            if (count === 0) {
                setTimeout(() => {
                    bannerWrapper.style.transform = `translate(-3064px)`;
                    bannerWrapper.style.transition = `transform 0s`;
                }, 500);
                count = 4;
            }

            curruntPage.innerHTML = `${count} `;
        } else {
            count++;
            bannerWrapper.style.transform = `translate(-${766 * count}px)`;
            bannerWrapper.style.transition = `transform 0.5s`;

            if (count === 5) {
                setTimeout(() => {
                    bannerWrapper.style.transform = `translate(-766px)`;
                    bannerWrapper.style.transition = `transform 0s`;
                }, 500);
                count = 1;
            }

            curruntPage.innerHTML = `${count} `;
        }

        autoSlideInterval = setInterval(autoSlide, 3000);
        setTimeout(() => {
            arrowCheck = false;
        }, 500);
    });
});
// ------------------------------------------

// ----- 상품 리스트 페이지 버튼 부분 ---------
// 페이지 + 페이지네이션 버튼
const itemPageWrapper = document.querySelector(".swapper-container");
const itemPages = document.querySelectorAll(".ContentList-ItemList");
const leftBtn = document.querySelector(".ContentList-Pagination.left");
const rightBtn = document.querySelector(".ContentList-Pagination.right");

// 페이지 순서값
let pageCount = 0;
let maxPage = itemPages.length;

// 처음에 왼쪽 버튼 비활성화
leftBtn.disabled = true;

// Pagination 기능
// 왼쪽 버튼
leftBtn.addEventListener("click", (e) => {
    pageCount--;
    rightBtn.disabled = false;
    itemPageWrapper.style.transform = `translate(-${764 * pageCount}px)`;
    itemPageWrapper.style.transition = `transform 0.5s`;

    if (pageCount <= 0) {
        leftBtn.disabled = true;
    }
});

// 오른쪽 버튼
rightBtn.addEventListener("click", (e) => {
    pageCount++;
    leftBtn.disabled = false;
    itemPageWrapper.style.transform = `translate(-${764 * pageCount}px)`;
    itemPageWrapper.style.transition = `transform 0.5s`;

    if (pageCount >= maxPage - 1) {
        rightBtn.disabled = true;
    }
});

// ----- 찜 버튼 부분 ------------------------
// 찜 버튼
const likeButtons = document.querySelectorAll(".like-Button");

// 찜 버튼 누르기 기능
likeButtons.forEach((like) => {
    like.addEventListener("click", (e) => {
        e.preventDefault();

        e.currentTarget.classList.toggle("is-active");

        // DB에서 찜 관련 값 받아와야 함.
        const isLiked = e.currentTarget.classList.contains("is-active");

        // 찜 추가 / 해제 로직
        if (!isLiked) {
            // 찜 추가 로직 넣어야 함
        } else {
            // 찜 해제 로직 넣어야 함
        }
    });
});
// -----------------------------------------

// 상품 받아오기
const getItems = async () => {};

// 상품 뿌리기
const fetchItems = (items) => {};

// 인기 카테고리 상품 뿌리기
const fetchBestCateItems = (items) => {};
