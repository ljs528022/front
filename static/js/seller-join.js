// 판매자 페이지 구분
const firstPage = document.querySelector(".JoinPage-ContentWrapper.user-info");
const secondPage = document.querySelector(
    ".JoinPage-ContentWrapper.seller-info",
);

// input들
const emailInput = document.getElementById("email");
const emailChkInput = document.getElementById("emailChk");
const passInput = document.getElementById("password");
const passChkInput = document.getElementById("passwordChk");
const phoneInput = document.getElementById("phone");
const nicknameInput = document.getElementById("nickname");
const bankNameInput = document.getElementById("bankName");
const bankAccountNumInput = document.getElementById("bankAccountNum");
const accountHolerNameInput = document.getElementById("accountHolerName");

// 이메일 인증코드 버튼
const confirmBtn = firstPage.querySelector(".JoinPage-EmailCheck");

// 이메일 인증코드 입력란
const confirmCodeInput = firstPage.querySelector("div[name=emailChk]");
const timerSpan = firstPage.querySelector(".JoinPage-Timer");

// 계좌번호 인증 버튼
const accountConfirmBtn = secondPage.querySelector(".JoinPage-EmailCheck");

// 다음, 가입하기 버튼
const nextBtn = firstPage.querySelector(".JoinPage-JoinButton");
const joinBtn = secondPage.querySelector(".JoinPage-JoinButton");

// 회원가입 정보 담는 변수
let sellerJoinInfo = {
    email: "",
    password: "",
    phone: "",
    nickname: "",
};

let sellerBankInfo = {
    bankName: "",
    bankAccountNum: "",
    accountHolerName: "",
};

// 확인용 값
let emailChk = false;
let passChk = false;
let accountConfirm = false;

// 이메일 정규식
const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 이메일(아이디) 입력란
emailInput.addEventListener("keyup", (e) => {
    // 이메일 입력란 경고문
    const errorSpan = emailInput.nextElementSibling;

    if (regEmail.test(e.target.value)) {
        emailInput.style.border = "1px solid rgb(99, 156, 99)";
        errorSpan.style.color = "rgb(99, 156, 99)";
        errorSpan.innerHTML = "올바른 이메일 형식입니다";

        confirmBtn.classList.remove("off");
    } else {
        emailInput.style.border = "1px solid rgb(255, 87, 87)";
        errorSpan.style.color = "rgb(255, 87, 87)";
        errorSpan.innerHTML = "올바르지 않은 이메일 형식입니다";
        return;
    }
});

// 타이머를 담을 변수 선언
let timerInterval;

confirmBtn.addEventListener("click", (e) => {
    // 여기에 인증코드 요청 관련 로직 작성

    // 버튼을 눌렀을 때, 시간이 돌고 있었다면 초기화
    if (timerInterval) clearInterval(timerInterval);

    // 성공하면 인증 코드 입력란 활성화
    confirmCodeInput.classList.remove("off");
    confirmBtn.innerHTML = "인증번호 재요청";

    // 타이머 시작
    verificationTimer(180);
});

// 여기에 제한시간 안에 인증코드 넣는 로직 해야함
emailChkInput.addEventListener("keyup", (e) => {
    // 인증 코드 span
    const userInput = e.target.value;
    const confirmSpan = confirmCodeInput.lastElementChild;

    // 서버에서 받은 인증코드
    const serverCode = "123456"; // 임시값

    if (userInput.length === 6) {
        if (userInput === serverCode) {
            // 인증 성공
            clearInterval(timerInterval);
            timerSpan.innerHTML = "";

            emailChkInput.style.border = "1px solid rgb(99, 156, 99)";
            confirmSpan.style.color = "rgb(99, 156, 99)";
            confirmSpan.innerHTML = "인증이 완료되었습니다.";

            sellerJoinInfo.email = emailInput.value;
        } else {
            emailChkInput.style.border = "1px solid rgb(255, 87, 87)";
            confirmSpan.style.color = "rgb(255, 87, 87)";
            confirmSpan.innerHTML = "인증 번호가 일치하지 않습니다.";
        }
    }
});

