// const button = document.querySelector("button[type=button]");

// button.addEventListener("click", (e) => {
//     const Url = "https://www.naver.com";
// });

// $("이벤트 대상 선택").hover(
// function() { 마우스 오버 시 실행될 코드;},
// function() { 마우스 아웃 시 실행될 코드;}
// );

// <ul id="example">
//   <li>item 1</li>
//   <li>item 2</li>
//   <li>item 3</li>
// </ul>

let test = document.getElementById("Btn");

test.addEventListener(
    "mouseover",
    function (event) {
        // highlight the mouseover target
        event.target.style.backgroundColor = "#e5e7eb";
    },
    false,
);

test.addEventListener(
    "mouseout",
    function (event) {
        // highlight the mouseout target
        event.target.style.backgroundColor = "";
    },
    false,
);
