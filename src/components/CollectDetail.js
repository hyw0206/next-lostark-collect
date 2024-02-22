import { memo } from 'react';

const CollectDetailPage = (props) => {
  let data = props.data;
  let Collectinfo = require('../data/collectinfo.json');
  return (
  <div className="flex flex-col ml-4 grow dark p-4">
    <div className="flex flex-row justify-between text-2xl">
      <div className="mb-6">{data.Type}</div>
      <div>{data.Point} / {data.MaxPoint}</div>
    </div>
    {
      data.CollectiblePoints.map((item, idx) => (
        <div key={item.PointName}className="flex flex-row text-xl items-center mb-4">
          <div key={item.PointName + item.Point}className={item.Point == item.MaxPoint ? "w-10 text-center p-2 text-lg all_collect" : "not_collect w-10 p-2 text-lg text-center"}>{idx+1}</div>
          <div key={item.PointName + item.PointName}className="ml-4 w-72 text-left">{item.PointName}</div>
          <div key={item.PointName + item.PointName + item.Point} className="text-gray-400 relative flex flex-row justify-between grow">{props.idx == 2 ? <div>{item.Point} / {item.MaxPoint}</div> : 
          <>
            <div>{Collectinfo[props.idx].info[idx]}</div>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="inline-flex items-center" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <div className="tooltip">{Collectinfo[props.idx].tooltip[idx]}</div>
          </>}</div>
        </div>
      ))
    }
  </div>
  )
}
export default memo(CollectDetailPage);