// 비밀번호 정규식
const regPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,15}$/;

// 비밀번호 입력란
const passVisible = passInput.nextElementSibling.nextElementSibling;
let isPassVisible = false;

// 비밀번호 보이기 on/off
passVisible.addEventListener("click", () => {
    isPassVisible = !isPassVisible;
    passInput.type = isPassVisible ? "text" : "password";
    passVisible.firstElementChild.classList.toggle("off");
    passVisible.lastElementChild.classList.toggle("off");
});

passInput.addEventListener("keyup", (e) => {
    const errorSpan = passInput.nextElementSibling;
    const passChkDiv = document.querySelector("div[name=passwordChk]");

    if (e.target.value) passVisible.classList.remove("off");

    if (regPassword.test(e.target.value)) {
        passInput.style.border = "1px solid rgb(99, 156, 99)";
        errorSpan.style.color = "rgb(99, 156, 99)";
        errorSpan.innerHTML = "올바른 비밀번호 형식입니다.";
        passChkDiv.classList.remove("off");
    } else {
        passInput.style.border = "1px solid rgb(255, 87, 87)";
        errorSpan.style.color = "rgb(255, 87, 87)";
        errorSpan.innerHTML = "올바르지 않은 비밀번호 형식입니다.";
        passChkDiv.classList.add("off");
    }
});

// 비밀번호 확인 입력란
const passChkVisible = passChkInput.nextElementSibling.nextElementSibling;
let isPassChkVisible = false;

// 비밀번호 보이기 on/off
passChkVisible.addEventListener("click", () => {
    isPassChkVisible = !isPassChkVisible;
    passChkInput.type = isPassChkVisible ? "text" : "password";
    passChkVisible.firstElementChild.classList.toggle("off");
    passChkVisible.lastElementChild.classList.toggle("off");
});

passChkInput.addEventListener("keyup", (e) => {
    const errorSpan = passChkInput.nextElementSibling;
    const currentVal = e.target.value;

    if (currentVal) passChkVisible.classList.remove("off");

    if (regPassword.test(currentVal)) {
        if (passInput.value === currentVal) {
            passChkInput.style.border = "1px solid rgb(99, 156, 99)";
            errorSpan.style.color = "rgb(99, 156, 99)";
            errorSpan.innerHTML = "비밀번호가 일치합니다.";

            sellerJoinInfo.password = currentVal;
        } else {
            passChkInput.style.border = "1px solid rgb(255, 87, 87)";
            errorSpan.style.color = "rgb(255, 87, 87)";
            errorSpan.innerHTML = "비밀번호가 다릅니다.";
        }
    } else {
        passChkInput.style.border = "1px solid rgb(255, 87, 87)";
        errorSpan.style.color = "rgb(255, 87, 87)";
        errorSpan.innerHTML = "올바르지 않은 비밀번호 형식입니다.";
    }
});

// 각 입력란에 값이 없으면 눈이 사라짐
passInput.addEventListener("blur", (e) => {
    if (!e.target.value) passVisible.classList.add("off");
});
passChkInput.addEventListener("blur", (e) => {
    if (!e.target.value) passChkVisible.classList.add("off");
});

// 전화번호 정규식
const regPhone = /^0\d{1,2}\d{3,4}\d{4}$/;

// 연락처 입력란
phoneInput.addEventListener("keyup", (e) => {
    // 연락처 경고문
    const errorSpan = phoneInput.nextElementSibling;

    if (regPhone.test(e.target.value)) {
        phoneInput.style.border = "1px solid rgb(99, 156, 99)";
        errorSpan.style.color = "rgb(99, 156, 99)";
        errorSpan.innerHTML = "올바른 전화번호 형식입니다.";

        sellerJoinInfo.phone = e.target.value;
    } else {
        phoneInput.style.border = "1px solid rgb(255, 87, 87)";
        errorSpan.style.color = "rgb(255, 87, 87)";
        errorSpan.innerHTML = "올바르지 않은 전회번호 형식입니다";
        return;
    }
});

