function formatTime(time: number): string {
    let remainingTime = time;
    const years = Math.floor(remainingTime / 31536000000);
    remainingTime = time % 31536000000
    const days = Math.floor(remainingTime / 86400000);
    remainingTime = time % 86400000
    const hours = Math.floor(remainingTime / 3600000);
    remainingTime = time % 3600000
    const minutes = Math.floor(remainingTime / 60000);
    remainingTime = time % 60000
    const seconds = Math.floor(remainingTime / 1000);
    return `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}


const randomDate = () => new Date(Math.random() * Date.now());

export const timeUtils = Object.freeze({
    formatTime,
    randomDate
})