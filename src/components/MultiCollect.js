import { useState, useRef, useEffect } from "react";
import MultiCollectDetailPage from "./MultiCollectDetail"
export default function MultiCollectPage(props) {
  const [number, setNumber] = useState(0);
  const prevSelected = useRef();
  const cnt = [3, 1, 0, 2, 5, 6, 4, 7, 8]
  if (props.query) {
    let data = [props.query[0].Collectibles, props.query[1].Collectibles];
    let list_data = []
    for (let i = 0; i < cnt.length; i++) {
      list_data.push(data[0][cnt[i]])
    }
    console.log(list_data);
  }
  const onClickSelected = (e) => {
    let currSelected;
    if (!e.target.classList.contains('main-item')) {
      currSelected = e.target.closest('.main-item');
    } else {
      currSelected = e.target;
    }
    if (prevSelected.current) { 
      prevSelected.current.classList.remove('selected');
    }
    currSelected.classList.add('selected');
    prevSelected.current = currSelected;
    setNumber(currSelected.id);
  }
  useEffect(() => {
    prevSelected.current = document.querySelector('.selected');
    setNumber(0);
  }, [props.query])
  return (
    props.query ? 
    <>
    <div className="w-[1400px] text-2xl font-PretendardRegular mb-8 text-gray-200">수집형 포인트</div>
    <div className="flex justify-start w-[1400px] font-PretendardRegular">
      <div className="flex flex-col">
        {
          list_data.map((item, idx) => (
            <div onClick={onClickSelected} id={idx} key={item.Type} className={idx == 0 ? "flex flex-row items-center p-2 mb-4 w-80 selected main-item" : "flex flex-row items-center p-2 mb-4 main-item"}>
              <div key={item.Type + idx + idx + item.Icon} className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
              <div key={item.Type + item.MaxPoint + idx} className="flex flex-col ml-4">
                <div key={idx + idx + item.CollectiblePoints} className="text-gray-100 text-xl">{item.Type}</div>
                <div key={idx + item.Type + item.Point} className={data[0][cnt[idx]].Point > data[1][cnt[idx]].Point ? "text-gray-400" : data[0][cnt[idx]].Point == data[1][cnt[idx]].Point ? "text-gray-400" : "text-gray-500"}>{data[0][cnt[idx]].Point} / {item.MaxPoint} | { (data[0][cnt[idx]].Point / item.MaxPoint * 100).toFixed(1)}% 수집</div>
                <div key={item.Type + item.Point + idx} className={data[0][cnt[idx]].Point < data[1][cnt[idx]].Point ? "text-gray-400" : data[0][cnt[idx]].Point == data[1][cnt[idx]].Point ? "text-gray-400" : "text-gray-500"}>{data[1][cnt[idx]].Point} / {item.MaxPoint} | { (data[1][cnt[idx]].Point / item.MaxPoint * 100).toFixed(1)}% 수집</div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col ml-4 grow dark p-4">
        <MultiCollectDetailPage data1={data[0][cnt[number]]} data2={data[1][cnt[number]]} idx={number} />
      </div>
    </div> 
    </>
    : <div className="w-[1400px] text-xl text-gray-100 text-center">내실 데이터 로딩중...</div>
  )
}