// 메인페이지 컨텐츠 컴포넌트
import React, { useEffect, useLayoutEffect } from "react";

/// 모듈 불러오기
import Banner from "../modules/Banner";
import FashionIntro from "../modules/FashionIntro";

import $ from "jquery";


// 자동 휠 함수 불러오기
import * as wFn from "../../func/auto_wheel";

////////////////////////////
function MainCont(props) {
  //// 화면 랜더링 실행 구역
  useEffect(() => {
    //console.log("useEffect");
    // document / body/ window 이 세가지는 이벤트를 등록하고 삭제할수 있도록
    // 여기서 이벤트를 걸어준다
    window.addEventListener("wheel", wFn.wheelFn);

    // 메뉴+인디케이터 이벤트 기능 설정 함수 호출
    wFn.evtFn();

    // 등장 요소 CSS 초기화 함수 호출
    wFn.initSet();

    // 페이지 번호 초기화 함수 호출
    wFn.zeroPno();

    /// 컴포넌트 소멸시 이벤트 삭제하기
    return () => {
      console.log("메인소멸");
      // 1. 자동 휠 함수 이벤트 삭제하기
      window.removeEventListener("wheel", wFn.wheelFn);

      // 2. 상단 이동 이벤트 제거하기
      $("#logo a").off("click");
    };
  }, []);

  //useLayoutEffect(()=>{
  //
  //  console.log("useLayoutEffect");
  //
  //},[]);

  ///// 코드 리턴 구역
  return (
    <>
      {/* 1. 배너 컴포넌트 */}
      <section
        id="ban"
        className="page none-sel"
        style={{ background: "lightblue" }}
      >
        <Banner />
      </section>
      {/* 2. 남성패션 영역 */}
      <section className="page">
        <FashionIntro catName="men" subCat="etc" opt={false} />
      </section>
      {/* 3. 여성패션 영역 */}
      <section className="page">
        <FashionIntro catName="women" subCat="etc" opt={true} />
      </section>
      {/* 4. 스타일패션 영역 */}
      <section className="page">
        <FashionIntro catName="style" subCat="etc" opt={false} />
      </section>
      {/* 메인에만 나오는 사이드 인디케이터 */}
      <nav className="indic">
        <ul>
          <li className="on">
            <a href="#ban">
              <span>배너</span>
            </a>
          </li>
          <li>
            <a href="#men">
              <span>남성의류</span>
            </a>
          </li>
          <li>
            <a href="#women">
              <span>여성의류</span>
            </a>
          </li>
          <li>
            <a href="#style">
              <span>스타일</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainCont;
