import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { isDraftData, isFulfilledData } from '../../api/utils';
import { LinearGradientComponent } from "./LinearGradient";

import type { TApiData, TDataKey } from '../../api/types';
import type { IZScore } from 'z-score';

type TProps = {
  dataset: TApiData
};

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
            {Object.entries<IZScore['data']>(dataset.meta.zScore.data).map(
              ([key, dataRow]) => (<LinearGradientComponent data={dataRow} dataKey={key as TDataKey} key={key} />)
            )}
          </defs>
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
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
      </LineChart>
    </ResponsiveContainer>
  )
}

export {
  SimpleZScoreComponent
}
