/////////// 패션 인트로 컴포넌트
import React, { useContext } from "react";

// 컨텍스트 API 불러오기
import { pCon } from "./pCont";

/// CSS 불러오기
import "../../css/fashion_intro.scss";

// 데이터 불러오기
import { fsData } from "../../js/data/fashion_intro";

//////////////////
function FashionIntro({ catName, subCat, opt }) {
  // catName : 카테고리명(men,women,style) / subCat : 서브 카테고리명
  // 서브가 아닌 경우 subCat값은 "etc"
  // opt : 방향 옶션 (역방향은 true 정방향은 false)
  // -> 역방향은 flex-direction: row-reverse 적용

  // 컨텍스트 API 사용하기
  const myCon = useContext(pCon);


  // 선택 데이터 변수 할당
  const selData = fsData[catName];

  return (
    <div id={catName} className="fs-page">
      <ul
        className="pgc"
        style={{ flexDirection: opt ? "row-reverse" : "row" }}
      >
        {/* 첫번째 이미지 박스 */}
        <li className="imgc">
          <img src={process.env.PUBLIC_URL+selData.isrc[0]} alt={selData.ialt[0]} />
        </li>
        {/* 두번째 글자 박스 */}
        <li className="txtc">
          <h2 className={catName == "style" ? "tm" : ""}>
            {/* 데이터에 태그가 있어서 이를 html로 넣으려면? */}
            {/* <a href="#" dangerouslySetInnerHTML={{__html:데이터}}></a> 속성을 사용한다*/}
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              myCon.setPgName(catName);
            }}>
              {selData.tit[0][0]}
              <br />
              {selData.tit[0][1]}
            </a>
          </h2>
          {
            // 스타일인 경우 글자박스 하나 더 출력됨
            catName == "style" && (
              <h2 className="tw">
                <a href="#">
                  {selData.tit[1][0]}
                  <br />
                  {selData.tit[1][1]}
                </a>
              </h2>
            )
          }
        </li>
        {/* 3. 세번째 이미지 박스 스타일만 */}
        {
          // 스타일인 경우 li 이미지 박스 생성
          catName == "style" && (
            <li className="imgc">
              <img src={process.env.PUBLIC_URL+selData.isrc[1]} alt={selData.ialt[1]} />
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default FashionIntro;
