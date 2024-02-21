import { red, blue } from 'protosite-palette/assets/palette';

export const enum DataState {
    draft = 'DRAFT',
    fulfilled = 'COMPLETED',
}

export const CHART = {
    colors: (new Map<number | string, string>([
        ['outOfRangeZScore', red],
        [0, blue]
    ])),
    zScore: { 
        safeRange: [-1, 1]
    }
};
