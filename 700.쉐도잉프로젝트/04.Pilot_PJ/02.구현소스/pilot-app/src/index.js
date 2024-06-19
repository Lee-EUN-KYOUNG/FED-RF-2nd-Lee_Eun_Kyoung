import React, { useState } from "react";
import ReactDom, { createRoot } from "react-dom/client";
import TopArea from "./components/layout/TopArea";
import MainArea from "./components/layout/MainArea";
import FooterArea from "./components/layout/FooterArea";

// 공통 CSS 불러오기
import "./css/index.scss";

// 컨텍스트 API 불러오기
import { pCon } from "./components/modules/pCont";


/********************************************************************************** 
  [컨텍스트 API 공개 변수들]
  1. setPgName - 페이지 이름 업데이트 메서드


**********************************************************************************/




//////////////////////////////////////
function MainComponent(props) {
  // 상태 관리 변수 셋팅
  // 1. 페이지 변경 상태 변수
  const [pgName, setPgName] = useState("main");

  //// 코드 리턴 구역
  return (
    <pCon.Provider value={{setPgName}}>
      <TopArea />
      <MainArea page={pgName} />
      <FooterArea />
    </pCon.Provider>
  );
}

// 출력하기
const root = createRoot(document.querySelector("#root"));
root.render(<MainComponent />);
