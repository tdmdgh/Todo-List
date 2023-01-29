import { moveCard, moveCardInColumn } from "./redux/actions.js"
import store from "./redux/store.js"

export default function dragEvent() {
    document.addEventListener('mousedown', (e) => {
        if (document.querySelector(".card-adding")) return
        if (document.querySelector(".floating")) return
        if (e.target.classList.contains("card-icons-delete")) return
        if (e.target.classList.contains("card-icons-edit")) return


        const card = e.target.closest(".card")
        if (!card) return
        const clientRect = card.getBoundingClientRect();
        const floatingCard = card.cloneNode(true)
        card.classList.add("transparent")
        floatingCard.classList.add("floating")
        floatingCard.dataset.dragStartX = e.pageX
        floatingCard.dataset.dragStartY = e.pageY
        floatingCard.dataset.positionX = window.pageXOffset + clientRect.left
        floatingCard.dataset.positionY = window.pageYOffset + clientRect.top
        card.before(floatingCard)
    })
    document.addEventListener('mousemove', (e) => {
        //floating 상자 이동
        const floatingCard = document.querySelector(".floating");
        if (!floatingCard) return
        if (floatingCard.classList.contains("dragEnd")) return
        let x = Number(floatingCard.dataset.positionX) + e.pageX - Number(floatingCard.dataset.dragStartX)
        let y = Number(floatingCard.dataset.positionY) + e.pageY - Number(floatingCard.dataset.dragStartY)
        floatingCard.style.left = x + "px"
        floatingCard.style.top = y + "px"


        const transparetnCard = document.querySelector(".transparent")
        //도착지의 transparetnCard 보여주기
        const elementBelowMouse = document.elementFromPoint(e.pageX, e.pageY)
        if (!elementBelowMouse) return
        const cardBelowMouse = elementBelowMouse.closest(".card")
        if (!cardBelowMouse) {
            //null이지만, x축기준으로 컬럼 구하고, y축기준으로 그 컬럼의 afterbegin, beforeend 정해서 그 칼럼으로 이동시키기
            const column = getColumnByMouse(e.pageX)
            if (column) {
                const clientRectCategory = column.getBoundingClientRect();
                if (e.pageY < clientRectCategory.bottom) {
                    if (!elementBelowMouse.closest(".column"))
                        column.querySelector(".card-list").insertAdjacentElement("afterbegin", transparetnCard);
                }
                else {
                    column.querySelector(".card-list").insertAdjacentElement("beforeend", transparetnCard);
                }
            }
        }
        else {
            //반나눴을 때, 위면 위에 붙이고, 아니면 아래 붙이기
            const clientRectCard = cardBelowMouse.getBoundingClientRect();
            if (e.clientY < (clientRectCard.y + clientRectCard.height / 2)) {
                cardBelowMouse.insertAdjacentElement("beforebegin", transparetnCard);
            }
            else cardBelowMouse.insertAdjacentElement("afterend", transparetnCard);
        }
    })
    document.addEventListener('mouseup', (e) => {
        const floatingCard = document.querySelector(".floating");
        if (!floatingCard) return

        floatingCard.classList.add("dragEnd")

        const cardId = floatingCard.dataset.id;

        const prevColumnId = floatingCard.closest(".column").id

        const destinationCard = document.querySelector(".transparent");
        const columnId = destinationCard.closest(".column").id
        const clientRect = destinationCard.getBoundingClientRect();
        const x = window.pageXOffset + clientRect.left;
        const y = window.pageYOffset + clientRect.top
        floatingCard.style.left = x + "px"
        floatingCard.style.top = y + "px"
        destinationCard.classList = ["card"]
        setTimeout(() => {
            const samePosition =
                (floatingCard == destinationCard.previousSibling) || (destinationCard == floatingCard.previousSibling)
            floatingCard.remove()
            if (prevColumnId == columnId) {
                // 아예 위치가 같았으면, dispatch 안하기
                // 위치 다르면, dispatch 하기
                if (!samePosition) {
                    console.log("Jklj")
                    const insertIndex = getElementIndex(destinationCard)
                    store.dispatch(moveCardInColumn(columnId, cardId, insertIndex));
                }
                /*move_workbox_in_column(columnId) */
            }
            else {
                //dispatch하기
                const insertIndex = getElementIndex(destinationCard)
                store.dispatch(moveCard(prevColumnId, columnId, cardId, insertIndex));
            }
        }, 100);
    })
}
function getColumnByMouse(mouseX) {
    let column;
    const columnList = document.querySelector(".column-list").childNodes
    for (let i = 0; i < columnList.length; i++) {
        const clientRectCategory = columnList[i].getBoundingClientRect();
        if (clientRectCategory.x < mouseX && mouseX < clientRectCategory.x + clientRectCategory.width) {
            column = columnList[i];
        }
    }
    return column
}
function getElementIndex(ele) {
    let _i = 0;
    while ((ele = ele.previousSibling) != null) {
        _i++;
    }
    return _i;
}