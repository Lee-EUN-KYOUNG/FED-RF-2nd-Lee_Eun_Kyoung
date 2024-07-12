import React, { useContext, useEffect } from "react";
import { pCon } from "./pCont";

// CSS 불러오기
import "../../css/cart_list.scss";
import { addComma } from "../../func/common_fn";

// 제이쿼리
import $ from "jquery";

function CartList(props) {
  // 컨텍스트 사용
  const myCon = useContext(pCon);

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(myCon.localsCart);

  // 전체 데이터 갯수
  const dataCnt = selData.length;
  console.log("데이터수:", dataCnt);

  //console.log("로컬스:", selData);

  // 총합계 함수
  const totalFn = () => {
    let result = 0;

    // 합계 금액은 모든 합계 히든 필드 값을 더한다
    // 제이쿼리 forEach는 each((순번,요소)=>{})메서드다
    $(".sum-num2").each((idx, ele) => {
      console.log("값:", $(ele).val());

      // 숫자로 변환후 기존값에 더하기함
      result += Number($(ele).val());
    });

    // 호출한 곳에 합계 리턴
    return result;
  };

  /// 화면 랜더링 구역 : seldata 의존성
  useEffect(() => {
    // 카트 버튼 나타나기
    $("#mycart")
      .removeClass("on")
      .delay(500) // 애니메이션 지연시간
      .fadeIn(300, function () {
        // 나타난후 클래스 넣으면 오른쪽 이동 + 작아짐
        $(this).addClass("on");
      });
    // 총합계 찍기
    $(".total-num").text(addComma(totalFn()));
  }, [dataCnt]);
  // 숫자값은 값할당이므로 변함없음
  // ,[selData]는 리랜더링시 객체 주소값이 변경되어 매번 새로운 값이 업데이트 되기때문에 부적격

  //// 화면 랜더링 구역 : 한번만
  // useEffect(() => {}, []);

  ///////////////////////////////////////// 코드 리턴 구역
  return (
    <>
      <section id="cartlist">
        <a
          href="#"
          className="cbtn cbtn2"
          onClick={(e) => {
            e.preventDefault();
            // 오른쪽으로 이동하여 사라지게
            $("#cartlist").animate({ right: "-60vw" }, 400);
          }}
        >
          <span>닫기버튼</span>
        </a>
        <table>
          {/* 항목별 세로 비율 설정 */}
          <colgroup>
            <col span="1" style={{ width: "8%" }} />
            <col span="1" style={{ width: "5%" }} />
            <col span="1" style={{ width: "38%" }} />
            <col span="1" style={{ width: "14%" }} />
            <col span="1" style={{ width: "10%" }} />
            <col span="1" style={{ width: "8%" }} />
            <col span="1" style={{ width: "11%" }} />
            <col span="1" style={{ width: "5%" }} />
          </colgroup>
          {/* 테이블 제목 */}
          <caption>
            <h1> 카트 리스트 ({dataCnt})</h1>
          </caption>
          {/* 테이블 상단영역 : 분류 항목 출력 */}
          <thead>
            <tr>
              <th>번호</th>
              <th>상품</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8}>
                <div
                  className="scbar"
                  style={{
                    display: "block",
                    overflowY: "auto",
                    height: "40vh",
                    width: "60vw",
                  }}
                >
                  {/* 내부용 스크롤되는 테이블 */}
                  <table style={{ margin: "0", width: "100%" }}>
                    <tbody>
                      {/*
                          [카트 데이터 연동 파트]
                          [데이터 구조정의]
                          1. idx : 상품고유번호
                          2. cat : 카테고리
                          3. ginfo : 상품정보
                          4. cnt : 상품개수
                          */}
                      {selData.map((v, i) => (
                        <tr key={i}>
                          {/* 일련번호 */}
                          <td>{i + 1}</td>
                          {/* 상품 번호 */}
                          <td>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/images/goods/${v.cat}/${v.ginfo[0]}.png`
                              }
                              alt="item"
                            />
                          </td>
                          <td>{v.ginfo[1]}</td>
                          <td>{v.ginfo[2]}</td>
                          <td>{addComma(v.ginfo[3])}원</td>
                          <td className="cnt-part">
                            <div>
                              <span>
                                <input
                                  type="text"
                                  className="item-cnt"
                                  readOnly=""
                                  defaultValue={v.cnt}
                                  onBlur={()=>{
                                    console.log("ddd");
                                  }}
                                  //onChange={() => {}}
                                />
                                {/* 반영 버튼 */}
                                <button
                                className="btn-insert"
                                onClick={(e)=>{
                                  // 클릭시 실제 데이터 수량 변경 반영하기
                                  // 대상 : selData (배열 변환 데이터)
                                  // i는 배열 순번임 (map 돌때 i가 들어옴)
                                  selData[i].cnt = 
                                  $(e.currentTarget).siblings(".item-cnt").val();
                                  console.log("수량 업데이트:", selData)
                                  // 데이터 문자화하기 : 변경된 원본을 문자화
                                  let res = JSON.stringify(selData);

                                  // 로컬쓰 "cart-data"에 반영하기
                                  localStorage.setItem("cart-data", res);

                                  // 카트리스트 전역 상태 변수 변경
                                  myCon.setLocalsCart(res);
                                  
                                  // 반영 버튼 숨기기
                                  $(e.currentTarget).css({width: "0"});

                                  // 전체 총합계 계산 다시 하기
                                  $(".total-num").text(addComma(totalFn()));
                                }}
                                >
                                  반영
                                </button>
                                <b
                                  className="btn-cnt"
                                  onClick={(e) => {
                                    // 업데이트 대상 (input)
                                    let tg = $(e.currentTarget).siblings(
                                      "input"
                                    );
                                    // 입력창의 blur 이벤트발생을 위해 강제로 포커스를 준다
                                    tg.focus();
                                    // 하위 클릭된 이미지 종류 파악하기
                                    // e.target으로 설정하여 하위 요소인 이미지가 선택되게 해줌
                                    // e.currentTarget은 이벤트가 걸린 요소 자신이다
                                    let btnAlt = $(e.target).attr("alt");
                                    console.log(btnAlt);
                                    // 증가 감소 분기하여 숫자 변경 반영하기
                                    if (btnAlt == "증가") {
                                      //tg값을 읽어와서 1을 더한
                                      tg.val(Number(tg.val()) + 1);
                                    } /////////// if
                                    else if (btnAlt == "감소") {
                                      // tg값을 읽어와서 1을 뺀다
                                      // 단 1보다 작아지면 안됨
                                      tg.val(
                                        Number(tg.val()) == 1
                                          ? 1
                                          : Number(tg.val() - 1)
                                      );
                                    } /////////// else if
                                    // 클릭시 반영버튼 나타나기
                                    $(e.currentTarget).siblings(".btn-insert").css({width: "auto"});
                                  }}
                                >
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/cnt_up.png"
                                    }
                                    alt="증가"
                                  />
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/cnt_down.png"
                                    }
                                    alt="감소"
                                  />
                                </b>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="sum-num1">
                              {addComma(v.ginfo[3] * v.cnt)}
                            </span>
                            원
                            {/*
                            계산된 합계 금액 숫자만 히든 필드에 넣고
                            총합계 계산에 사용함
                            */}
                            <input
                              className="sum-num2"
                              type="hidden"
                              defaultValue={v.ginfo[3] * v.cnt}
                            />
                          </td>
                          <td>
                            {/* 데이터 삭제 기능 버튼 */}
                            <button
                              className="cfn"
                              onClick={() => {
                                // confirm()의 "확인" 클릭시 true
                                if (window.confirm("지우시겠습니까?")) {
                                  console.log("삭제");
                                  console.log("현재객체", selData);
                                  console.log("지울순번", i);
                                  // splice 자체를 찍으면 지워진 요소가 찍힘
                                  //console.log("지움",selData.splice(i,1));

                                  // 지울 배열 순번은 map()에서 i로 들어옴
                                  // 지울 배열은 selData임

                                  // 데이터 지우기
                                  selData.splice(i, 1);

                                  // 데이터 문자화하기 : 변경된 원본을 문자화
                                  let res = JSON.stringify(selData);

                                  // 로컬쓰 "cart-data"에 반영하기
                                  localStorage.setItem("cart-data", res);

                                  // 카트리스트 전역 상태 변수 변경
                                  myCon.setLocalsCart(res);

                                  // 데이터 갯수가 0이면 카트리스트 상태변수를 flase로 변경하여
                                  // 카트리스트 출력을 없앤다

                                  if (selData.length == 0)
                                    myCon.setCartSts(false);

                                  //let aa = [];
                                  //aa.splice(지울순번,지울개수)
                                  //let selSeq = selData.find((val,i)=>{
                                  //  if(val.idx==v.idx) return i;
                                  //  //console.log(selSeq);
                                  //});
                                } ////// if
                              }}
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">총합계 :</td>
              <td>
                <span className="total-num"></span>원
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="8" className="paging">
                <button>구매</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      {/* 카트 버튼 이미지 박스 */}
      <div
        id="mycart"
        onClick={(e) => {
          e.preventDefault();
          // 오른쪽으로 이동하여 사라지게
          $("#cartlist").animate({ right: "-0" }, 400);
        }}
      >
        {/* 카트 이미지 */}
        <img
          src={process.env.PUBLIC_URL + "/images/mycart.gif"}
          title={dataCnt + "개의 상품이 있습니다"}
          alt="장바구니"
        />
        {/* 카트 상품 개수 출력박스 */}
        <div className="cntBx">{dataCnt}</div>
      </div>
    </>
  );
}

export default CartList;
