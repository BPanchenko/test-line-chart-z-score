import { FC, useEffect, useRef } from 'react';
import type { TApiData, TDataKey } from '../../api/types';
import { isDraftData, isFulfilledData } from '../../api/types';
import * as d3 from "d3";
import { LinearGradientComponent } from "./LinearGradient";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IZScore } from '../../../@types/z-score';

type TProps = {
  dataset: TApiData
};

const SimpleZScoreComponent: FC<TProps> = ({ dataset }) => {
  let $svg: SVGElement | undefined;

  const scaleY = useRef<d3.ScaleLinear<number, number, never>>();

  const isDraft = isDraftData(dataset);
  const isFulfilled = isFulfilledData(dataset);
  const { data, meta } = dataset;

  return (
    <ResponsiveContainer ref={(element) => {
      $svg = (element as HTMLElement)?.getElementsByTagName('svg')[0];
    }} minWidth={500} minHeight={300} width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {isFulfilled && (
          <defs>
            {Object.entries<IZScore['data']>(dataset.meta.zScore.data).map(
              ([key, dataRow]) => (<LinearGradientComponent data={dataRow} dataKey={key as TDataKey} />)
            )}
            
            <linearGradient id="uv-gradient" x1="0%" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#8884d8" />
              <stop offset={`${25}%`} stopColor="#8884d8" />
              <stop offset={`${50}%`} stopColor="#B71C1C" />
              <stop offset={`${75}%`} stopColor="red" />
              <stop offset="100%" stopColor="#8884d8" />
            </linearGradient>
          </defs>
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pvZScore" stroke="black" />
        {isDraft && (
          <>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </>
        )}
        {isFulfilled && (
          <>
            <Line type="monotone" dataKey="pv" stroke="url(#pv-gradient)" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="url(#uv-gradient)" />
          </>
        )}
        <rect x="0" y="0" width={500} height={300} fill="url(#pv-gradient)" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export {
  SimpleZScoreComponent
}
