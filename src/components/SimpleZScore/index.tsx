import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { isDraftData, isFulfilledData } from '../../api/utils';
import { CustomizedDot } from './CustomizedDot';
import { LinearGradientComponent } from "./LinearGradient";
import { CHART } from '../../settings';

import type { Payload } from 'recharts/types/component/DefaultLegendContent';
import type { TApiData, TDataKey, TZScoreDataRow } from '../../types';

import './index.css';

type TProps = {
  dataset: TApiData
};

const legendPayload: Payload[] = [
  {
    value: 'pv',
    color: CHART.colors.get(0)!,
    type: 'line'
  }, {
    value: 'uv',
    color: CHART.colors.get(0)!,
    type: 'line'
  }
];

const SimpleZScoreComponent: FC<TProps> = ({ dataset }) => {
  const isDraft = isDraftData(dataset);
  const isFulfilled = isFulfilledData(dataset);

  return (
    <ResponsiveContainer minWidth={500} minHeight={300} width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={dataset.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {isFulfilled && (
          <defs>
            {Object.entries(dataset.meta.zScore.data).map(
              ([key, dataRow], index) => (<LinearGradientComponent data={dataRow as TZScoreDataRow} dataKey={key as TDataKey} key={index} />)
            )}
          </defs>
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend payload={legendPayload} />
        {isDraft && (
          <>
            <Line type="monotone" dataKey="pv" stroke={CHART.colors.get(0)!} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke={CHART.colors.get(0)!} activeDot={{ r: 8 }} />
          </>
        )}
        {isFulfilled && (
          <>
            <Line type="monotone" dataKey="pv" stroke="url(#pv-gradient)" dot={<CustomizedDot dataKey="pv" />} activeDot={<CustomizedDot isActive dataKey="uv" r={8} />} />
            <Line type="monotone" dataKey="uv" stroke="url(#uv-gradient)" dot={<CustomizedDot dataKey="uv" />} activeDot={<CustomizedDot isActive dataKey="uv" r={8} />} />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

export {
  SimpleZScoreComponent
}
