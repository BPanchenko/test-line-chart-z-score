import { DataState } from '../settings';
import type { TApiData, TApiDraftData, TApiFulfilledData } from '../types';

export const isDraftData = (dataset: TApiData): dataset is TApiDraftData => (dataset.meta.status === DataState.draft);
export const isFulfilledData = (dataset: TApiData): dataset is TApiFulfilledData => (dataset.meta.status === DataState.fulfilled);