// 이름 입력란
nicknameInput.addEventListener("keyup", (e) => {
    sellerJoinInfo.nickname = e.target.value;
});

// 은행명 입력란
bankNameInput.addEventListener("keyup", (e) => {
    sellerBankInfo.bankName = e.target.value;
});

// 계좌번호 입력란
bankAccountNumInput.addEventListener("keyup", (e) => {
    const userInput = e.target.value;
    const regAccount = /^\d{10,16}$/;

    const errorSpan = bankAccountNumInput.nextElementSibling;

    if (regAccount.test(userInput)) {
        bankAccountNumInput.style.border = "1px solid rgb(99, 156, 99)";
        errorSpan.style.color = "rgb(99, 156, 99)";
        errorSpan.innerHTML = "계좌번호 인증이 필요합니다.";

        accountConfirmBtn.classList.remove("off");
    } else {
        bankAccountNumInput.style.border = "1px solid rgb(255, 87, 87)";
        errorSpan.style.color = "rgb(255, 87, 87)";
        errorSpan.innerHTML = "올바르지 않은 계좌번호 형식입니다";
        return;
    }
});

// 계좌번호 인증 버튼
accountConfirmBtn.addEventListener("click", (e) => {
    const errorSpan = bankAccountNumInput.nextElementSibling;

    // 계좌 인증 api 필요함

    // 성공하면 출력
    alert("인증이 성공적으로 완료되었습니다.");
    bankAccountNumInput.style.border = "1px solid rgb(99, 156, 99)";
    errorSpan.style.color = "rgb(99, 156, 99)";
    errorSpan.innerHTML = "인증이 완료되었습니다.";

    sellerBankInfo.bankAccountNum = bankAccountNumInput.value;
});

accountHolerNameInput.addEventListener("keyup", (e) => {
    sellerBankInfo.accountHolerName = e.target.value;
});

// 다음 버튼 기능
nextBtn.addEventListener("click", (e) => {
    // 값이 모두 입력되었는지 검증하기
    const isInvalid = Object.keys(sellerJoinInfo).some((key) => {
        if (sellerJoinInfo[key] === "") {
            const fieldNames = {
                email: "이메일",
                password: "비밀번호",
                phone: "전화번호",
                nickname: "닉네임",
            };
            alert(`${fieldNames[key]} 항목이 완료되지 않았습니다.`);
            return true;
        }
        return false;
    });

    if (isInvalid) return;

    // 성공하면 다음 페이지로
    firstPage.classList.add("off");
    secondPage.classList.remove("off");
});

// 가입하기 버튼 기능
joinBtn.addEventListener("click", (e) => {
    // 값이 모두 입력되었는지 검증하기
    const isInvalid = Object.keys(sellerBankInfo).some((key) => {
        if (sellerBankInfo[key] === "") {
            const fieldNames = {
                bankName: "은행명",
                bankAccountNum: "은행 계좌 번호",
                accountHolerName: "예금주",
            };
            alert(`${fieldNames[key]} 항목이 완료되지 않았습니다.`);
            return true;
        }
        return false;
    });

    if (isInvalid) return;

    // 여기에 가입 요청 로직 만들어야함.
    // sellerJoinInfo, sellerBankInfo 두 값을 보내야 함

    // 성공하면 alert후 홈으로
    alert("회원가입에 성공했습니다.");
});

// 인증코드 타이머 기능
function verificationTimer(duration) {
    let timeLeft = duration;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // 화면 표시 업데이트
        timerSpan.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerSpan.innerHTML = "시간 만료";
            alert("인증 시간이 만료되었습니다. 다시 시도해 주세요.");
        }
        timeLeft--;
    }, 1000);
}
