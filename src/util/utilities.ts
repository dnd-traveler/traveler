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

export const getAbilityModifier = (ability: number): number => {
    return Math.floor((ability - 10) / 2);
}

export const makeCancelable = <T>(promise: Promise<T>): { promise: Promise<T>; cancel(): void } => {
    let hasCanceled = false;

    const wrappedPromise = new Promise<T>((resolve, reject) => {
        promise.then(
            value => hasCanceled
                ? reject({ isCanceled: true })
                : resolve(value),
            error => hasCanceled
                ? reject({ isCanceled: true })
                : reject(error),
        );
    });

    return {
        promise: wrappedPromise,
        cancel(): void {
            hasCanceled = true;
        },
    };
};