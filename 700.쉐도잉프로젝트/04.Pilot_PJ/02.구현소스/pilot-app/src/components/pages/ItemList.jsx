// 상품 리스트 컴포넌트
import React, { useEffect, useState } from "react";

// 공통함수 불러오기
import { addComma } from "../../func/common_fn";

// CSS 불러오기
import "../../css/item_list.scss";

// 제이쿼리
import $ from "jquery";

// 상품 데이터 불러오기
import itemListData from "../../js/data/item_list";
import ItemDetail from "../modules/ItemDetail";



///////////////////////////////////////////
function ItemList(props) {


  // 상태 변수 만들기
  // [1] 카테고리 정보
  const [cat, setCat] = useState(null);
  
  // [2] 상품 정보
  const [ginfo, setGinfo] = useState(null);
  


  ////// 화면 랜더링 구역
  useEffect(() => {
    // 전체 스크롤바 살리기
    $("html, body").css({ overflow: "visible" });
  }, []); /////////////useEffect

  ////////////////// 코드 리턴 구역
  return (
    <main id="cont">
      <h1 className="tit">All ITEMS LIST</h1>
      <section>
        <div id="optbx">
          <label htmlFor="men">남성</label>
          <input type="checkbox" className="chkbx" id="men" defaultChecked />
          <label htmlFor="women">여성</label>
          <input type="checkbox" className="chkbx" id="women" defaultChecked />
          <label htmlFor="style">스타일</label>
          <input type="checkbox" className="chkbx" id="style" defaultChecked />
        </div>
        <div className="grid">
          {itemListData.map((v, i) => (
            <div key={i}>
              <a href="#" onClick={(e)=>{
                e.preventDefault();
                // 상품 상세 모듈 전달 상태 변수 변경
                setCat(v.cat);
                setGinfo(v.ginfo);
                // 상세 상품 정보 박스 보여주기
                $(".bgbx").show();
              }}>
                [{i + 1}]
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/images/goods/${v.cat}/${v.ginfo[0]}.png`
                  }
                  alt="dress"
                />
                <aside>
                  <h2>{v.ginfo[1]}</h2>
                  <h3>{addComma(v.ginfo[3])}원</h3>
                </aside>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 상세 상품 정보 박스 */}
      <div
        className="bgbx"
        style={{
          position: "fixed",
          top: "0px",
          paddingTop: "12vh",
          backdropFilter: "blur(8px)",
          height: "100vh",
          zIndex: "9999",
        }}
      >
        {/* 아이템 디테일 컴포넌트 불러오기 */}
        <ItemDetail cat={cat} ginfo={ginfo} />
      </div>
    </main>
  );
}

export default ItemList;
