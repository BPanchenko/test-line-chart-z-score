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
}> = ({ data, dataKey }) => {
    const $elem = useRef<SVGLinearGradientElement>(null);
    const dataset = data ? data[dataKey] : {
        domain: [0,0]
    };

    const scaleY = useRef<d3.ScaleLinear<number, number, never>>(
        d3.scaleLinear()
    );

    useEffect(() => {
        scaleY.current
            .domain(dataset.domain as number[])
            .range([0, $elem.current?.parentNode.clientHeight]);
    }, [$elem]);

    return (
        <linearGradient id="pv-gradient" x1="0%" y1="0" x2="0" y2="100%" ref={$elem}>
            <stop offset="0%" stopColor="blue" />
            <stop offset={`${25}%`} stopColor="blue" />
            <stop offset={`${50}%`} stopColor="red" />
            <stop offset={`${75}%`} stopColor="red" />
            <stop offset="100%" stopColor="red" />
        </linearGradient>
    );
};

export {
    LinearGradientComponent
};
