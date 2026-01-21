// 연관 검색어 버튼 기능
// 누르면 해당 검색어로 검색

// 임박 마감 버튼 누르면 스타일 변경
const clearanceBtn = document.querySelector(".Filter-Option.Clearance");
clearanceBtn.addEventListener("click", (e) => {
    clearanceBtn.classList.toggle("isClicked");
});

// 드롭다운 버튼 부분 -----------------------------
// 드롭다운 버튼 클릭 시, 해당 드로다운 메뉴 표시 토글
const dropDownBtns = document.querySelectorAll(".Trigger-Button");
const dropDownMenus = document.querySelectorAll(".DropDown-Container");
const dropDownTexts = document.querySelectorAll(".Trigger-Text");
const dropDownArrows = document.querySelectorAll(".Trigger-Arrow svg");

dropDownBtns.forEach((button, i) => {
    const dropDownOptions =
        dropDownMenus[i].querySelectorAll(".DropDown-Button");

    button.addEventListener("click", (e) => {
        // 눌린 버튼을 제외한 다른 메뉴 비활성화
        dropDownBtns.forEach((otherButton, j) => {
            if (i !== j) {
                dropDownArrows[j].classList.remove("isChecked");
                dropDownMenus[j].classList.remove("clicked");
            }
        });

        dropDownArrows[i].classList.toggle("isChecked");
        dropDownArrows[i].style.transition = `transform 0.5s`;
        dropDownMenus[i].classList.toggle("clicked");
    });

    dropDownOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            let selectedOption = option.innerHTML;
            let marketDropDown = document.querySelector("button[name=market]");
            let detailCate = document.querySelector("button[name=c-category]");

            // 지역을 선택했을 경우, 장터 카테고리 활성화
            if (button.name === "region") {
                marketDropDown.style.display = "flex";
            } else if (button.name === "p-category") {
                // 대분류 카테고리를 눌렀을 경우, 소분류 카테고리 활성화
                detailCate.style.display = "flex";
            }

            // 지역이 '전체 지역'이면 장터 카테고리 비활성화
            dropDownTexts[i].innerHTML = selectedOption;
            if (dropDownTexts[i].innerHTML === "전체 지역") {
                marketDropDown.style.display = "none";
                marketDropDown.nextElementSibling.classList.remove("clicked");
            } else if (dropDownTexts[i].innerHTML === "전체 보기") {
                detailCate.style.display = "none";
                detailCate.nextElementSibling.classList.remove("clicked");
            }

            dropDownArrows[i].classList.remove("isChecked");
            dropDownArrows[i].style.transition = `transform 0.5s`;
            dropDownMenus[i].classList.remove("clicked");
        });
    });
});

// 드롭다운 svg 회전

// 페이지를 클릭, 스크롤 하면 드롭다운 비활성화
document.addEventListener("scroll", (e) => {});
