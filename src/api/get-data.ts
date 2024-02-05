import DRAFT from '../api/get-draft-data';

import ZScore from "z-score";
import { DataState } from "./types";

import type { TApiFulfilledData, TDataZScoreKey } from "./types";
import type { TZScoreDataRow } from '../../@types/z-score';

const { data, meta } = DRAFT;

const zScore = new ZScore();
zScore.train(data.map(({ amt, pv, uv }) => ({ amt, pv, uv })));

const updatedData: TApiFulfilledData['data'] = data.map(point => {
    const zValues = zScore.calculate(point);
    return {
        ...point,
        amtZScore: zValues.amt,
        pvZScore: zValues.pv,
        uvZScore: zValues.uv,
    };
});

Object.entries(zScore.data).forEach(([key, zScoreRow]) => {
    const zScoreKey = key + 'ZScore' as TDataZScoreKey;
    Object.assign(zScoreRow as TZScoreDataRow, {
        domain: [
            Math.min(...updatedData.map((point) => point[zScoreKey])),
            Math.max(...updatedData.map((point) => point[zScoreKey]))
        ]
    });
});

const dataset: TApiFulfilledData = {
    meta: {
        ...meta,
        status: DataState.fulfilled,
        zScore: JSON.parse(JSON.stringify(zScore))
    },
    data: updatedData
};

console.log(dataset);

export default dataset;
