
import LogList from './components/LogList.js';
export default function sideBarEvent() {
    document.addEventListener('click', (e) => {
        // Sidebar event: active
        const menuicon = e.target.closest("#menuicon")
        if (menuicon) sidebar_active_event()

        // Sidebar event: close
        const sidebar_close = e.target.closest("#sidebar_close")
        if (sidebar_close) sidebar_close_event(sidebar_close)
    })
}
function sidebar_active_event() {
    const logList = new LogList();
    document.getElementById('sidebar').classList.add('active');
}
function sidebar_close_event(e) {
    e.closest("#sidebar").classList.remove('active');
}