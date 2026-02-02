document.addEventListener("DOMContentLoaded", () => {
    console.log("review js loaded");

    document.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.onclick = function () {
            if (confirm("삭제할까요?")) {
                this.closest(".review-item").remove();
            }
        };
    });

    document.querySelectorAll(".btn-hide").forEach((btn) => {
        btn.onclick = function () {
            this.closest(".review-item").style.opacity = "0.3";
        };
    });
});
