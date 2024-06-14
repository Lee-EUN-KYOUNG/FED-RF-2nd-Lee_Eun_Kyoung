/////////// 패션 인트로 컴포넌트
import React from "react";

/// CSS 불러오기
import "../../css/fashion_intro.scss";

// 데이터 불러오기
import {fsData} from "../../js/data/fashion_intro";


//////////////////
function FashionIntro({catName, subCat, opt}) {

    // catName : 카테고리명 / subCat : 서브 카테고리명
    // 서브가 아닌 경우 subCat값은 "etc"
    // opt : 방향 옶션 (역방향은 true 정방향은 false)
    // -> 역방향은 flex-direction: row-reverse 적용


    // 선택 데이터 변수 할당
    const selData = fsData[catName];

  return (
    <div id={catName} className="fs-page">
      <ul className="pgc" style={{flexDirection:opt?"row-reverse":"row"}}>
        <li className="imgc">
          <img src={selData.isrc} alt={selData.ialt} />
        </li>
        <li className="txtc">
          <h2>
            {/* 데이터에 태그가 있어서 이를 html로 넣으려면? */}
            {/* <a href="#" dangerouslySetInnerHTML={{__html:데이터}}></a> 속성을 사용한다*/}
            <a href="#">{selData.tit[0]}<br/>{selData.tit[1]}</a>
          </h2>
        </li>
      </ul>
    </div>
  );
}

export default FashionIntro;
