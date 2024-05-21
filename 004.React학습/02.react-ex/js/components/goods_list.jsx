// 공유 신발 데이터 불러오기
import guData from "../data/gu_data";
// 효진 신발 데이터 불러오기
import hjData from "../data/hj_data";


// 상품 리스트 서브 컴포넌트  : GoodsList
export default function GoodsList({ viewDetail, updateIdx, selItem }) {
  // (1) updateIdx = 부모 컴포넌트의 setIdx 상태 관리 변수의 메서드
  // (2) viewDetail - 부모 컴포넌트가 전달해준 상태 변수 viewList를 업데이트하는 setViewList 메서드임
  // (3) selItem은 부모 컴포넌트에서 "공유"/"효진" 선택 코드값
  // selItem 값으로 데이터를 선택해준다
  // "공유"는 guData, "효진"은 hjData

  // 반복 요소 li에 key 속성을 쓸것을 리액트는 필수적이라고 함
  // ㄴ> 업데이트시 순번 구분을 위해 사용
  // node.js 개발 환경에서는 안 쓰면 에러남

  // 선택 코드에 따른 데이터 선택하기
  const selData = selItem == "공유"?guData:selItem =="효진"?hjData:[];

  // 코드 리턴 구역
  return (
    <ul>
      {selData.map((v, i) => (
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              // a 요소 기본 이동 막기
              e.preventDefault();
              // 상태 변수 viewList 업데이트 - setViewList 메서드가 viewDetail로 들어옴
              viewDetail(false);
              // setIdx 메서드가 updateIdx로 들어옴
              updateIdx(i);
            }}
          >
            <ol className="glist">
              <li>
                {
                  selItem == "공유"
                  ?<img src={`./images/vans/vans_${v.idx}.jpg`} alt="신발" />
                  :selItem =="효진"
                  ?<img src={`./images/gallery/${v.idx}.jpg`} alt="드레스" />
                  : []
                }
              </li>
              <li>{v.gname}</li>
              <li>가격 : {v.gprice}원</li>
            </ol>
          </a>
        </li>
      ))}
    </ul>
  );
} /////// GoodsList 컴포넌트
