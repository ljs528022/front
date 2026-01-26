// 리뷰한 상품 경로와 이미지, 제목
const reviewItemLink = document.querySelector(".ReviewDetail-FooterContainer");
const reviewItemImage = reviewItemLink.firstElementChild;
const reviewItemTitle = reviewItemLink.lastElementChild;

const reviewContent = document.querySelector(".ReviewDetail-Paragraph");
const reviewImageContainer = document.querySelector(".ReviewDetail-ImageList");

let reviewInfo = {
    reviewImages: null, // 리뷰 이미지들
    reviewItemLink: "", // 리뷰한 상품 링크

    // 나중에 리뷰 필드 이름에 맞게 수정
    reviewItemQuality: "", // 상품 리뷰 1
    reviewItemDelivery: "", // 상품 리뷰 2
    reviewItemKind: "", // 상품 리뷰 3
    // ------------------------------

    reviewCotent: "", // 리뷰 내용
};

// 받아온 리뷰 정보들 뿌리기
// TODO

// 리뷰 정보 받아오기
const getReviewInfo = async () => {};
