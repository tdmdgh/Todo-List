import {
    ADD_COLUMN,
    EDIT_COLUMN,
    ADD_CARD,
    REGISTER_CARD,
    EDIT_CARD,
    MOVE_CARD,
    MOVE_CARD_IN_COLUMN,
    DELETE_CARD,
    DELETE_COLUMN,
    SHOW_MODAL,
    HIDE_MODAL,
    REMOVE_ADDING_CARD
} from './actions.js';
import { initialState } from '../../server/initalState.js'
import { postColumn, postLog, patchColumnTitle, patchCardList, deleteColumn } from '../../server/server.js';


function reducer(state = initialState, action) {
    let index;
    let logData;
    let colData;
    switch (action.type) {
        case SHOW_MODAL:
            if (action.payload.form == ADD_COLUMN)
                return { ...state, isAddColModalShown: true };
            if (action.payload.form == DELETE_CARD)
                return { ...state, deletingCardData: { columnId: action.payload.columnId, cardId: action.payload.cardId }, isDeleteCardModalShown: true };
            return { ...state }
        case HIDE_MODAL:
            return { ...state, isAddColModalShown: false, deletingCardData: {}, isDeleteCardModalShown: false }
        case ADD_COLUMN:
            colData = {
                id: getNewId(state.columns),
                title: action.payload.title,
                cards: []
            };
            state.columns.push(colData);
            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${action.payload.title}</b>(을)를 <b>추가</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            postColumn(colData);
            return { ...state };
        case EDIT_COLUMN:
            colData = state.columns.find(col => col.id == action.payload.columnId);
            colData.title = action.payload.title;
            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${action.payload.prevTitle}</b>(이)가 <b>${action.payload.title}</b>(으)로 <b>변경</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            patchColumnTitle(colData);

            return { ...state };
        case ADD_CARD:
            state.addingCard = { "id": Date.now(), "columnId": action.payload.columnId };
            return { ...state };
        case REGISTER_CARD:
            colData = state.columns.find(col => col.id == action.payload.columnId);
            let newCard = action.payload.card;
            // debugger
            colData.cards.unshift(newCard);

            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${colData.title}</b>에 <b>${newCard.title}</b>(을)를 <b>등록</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            patchCardList(colData);
            return { ...state };
        case REMOVE_ADDING_CARD:
            state.addingCard = {};
            return { ...state };
        case EDIT_CARD:
            colData = state.columns.find(col => col.id == action.payload.columnId)
            let card = colData.cards.find(c => c.id == action.payload.cardId);
            Object.assign(card, action.payload.updates);

            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${colData.title}</b>의 <b>${action.payload.prevTitle}</b>(이)가 <b>${action.payload.updates.title}</b>(으)로 <b>변경</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            patchCardList(colData);
            return { ...state };
        case MOVE_CARD:
            let fromCol = state.columns.find(col => col.id == action.payload.prevColumnId);
            let toCol = state.columns.find(col => col.id == action.payload.columnId);
            let cardToMove = fromCol.cards.find(c => c.id == action.payload.cardId);
            index = fromCol.cards.indexOf(cardToMove);
            fromCol.cards.splice(index, 1);
            toCol.cards.splice(action.payload.insertIndex, 0, cardToMove);
            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${cardToMove.title}</b>(을)를 <b>${fromCol.title}</b>에서 <b>${toCol.title}</b>(으)로 <b>이동</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            patchCardList(fromCol);
            patchCardList(toCol);
            return { ...state };
        case MOVE_CARD_IN_COLUMN:
            colData = state.columns.find(col => col.id == action.payload.columnId);
            let movingCard = colData.cards.find(c => c.id == action.payload.cardId);
            index = colData.cards.indexOf(movingCard);

            [colData.cards[index], colData.cards[action.payload.insertIndex]] = [colData.cards[action.payload.insertIndex], colData.cards[index]];
            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${colData.title}</b>에서 <b>${movingCard.title}</b>의 순서를 <b>변경</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            patchCardList(colData);
            return { ...state };
        case DELETE_CARD:
            const colId = state.deletingCardData.columnId;
            const cardId = state.deletingCardData.cardId;
            colData = state.columns.find(col => col.id == colId);
            let c = colData.cards.find(c => c.id == cardId);
            let i = colData.cards.indexOf(c);

            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${colData.title}</b>에서 <b>${c.title}</b>(을)를 <b>삭제</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            colData.cards.splice(i, 1);
            patchCardList(colData);
            return { ...state };
        case DELETE_COLUMN:
            colData = state.columns.find(col => col.id == action.payload.columnId);
            let deletecolIndex = state.columns.indexOf(colData)
            logData = {
                "id": getNewId(state.logs),
                "content": `<b>${colData.title}</b>(을)를 <b>삭제</b>하였습니다.`,
                "time": new Date().getTime(),
            }
            state.logs.push(logData);
            postLog(logData);
            state.columns.splice(deletecolIndex, 1);
            deleteColumn(colData.id)
            return { ...state };
        default:
            return state;
    }
}
function getNewId(arr) { //마지막 배열의 id에서 +1 
    if (arr.length == 0) return 0
    return arr[arr.length - 1].id + 1
}
export default reducer;
