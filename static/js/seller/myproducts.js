console.log(document.getElementById("delete-draft-button"));

const tabContainer = document.querySelector(".Tab__TabContainer");
const allBtn = document.querySelector(".entire__Button");
const bargainBtn = document.querySelector(".deadline__Button");

const cardWrapper = document.querySelector(
    ".PcMyProjectCardList__CardContainer",
);
const cards = cardWrapper.querySelectorAll(".MyProjectCard__CardContainer");

bargainBtn.addEventListener("click", (e) => {
    allBtn.classList.remove("selected");
    bargainBtn.classList.add("selected");

    cards.forEach((card) => {
        const condition = card.textContent.includes("감귤");

        if (condition) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

allBtn.addEventListener("click", (e) => {
    allBtn.classList.add("selected");
    bargainBtn.classList.remove("selected");

    cards.forEach((card) => {
        card.style.display = "";
    });
});

const trashcanBtn = document.getElementById("delete-draft-button");
const cancelBtn = document.getElementById("cancelModal");
const deleteBtn = document.getElementById("confirmDelete");
const modalOverlay = document.getElementById("deleteModalContainer");

let modalCheck;

const showWarnModal = () => {
    modalCheck = false;
    document.querySelector("#deleteModalContainer").style.display = "block";
};

trashcanBtn.addEventListener("click", showWarnModal);

cancelBtn.addEventListener("click", (e) => {
    modalOverlay.style.display = "none";
});

deleteBtn.addEventListener("click", (e) => {
    alert("삭제 완료하였습니다!");
    modalOverlay.style.display = "none";
});
