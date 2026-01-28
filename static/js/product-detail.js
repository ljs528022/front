// 1번 이벤트
let currentTab = 0;
const portals = document.querySelectorAll(".nav-item");
const mainContents = document.querySelectorAll(".main-screen");

// 2번 이벤트
const keyWordsInDashAndReviewTab = document.querySelectorAll(".keyword-item");
const ArrowsNextToKeyWord = document.querySelectorAll(".key-dd-icon");

// 3번 이벤트
// 현재 보고있는 상품 좋아요 버튼
const currentPrdLikeBtn = document.querySelector(".like-btn");

// 4번 이벤트
// 화면 아래쪽 연관 상품 목록의 좋아요버튼
const heartButtons = document.querySelectorAll(".like-button");

// 5번 이벤트
const thumbnails = document.querySelectorAll(".thumbnail-item");
const mainImage = document.querySelector(".main-image");

// 6번 이벤트
const introCard = document.querySelector(".story-content");
const showAllInfoBtn = document.querySelector(".show-all-info-btn");

// 7번 이벤트
// 클래스 select-text(상품선택or선택한상품 있는곳)의
// 겟바운딩탑(현재 내가 보고있는 화면을 기준으로 높이) + 스크롤Y(내가 얼마나 스크롤 했는지)
// ==> 화면 맨위에서부터의 높이값
const SideBarHeight = document.querySelector(".select-text").getBoundingClientRect().top + window.scrollY;

const navTarget = document.querySelector(".nav-bar");
const navBarHeight = navTarget.getBoundingClientRect().top + window.scrollY;

const sectionTarget = document.querySelector(".section-tabs");
const sectionHeight = sectionTarget.getBoundingClientRect().top + window.scrollY;

const sectionTabs = document.querySelectorAll(".section-tab");

const productIntroTarget = document.querySelector("#productIntro");
const productTargetHeight = productIntroTarget.getBoundingClientRect().top + window.scrollY -184;

const sellerIntroTarget = document.querySelector("#sellerIntro");
const sellerTargetHeight = sellerIntroTarget.getBoundingClientRect().top + window.scrollY -216; 

const refundIntroTarget = document.querySelector("#refundExchangeIntro");
const refundTargetHeight = refundIntroTarget.getBoundingClientRect().top + window.scrollY -216; //내 모니터기준 3400정도찍힘

const targetHeight = [productTargetHeight, sellerTargetHeight, refundTargetHeight];

// 10번 이벤트
const buyBtnInMain = document.querySelector(".buy-btn");

// 11번 이벤트
const prdOptionBtns = document.querySelectorAll(".each-product-option");

// 12번 이벤트
// const buyBtnInCart = document.querySelector(".cart-buy-btn");

// 13번 이벤트
// const getMoreBtn = document.querySelector(".get-more-btn");
// const firstCardHeight = document.querySelector(".each-product-option-wrap").getBoundingClientRect().top + scrollY;

// 아직 안쓰는 변수들
// const showAllReview = document.querySelector(".all-review-btn");

// const toCreatorDetail = document.querySelector(".creator-wrapper");

// 1. 상품상세/리뷰 탭 눌렀을때 이벤트
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
        
        let goToTargetHeight = 0;
        if(i === 0) {
            goToTargetHeight = productTargetHeight;
        } else {
            goToTargetHeight = navBarHeight -32;
        }
        console.log(goToTargetHeight)
        window.scrollTo({
            top: goToTargetHeight,
            behavior: "smooth"
        });

        // 1-2. 리뷰탭 갔다오면 펼친거 접고 버튼 다시 보이게
        if(currentTab === 0 && i !== 0) {
            
            introCard.classList.remove("expanded");
            showAllInfoBtn.style.display = "flex";
        }
        currentTab = i;
    });
});

// 2. 메인 대쉬보드랑 리뷰탭에서 리뷰요약 옆에 화살표 눌렀을때 이벤트(max-height랑 회전)
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

// 3-1. 현재화면의 찜버튼 눌렀을때, 개별로 색상변화랑 모달
currentPrdLikeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(currentPrdLikeBtn.classList.contains("liked")) {
        currentPrdLikeBtn.classList.remove("liked");
        showModal("찜 목록에서 제거 되었습니다.");
    } else {
        currentPrdLikeBtn.classList.add("liked");
        showModal("찜 목록에 추가 되었습니다.");
    }
});

