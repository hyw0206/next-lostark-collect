import { useRouter } from "next/router"
import { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { url, API_KEY } from "../../../src/data/axios";
import MultiProfilePage from "../../../src/components/MultiProfile";
import MultiCollectPage from "src/components/MultiCollect";
export default function multiPage() {
  const { query } = useRouter();
  const [nicknameError, setNicknameError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (query.nickname == undefined) return;
    let nickname1 = query.nickname?.split(" ")[0];
    let nickname2 = query.nickname?.split(" ")[1];
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url + `/armories/characters/${nickname1}`, {
          headers: {
            Authorization: API_KEY,
          },
        });
        query.data = [response1.data];

        if (response1.data == null) setNicknameError(nickname1 + " : 검색할 수 없는 캐릭터입니다. 보호조치 여부를 확인해주세요!"); 
        else if (response1.data.ArmoryProfile.ItemMaxLevel < 200.00) setNicknameError(nickname1 + " : 2티어 미만 캐릭터는 검색할 수 없습니다.");
        else {
          const response2 = await axios.get(url + `/armories/characters/${nickname2}`, {
            headers: {
              Authorization: API_KEY,
            },
          });
          query.data.push(response2.data);
          if (response2.data == null) setNicknameError(nickname1 + " : 검색할 수 없는 캐릭터입니다. 보호조치 여부를 확인해주세요!"); 
          else if (response2.data.ArmoryProfile.ItemMaxLevel < 200.00) setNicknameError(nickname1 + " : 2티어 미만 캐릭터는 검색할 수 없습니다.");
          else {
            setNicknameError("");
            setLoading(false);
          }
        }
      } catch (error) {
      console.log("error :", error);
      }
    }
    fetchData();
  }, [query.nickname, query.hash])
  return (
    <>
      {
        nicknameError !== "" ? `에러 발생 : ${nicknameError}` : 
        <Fragment>
          <MultiProfilePage query={query.data} />
          <MultiCollectPage query={query.data} />
        </Fragment>
      }
      <div>멀티멀티</div>
    </>
  )

}