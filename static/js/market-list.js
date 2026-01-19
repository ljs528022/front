const regionBoxes = document.querySelectorAll(".category-each-box");
const tabButtons = document.querySelectorAll(".tab-button");
const filterBox = document.querySelector(".filter-combobox");
const orderbyBox = document.querySelector(".orderby-box");

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

// 4. 찜버튼 클릭
