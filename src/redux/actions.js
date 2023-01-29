export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const ADD_COLUMN = 'ADD_COLUMN';
export const EDIT_COLUMN = 'EDIT_COLUMN';
export const ADD_CARD = 'ADD_CARD';
export const REGISTER_CARD = 'REGISTER_CARD';
export const REMOVE_ADDING_CARD = 'REMOVE_ADDING_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_CARD_IN_COLUMN = 'MOVE_CARD_IN_COLUMN';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_COLUMN = 'DELETE_COLUMN';

export function showModal(form, columnId = null, cardId = null) {
    return {
        type: SHOW_MODAL,
        payload: {
            form,
            columnId,
            cardId,
        }
    }
}
export function hideModal() {
    return {
        type: HIDE_MODAL,
        payload: {}
    }
}
export function addColumn(title) {
    return {
        type: ADD_COLUMN,
        payload: {
            title,
        }
    }
}
export function editColumn(columnId, title, prevTitle) {
    return {
        type: EDIT_COLUMN,
        payload: {
            columnId,
            title,
            prevTitle
        }
    }
}
export function addCard(columnId) {
    return {
        type: ADD_CARD,
        payload: {
            columnId,
        }
    }
}
export function registerCard(columnId, card) {
    return {
        type: REGISTER_CARD,
        payload: {
            columnId,
            card
        }
    }
}
export function removeAddingCard() {
    return {
        type: REMOVE_ADDING_CARD,
        payload: {
        }
    }
}
export function editCard(columnId, cardId, prevTitle, updates) {
    return {
        type: EDIT_CARD,
        payload: {
            columnId,
            cardId,
            prevTitle,
            updates
        }
    }
}

export function moveCard(prevColumnId, columnId, cardId, insertIndex) {
    return {
        type: MOVE_CARD,
        payload: {
            prevColumnId,
            columnId,
            cardId,
            insertIndex
        }
    }
}
export function moveCardInColumn(columnId, cardId, insertIndex) {
    return {
        type: MOVE_CARD_IN_COLUMN,
        payload: {
            columnId,
            cardId,
            insertIndex
        }
    }
}

export function deleteCard(columnId, cardId) {
    return {
        type: DELETE_CARD,
        payload: {
            columnId,
            cardId
        }
    }
}

export function deleteColumn(columnId) {
    return {
        type: DELETE_COLUMN,
        payload: {
            columnId,
        }
    }
}
