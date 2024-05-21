// 공유 신발 데이터 불러오기
import guData from "../data/gu_data";

///// 상품 상세보기 서브 컴포넌트 : GoodsDetail
export default function GoodsDetails({ backList, gNo }) {
  // backList - 부모 컴포넌트가 전달해준 상태 변수 viewList를 업데이트하는 setViewList 메서드임
  // gNo - 상품 데이터 배열 순번
  // idx 상태 관리 변수가 전달 됨 -> 이 값이 변경시 컴포넌트 변경됨
  // return 구역
  return (
    <ol
      style={{ display: "flex", listStyle: "none", justifyContent: "center" }}
    >
      <li>
        <img
          src={"./images/vans/vans_" + guData[gNo].idx + ".jpg"}
          alt="반스신발"
          style={{ Width: "100%" }}
        />
      </li>
      <li style={{ lineHeight: "2", padding: "10px", textAlign: "left" }}>
        상품명 : {guData[gNo].gname} <br />
        가격 : {guData[gNo].gprice} <br />
        소재 : {guData[gNo].소재} <br />
        색상 : {guData[gNo].색상} <br />
        치수 : {guData[gNo].치수} <br />
        제조자/수입자 : {guData[gNo]["제조자/수입자"]} <br />
        제조국 : {guData[gNo].제조국} <br />
        제조연월 : {guData[gNo].제조연월} <br />
        A/S 책임자 : {guData[gNo]["A/S 책임자"]} <br />
        A/S 전화번호 : {guData[gNo]["A/S 책임자"]} <br />
        Model : {guData[gNo].Model} <br />
        <div className="btnbx" style={{ textAlign: "right", padding: "15px" }}>
          <button onClick={() => backList(true)} style={{ fontSize: "20px" }}>
            리스트로 가기
          </button>
        </div>
      </li>
    </ol>
  );
} //////////////////// GoodsDetail 컴포넌트
