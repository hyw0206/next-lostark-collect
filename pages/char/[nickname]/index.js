import { useRouter } from "next/router"
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { url, API_KEY } from "../../../src/data/axios";
import ProfilePage from "../../../src/components/Profile";
import CollectPage from "src/components/Collect";



export default function charPage() {
  const { query } = useRouter();
  const [loading, setLoading] = useState({});
  const [nicknameError, setNicknameError] = useState("");
  useEffect(() => {
    if (query.nickname == undefined) return;
    if (query.nickname.length < 2 || query.nickname.length > 12) {
      setNicknameError("닉네임은 2글자에서 12글자 사이입니다.");
      return;
    } else if (!/^[가-힣]+$/.test(query.nickname) && !/[a-zA-Z]/.test(query.nickname)) {
      setNicknameError("유효한 닉네임을 입력해주세요.");
      return;
    }
    axios.get(url + `/armories/characters/${query.nickname}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
    .then((response) => {
      query.data = response.data;
      if (query.data == null) setNicknameError("검색할 수 없는 캐릭터입니다. 보호조치 여부를 확인해주세요!")
      else if (query.data?.ArmoryProfile?.ItemMaxLevel < 200.00) setNicknameError("2티어 미만 캐릭터는 검색할 수 없습니다.");      
      else setNicknameError("");
      setLoading({...loading});
    })
  }, [query]);

  return (
    nicknameError !== "" ? <><div>에러가 발생했습니다.</div> <div> 사유 : {nicknameError}</div></> :
    <Fragment>
      <ProfilePage query={query?.data?.ArmoryProfile} />
      <CollectPage query={query?.data?.Collectibles} />
    </Fragment>
    
  )
}