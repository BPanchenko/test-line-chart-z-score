export const enum DataState {
    draft = 'DRAFT',
    fulfilled = 'COMPLETED',
}

export const CHART = {
    colors: (new Map<number | string, string>([
        ['outOfRangeZScore', '#F44336'],
        [0, '#2196F3']
    ])),
    zScore: { 
        safeRange: [-1, 1]
    }
};
