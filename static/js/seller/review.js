const arrowWrappers = document.querySelectorAll(
    ".ReviewKeywordItem__IconWrapper",
);

arrowWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
        const container = this.closest(
            ".ReviewKeywordItem__ReviewKeywordItemWrapper",
        );

        const svgIcon = this.querySelector("svg");

        if (!container) return;

        // 펼쳐져 있으면 접기
        if (container.classList.contains("gdLZFN")) {
            container.classList.remove("gdLZFN");
            container.classList.add("jZeOxh");
            if (svgIcon) svgIcon.style.transform = "rotate(0deg)";
        }
        // 접혀 있으면 펼치기
        else {
            container.classList.remove("jZeOxh");
            container.classList.add("gdLZFN");
            if (svgIcon) svgIcon.style.transform = "rotate(180deg)";
        }
    });
});

arrowWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
        console.log("클릭됨", this);
    });
});
