import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router.js";
export default function SearchPage() {
  let { query } = useRouter();
  console.log("Mount")
  // React Hooks 세팅
  const [nicknameError, setNicknameError] = useState('');
  const inputRef = useRef(null);
  const dataRef = useRef([]);
  const prevSelected = useRef(null);
  const router = useRouter();
  const crypto = require("crypto");
  const generateHash = () => {
    const byte = crypto.randomBytes(16);
    const hashValue = byte.toString('hex');
    return hashValue;
  }
  let mod = query?.mod ? query?.mod : 0;
  console.log(mod);
  // useRef 사용 -> 불필요한 리렌더링 최소화
  const onChangeNickname = (e) => {
    inputRef.current = e.target.value;
    console.log(inputRef.current);
  }
  // 엔터키 입력시 검색으로 가는 로직
  const onKeyPressEnter = (e) => {
    if (e.keyCode == 13){
      onChangeNickname(e);
      requestData();
    } 
  }
  const onClickChangeMod = (e) => {
    mod = e.target.dataset.id;
    if (prevSelected) prevSelected.current.classList.remove('selected-btn');
    e.target.classList.add('selected-btn');
    prevSelected.current = e.target;
    console.log(mod);
  }
  // 라우팅 로직
  const requestData = () => {
    dataRef.current = [];
    console.log(mod);
    if (mod == 0) {
      setNicknameError("");
      router.push({
        pathname: `/char/[nickname]`,
        query: { 
          "nickname": inputRef.current,
          "mod": 0,
          "hash": generateHash()
        },
      },
      `/char/${inputRef.current}`
      );      
    } else if (mod == 1) {
      setNicknameError("");
      let nickname1 = inputRef.current.split(" ")[0];
      let nickname2 = inputRef.current.split(" ")[1];
      router.push({
        pathname: `/multi/[nickname]`,
        query: { 
          "nickname": `${nickname1} ${nickname2}`,
          "mod": 1,
          "hash": generateHash()
        },
      },
      `/multi/${nickname1} ${nickname2}`
      );
    }
  }
  useEffect(() => {
    prevSelected.current = document.querySelector('.selected-btn');
  }, [])
  return (
    <>
    <a className="text-4xl mb-4 font-DNFBitBitv2" href="#">NaesilDiff.gg</a>
      <div className="m-auto w-[480px] text-center inline font-SUITERegular">
        <div className="flex items-center h-12 px-3 rounded-md shadow-md bg-negative-less border-1 input border m-5">
          <input className="flex-1 text-lg input outline-none justify-center" type="search" enterKeyHint="search" autoCorrect="false" autoComplete="false" spellCheck="false" size="1" placeholder="캐릭터 검색" defaultValue="" onChange={onChangeNickname} onKeyDown={onKeyPressEnter}/>
          <span className="text-lg cursor-pointer" onClick={() => requestData()}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="inline-flex items-center" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
        </div>
        <div className="text-red-700">{nicknameError}</div>
      </div>
      <div className="m-auto mb-8 w-[480px] flex flex-row font-PretendardRegular text-lg">
        <div onClick={onClickChangeMod} data-id="0" className="text-center grow selected-btn">개인 검색</div>
        <div onClick={onClickChangeMod} data-id="1" className="text-center grow">비교 검색</div>
        <div onClick={onClickChangeMod} data-id="2" className="text-center grow">단체 검색</div>
      </div> 
    </>
  )
}
