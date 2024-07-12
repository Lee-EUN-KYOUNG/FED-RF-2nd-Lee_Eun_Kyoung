import React, { useState } from "react";
import ReactDom, { createRoot } from "react-dom/client";
import TopArea from "./components/layout/TopArea";
import MainArea from "./components/layout/MainArea";
import FooterArea from "./components/layout/FooterArea";

// 공통 CSS 불러오기
import "./css/index.scss";

// 컨텍스트 API 불러오기
import { pCon } from "./components/modules/pCont";
import CartList from "./components/modules/CartList";


/********************************************************************************** 
  [컨텍스트 API 공개 변수들]
  1. setPgName - 페이지 이름 업데이트 메서드


**********************************************************************************/




//////////////////////////////////////
function MainComponent(props) {

  // 로컬스 카트 존재여부 변수
  let cartTemp = false;

  // 로컬스 카트 데이터 상태변수
  const [localsCart,setLocalsCart] = 
  useState(localStorage.getItem("cart-data"));

  //로컬스 카트 데이터 존재 여부에 따라 상태값 변경
  if(localsCart){

    // 데이터가 있으면 cartTemp값 true로 업데이트
    // 데이터 개수가 0이 아니어야함
    let cartCnt = JSON.parse(localsCart).length;
    console.log("카트 데이터수:",cartCnt);
    if(cartCnt > 0) cartTemp = true;
  }


  // 상태 관리 변수 셋팅
  // 1. 페이지 변경 상태 변수
  const [pgName, setPgName] = useState("main");

  // 2. 카트 리스트 사용 여부 = true일때 사용
  const [cartSts, setCartSts] = useState(cartTemp);




  /******************************************************************** 
  
                    [컨텍스트 API 공개 변수들]
    1. setPgName :  페이지 이름 셋팅
    2. setCartSts : 카트 사용 여부 셋팅
    3. setLocalsCart : 로컬스 카트 데이터 변경 함수
    4. localsCart : 로컬스 카트 데이터 변수

  ********************************************************************/
  
  //// 코드 리턴 구역
  return (
    <pCon.Provider value={{setPgName, setCartSts, setLocalsCart, localsCart}}>
      <TopArea pgName={pgName} />
      <MainArea page={pgName} />
      <FooterArea />
      {/* 카트 리스트 : 카트 상태값 true 출력*/}
      {
        cartSts && <CartList />
      }
    </pCon.Provider>
  );
}

// 출력하기
const root = createRoot(document.querySelector("#root"));
root.render(<MainComponent />);
