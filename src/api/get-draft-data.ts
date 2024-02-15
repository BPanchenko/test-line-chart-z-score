import type { TApiDraftData } from "./types";
import { DataState } from "../settings";
import DRAFT from './storage/draft-data.json';
import _ from 'lodash';

const data: TApiDraftData['data'] = DRAFT;

const dataset: TApiDraftData = {
    meta: {
        status: DataState.draft,
        domain: [
            Math.min(...data.map((point) => _.round(Math.min(point.pv, point.uv), -3) ?? 0)),
            Math.max(...data.map((point) => _.round(Math.max(point.pv, point.uv), -3) ?? 0))
        ],
        categories: data.map(({ name }) => name)
    },
    data
};

export default dataset;
