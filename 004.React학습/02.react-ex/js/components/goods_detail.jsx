// 공유 신발 데이터 불러오기
import guData from "../data/gu_data";
// 효진 드레스 데이터 불러오기
import hjData from "../data/hj_data";


///// 상품 상세보기 서브 컴포넌트 : GoodsDetail
export default function GoodsDetails({ backList, gNo, selItem }) {
  // (1) backList - 부모 컴포넌트가 전달해준 상태 변수 viewList를 업데이트하는 setViewList 메서드임
  // (2) gNo - 상품 데이터 배열 순번
  // idx 상태 관리 변수가 전달 됨 -> 이 값이 변경시 컴포넌트 변경됨
  // (3) selItem은 부모 컴포넌트에서 "공유"/"효진" 선택 코드값
  // selItem 값으로 데이터를 선택해준다
  // "공유"는 guData, "효진"은 hjData

  // 선택 코드에 따른 데이터 선택하기
  const selData = selItem == "공유"?guData:selItem =="효진"?hjData:[];

  // return 구역
  return (
    <ol
      style={{ display: "flex", listStyle: "none", justifyContent: "center" }}
    >
      <li>
        <img
          src={
            (selItem=="공유"?"./images/vans/vans_":
            selItem=="효진"?"./images/gallery/":"") + selData[gNo].idx + ".jpg"}
          alt="상품"
          style={{ Width: "100%" }}
        />
      </li>
      <li style={{ lineHeight: "2", padding: "10px", textAlign: "left" }}>
        상품명 : {selData[gNo].gname} <br />
        가격 : {selData[gNo].gprice}
        <br />
        {
        // 리액트 조건 출력하기
        selItem=="공유" &&
        // 코드를 가져올때 최상위를 만들어서 가져오면 쉽게 셋팅 할수 있다
        <div>
          소재 : {selData[gNo].소재} <br />
          색상 : {selData[gNo].색상} <br />
          치수 : {selData[gNo].치수} <br />
          제조자/수입자 : {selData[gNo]["제조자/수입자"]} <br />
          제조국 : {selData[gNo].제조국} <br />
          제조연월 : {selData[gNo].제조연월} <br />
          A/S 책임자 : {selData[gNo]["A/S 책임자"]} <br />
          A/S 전화번호 : {selData[gNo]["A/S 책임자"]} <br />
          Model : {selData[gNo].Model} <br />
        </div>
        }
        <div className="btnbx" style={{ textAlign: "right", padding: "15px" }}>
          <button onClick={() => backList(true)} style={{ fontSize: "20px" }}>
            리스트로 가기
          </button>
        </div>
      </li>
    </ol>
  );
} //////////////////// GoodsDetail 컴포넌트
