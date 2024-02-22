import { memo } from "react";

const MultiCollectDetailPage = (props) => {
  let data = [props.data1, props.data2];
  let CollectInfo = require('../data/collectinfo.json');
  console.log(data)
  return (
    <div className="flex flex-col ml-4 grow dark p-4">
      <div className="flex flex-row justify-between text-2xl">
        <div className={data[0].Point > data[1].Point ? "text-gray-300" : data[0].Point == data[1].Point ? "text-gray-300" : "text-gray-500"}>{data[0].Point} / {data[0].MaxPoint} {(data[0].Point / data[0].MaxPoint * 100).toFixed(1)}%</div>
        <div className="mb-6 text-3xl">{data[0].Type}</div>
        <div className={data[0].Point < data[1].Point ? "text-gray-300" : data[0].Point == data[1].Point ? "text-gray-300" : "text-gray-500"}>{(data[1].Point / data[1].MaxPoint * 100).toFixed(1)}% {data[1].Point} / {data[1].MaxPoint}</div>
        </div>
      {
        data[0].CollectiblePoints.map((item, idx) => (
          <div key={item.PointName} className="flex flex-row  text-xl items-center mb-4">
            <div key={item.PointName + item.Point} className={item.Point == item.MaxPoint ? "ml-10 w-10 text-center p-2 text-lg all_collect" : "ml-10 not_collect w-10 p-2 text-lg text-center"}>{idx+1}</div>
            {props.idx == 2 && <div className="ml-6 w-24 text-center">{item.Point} / {item.MaxPoint}</div>}
            <div key={item.PointName + item.PointName} className="ml-4 text-left text-gray-300 grow text-center cursor-default">{item.PointName} {props.idx != 2 && <div className="text-gray-400">{CollectInfo[props.idx].info[idx]}</div>}</div>
            {props.idx == 2 && <div className="mr-6 w-24 text-center">{data[1].CollectiblePoints[idx].Point} / {data[1].CollectiblePoints[idx].MaxPoint}</div>}
            <div key={item.PointName + item.Point + idx*100} className={data[1].CollectiblePoints[idx].Point == item.MaxPoint ? "mr-10 w-10 text-center p-2 text-lg all_collect" : "mr-10 not_collect w-10 p-2 text-lg text-center"}>{idx+1}</div>
          </div>
        ))
      }
      
    </div>
  )
}

export default memo(MultiCollectDetailPage);