import { ZScore } from "../../@types/z-score";

const enum DataState {
    draft = 'DRAFT',
    fulfilled = 'COMPLETED',
}

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

const isDraftData = (dataset: TApiData): dataset is TApiDraftData => (dataset.meta.status === DataState.draft);
const isFulfilledData = (dataset: TApiData): dataset is TApiFulfilledData => (dataset.meta.status === DataState.fulfilled);

export {
    DataState,
    isDraftData,
    isFulfilledData
}
