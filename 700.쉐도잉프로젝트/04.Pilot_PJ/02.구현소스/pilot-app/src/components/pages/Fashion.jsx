/// 패션 페이지
import React from "react";

/// CSS 연결하기
import "../../css/fashion.scss";

//////
function Fashion(props) {

  //// 코드리턴 구역
  return (
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page"></section>
      {/* 2. 신상품영역 */}
      <section id="c1" className="cont sc-ani c1"></section>
      {/* 2.5. 상세보기박스 */}
      <div className="bgbx"></div>
      {/* 3. 패럴랙스 영역 : 리액트용 패럴랙스 적용 */}
      <section id="c2" className="cont"></section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3"></section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4"></section>
    </>
  );
}

export default Fashion;
