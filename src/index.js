import ColumnList from './components/ColumnList.js';
import Modal from './components/Modal.js';
import store from './redux/store.js';
import { showModal } from './redux/actions.js';
import sideBarEvent from './sideBarEvent.js';
import dragEvent from './dragEvent.js';
import { getJSONdata } from '../server/server.js';
getJSONdata().then(() => {
    const columnList = new ColumnList();
    document.querySelector('body').appendChild(columnList.element);

    const modal = new Modal();
    document.querySelector('body').appendChild(modal.element);
    document.querySelector('.floating-button').addEventListener('click', () => {
        store.dispatch(showModal("ADD_COLUMN"));
    });

    //사이드 바 이벤트
    sideBarEvent();
    dragEvent();
})