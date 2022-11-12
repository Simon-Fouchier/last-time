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

    if (years < 0 || days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
        return `0 years, 0 days, 0 hours, 0 minutes, 0 seconds`;
    }
    return `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export const timeUtils = Object.freeze({
    formatTime,
})