
class Log {
    constructor(logData) {
        this.id = logData.id;
        this.content = logData.content;
        this.time = logData.time;
        this.element = document.createElement('li');
        this.element.classList.add("log");
        this.render();
    }
    render() {
        this.element.innerHTML = `
        <div class="profile">
            <img src="./assets/profile.png" alt="">
        </div>
        <ul class="log-col">
            <li class="log-user">@sam</li>
            <li class="log-content">${this.content}</li>
            <li class="log-time">${this.timeDiff(this.time)}</li>
        </ul>
      `;
    }
    timeDiff(date) {
        const now = new Date();
        const timeDiffMin = Math.floor((now.getTime() - date) / 1000 / 60);
        if (timeDiffMin < 1) return '방금 전';
        if (timeDiffMin < 60) {
            return `${timeDiffMin}분 전`;
        }
        const timeDiffHour = Math.floor(timeDiffMin / 60);
        if (timeDiffHour < 24) {
            return `${timeDiffHour}시간 전`;
        }
        const timeDiffDay = Math.floor(timeDiffHour / 24);
        if (timeDiffDay < 365) {
            return `${timeDiffDay}일 전`;
        }
        return `${Math.floor(timeDiffDay / 365)}년 전`;
    }
}
export default Log;
