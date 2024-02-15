import { DataState } from '../settings';
import type { ZScore } from "z-score";

type TDataPoint = {
    amt: number,
    amtZScore: number,
    name: string,
    pv: number,
    pvZScore: number,
    uv: number,
    uvZScore: number,
};

type TDataKey = keyof Omit<TDataPoint, 'name' | 'amtZScore' | 'pvZScore' | 'uvZScore'>;
type TDataZScoreKey = keyof Omit<TDataPoint, 'name' | 'amt' | 'pv' | 'uv'>;

type TApiDraftData = {
    meta: {
        status: DataState.draft,
        domain: number[],
        categories: string[]
    },
    data: Array<Pick<TDataPoint, 'amt' | 'name' | 'pv' | 'uv'>>
};

type TApiFulfilledData = {
    meta: {
        status: DataState.fulfilled,
        zScore?: typeof ZScore.prototype['data']
    } & Pick<TApiDraftData['meta'], 'categories' | 'domain'>;
    data: Array<TDataPoint>
};

type TApiData = TApiDraftData | TApiFulfilledData;

export type {
    TApiData,
    TDataPoint,
    TDataKey,
    TDataZScoreKey,
    TApiDraftData,
    TApiFulfilledData,
}
