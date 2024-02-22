import { useEffect, useState } from "react";

export default function MultiProfilePage(props) {
  const [loading, setLoading] = useState({});
  useEffect(() => {
    setLoading({ ...loading })
  }, [props.query])
  return (
    props.query ? 
    <div className="flex justify-center w-[1400px] font-PretendardRegular">
      <div className="flex flex-row justify-between w-[1000px]">
        {
          props.query.map((item, idx) => (
            <div key={idx+160}>
              <div className={idx == 0 ? "flex flex-row text-gray-200 text-xl" : "flex flex-row justify-end text-gray-200 text-xl"} key={idx}>
                <div className="circle !ml-0" key={idx+60}>{item.ArmoryProfile.ServerName == "" ? "알 수 없음" : item.ArmoryProfile.ServerName}</div>
                <div className="circle" key={idx+70}>{item.ArmoryProfile.CharacterClassName}</div>
              </div>
              <div className={idx == 0 ? "flex flex-col mt-4" : "flex flex-col mt-4 items-end"} key={idx+10}>
                <div className="text-4xl font-bold text-gray-200" key={idx+80}>{item.ArmoryProfile.CharacterName ? item.ArmoryProfile.CharacterName : "들새앰"}</div>
                <div className="text-xl text-gray-400" key={idx+90}>{item.ArmoryProfile.Title}</div>
              </div>
              <div className="flex flex-row" key={idx+20}>
                <div className="mt-10" key={idx+30}>
                  <div className="text-xl text-gray-400" key={idx+100}>아이템</div>
                  <div className="text-2xl text-gray-200" key={idx+110}>{item.ArmoryProfile.ItemMaxLevel}</div>
                </div>
                <div className="m-10" key={idx+40}>
                  <div className="text-xl text-gray-400" key={idx+120}>전투</div>
                  <div className="text-2xl text-gray-200" key={idx+130}>Lv.{item.ArmoryProfile.CharacterLevel}</div>
                </div>
                <div className="mt-10" key={idx+50}>
                  <div className="text-xl text-gray-400" key={idx+140}>원정대</div>
                  <div className="text-2xl text-gray-200" key={idx+150}>Lv.{item.ArmoryProfile.ExpeditionLevel}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div> : <div>프로필 정보를 로딩중입니다..</div>
  )
}