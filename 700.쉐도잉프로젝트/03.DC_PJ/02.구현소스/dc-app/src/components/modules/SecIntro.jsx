// 섹션소개모듈 - SecIntro.jsx
import React from "react";
import { Link } from "react-router-dom";

// 섹션 소개 모듈 데이터 불러오기
import { secIntroData } from "../data/sec_intro";

// 섹션 소개 모듈 CSS 만들기
import "../../css/sec_intro.scss";

function SecIntro(props) {
  // 불러온 데이터 변수 할당
  const selData = secIntroData;

  // 코드 리턴 구역
  return (
    <>
      <section className="sec-intro">
        {/*  반복 단위 박스*/}
        {selData.map((v, i) => (
          <div key={i}>
            {/* 1. 이미지 박스 */}
            <div className="imbx">
              <img src={process.env.PUBLIC_URL+v.isrc} alt={v.tit.split("^")[0]} />
            </div>
            {/* 2. 타이틀 박스 */}
            <div className="titbx">
              <h3>{v.tit.split("^")[0]}</h3>
              <h2>{v.tit.split("^")[1]}</h2>
            </div>
            {/* 3. 버튼 박스 */}
            <div className="btnbx">
              <Link to={v.link}>
                <button>{v.btn}</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default SecIntro;
