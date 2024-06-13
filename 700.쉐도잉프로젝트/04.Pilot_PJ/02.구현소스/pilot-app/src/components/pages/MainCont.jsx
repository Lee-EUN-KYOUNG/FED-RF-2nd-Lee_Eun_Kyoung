// 메인페이지 컨텐츠 컴포넌트
import React from "react";

/// 모듈 불러오기
import Banner from "../modules/Banner";

////////////////////////////
function MainCont(props) {
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
    </>
  );
}

export default MainCont;
