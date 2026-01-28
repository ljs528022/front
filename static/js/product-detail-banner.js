// ===== 비슷한 상품 슬라이더 =====
const similarBanner = document.querySelector(".similar-slide-banner");
const similarCards = document.querySelectorAll(".similar-slide-banner .each-card-wrapper");
const similarLeftBtn = document.querySelector(".similar-left-slide-btn");
const similarRightBtn = document.querySelector(".similar-right-slide-btn");
const similarTotalCards = similarCards.length;

let similarNowCardIndex = 0;

// 처음에 버튼설정
const similarCheckButtons = () => {
    // 제품이 5개 이하면 버튼 다 없애기
    if (similarTotalCards <= 5) {
        similarLeftBtn.style.display = "none";
        similarRightBtn.style.display = "none";
        return;
    }

    // 왼쪽버튼 첨에 로드될때 숨겼다가 나중에 표시
    if (similarNowCardIndex > 0) {
        similarLeftBtn.classList.add("show");
    } else {
        similarLeftBtn.classList.remove("show");
    }

    // 오른쪽버튼 처음에 보이고 끝에가면 숨기고
    if (similarNowCardIndex + 5 >= similarTotalCards) {
        similarRightBtn.classList.add("hide");
    } else {
        similarRightBtn.classList.remove("hide");
    }
};

// 버튼누러서 카드 슬라이드
const similarSlide = (index) => {
    similarBanner.style.transform = `translate(-${index * 209.4}px)`;
    similarBanner.style.transition = "transform 0.3s 0s";
};

// 오른쪽 버튼 클릭
similarRightBtn.addEventListener("click", () => {
    const restCards = similarTotalCards - (similarNowCardIndex + 5);
    let willMove;
    if(restCards >= 5) {
        willMove = 5;
    } else {
        willMove = restCards;
    }
    similarNowCardIndex += willMove;
    similarSlide(similarNowCardIndex);
    similarCheckButtons();
});

// 왼쪽 버튼 클릭
similarLeftBtn.addEventListener("click", () => {
    let willMove;
    if(similarNowCardIndex >= 5) {
        willMove = 5;
    } else {
        willMove = similarNowCardIndex;
    }
    similarNowCardIndex -= willMove;
    similarSlide(similarNowCardIndex);
    similarCheckButtons();
});

// 초기 버튼 상태 설정
similarCheckButtons();


// ===== 같이 구매한 상품 슬라이더 =====
const boughtWithBanner = document.querySelector(".bought-with-slide-banner");
const boughtWithCards = document.querySelectorAll(".bought-with-slide-banner .each-card-wrapper");
const boughtWithLeftBtn = document.querySelector(".bought-with-left-slide-btn");
const boughtWithRightBtn = document.querySelector(".bought-with-right-slide-btn");
const boughtWithTotalCards = boughtWithCards.length;

let boughtWithNowCardIndex = 0;

// 처음에 버튼설정
const boughtWithCheckButtons = () => {
    // 제품이 5개 이하면 버튼 다 없애기
    if (boughtWithTotalCards <= 5) {
        boughtWithLeftBtn.style.display = "none";
        boughtWithRightBtn.style.display = "none";
        return;
    }

    // 왼쪽버튼 첨에 로드될때 숨겼다가 나중에 표시
    if (boughtWithNowCardIndex > 0) {
        boughtWithLeftBtn.classList.add("show");
    } else {
        boughtWithLeftBtn.classList.remove("show");
    }

    // 오른쪽버튼 처음에 보이고 끝에가면 숨기고
    if (boughtWithNowCardIndex + 5 >= boughtWithTotalCards) {
        boughtWithRightBtn.classList.add("hide");
    } else {
        boughtWithRightBtn.classList.remove("hide");
    }
};

// 버튼누러서 카드 슬라이드
const boughtWithSlide = (index) => {
    boughtWithBanner.style.transform = `translate(-${index * 209.4}px)`;
    boughtWithBanner.style.transition = "transform 0.3s 0s";
};

// 오른쪽 버튼 클릭
boughtWithRightBtn.addEventListener("click", () => {
    const restCards = boughtWithTotalCards - (boughtWithNowCardIndex + 5);
    let willMove;
    if(restCards >= 5) {
        willMove = 5;
    } else {
        willMove = restCards;
    }
    boughtWithNowCardIndex += willMove;
    boughtWithSlide(boughtWithNowCardIndex);
    boughtWithCheckButtons();
});

// 왼쪽 버튼 클릭
boughtWithLeftBtn.addEventListener("click", () => {
    let willMove;
    if(boughtWithNowCardIndex >= 5) {
        willMove = 5;
    } else {
        willMove = boughtWithNowCardIndex;
    }
    boughtWithNowCardIndex -= willMove;
    boughtWithSlide(boughtWithNowCardIndex);
    boughtWithCheckButtons();
});

// 초기 버튼 상태 설정
boughtWithCheckButtons();
