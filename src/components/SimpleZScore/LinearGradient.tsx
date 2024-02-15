import { FC, useEffect, useRef } from 'react';
import type { TDataKey } from '../../api/types';
import type { IZScore } from '../../../@types/z-score';
import * as d3 from "d3";

const LinearGradientComponent: FC<{
    data: IZScore['data'],
    dataKey: TDataKey,
    options?: {
        zMin?: number;
        zMax?: number;
        innerColor?: string;
        outerColor?: string;
    }
}> = ({ data, dataKey: key }) => {
    console.log(key, data);
    // const scale = useRef<d3.ScaleLinear<number, number, never>>();

    return (
        <linearGradient id={`${key}-gradient`} x1="0%" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="blue" />

            <stop offset={`${25}%`} stopColor="blue" />
            <stop offset={`${50}%`} stopColor="red" />

            <stop offset="100%" stopColor="red" />
        </linearGradient>
    );
};

export {
    LinearGradientComponent
};
