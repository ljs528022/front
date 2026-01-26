// -----------------------------------------
// 유저 수정 페이지 기능

// 계정 부분
const userEmailDiv = document.getElementById("user-email");
const userPasswordDiv = document.getElementById("user-password");
const userPhoneDiv = document.getElementById("user-phone");
const userTypeDiv = document.getElementById("user-regType");

// 계정 부분의 변경 버튼들
const userAccountSettingBtns = userAccountDiv.querySelectorAll(
    ".UserSetting-FormButton",
);

let email = ""; // 유저 이메일
let emailChecked = false; // 이메일 인증 여부
let password = ""; // 유저 비밀번호
let passwordCheck = ""; // 유저 비밀번호 확인
let phone = ""; // 유저 전화번호
let regType = ""; // 유저 가입유형

// 회원 이메일 부분
const userEmailComfirm = document.querySelector(".UserSetting-EmailConfirm");
const userEmailComfirmBox = document.querySelector(".UserSetting-EmailChecked");
const userEmailInput = userEmailDiv.querySelector(".UserSetting-InputWrapper");
const userEmailWrong = userEmailDiv.querySelector(".UserSetting-InputWrong");
const userEmailSubmitBtn = userEmailDiv.lastElementChild;

// 회원 비밀번호 부분
const userCurrentPassword = userPasswordDiv.querySelector(
    ".UserSetting-InputWrapper.prevPassword",
);
const userChangePassword = userPasswordDiv.querySelector(
    ".UserSetting-InputWrapper.password",
);
const userPasswordSubmitBtn = userPasswordDiv.lastElementChild;

// 회원 연락처 부분
const userPhoneContent = userPhoneDiv.firstElementChild.nextElementSibling;
const userPhoneDesc = userPhoneDiv.querySelector(
    ".UserSetting-InputDescription",
);
const userPhoneInput = userPhoneDiv.querySelector(".UserSetting-InputWrapper");
const userPhoneComfirm = userPhoneDiv.lastElementChild;

// 회원 연동 계정 확인
const userRegType = userTypeDiv.querySelector(".UserSetting-UserType");
const userRegSpan = userRegType.firstElementChild;

// 각 요소들 입력 요소
const emailInput = document.getElementById("email");
const prevPasswordInput = document.getElementById("prevPassword");
const passwordInput = document.getElementById("password");
const passwordCheckInput = document.getElementById("passwordCheck");
const phoneInput = document.getElementById("phone");

// 변경 누르기 전에 off 해야할 것들
userEmailComfirm.classList.add("off");
!emailChecked
    ? userEmailComfirmBox.firstElementChild.classList.add("off")
    : userEmailComfirmBox.lastElementChild.classList.add("off");
userEmailInput.classList.add("off");
userEmailSubmitBtn.classList.add("off");
userCurrentPassword.classList.add("off");
userChangePassword.classList.add("off");
userPasswordSubmitBtn.classList.add("off");
userPhoneInput.classList.add("off");
userPhoneComfirm.classList.add("off");

emailInput.value = userEmailComfirm.previousElementSibling.innerHTML;
phoneInput.value = userPhoneContent.innerHTML;

// 나중에 유저 정보에 값 받아와서 가입 유형 알려줘야 함

userAccountSettingBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        button.classList.toggle("onClick");
        button.innerHTML = button.classList.contains("onClick")
            ? "취소"
            : "변경";

        // 누른 버튼의 최상단 div의 id 값
        currentDiv = button.closest(".UserSetting-FormWrapper").id;

        switch (currentDiv) {
            case "user-email":
                userEmailComfirm.previousElementSibling.classList.toggle("off");
                userEmailComfirmBox.classList.toggle("off");
                userEmailInput.classList.toggle("off");
                userEmailSubmitBtn.classList.toggle("off");
                break;
            case "user-password":
                userCurrentPassword.classList.toggle("off");
                userChangePassword.classList.toggle("off");
                userPasswordSubmitBtn.classList.toggle("off");
                break;
            case "user-phone":
                userPhoneContent.classList.toggle("off");
                userPhoneDesc.classList.toggle("off");
                userPhoneInput.classList.toggle("off");
                userPhoneComfirm.classList.toggle("off");
        }

        // 이메일 입력 기능 이때, 이메일 입력이 비어있으면 경고문 출력
        emailInput.addEventListener("keyup", (e) => {
            const EMAIL_PATTERN =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const tempColor = "rgb(13, 13, 13)";
            const tempBorder = emailInput.style.border;

            if (!e.target.value) {
                emailInput.style.color = "rgb(248, 100, 83)";
                emailInput.parentElement.style.border =
                    "1px solid rgb(248, 100, 83)";
                userEmailWrong.innerHTML = "비워두시면 안됩니다.";
                emailInput.focus();
            } else {
                emailInput.style.color = tempColor;
                emailInput.parentElement.style.border = tempBorder;
                userEmailWrong.innerHTML = "";

                if (!EMAIL_PATTERN.test(e.target.value)) {
                    userEmailWrong.innerHTML =
                        "올바른 이메일 형식을 입력해주세요.";
                }
            }
        });

        let passwordInputs = [
            prevPasswordInput,
            passwordInput,
            passwordCheckInput,
        ];

        passwordInputs.forEach((passInput, i) => {
            const inputWorngs = userPasswordDiv.querySelectorAll(
                ".UserSetting-InputWrong",
            );

            passInput.addEventListener("keyup", (e) => {
                const PASS_PATTERN =
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,15}$/;
                const regCheck = PASS_PATTERN.test(passInput.value);
                const tempColor = "rgb(248, 100, 83)";

                if (!regCheck) {
                    inputWorngs[i].style.color = tempColor;
                    inputWorngs[i].innerHTML =
                        "비밀번호는 6자 이상, 15자 이하로 입력하세요.";
                    inputWorngs[i].classList.remove("off");
                } else {
                    inputWorngs[i].style.color = "rgb(94, 189, 145)";
                    inputWorngs[i].innerHTML = "올바른 비밀번호입니다";
                    inputWorngs[i].classList.remove("off");
                }
            });
        });

        phoneInput.addEventListener("keyup", (e) => {
            const inputWorng = userPhoneDiv.querySelector(
                ".UserSetting-InputWrong",
            );
            const tempColor = "rgb(13, 13, 13)";
            const tempBorder = emailInput.style.border;

            if (!e.target.value) {
                phoneInput.style.color = "rgb(248, 100, 83)";
                phoneInput.parentElement.style.border =
                    "1px solid rgb(248, 100, 83)";
                inputWorng.innerHTML = "비워두시면 안됩니다.";
                phoneInput.focus();
            } else {
                phoneInput.style.color = tempColor;
                phoneInput.parentElement.style.border = tempBorder;
                inputWorng.innerHTML = "";
            }

            if (!EMAIL_PATTERN.test(e.target.value)) {
                inputWorng.innerHTML = "올바른 이메일 형식을 입력해주세요.";
            }
        });
    });
});

userEmailSubmitBtn.addEventListener("click", (e) => {
    if (email) {
        alert("회원님의 이메일이 변경되었습니다.");
        userAccountSettingBtns[0].click();
    } else {
        userAccountSettingBtns[0].click();
    }
});

userPasswordSubmitBtn.addEventListener("click", (e) => {
    if (password) {
        userAccountSettingBtns[1].click();
    } else {
        userAccountSettingBtns[1].click();
    }
});

userPhoneComfirm.addEventListener("click", (e) => {
    if (phone) {
        alert("회원님의 이메일이 변경되었습니다.");
        userAccountSettingBtns[2].click();
    } else {
        userAccountSettingBtns[2].click();
    }
});
