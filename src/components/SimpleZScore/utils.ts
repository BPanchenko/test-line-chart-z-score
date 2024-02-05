import type { TDataKey, TDataZScoreKey, TApiFulfilledData } from '../../api/types';
import { ZSCORE_MAX, ZSCORE_MIN } from './constants';

export const getValuesByDataKeyAndZScoreRange = (
    key: TDataKey,
    data: TApiFulfilledData['data'],
    options?: {
      min?: number;
      max?: number;
      innerRange?: boolean;
    }
  ): Array<{ name: string, value?: number }> => {
    const { min, max, innerRange } = {
      min: ZSCORE_MIN,
      max: ZSCORE_MAX,
      innerRange: true,
      ...options
    };
    const zKey: TDataZScoreKey = (key + 'ZScore') as TDataZScoreKey;
    return data.map(point => {
      const item: { name: string, value?: number } = {
        name: point.name
      };
      const zValue = point[zKey];
      const isExpectedValue = (innerRange && zValue <= max && zValue >= min)
        || (innerRange === false && zValue > max && zValue < min);
      
      if (isExpectedValue) {
        item.value = point[key];
      }
  
      return item;
    });
  };
