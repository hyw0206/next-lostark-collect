import { getData } from "../src/module/axios.js" 
import { useState, useRef } from "react";
import { useRouter } from "next/router.js";

export default function SearchPage() {
  console.log("Mount")
  // React Hooks 세팅
  const [nicknameError, setNicknameError] = useState('');
  const inputRef = useRef(null);
  const dataRef = useRef(null);
  const router = useRouter();

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
  // 검색 로직
  const requestData = () => {
    // 닉네임 길이 검사
    if (inputRef.current == null || inputRef.current?.length < 2 || inputRef.current?.length > 12) {
      setNicknameError("닉네임은 2글자에서 12글자 사이입니다.");
      // 정규 표현식을 이용해 유효한 닉네임 검사
    } else if ((!/^[가-힣]+$/.test(inputRef.current) && !/[a-zA-Z]/.test(inputRef.current))) {
      setNicknameError("유효한 닉네임을 입력해주세요.");
      // 유효한 닉네임이라면, 표기한 에러를 지우고
    } else {
      setNicknameError("");
      // 검색 + promiseResult 가져와서 검색 성공 여부 감지
      const isNormalChar = () => { 
        getData(dataRef, inputRef.current).then((isNormalChar) => {
        if (!isNormalChar) {
          setNicknameError("검색할 수 없는 캐릭터입니다. 보호조치 여부를 확인해주세요!"); 
        } else if (dataRef?.current?.ArmoryProfile?.ItemMaxLevel < 200.00) {
          setNicknameError("2티어 미만 캐릭터는 검색할 수 없습니다.");
        } else {
          router.push({
            pathname: `/char/[nickname]`,
            query: { 
              "nickname": inputRef.current,
              "data": JSON.stringify(dataRef.current),
            },
          },
          `/char/${inputRef.current}`
          );
          return true;
        }
      })
    }
      isNormalChar();
    }
  }

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
          <div className="text-center grow selected">개인 검색</div>
          <div className="text-center grow">비교 검색</div>
          <div className="text-center grow">단체 검색</div>
        </div> 
    </>
  )
}