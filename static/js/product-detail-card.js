// 사이드바에 상품 옵션 선택시 이벤트 파일

// 눌러진아이템 개수
let itemCount = 0;

// 카트변수들

// 나타나는 젤 큰박스
const appeardCart = document.querySelector(".selected-options-container");
// 선택된옵션들 담는 그다음 큰 박스
const cartsBox = document.querySelector(".selected-list-container");
const totalPrice = document.querySelector(".total-price");
const bulletSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="1.25" fill="#9E9E9E"></circle></svg>`;

// 옵션 변수들
const optionCards = document.querySelectorAll(".each-product-option");

const updateTotalPrice = () => {
    let total = 0;
    const cartItems = document.querySelectorAll(".each-cart-wrap");

    cartItems.forEach((item) => {
        // number로 안감싸면 typeof total = string임
        const eachPrice = Number(item.querySelector(".each-price").innerHTML.slice(0, -1));
        total += eachPrice;
    });
    totalPrice.innerHTML = total + "원";
};

optionCards.forEach((card) => {

    // 지금 이게 옵션카드 하나 눌렀을때 이벤트임.
    card.addEventListener("click", (e) => {

        const optionName = card.querySelector(".option-name").innerHTML.trim();
        const optionPrice = card.querySelector(".price-wrap").innerHTML.slice(0, -1);
        const optionItems = card.querySelectorAll(".item-list");
        
        let alreadyExistItem = 0;
        // alreadyExistItem로 이미 올라와 있는 옵션인지 검사해서
        // 이름이 같으면 그 누른 옵션자체 변수에 덮음.
        // 다르면 0(js에선 false임) 그대로 가서 다음 조건문에 쓰이게끔
        // 지금 카트에 뭐라도 있는지 없는지 모르니까 querySelectorAll로 일단 dom
        const cartItems = document.querySelectorAll(".each-cart-wrap");
        cartItems.forEach((item) => {
            const itemName = item.querySelector(".cart-item-name").innerHTML.trim();
            if(itemName === optionName) {
                alreadyExistItem = item;
            }
            // console.log(itemName);
            // console.log(optionName);
            // console.log("같?", itemName === optionName);
        });
        // 이름이 같아서 true면(존재하면) 방금 누른것만의 버튼들을 
        // 구분하기 위해 변수 선언
        if(alreadyExistItem) {
            const thisInput = alreadyExistItem.querySelector("input");
            const thisMinusBtn = alreadyExistItem.querySelectorAll(".qtt button")[0];
            const thisPlusBtn = alreadyExistItem.querySelectorAll(".qtt button")[1];
            const thisPrice = alreadyExistItem.querySelector(".each-price");

            // 지금 누른것만의 카트의 밸류 더하고
            // 여기까지 왔으면 최소 2개가 된거니까 마이너스버튼
            // 누를수있게 disabled 해제하고
            // 누른 옵션만의 가격(카드 하나의 총(전체말고) 가격)도 계산
            thisInput.value++;
            thisMinusBtn.disabled = false;
            thisPrice.innerHTML = optionPrice * thisInput.value + "원";
            updateTotalPrice();
            return;
            // 리턴안하면 밑으로가서 박스 새로 생성하니까 탈출시키기
        }

        // 위에 if문 수행 안하고 일로 왔으면 새로왔거나
        // 기존에 담겨진 친구들이랑 다른애니까 카운트 증가시키고
        // 드러나게 하기
        itemCount++;
        if(itemCount >= 1) {
            appeardCart.style.display = "flex";
        }

        // itemExplain에 미리 담아만 놓는거지
        // 이게 지금 드러나진 않음
        let itemExplain = ``;
        optionItems.forEach((item) => {
            const spans = item.querySelectorAll("span");
            itemExplain += `
                <li>
                    <div class="cart-item-list">
                        <div class="cart-bullet">
                            ${bulletSvg}
                        </div>
                        <span>
                            ${spans[0].textContent}
                        </span>
                        <span>
                            ${spans[1].textContent}
                        </span>
                    </div>
                </li>`;
        })
        // 마찬가지로 저기 위에랑 같은 클래스를 다루지만
        // 여기에 온거는 처음 오거나 다른애가 온거니까 새로운 div만들어야지
        const cartItem = document.createElement("div");
        cartItem.className = "each-cart-wrap";

        cartItem.innerHTML = `
            <div class="cart-item-name">
                ${optionName}
            </div>
            <div class="cart-info-wrap">
                <div class="cart-option-explain">
                    ${itemExplain} 
                </div>
                <div class="cart-qtt-price">
                    <div class="qtt">
                        <button disabled type="button">
                            <div name="minus" class="qtt-minus">
                                <svg viewBox="0 0 48 48"><path d="M6 24.1C6 22.9402 6.9402 22 8.1 22H39.9C41.0598 22 42 22.9402 42 24.1C42 25.2598 41.0598 26.2 39.9 26.2H8.1C6.9402 26.2 6 25.2598 6 24.1Z"></path></svg>
                            </div>
                        </button>
                        <input readonly type="text" value="1">
                        <button type="button">
                            <div name="plus" class="qtt-plus">
                                <svg viewBox="0 0 48 48"><path fill-rule="evenodd" clip-rule="evenodd" d="M43.7104 21.8549H25.99V4.09524C25.99 2.89796 24.9945 2 23.9005 2C22.8054 2 21.81 2.89796 21.81 4.09524V21.9546H4.0905C2.89593 21.8549 2 22.8526 2 23.9501C2 25.0476 2.89593 26.0454 4.0905 26.0454H21.9095V43.9048C21.9095 45.0023 22.8054 46 23.999 46C25.095 46 26.0905 45.102 26.0905 43.9048V26.0454H43.9085C45.0045 26.0454 46 25.1474 46 23.9501C45.8009 22.8526 44.904 21.8549 43.7104 21.8549Z"></path></svg>
                            </div>
                        </button>
                    </div>
                    <div class="each-price">${optionPrice}원</div>
                </div>
            </div>
            <button class="delete-cart-btn">
                <div>
                    <svg width="10" height="10" fill="#1C1C1C" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28544 5.00257L2.01916 2.73642C1.82521 2.54248 1.82974 2.23083 2.01598 2.02765C2.21448 1.81131 2.5294 1.8394 2.72795 2.02108L2.72969 2.02268L4.99738 4.2905L7.26357 2.02431C7.4575 1.83056 7.7691 1.83508 7.97226 2.02115C8.1886 2.21946 8.16077 2.53473 7.97878 2.73311L7.97723 2.73479L5.70945 5.00257L7.97564 7.26876C8.16953 7.46283 8.16504 7.77425 7.97884 7.97756L7.97724 7.9793L7.97557 7.98097C7.78164 8.17472 7.47008 8.17023 7.26691 7.98417L7.26519 7.98259L4.99738 5.71465L2.73129 7.981C2.53725 8.17469 2.22572 8.17025 2.02253 7.98417L2.01908 7.98101L2.01592 7.97756C1.82971 7.77425 1.82526 7.46279 2.01916 7.26872L4.28544 5.00257Z"></path></svg>
                </div>
            </button>
        `;
        cartsBox.prepend(cartItem); // 자식요소 맨위로 추가
        updateTotalPrice();

        const inputTag = cartItem.querySelector("input");
        const controlQttBtns = cartItem.querySelectorAll(".qtt button");
        const minusBtn = controlQttBtns[0];
        const plusBtn = controlQttBtns[1];
        const deleteBtn = cartItem.querySelector(".delete-cart-btn");
        const eachCardPrice = cartItem.querySelector(".each-price");
    
        minusBtn.addEventListener("click", (e) => {
            // 1일때는 아무일도 일어나지 않음
            if(inputTag.value > 1) {
                inputTag.value--;
                // console.log("1보다큰거에서 감소함");
                if(inputTag.value == 1) {
                    minusBtn.disabled = true;
                    // console.log("1되버림");
                }
                eachCardPrice.innerHTML = optionPrice * inputTag.value + "원";
                updateTotalPrice();
            }
        });

        plusBtn.addEventListener("click", (e) => {
            inputTag.value++;
            minusBtn.disabled = false;
            eachCardPrice.innerHTML = optionPrice * inputTag.value + "원";
            updateTotalPrice();
        });

        deleteBtn.addEventListener("click", (e) => {
            cartItem.remove();
            itemCount--;
            
            if (itemCount === 0) {
                appeardCart.style.display = "none";
            }
            updateTotalPrice();
        });

    });
});