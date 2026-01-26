// -----------------------------------------
// 배송지 추가 부분

// 배송지 div, 버튼, 추가 모달
const addButton = userDeliveryDiv.querySelector(".UserSetting-FormButton");
const emptyDelivery = document.querySelector(".UserSetting-EmptyDelivery");
const deliveryAddModal = document.querySelector(".Delivery-ModalLayer");

// 배송지 추가 모달 내의 요소들
const receiverNameDiv = document.getElementById("receiver-name");
const addressDiv = document.getElementById("receiver-address");
const addressDetailDiv = document.getElementById("receiver-addressDetail");
const receiverPhoneDiv = document.getElementById("receiver-phone");
const deliveryCheckBoxs = document.querySelectorAll(".CheckBox-Wrapper");
const closeButton = deliveryAddModal.querySelector(".Delivery-CloseButton");
const addAddressBtn = deliveryAddModal.querySelector(".Delivery-AddButton");

// 모달 내의 input 들
const receiverNameInput = document.getElementById("receiverName");
const addressInput = document.getElementById("address");
const addressDetailInput = document.getElementById("addressDetail");
const receiverPhoneInput = document.getElementById("receiverPhone");

let deliveryList = [];

// 모달 내의 저장 값들
let receiverName = "";
let address = "";
let addressDetail = "";
let receiverPhone = "";

deliveryList.length != 0 && emptyDelivery.classList.add("off");
address
    ? addressDetailDiv.classList.remove("off")
    : addressDetailDiv.classList.add("off");

addButton.addEventListener("click", (e) => {
    deliveryAddModal.classList.remove("off");
});

closeButton.addEventListener("click", (e) => {
    deliveryAddModal.classList.add("off");
});

receiverNameInput.addEventListener("keyup", (e) => {
    receiverName = e.target.value;
});

addressDetailInput.addEventListener("keyup", (e) => {
    addressDetail = e.target.value;
});

receiverPhoneInput.addEventListener("keyup", (e) => {
    receiverPhone = e.target.value;
});

deliveryCheckBoxs.forEach((box) => {
    const boxSpan = box.querySelector(".CheckBox-Icon");
    box.addEventListener("click", (e) => {
        boxSpan.classList.toggle("checked");
    });
});

addAddressBtn.addEventListener("click", (e) => {
    // 배송지 추가하는 로직 넣어야 함.

    deliveryAddModal.classList.add("off");
});

// 다음 주소 api 부분
document.addEventListener("DOMContentLoaded", function () {
    const addressDiv = document.getElementById("receiver-address");
    const mainModal = document.querySelector(".Delivery-Modal:not(.off)");
    const apiModal = document.querySelector(".Delivery-Modal.api");
    const apiBody = apiModal.querySelector(".Delivery-ModalBody");

    addressDiv.addEventListener("click", () => {
        openAddrApi();
    });

    function openAddrApi() {
        apiBody.innerHTML = "";

        mainModal.style.display = "none";
        apiModal.classList.remove("off");
        apiModal.style.display = "block";

        new daum.Postcode({
            oncomplete: function (data) {
                let addr =
                    data.userSelectedType === "R"
                        ? data.roadAddress
                        : data.jibunAddress;

                addressInput.value = addr;
                address = addr;

                addressDetailDiv.classList.remove("off");
                addressDetailInput.focus();

                closeAddrApi();
            },
            width: "100%",
            height: "100%",
            maxSuggestItems: 5,
        }).embed(apiBody);
    }

    const apiCloseBtn = apiModal.querySelector(".Delivery-CloseButton");
    apiCloseBtn.addEventListener("click", (e) => {
        closeAddrApi();
    });

    const closeAddrApi = () => {
        mainModal.classList.remove("off");
        apiModal.classList.add("off");
        apiModal.style.display = "none";
        mainModal.style.display = "block";

        apiBody.innerHTML = "";
    };
});
