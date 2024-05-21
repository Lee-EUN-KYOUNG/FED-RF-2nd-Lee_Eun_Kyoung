// 공유 신발 데이터 불러오기
import guData from "../data/gu_data";


// 상품 리스트 서브 컴포넌트  : GoodsList
export default function GoodsList({ viewDetail, updateIdx }) {
  // updateIdx = 부모 컴포넌트의 setIdx 상태 관리 변수의 메서드
  // viewDetail - 부모 컴포넌트가 전달해준 상태 변수 viewList를 업데이트하는 setViewList 메서드임

  // 반복 요소 li에 key 속성을 쓸것을 리액트는 필수적이라고 함
  // ㄴ> 업데이트시 순번 구분을 위해 사용
  // node.js 개발 환경에서는 안 쓰면 에러남

  // 코드 리턴 구역
  return (
    <ul>
      {guData.map((v, i) => (
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
                <img src={`./images/vans/vans_${v.idx}.jpg`} alt="신발" />
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
