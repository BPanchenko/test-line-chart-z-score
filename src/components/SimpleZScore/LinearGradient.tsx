import { FC } from 'react';
import { CHART } from '../../settings';
import { useColoredIntervalRepresentation } from './utils';

import type { TDataKey, TZScoreDataRow } from '../../types';

const LinearGradientComponent: FC<{
    data: TZScoreDataRow,
    dataKey: TDataKey
}> = ({ data, dataKey: key }) => {
    const { domain } = data;

    const zScoreIntervalRepresentation = useColoredIntervalRepresentation({
        domain: domain!,
        range: [0, 100],
        settings: {
            inIntervalColor: CHART.colors.get(0)!,
            outOfIntervalColor: CHART.colors.get('outOfRangeZScore')!,
            interval: CHART.zScore.safeRange as [number, number]
        }
    });

    return (
        <linearGradient id={`${key}-gradient`} x1="0%" y1="100%" x2="0" y2="0">
            {zScoreIntervalRepresentation && zScoreIntervalRepresentation.map(
                ([offset, colors], offsetIndex) =>
                    Array.isArray(colors) ? colors.map((color, colorIndex) => (
                        <stop offset={`${offset}%`} stopColor={color} key={`${offsetIndex}-${colorIndex}`} />
                    )) : (
                        <stop offset={`${offset}%`} stopColor={colors} key={offsetIndex} />
                    ))
            }
        </linearGradient>
    );
};

export {
    LinearGradientComponent
};
