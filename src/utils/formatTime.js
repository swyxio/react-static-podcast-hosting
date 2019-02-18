export function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / (60 * 60));
    timeInSeconds -= hours * 60 * 60;
    const minutes = Math.floor(timeInSeconds / 60);
    timeInSeconds -= minutes * 60;
    // left pad number with 0
    const leftPad = (num) => `${num}`.padStart(2, '0');
    const str = (hours ? `${leftPad(hours)}:` : '') +
        // (minutes ? `${leftPad(minutes)}:` : '00') +
        `${leftPad(minutes)}:` +
        leftPad(Math.round(timeInSeconds));
    return str;
}
