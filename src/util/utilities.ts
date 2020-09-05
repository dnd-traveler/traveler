export const formatTime = (hour: number): string => {
    if (hour === 0) {
        return '12:00am';
    } else if (hour > 0 && hour < 12) {
        return `${hour}:00am`;
    } else if (hour === 12) {
        return `12:00pm`;
    } else if (hour > 12) {
        return `${hour - 12}:00pm`;
    } else {
        return '';
    }
}

export const capitalize = (input: string): string => {
    return input.substr(0, 1).toUpperCase() + input.substr(1).toLowerCase();
}