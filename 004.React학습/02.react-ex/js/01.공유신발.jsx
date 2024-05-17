// 01. 공유 신발 JSX
// [메인 컴포넌트]
// 메인의 의미는? -> 다른 구성 요소 컴포넌트들을 모아 최종적으로 랜더링하는 구성 컴포넌트
// 컴포넌트란? -> 특정 모듈로 구성된 HTML 코드를 리턴하는 객체
// 함수형 컴포넌트는 첫글자가 대문자인 함수 키워드로 만든다

// 공유 신발 데이터 불러오기
import guData from "./data/gu_data";

//console.log(guData);

function MainComponent() {
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
        <ul>
          {guData.map((v) => (
            <li>
              <a href="#">
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
      </div>
    </React.Fragment>
  );
} ///////////////// MainComponent 컴포넌트

// 메인 컴포넌트 출력하기
ReactDOM.render(<MainComponent />, document.querySelector("#root"));
