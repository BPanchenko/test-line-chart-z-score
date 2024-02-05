import { TDataKey } from "../src/api/types";

type TZScoreDataRow = {
    domain?: number[];
    mean: number;
    stdDev: number;
    values: number[];
};

interface IZScore {
    data?: {
        [key in TDataKey]: TZScoreDataRow
    };
    train(data: TApiDraftData['data']): void;
    calculate(obj: Pick<TDataPoint, TDataKey>): Record<TDataKey, number>;
}

declare module 'z-score' {
    export type { IZScore, TZScoreDataRow };
    export default class ZScore extends IZScore {}
}
