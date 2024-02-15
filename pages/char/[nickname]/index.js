import { useRouter } from "next/router"
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { url, API_KEY } from "../../../src/data/axios";



export default function charPage() {
  const { query } = useRouter();
  const [data, setData] = useState({});
  const [nicknameError, setNicknameError] = useState("");
  useEffect(() => {
    if (query.nickname == undefined) return;
    if (query.data) { 
      query.data = JSON.parse(query.data);
      setNicknameError("");
      setData({...data});
      console.log(query.data);
      return;
    } 
    axios.get(url + `/armories/characters/${query.nickname}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
    .then((response) => {
      query.data = response.data;
      console.log(query.data);
      if (query.data == null) setNicknameError("검색할 수 없는 캐릭터입니다. 보호조치 여부를 확인해주세요!")
      else if (query.ArmoryProfile?.ItemMaxLevel < 200.00) setNicknameError("2티어 미만 캐릭터는 검색할 수 없습니다.");      
      setData({...data});
    })
  }, [query]);

  return (
    nicknameError !== "" ? <><div>에러가 발생했습니다.</div> <div> 사유 : {nicknameError}</div> </> :
    <Fragment>
      <div className="flex justify-between w-[1200px] font-PretendardRegular">
        <div className="flex flex-col">
          <div className="flex flex-row text-gray-200 text-xl">
            <div className="circle !ml-0">{query?.data?.ArmoryProfile?.ServerName == "" ? "알 수 없음" : query?.data?.ArmoryProfile?.ServerName}</div>
            <div className="circle">{query?.data?.ArmoryProfile?.CharacterClassName}</div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-gray-200">{query?.data?.ArmoryProfile?.CharacterName}</div>
            <div className="text-xl text-gray-400">{query?.data?.ArmoryProfile?.Title}</div>
          </div>
          <div className="flex flex-row">
            <div className="mt-10">
              <div className="text-xl text-gray-400">아이템</div>
              <div className="text-2xl text-gray-200">{query?.data?.ArmoryProfile?.ItemMaxLevel}</div>
            </div>
            <div className="m-10">
              <div className="text-xl text-gray-400">전투</div>
              <div className="text-2xl text-gray-200">Lv.{query?.data?.ArmoryProfile?.CharacterLevel}</div>
            </div>
            <div className="mt-10">
              <div className="text-xl text-gray-400">원정대</div>
              <div className="text-2xl text-gray-200">Lv.{query?.data?.ArmoryProfile?.ExpeditionLevel}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col text-xl">
            <div className="flex mt-10 justify-end items-center">
              <div className="text-gray-400">{query?.data?.ArmoryProfile?.GuildName == null ? "-" : query?.data?.ArmoryProfile?.GuildName}</div>
              <div className="circle">길드</div>
            </div>
            <div className="flex mt-10 justify-end items-center">
              <div className="text-gray-400">{query?.data?.ArmoryProfile?.TownName == "컨텐츠 개방 필요" || query?.data?.ArmoryProfile?.TownName == undefined ? "컨텐츠 개방 필요" : "Lv." + query?.data?.ArmoryProfile?.TownLevel + " " + query?.data?.ArmoryProfile?.TownName}</div>
              <div className="text-xl circle">영지</div>
            </div>
            <div className="flex mt-10 justify-end items-center">
              <div className="text-gray-400">{query?.data?.ArmoryProfile?.PvpGradeName}</div>
              <div className="circle">PVP</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start w-[1200px] font-PretendardRegular">
        {
        query?.data?.Collectibles?.length != undefined ?
        <div className="flex flex-col">
          <div className="flex flex-row items-center p-2 mb-4 selected w-80">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[3]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[3]?.Point} / {query?.data?.Collectibles[3]?.MaxPoint} | { (query?.data?.Collectibles[3]?.Point / query?.data?.Collectibles[3]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[1]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[1]?.Point} / {query?.data?.Collectibles[1]?.MaxPoint} | { (query?.data?.Collectibles[1]?.Point / query?.data?.Collectibles[1]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[0]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[0]?.Point} / {query?.data?.Collectibles[0]?.MaxPoint} | { (query?.data?.Collectibles[0]?.Point / query?.data?.Collectibles[0]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[2]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[2]?.Point} / {query?.data?.Collectibles[2]?.MaxPoint} | { (query?.data?.Collectibles[2]?.Point / query?.data?.Collectibles[2]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[5]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[5]?.Point} / {query?.data?.Collectibles[5]?.MaxPoint} | { (query?.data?.Collectibles[5]?.Point / query?.data?.Collectibles[5]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[6]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[6]?.Point} / {query?.data?.Collectibles[6]?.MaxPoint} | { (query?.data?.Collectibles[6]?.Point / query?.data?.Collectibles[6]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[4]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[4]?.Point} / {query?.data?.Collectibles[4]?.MaxPoint} | { (query?.data?.Collectibles[4]?.Point / query?.data?.Collectibles[4]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[7]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[7]?.Point} / {query?.data?.Collectibles[7]?.MaxPoint} | { (query?.data?.Collectibles[7]?.Point / query?.data?.Collectibles[7]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
          <div className="flex flex-row items-center p-2 mb-4">
            <div className="w-10 h-10 bg-[url('https://dummyimage.com/40x40/fff/000')]"></div>
            <div className="flex flex-col ml-4">
              <div className="text-gray-100 text-xl">{query?.data?.Collectibles[8]?.Type}</div>
              <div className="text-gray-400">{query?.data?.Collectibles[8]?.Point} / {query?.data?.Collectibles[8]?.MaxPoint} | { (query?.data?.Collectibles[8]?.Point / query?.data?.Collectibles[8]?.MaxPoint * 100).toFixed(1)}% 수집</div>
            </div>
          </div>
        </div> : <div>로딩중...</div>
        }
      </div>
    </Fragment>
    
  )
}