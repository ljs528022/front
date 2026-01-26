const portals = document.querySelectorAll(".portal-box");
const mainContents = document.querySelectorAll(".main-screen");

const ddOpenerInReviewTab = document.querySelectorAll(".filter-reviewtab");
const ddBoxesInReviewTab = document.querySelectorAll(".dd-box-reviewtab");

const keyWordsInDashAndReviewTab = document.querySelectorAll(".keyword-item");
const ArrowsNextToKeyWord = document.querySelectorAll(".key-dd-icon");

const showAllReview = document.querySelector(".all-review-btn");
const showAllProducts = document.querySelector(".show-all-products");

const underline = document.querySelector(".underline");

const heartButtons = document.querySelectorAll(".like-button");

const showReviews = document.querySelector(".each-seller-level");

const onlyPhoto = document.querySelector(".only-photo");
const photoReview = document.querySelector(".photo-review-count");

// 1. 프로필/판매상품/리뷰 탭 눌렀을때 이벤트
portals.forEach((portal, i) => {
    portal.addEventListener("click", (e) => {

        mainContents.forEach((main) => {
            main.classList.remove("on");
        });

        portals.forEach((eachPortal) => {
            eachPortal.classList.remove("selected");
        });

        // let condition =  e.target.classList.contains("selected");
        e.target.classList.add("selected");
        mainContents[i].classList.add("on");

        underline.style.left = `${e.target.offsetLeft}px`;
        underline.style.width = `${e.target.offsetWidth}px`;

        window.scrollTo({
            top: 0, behavior: "smooth"
        });
    });
});

// 1-2. 프로필 대시보드(기본화면) 맨 아래에서 후기전체보기 버튼 눌렀을때 이벤트
showAllReview.addEventListener("click", (e) => {

    mainContents[0].classList.remove("on");
    portals[0].classList.remove("selected");

    mainContents[2].classList.add("on");
    portals[2].classList.add("selected");

    underline.style.left = `${portals[2].offsetLeft}px`;
    underline.style.width = `${portals[2].offsetWidth}px`;

    window.scrollTo({
        top: 0, behavior: "smooth"
    });
});

// 1-3. 메인헤더쪽 받은 리뷰수 누르면 리뷰탭으로 이동하기
showReviews.addEventListener("click", (e) => {
    if(!mainContents[2].classList.contains("on")){
        mainContents.forEach((main) => {
            main.classList.remove("on");
        });
        portals.forEach((portal) => {
            portal.classList.remove("selected");
        });
        mainContents[2].classList.add("on");
        portals[2].classList.add("selected");
        underline.style.left = `${portals[2].offsetLeft}px`;
        underline.style.width = `${portals[2].offsetWidth}px`;
    }

    window.scrollTo({
        top: 0, behavior: "smooth"
    });
});

// 1-4. 프로필 대시보드(기본화면) 중간에 상품전체보기 눌렀을때 이벤트
showAllProducts.addEventListener("click", (e) => {
    
    mainContents[0].classList.remove("on");
    portals[0].classList.remove("selected");

    mainContents[1].classList.add("on");
    portals[1].classList.add("selected");

    underline.style.left = `${portals[1].offsetLeft}px`;
    underline.style.width = `${portals[1].offsetWidth}px`;

    window.scrollTo({
        top: 0, behavior: "smooth"
    });
});

// 2. 리뷰탭에서 필터 눌러서 드롭다운 펼치고 닫기
ddOpenerInReviewTab.forEach((opener) => {
    opener.addEventListener("click", (e) => {

        let condition = opener.classList.contains("clicked");

        ddOpenerInReviewTab.forEach((eachBox) => {
            eachBox.classList.remove("clicked");
        });
        
        opener.classList.toggle("clicked", !condition);
    });
});

// 3. 메인 대쉬보드랑 리뷰탭에서 리뷰요약 옆에 화살표 눌렀을때 이벤트(max-height랑 회전)
ArrowsNextToKeyWord.forEach((arrow, i) => {
    arrow.addEventListener("click", (e) => {
        let condition = arrow.classList.contains("clicked");

        if(!condition) {
            arrow.classList.add("clicked");
            keyWordsInDashAndReviewTab[i].style['max-height'] = "130px";
        } else {
            arrow.classList.remove("clicked");
            keyWordsInDashAndReviewTab[i].style['max-height'] = "34px";
        }
    });
});

// 4-1. 드롭다운 외 영역 눌렀을때 닫히기
document.addEventListener("click", (e) => {
    if(!e.target.closest(".filter-reviewtab") && !e.target.closest(".dd-box-reviewtab")) {
        ddOpenerInReviewTab.forEach((opener) => {
            opener.classList.remove("clicked");
        });
    }
});

// 4-2. 스크롤 움직일때 드롭다운 닫는 이벤트
document.addEventListener("scroll", () => {
    ddOpenerInReviewTab.forEach((opener) => opener.classList.remove("clicked"));
});

// 5-1. 찜버튼 눌렀을때, 개별로 색상변화
// 나중에 서버연결할때 찜목록 테이블 디비 연결 어쩌고..
heartButtons.forEach((heart) => {
    heart.addEventListener("click", (e) => {
        e.preventDefault();
        
        if(heart.classList.contains("liked")) {
            heart.classList.remove("liked");
            showModal("찜 목록에서 제거 되었습니다.");
        } else {
            heart.classList.add("liked");
            showModal("찜 목록에 추가 되었습니다.");
        }
    });
});
// 5-2. 찜버튼 눌렀을때 모달
const showModal = (modalMessage) => {
    document.getElementById("content-wrap").innerHTML = modalMessage;
    document.querySelector("div.like-modal").style.animation = "popUp 0.5s";
    document.querySelector("div.modal").style.display = "flex";
    setTimeout(() => {
        document.querySelector("div.like-modal").style.animation =
            "popDown 0.5s";
        setTimeout(() => {
            document.querySelector("div.modal").style.display = "none";
        }, 450);
    }, 1000);
};

// 6. 사진만보기 버튼
onlyPhoto.addEventListener("click", (e) => {
    const condition = onlyPhoto.classList.contains("checked");
    if(!condition) {
        onlyPhoto.classList.add("checked");
        photoReview.style.display = "block";
    } else {
        onlyPhoto.classList.remove("checked");
        photoReview.style.display = "none";
    }
});