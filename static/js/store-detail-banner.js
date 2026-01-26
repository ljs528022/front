const banner = document.querySelector(".slide-banner");
const cards = document.querySelectorAll(".each-card-wrapper");
const leftBtn = document.querySelector(".left-slide-btn");
const rightBtn = document.querySelector(".right-slide-btn");
const totalCards = cards.length;

let nowCardIndex = 0;
let willMove = 0;

// 처음에 버튼설정
const checkButtons = () => {
    // 제품이 5개 이하면 버튼 다 없애기ㅣ
    if (totalCards <= 5) {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";
        return;
    }

    // 왼쪽버튼 첨에 로드될때 숨겼다가 나중에 표시
    if (nowCardIndex > 0) {
        leftBtn.classList.add("show");
    } else {
        leftBtn.classList.remove("show");
    }
    
    // 오른쪽버튼 처음에 보이고 끝에가면 숨기고
    if (nowCardIndex + 5 >= totalCards) {
        rightBtn.classList.add("hide");
    } else {
        rightBtn.classList.remove("hide");
    }
};

// 버튼누러서 카드 슬라이드
const slide = (index) => {
    banner.style.transform = `translate(-${index * 234.8}px)`;
    banner.style.transition = "transform 0.3s 0s";
};

// 오른쪽 버튼 클릭
rightBtn.addEventListener("click", (e) => {
    const restCards = totalCards - (nowCardIndex + 5);
    if(restCards >= 5) {
        willMove = 5;
    } else {
        willMove = restCards;
    }
    nowCardIndex += willMove;
    slide(nowCardIndex);
    checkButtons();
});

// 왼쪽 버튼 클릭
leftBtn.addEventListener("click", (e) => {
    if(nowCardIndex >= 5) {
        willMove = 5;
    } else {
        willMove = nowCardIndex;
    }
    nowCardIndex -= willMove;
    slide(nowCardIndex);
    checkButtons();
});