import { FC } from 'react';
import { Dot } from 'recharts';
import { TDataKey, TDataPoint } from '../../types';
import { isPointInSafeZScoreInterval } from './utils';
import { CHART } from '../../settings';

import type { DotProps } from 'recharts';

export const CustomizedDot: FC<DotProps & {
    dataKey: TDataKey,
    isActive?: boolean,
    payload?: TDataPoint,
    value?: number
}> = (props) => {
    const {cx, cy, r, fill, isActive, dataKey, payload} = props;
    const isSafeZScoreValue = isPointInSafeZScoreInterval(payload!, dataKey);
    const color = isSafeZScoreValue ? CHART.colors.get(0) : CHART.colors.get('outOfRangeZScore');
    return (
        <Dot cx={cx} cy={cy} r={r} stroke={color} fill={isActive ? color : fill} strokeWidth={1} />
    );
};
