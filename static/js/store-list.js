const regionBoxes = document.querySelectorAll(".category-each-box");

const orderbyBox = document.querySelector(".orderby-box");

const ddFilter = document.querySelector(".dropdown-filter");

const heartButtons = document.querySelectorAll(".like-button");

// 1. 펼치고 닫고, 
// a를 펼치려고 클릭했을때, b가 펼쳐져있는걸 닫아버림
regionBoxes.forEach((regionBox) => {
    regionBox.addEventListener("click", (e) => {
        if(e.target.closest(".tab-button")) {
            e.stopPropagation(); // 자식과 부모에 둘다 이벤트가 주어졌을때, 자식을 눌렀을때, 부모의 이벤트가 발생하는걸 방지
            return;
        }
        let condition = regionBox.classList.contains("clicked");
        regionBoxes.forEach((box) => {
            box.classList.remove("clicked");
        });
        regionBox.classList.toggle("clicked", !condition);
        // regionBox.classList.toggle("clicked");
    });
});

// 2. 정렬 버튼 이벤트
orderbyBox.addEventListener("click", (e) => {
    let condition = orderbyBox.classList.contains("clicked");
    orderbyBox.classList.toggle("clicked", !condition);
});

// 3. 필터 버튼 이벤트 
ddFilter.addEventListener("click", (e) => {
    let condition = ddFilter.classList.contains("clicked");
    ddFilter.classList.toggle("clicked", !condition);
});

// 4. 바깥쪽 클릭했을때 펼쳐진거 닫는 이벤트
document.addEventListener("click", (e) => {
    if(!e.target.closest(".tab-button") && !e.target.closest(".category-each-box")) {
        regionBoxes.forEach((regionBox) => {
            regionBox.classList.remove("clicked");
        });
    }
    if(!e.target.closest(".filter-combobox") && !e.target.closest(".orderby-box")) {
        orderbyBox.classList.remove("clicked");
    }
    if(!e.target.closest(".dd-filter-box") && !e.target.closest(".dropdown-filter")) {
        ddFilter.classList.remove("clicked");
    }
});

// 4-2. 스크롤 움직일때 펼쳐진거 닫는 이벤트
document.addEventListener("scroll", () => {
    regionBoxes.forEach((box) => box.classList.remove("clicked"));
    orderbyBox.classList.remove("clicked");
    ddFilter.classList.remove("clicked");
});

// 5. 찜버튼 눌렀을때, 개별로 색상변화
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
// 모달함수임!
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