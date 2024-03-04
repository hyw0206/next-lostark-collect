import { memo } from 'react';

const CollectDetailPage = (props) => {
  let data = props.data;
  let Collectinfo = require('../data/collectinfo.json');
  data.unshift({"Type": "수집품 요약", "CollectiblePoints": {"item": null, "item2": null}});
  console.log(data);
  return (
  <div className="flex flex-col ml-4 grow dark p-4">
    <div className="flex flex-row justify-between text-2xl">
      <div className="mb-6">{data[props.idx].Type}</div>
      {props.idx != 0 && <div>{data[props.idx].Point} / {data[props.idx].MaxPoint}</div>}
    </div>
    {props.idx == 0 ?
      <div className="flex flex-col justify-center">
        {data.map((item, idx) => (
          idx == 0 ?
          <div className="flex flex-row items-center">
            <div className="progress-bar">
              <div className="progress flex justify-between leading-[40px] main " style={{ "width": props.total + "%"}}><div className="text-cyan-300">전체 수집품</div><div>전체 수집품의 {props.total}% 수집 (= 내실 점수)</div></div>
            </div>
          </div> :
          <div className="flex flex-row items-center">
              <div className="progress-bar">
              <div className="progress flex flex-row justify-between" style={{ "width": (item.Point/item.MaxPoint*100).toFixed(1) + "%"}}>
                <div className="text-cyan-300 leading-[40px]">{item.Type}</div>
                <div><div>{(item.Point/item.MaxPoint*100).toFixed(1)}%</div><div>{item.Point} / {item.MaxPoint}</div></div></div>
            </div>
          </div>
        ))
        }
        <div className="text-gray-100 text-2xl mt-6">획득하지 못한 주요 보상</div>
        {data[1].Point < 4 && <div className="not-collect">[거인의 심장] 4개 - 스킬 포인트 물약</div>}
        {data[1].Point < 5 && <div className="not-collect">[거인의 심장] 5개 - (희귀) 풍요 룬</div>}
        {data[1].Point < 6 && <div className="not-collect">[거인의 심장] 6개 - 스킬 포인트 물약</div>}
        {data[1].Point < 10 && <div className="not-collect">[거인의 심장] 10개 - 스킬 포인트 물약</div>}
        {data[1].Point < 12 && <div className="not-collect">[거인의 심장] 12개 - 스킬 포인트 물약</div>}
        {data[2].Point < 20 && <div className="not-collect">[섬의 마음] 20개 - 상급 스킬 포인트 물약</div>}
        {data[5].Point < 34 && <div className="not-collect">[항해 모험물] 34개 - (영웅) 풍요 룬</div>}
        {data[7].Point < 5 && <div className="not-collect">[이그네아의 징표] 5개 - (영웅) 정화 룬</div>}
        {data[7].Point < 8 && <div className="not-collect">[이그네아의 징표] 8개 - 상급 스킬 포인트 물약</div>}
        {data[7].Point < 9 && <div className="not-collect">[이그네아의 징표] 9개 - 비프로스트의 열쇠</div>}
        {data[7].Point < 15 && <div className="not-collect">[이그네아의 징표] 15개 - (전설) 정화 룬</div>}
        {data[8].Point < 2 && <div className="not-collect">[오르페우스의 별] 2개 - 상급 스킬 포인트 물약</div>}
        {data[8].Point < 5 && <div className="not-collect">[오르페우스의 별] 5개 - (전설) 풍요 룬</div>}
        {data[8].Point < 6 && <div className="not-collect">[오르페우스의 별] 6개 - 상급 스킬 포인트 물약</div>}
        {data[9].Point < 14 && <div className="not-collect">[기억의 오르골] 14개 - 도약의 전설 카드 선택 팩</div>}
        
      </div>
    :
      data[props.idx].CollectiblePoints.map((item, idx) => (
        <div key={item.PointName}className="flex flex-row text-xl items-center mb-4">
          <div key={item.PointName + item.Point}className={item.Point == item.MaxPoint ? "w-10 text-center p-2 text-lg all_collect" : "not_collect w-10 p-2 text-lg text-center"}>{idx+1}</div>
          <div key={item.PointName + item.PointName}className="ml-4 w-72 text-left">{item.PointName}</div>
          <div key={item.PointName + item.PointName + item.Point} className="text-gray-400 relative flex flex-row justify-between grow">{props.idx == 3 ? <div>{item.Point} / {item.MaxPoint}</div> : 
          <>
            <div>{Collectinfo[props.idx-1]?.info[idx]}</div>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="inline-flex items-center" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <div className="tooltip">{Collectinfo[props.idx-1]?.tooltip[idx] ? Collectinfo[props.idx-1]?.tooltip[idx] : "추가 예정"}</div>
          </>}</div>
        </div>
      ))
    }
  </div>
  )
}
export default memo(CollectDetailPage);