// 4-1. 찜버튼 눌렀을때, 개별로 색상변화
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
// 3-2, 4-2. 찜버튼 눌렀을때 모달
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

// 5. 썸네일 이미지에 호버주면 해당이미지가 메인이미지에 나오게
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("mouseenter", (e) => {

        // active 클래스 붙이기
        thumbnails.forEach((item) => {
            item.classList.remove("active");
        });
        thumbnail.classList.add("active");

        // 커버 이미지 변경
        mainImage.src = thumbnail.querySelector(".thumbnail-img").src;
    });
});

// 6. 상품 소개란에 더보기 버튼 눌렀을때 모두 펼쳐지게 하는 이벤트
showAllInfoBtn.addEventListener("click", (e) => {
    introCard.classList.add("expanded");
    showAllInfoBtn.style.display = "none";
});

// 7. 스크롤로 사이드바 따라다니게 하는 이벤트
$(window).scroll((e) => {

    // 7-1. 내가 내린 스크롤 값이 변수보다 같아진 순간부터 딸려옴
	if(window.scrollY >= SideBarHeight) {
		$(".sticker-container").addClass("scrolled-down");
	}
	else {
		$(".sticker-container").removeClass("scrolled-down");
	}

    // 7-2. 내가 내린 스크롤 값이 변수보다 같아진 순간부터 딸려옴
	if(window.scrollY >= navBarHeight) {
		navTarget.classList.add("scrolled-down");
	}
	else {
		navTarget.classList.remove("scrolled-down");
	}

    if(window.scrollY >= sectionHeight) {
		sectionTarget.classList.add("scrolled-down");
	}
	else {
		sectionTarget.classList.remove("scrolled-down");
	}

    // 기본적으로 active는 [0]인 상품설명에 주어져있음
    // 7-3.셀러인트로 지나면 active주기
    if(window.scrollY >= refundTargetHeight) {
        sectionTabs.forEach((eachTab) => {
            eachTab.classList.remove("active");
            sectionTabs[2].classList.add("active");
            return;
        });
    } else if (window.scrollY >= sellerTargetHeight) {
        sectionTabs.forEach((eachTab) => {
            eachTab.classList.remove("active");
            sectionTabs[1].classList.add("active");
            return;
        });
    
	} else {
        sectionTabs.forEach((eachTab) => {
            eachTab.classList.remove("active");
            sectionTabs[0].classList.add("active");
            return;
        });
    }
    // 7-4. 탑버튼 일정부분부터 보이게하기.
    // (헤이트 기준은 사이드 셀러카드)
    if(window.scrollY >= 200) {
        document.querySelector("#top").style.display = "flex";
    } else {
        document.querySelector("#top").style.display = "none";
    }
});

// 8. 섹션탭 아이템들 눌렀을때 알맞는 위치로 이동
sectionTabs.forEach((tab, i) => {
    tab.addEventListener("click", (e) => {

        sectionTabs.forEach((each) => {
            each.classList.remove("active");
        })
        sectionTabs[i].classList.add("active");

        window.scrollTo({
            top: targetHeight[i],
            behavior: "smooth"
        });
    });
});

// 9. 맨위로 올라가는 이벤트. top은 탑버튼 id임 
$("#top").click((e) => {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 700);
    });

// 10. 메인쪽 구매버튼 눌렀을때 이벤트
buyBtnInMain.addEventListener("click", (e) => {
    window.scrollTo({
        top: SideBarHeight - 124,
        behavior: "smooth"
    });
});

// 11. each-product-option 카드들 누르면 스크롤주기
prdOptionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        window.scrollTo({
            top: SideBarHeight - 124,
            behavior: "smooth"
        });
    });
});

// 12. 카트에 담고 구매버튼 눌렀을때 이벤트
// buyBtnInCart.addEventListener("click", (e) => {

// });

// 13. 더담기버튼
// getMoreBtn.addEventListener("click", (e) => {
//     document.querySelector(".sticker-container").scrollTo({
//         top: firstCardHeight,
//         behavior: "smooth"
//     });
// });


// 0. 프로필 대시보드(기본화면) 맨 아래에서 후기전체보기 버튼 눌렀을때 가게상세 리뷰로 이동
// showAllReview.addEventListener("click", (e) => {

// });

// 0. 사이드바 판매자 카드 눌렀을때 가게상세로 이동(기본화면)
// toCreatorDetail.addEventListener("click", (e) => {

// });