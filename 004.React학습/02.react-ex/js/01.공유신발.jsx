// 01. 공유 신발 JSX
// [메인 컴포넌트]
// 메인의 의미는? -> 다른 구성 요소 컴포넌트들을 모아 최종적으로 랜더링하는 구성 컴포넌트
// 컴포넌트란? -> 특정 모듈로 구성된 HTML 코드를 리턴하는 객체
// 함수형 컴포넌트는 첫글자가 대문자인 함수 키워드로 만든다

// 상품 리스트 서브 컴포넌트 불러오기
import GoodsList from "./components/goods_list";
// 상품 상세 보기 서브 컴포넌트 불러오기
import GoodsDetails from "./components/goods_detail";
// 주의 : CDN에서 여기 import 대상은 모두 html 페이지에서 불러와야 사용할 수 있다



//console.log(guData);

function MainComponent() {

  // [후크 상태 관리 변수 셋팅]
  //  1. 리스트 / 상세 보기 전환용 상태 관리 변수 만들기
  const [viewList, setViewList] = React.useState(true);
  // 2. 상품 데이터 인덱스값 상태 관리 변수
  const [idx, setIdx] = React.useState(0);


  /****************************************************************** 
    
                                [코드 구성]
            1. 타이틀 : h1.tit
            2. 내용 박스 : section
              -> 제목 : h2
              -> 이미지 박스 : div.img-box > img
            3. 기능 버튼 박스 : div.btn-box 
              -> 기능 버튼 : button *2
            4. 상품 리스트 박스 : div.gwrap
              -> 상품 리스트 : ul > >li> ol > li > (img / text) 
              -> 상품 상세 보기 : ol > li > (img / text / button)

    ******************************************************************/

  //// 코드 리턴 구역 /////////
  return (
    <React.Fragment>
      {/* 타이틀 */}
      <h1 className="tit">공유가 신고 다닌다는!</h1>
      {/* 내용 박스 */}
      <section>
        <h2>공유는 오늘도 멋집니다!</h2>
        <div className="img-box">
          <img src="./images/vans/gongyoo.jpg" alt="멋진공유" />
        </div>
      </section>
      {/* 기능 버튼 박스 */}
      <div className="btn-box">
        <button>효진초이스 바로가기</button>
      </div>
      {/* 상품 리스트 박스 */}
      <div className="gwrap">
        {
          // 상태 관리 변수 viewList 값이 true면 리스트 보기
          viewList?
          <GoodsList viewDetail={setViewList} updateIdx={setIdx}/>:
          <GoodsDetails backList={setViewList} gNo={idx}/>
          // false면 상품 상세리스트 보기
        }

      </div>
    </React.Fragment>
  );
} ///////////////// MainComponent 컴포넌트






// 메인 컴포넌트 출력하기
ReactDOM.render(<MainComponent />, document.querySelector("#root"));
