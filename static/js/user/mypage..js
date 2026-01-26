// 메뉴바 페이지네이션 기능
document.addEventListener("DOMContentLoaded", (e) => {
    const menus = document.querySelectorAll(".Navigation-Span");
    const underbar = document.querySelector(".menu-bar");
    const currnetSpan = document.querySelector(".Navigation-Span.current");

    // 각 페이지의 div 들
    const profileDiv = document.getElementById("profile");
    const reviewDiv = document.getElementById("reviews");
    const likeItemDiv = document.getElementById("likeItems");
    const pendingItemDiv = document.getElementById("pending");
    const completeItemDiv = document.getElementById("complete");
    // 빈 컨탠츠 div
    const emptyContentDiv = document.getElementById("empty");

    // 후기 페이지 관련
    const reviewPagination = document.querySelector(".ReviewItem-Pagination");
    const reviewLinkButton = document.querySelector(".ReviewItem-LinkWrapper");
    const reviewCurrentPage = document.querySelectorAll(".Pagination-Current");

    const allSection = [
        profileDiv,
        reviewDiv,
        likeItemDiv,
        pendingItemDiv,
        completeItemDiv,
        reviewPagination,
        reviewLinkButton,
        emptyContentDiv,
    ];

    // 모든 페이지 일단 비활성화
    allSection.forEach((section) => section.classList.add("off"));

    // 받아온 리뷰 값
    let reviews = false;
    let likeItems = true;
    let pendingItems = true;
    let completeItems = true;

    // 리뷰 작성 입력값
    let reviewQuality = 0;
    let reviewDelivery = 0;
    let reviewkind = 0;
    let reviewContent = "";
    let reviewImages = [];

    // 각각의 상품들이 없을 경우, 빈 목록 페이지 표시
    if (!likeItems) {
        if (!likeItemDiv.classList.contains("off")) {
            emptyContentDiv.classList.remove("off");
        }
    } else if (!pendingItems) {
        if (!pendingItemDiv.classList.contains("off")) {
            emptyContentDiv.classList.remove("off");
        }
    } else if (!completeItems) {
        if (!completeItemDiv.classList.contains("off")) {
            emptyContentDiv.classList.remove("off");
        }
    }

    const moveUnderBar = (element) => {
        const left = element.offsetLeft;
        const width = element.offsetWidth;
        underbar.style.left = `${left}px`;
        underbar.style.width = `${width}px`;
    };

    if (currnetSpan) {
        moveUnderBar(currnetSpan);
    }

    // --------------------------------------------------------------------------
    // 메뉴를 누를 시, 해당 페이지를 표시.
    menus.forEach((menu, i) => {
        menu.addEventListener("click", (e) => {
            e.preventDefault();

            // 각 페이지 누를 때마다 표시되는 div 변경
            let spanName = menu.getAttribute("name");
            allSection.forEach((section) => section.classList.add("off"));

            switch (spanName) {
                case "profile":
                    profileDiv.classList.remove("off");
                    reviewDiv.classList.remove("off");
                    reviewLinkButton.classList.remove("off");
                    break;
                case "review":
                    if (reviews) {
                        reviewDiv.classList.remove("off");
                        reviewPagination.classList.remove("off");
                    } else {
                        emptyContentDiv.classList.remove("off");
                    }
                    break;
                case "likeItem":
                    if (likeItems) {
                        likeItemDiv.classList.remove("off");
                    } else {
                        emptyContentDiv.classList.remove("off");
                    }
                    break;
                case "pending":
                    if (pendingItems) {
                        pendingItemDiv.classList.remove("off");
                    } else {
                        emptyContentDiv.classList.remove("off");
                    }
                    break;
                case "complete":
                    if (completeItems) {
                        completeItemDiv.classList.remove("off");
                    } else {
                        emptyContentDiv.classList.remove("off");
                    }
                    break;
            }

            menus.forEach((m) => m.classList.remove("current"));
            menu.classList.add("current");

            moveUnderBar(menu);
        });
    });

    const prevBtn = reviewPagination.firstElementChild;
    const nextBtn = reviewPagination.lastElementChild;

    // --------------------------------------------------------------------------
    // 페이지 버튼을 누르면 해당 페이지로 스타일 변경
    reviewCurrentPage.forEach((current) => {
        current.addEventListener("click", (e) => {
            e.preventDefault();

            reviewCurrentPage.forEach((r) => r.classList.remove("active"));
            current.classList.add("active");
        });
    });

    // --------------------------------------------------------------------------
    // 찜한 상품의 찜 버튼 누르면 해제시키기
    const likeItemList = likeItemDiv.querySelectorAll(
        ".ContentItems-ItemCardWrapper",
    );
    const likeItemButtons = document.querySelectorAll(".like-Button");
    const modal = document.querySelector(".Modal-Container");

    likeItemButtons.forEach((like, i) => {
        like.addEventListener("click", (e) => {
            e.preventDefault();
            likeItemList[i].remove();

            modal.innerHTML = "해당 상품의 찜을 해제했습니다.";
            modal.classList.add("show");

            setTimeout(() => {
                modal.classList.remove("show");
            }, 3000);
        });
    });

    reviewLinkButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.Navigation-Span[name="review"]')?.click();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // --------------------------------------------------------------------------
    // 결제 중인 상품 결제 취소 버튼 기능
    const pendingCancelModal = document.querySelector(
        ".PurchaseCancel-ModalLayer",
    );
    const pendelModalBackground = document.querySelector(
        ".PurchaseCancel-ModalWrapper",
    );
    const cancelButtons = document.querySelectorAll(".ItemCard-Button.Cancel");

    // 결제 취소 모달
    const backBtn = pendingCancelModal.querySelector(".Modal-Close");
    const cancelBtn = pendingCancelModal.querySelector(".Modal-Cancel");

    let targetItemCard = null;

    cancelButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            targetItemCard = button.closest(".ContentItems-ItemCardWrapper");
            pendingCancelModal.classList.remove("off");
        });
    });

    backBtn.addEventListener("click", (e) => {
        pendingCancelModal.classList.add("off");
        targetItemCard = null;
    });

    cancelBtn.addEventListener("click", (e) => {
        if (targetItemCard) {
            targetItemCard.remove();

            pendingCancelModal.classList.add("off");

            modal.innerHTML = "해당 상품의 결제가 취소되었습니다.";
            modal.classList.add("show");

            setTimeout(() => {
                modal.classList.remove("show");
            }, 3000);

            targetItemCard = null;
        }
    });

    // 모달 밖을 눌러도 모달 창 닫기
    pendelModalBackground.addEventListener("click", (e) => {
        e.preventDefault();
        pendingCancelModal.classList.add("off");
    });

    // --------------------------------------------------------------------------
    // 결제 완료 상품에서 후기가 있으면 후기 조회, 후기가 없으면 후기 작성 버튼
    const completeItemList = completeItemDiv.querySelectorAll(
        ".ContentItems-ItemCardWrapper",
    );

    // 리뷰 작성 모달 관련
    const reviewWriteModal = document.querySelector(".Custom-ModalLayer");
    const reviewWriteClose = document.querySelector(".Custom-CloseButton");
    const reviewWriteSubmit = document.querySelector(".Custom-ModalButton");

    // 여기서 각 상품마다 후기가 있는지 검사해서 버튼이 달라보이게 해야함.
    completeItemList.forEach((item) => {
        const completeItemBtns = item.querySelector(".ItemCard-ButtonWrapper");
        const reviewWrite = completeItemBtns.firstElementChild;
        const reviewDetail = completeItemBtns.lastElementChild;

        if (reviews) {
            reviewWrite.classList.add("off");
            reviewDetail.classList.remove("off");
        }

        reviewWrite.addEventListener("click", (e) => {
            e.preventDefault();
            // 리뷰 작성 모달 활성화
            reviewWriteModal.classList.remove("off");
        });

        reviewDetail.addEventListener("click", (e) => {
            // 리뷰 조회 페이지로 이동
        });
    });

    // 리뷰 작성 모달 내 기능
    const reviewQualityinput = document.getElementById("reviewQuality");
    const reviewDeliveryInput = document.getElementById("reviewDelivery");
    const reviewKindInput = document.getElementById("reviewKind");
    const reviewContentInput = document.getElementById("reviewContent");
    const reviewImagesInput = document.getElementById("reviewImages");

    // 첨부한 이미지 나열할 곳
    const reviewImageList = document.querySelector(
        ".ReviewImageList-Container",
    );

    reviewQualityinput.addEventListener("change", (e) => {
        reviewQuality = e.target.value;
    });
    reviewDeliveryInput.addEventListener("change", (e) => {
        reviewDelivery = e.target.value;
    });
    reviewKindInput.addEventListener("change", (e) => {
        reviewkind = e.target.value;
    });
    reviewContentInput.addEventListener("keyup", (e) => {
        reviewContent = e.target.value;
    });
    reviewImagesInput.addEventListener("change", (e) => {
        let images = e.target.files;
        let imgUrl = "";

        if (images.length > 5) {
            alert("사진은 최대 5장 까지만 첨부가 가능합니다.");
            return;
        } else if (images.length === 1) {
            let img = e.target.files[0];
            imgUrl = URL.createObjectURL(img);

            let div = document.createElement("div");
            div.classList.add("ReviewImageList-Item");
            div.innerHTML = `
            <img src="${imgUrl}" alt="">
            <button type="button" class="ReviewImageList-RemoveBtn">
                <svg width="9" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.064 7.8927L2.13314 0L0.0311185 2.09192L7.96193 9.98462L0 17.9083L2.10202 20.0002L10.064 12.0765L17.8983 19.8732L20.0003 17.7813L12.166 9.98462L19.9692 2.21889L17.8672 0.126967L10.064 7.8927Z" fill="#3D3D3D"></path></svg>
            </button>
            `;
            reviewImageList.appendChild(div);

            images = null;
            return;
        }

        Array.from(images).forEach((img) => {
            imgUrl = URL.createObjectURL(img);
            reviewImages.push(imgUrl);
        });

        reviewImages.forEach((image) => {
            let div = document.createElement("div");
            div.classList.add("ReviewImageList-Item");
            div.innerHTML = `
            <img src="${image}" alt="">
            <button type="button" class="ReviewImageList-RemoveBtn">
                <svg width="9" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.064 7.8927L2.13314 0L0.0311185 2.09192L7.96193 9.98462L0 17.9083L2.10202 20.0002L10.064 12.0765L17.8983 19.8732L20.0003 17.7813L12.166 9.98462L19.9692 2.21889L17.8672 0.126967L10.064 7.8927Z" fill="#3D3D3D"></path></svg>
            </button>
            `;

            reviewImageList.appendChild(div);
        });

        // 만들어진 이미지, 버튼 선언 (위에서 선언하면 못 불러옴)
        const reviewImagesDiv = document.querySelectorAll(
            ".ReviewImageList-Item",
        );
        const reviewImgDeleteBtns = document.querySelectorAll(
            ".ReviewImageList-RemoveBtn",
        );

        reviewImgDeleteBtns.forEach((button, i) => {
            button.addEventListener("click", (e) => {
                reviewImagesDiv[i].remove();
                reviewImages.pop(reviewImages[i]);
            });
        });
    });

    reviewWriteSubmit.addEventListener("click", (e) => {
        // 리뷰 등록하는 로직 작성해야함.

        reviewWriteModal.classList.add("off");
    });

    reviewWriteClose.addEventListener("click", (e) => {
        reviewWriteModal.classList.add("off");
    });

    // 로딩되면 프로필을 기본적으로 활성화
    document.querySelector('.Navigation-Span[name="profile"]')?.click();
});

// 리뷰 가져와서 뿌리기
const fetchReivews = (reviews) => {};

// 유저 정보 가져오기
const getUser = async () => {};

// 해당 유저 리뷰들 가져오기
const getReivew = async () => {};

// 프로필 편집 버튼 누르면 페이지 이동
const modifyBtn = document.querySelector(".ModifyBtn-Button");
modifyBtn.addEventListener("click", (e) => {});
