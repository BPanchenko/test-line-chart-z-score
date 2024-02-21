import { DataState } from './settings';
import type { ZScore } from "z-score";

export type TApiDraftData = {
    meta: {
        status: DataState.draft,
        domain: number[],
        categories: string[]
    },
    data: Array<Pick<TDataPoint, 'amt' | 'name' | 'pv' | 'uv'>>
};

export type TApiFulfilledData = {
    meta: {
        status: DataState.fulfilled,
        zScore?: typeof ZScore.prototype['data']
    } & Pick<TApiDraftData['meta'], 'categories' | 'domain'>;
    data: Array<TDataPoint>
};

export type TApiData = TApiDraftData | TApiFulfilledData;

export type TDataPoint = {
    amt: number,
    amtZScore: number,
    name: string,
    pv: number,
    pvZScore: number,
    uv: number,
    uvZScore: number,
};

export type TDataKey = keyof Omit<TDataPoint, 'name' | 'amtZScore' | 'pvZScore' | 'uvZScore'>;
export type TDataZScoreKey = keyof Omit<TDataPoint, 'name' | 'amt' | 'pv' | 'uv'>;

export type TZScoreDataRow = {
    domain?: [number, number];
    mean: number;
    stdDev: number;
    values: number[];
};

export interface IZScore {
    data?: {
        [key in TDataKey]: TZScoreDataRow
    };
    train(data: TApiDraftData['data']): void;
    calculate(obj: Pick<TDataPoint, TDataKey>): Record<TDataKey, number>;
}

export type TuseColoredIntervalRepresentationOptions = {
    domain: [number, number];
    range: [number, number];
    settings: {
        inIntervalColor: string;
        outOfIntervalColor: string;
        interval: [number, number];
    };
}

export type TuseColoredIntervalRepresentationResult = [number, string | string[]][];
