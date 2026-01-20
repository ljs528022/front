const regionBoxes = document.querySelectorAll(".category-each-box");
const tabButtons = document.querySelectorAll(".tab-button");
const filterBox = document.querySelector(".filter-combobox");
const orderbyBox = document.querySelector(".orderby-box");
const heartButtons = document.querySelectorAll(".like-button");

// 1. 펼치고 닫고, 
// a를 펼치려고 클릭했을때, b가 펼쳐져있는걸 닫아버림
regionBoxes.forEach((regionBox) => {
    regionBox.addEventListener("click", (e) => {
        let condition = regionBox.classList.contains("clicked");
        regionBoxes.forEach((box) => {
            box.classList.remove("clicked");
        });
        regionBox.classList.toggle("clicked", !condition);
    });
});

// 2. 정렬 버튼 이벤트
orderbyBox.addEventListener("click", (e) => {
    let condition = filterBox.classList.contains("clicked");
    filterBox.classList.toggle("clicked", !condition);
});

// 3. 바깥쪽 클릭했을때 펼쳐진거 닫는 이벤트
document.addEventListener("click", (e) => {
    if(!e.target.closest(".tab-button") && !e.target.closest(".category-each-box")) {
        regionBoxes.forEach((regionBox) => {
            regionBox.classList.remove("clicked");
        });
    }
    if(!e.target.closest(".filter-combobox") && !e.target.closest(".count-orderby-button-box")) {
        filterBox.classList.remove("clicked");
    }
});

// 4. 찜버튼 눌렀을때, 개별로 색상변화
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

// // 4. 찜버튼 눌렀을때, 개별로 눌리고말고에 따라 모달창 메세지 달라지게 출력
// heartButtons.forEach((heart) => {
//     heart.addEventListener("click", (e) => {

//         let isCheck = heart.classList.contains("liked");
//         isCheck ? showModal("찜 목록에서 제거 되었습니다.") : showModal("찜 목록에 추가 되었습니다.");
//         isCheck = !isCheck;
//     });
// });

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