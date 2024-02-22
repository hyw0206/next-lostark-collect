export default function ProfilePage(props) {
  return (
    props.query ? 
    <div className="flex justify-between w-[1400px] font-PretendardRegular">
      <div className="flex flex-col">
        <div className="flex flex-row text-gray-200 text-xl">
          <div className="circle !ml-0">{props.query.ServerName == "" ? "알 수 없음" : props.query.ServerName}</div>
          <div className="circle">{props.query.CharacterClassName}</div>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold text-gray-200">{props.query.CharacterName}</div>
          <div className="text-xl text-gray-400">{props.query.Title}</div>
        </div>
        <div className="flex flex-row">
          <div className="mt-10">
            <div className="text-xl text-gray-400">아이템</div>
            <div className="text-2xl text-gray-200">{props.query.ItemMaxLevel}</div>
          </div>
          <div className="m-10">
            <div className="text-xl text-gray-400">전투</div>
            <div className="text-2xl text-gray-200">Lv.{props.query.CharacterLevel}</div>
          </div>
          <div className="mt-10">
            <div className="text-xl text-gray-400">원정대</div>
            <div className="text-2xl text-gray-200">Lv.{props.query.ExpeditionLevel}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col text-xl">
          <div className="flex mt-10 justify-end items-center">
            <div className="text-gray-400">{props.query.GuildName == null ? "-" : props.query.GuildName}</div>
            <div className="circle">길드</div>
          </div>
          <div className="flex mt-10 justify-end items-center">
            <div className="text-gray-400">{props.query.TownName == "컨텐츠 개방 필요" || props.query.TownName == undefined ? "컨텐츠 개방 필요" : "Lv." + props.query.TownLevel + " " + props.query.TownName}</div>
            <div className="text-xl circle">영지</div>
          </div>
          <div className="flex mt-10 justify-end items-center">
            <div className="text-gray-400">{props.query.PvpGradeName}</div>
            <div className="circle">PVP</div>
          </div>
        </div>
      </div>
    </div> : <div className="w-[1200px] text-xl text-gray-100 text-center">프로필 데이터 로딩중..</div>
  )
}