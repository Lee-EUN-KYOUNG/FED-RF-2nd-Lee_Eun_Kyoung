// DC PJ 캐릭터 상세페이지
// -> 캐릭터 리스트로 부터 라우팅 이동하여 보이는 페이지

import React from "react";

// 라우터로 전달한 state값을 읽기 위한 객체
import { useLocation } from "react-router-dom"

/// 모듈 불러오기
import Banner from "../modules/Banner";
import CatList from "../modules/CatList";

/// CSS 불러오기
import "../../css/cat_detail.scss";


////////////////////// 코드 구역 /////////
function CatDetail() {
  /// 라우터 호출시 전달한 값을 받는다

  const loc = useLocation();
  const cname = loc.state.cname;
  const cdesc = loc.state.cdesc;
  const facts = loc.state.facts;
    console.log(cname, cdesc, facts);


  /// 코드 리턴
  return (
    <>
      {/* 1. 배너 모듈 */}
      <Banner catName={cname} />
      {/* 2. 상세 정보 박스 */}
      <div className="detail">
        {/* 2-1. 캐릭터 설명 박스 */}
        <div className="desc-box">
          {/* 캐릭터명 */}
          <h2>{cname}</h2>
          {/* 캐릭터 소개 */}
          <div className="cdes">
            <p>{cdesc}</p>
          </div>
        </div>
        {/* 2-2. 캐릭터 명세 */}
        <div className="facts">
          <div>
            <h3>CHARACTER FACTS</h3>
            {/* 테이블로 명세 배열만큼 tr을 만들어준다 */}
            <table>
              <tbody>
                <tr>
                  <td>{facts}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 3. 캐릭터 리스트 모듈 */}
      <CatList />
    </>
  );
}

export default CatDetail;
