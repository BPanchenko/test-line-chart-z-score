import { useMemo } from "react";
import { scaleLinear } from "d3-scale";

import type {
  TDataKey,
  TDataZScoreKey,
  TuseColoredIntervalRepresentationOptions,
  TuseColoredIntervalRepresentationResult,
  TDataPoint
} from '../../types';

import { CHART } from '../../settings';

export const isPointInSafeZScoreInterval = (point: TDataPoint, dataKey: TDataKey) => {
  const zScoreKey = dataKey + 'ZScore' as TDataZScoreKey;
  const value = point[zScoreKey];
  return value >= CHART.zScore.safeRange[0] && value <= CHART.zScore.safeRange[1];
};

export const useColoredIntervalRepresentation = (
  { 
    domain,
    range,
    settings: {
      inIntervalColor,
      outOfIntervalColor,
      interval: [min, max]
    }
  }: TuseColoredIntervalRepresentationOptions
): TuseColoredIntervalRepresentationResult => {
  const positions = useMemo(() => {
    const positions: TuseColoredIntervalRepresentationResult = [];

    if (domain[0] < min) {
      positions.push([domain[0], outOfIntervalColor], [min, [outOfIntervalColor, inIntervalColor]]);
    } else {
      positions.push([domain[0], inIntervalColor]);
    }
  
    if (domain[1] > max) {
      positions.push([max, [inIntervalColor, outOfIntervalColor]], [domain[1], outOfIntervalColor]);
    } else {
      positions.push([domain[1], inIntervalColor]);
    }

    const scale = scaleLinear(domain, range);
    positions.forEach((item) => item[0] = scale(item[0]));

    return positions;
  }, [domain, range, inIntervalColor, max, min, outOfIntervalColor]);

  return positions;
};
