import CollectDetailPage from './CollectDetail';
import { useState, useRef, useEffect } from 'react';
export default function CollectPage(props) {
  const [number, setNumber] = useState(0);
  const prevSelected = useRef();
  let data = []
  if (props.query) {
    data.push(props.query[3]);
    data.push(props.query[1]);
    data.push(props.query[0]);
    data.push(props.query[2]);
    data.push(props.query[5]);
    data.push(props.query[6]);
    data.push(props.query[4]);
    data.push(props.query[7]);
    data.push(props.query[8]);
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
  }, [props.query])
  return (
    props.query ?
    <>
    <div className="w-[1400px] text-2xl font-PretendardRegular mb-8 text-gray-200">수집형 포인트</div>
    <div className="flex justify-start w-[1400px] font-PretendardRegular">
      <div className="flex flex-col">
        {
          data.map((item, idx) => (
            <div onClick={onClickSelected} id={idx} key={item.Type} className={idx == 0 ? "flex flex-row items-center p-2 mb-4 w-80 selected main-item" : "flex flex-row items-center p-2 mb-4 main-item"}>
              <div key={item.Type + item.Icon} className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
              <div key={item.Type + item.MaxPoint} className="flex flex-col ml-4">
                <div key={item.CollectiblePoints} className="text-gray-100 text-xl">{item.Type}</div>
                <div key={item.Type + item.Point} className="text-gray-400">{item.Point} / {item.MaxPoint} | { (item.Point / item.MaxPoint * 100).toFixed(1)}% 수집</div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col ml-4 grow dark p-4">
        <CollectDetailPage data={data[number]} idx={number} />
      </div>
    </div> 
    </>
    : <div className="w-[1400px] text-xl text-gray-100 text-center">내실 데이터 로딩중...</div>
        
  )
} 