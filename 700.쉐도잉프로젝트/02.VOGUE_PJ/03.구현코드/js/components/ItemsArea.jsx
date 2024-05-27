// 아이템 영역 서브 컴포넌트

// 아이템 카테고리 데이터 불러오기
import catData from "../data/category";

export default function ItemsArea({ catName }) {
  // 해당 카테고리의 데이터 선택하여 담기
  const selData = catData[catName];
  console.log(selData);

  // 태그 처리 구분 코드 생성 함수
  const makeCode = (data) => {

    //console.log("배열인가?",Array.isArray(data));
    // 배열 데이터는 태그 구성이 다름
    // runway 카테고리만 다름
    if(Array.isArray(data)){
      return(
        <h2>
          <small>{data[0]}</small>
          <br />
          {data[1]}
        </h2>
      );
    } ////////////// if ////////
    // 배열이 아닌 경우
    else{
      return(
        <h2>{data}</h2>
      );
    } //////////// else ///////////

  }; //////////////// makeCode



  /// 코드 리턴 구역
  return (
    <div id="main-area">
      {/* 데이터 적용 1 : 최상위 클래스명 추가하기 */}
      <main className={"main-area ibx " + selData.경로}>
        {/* <!-- 2-1. 카테고리 페이지 상단영역 --> */}
        <header className="cat-top-area">
          {/* <!-- 2-1-1. 서브타이틀 --> */}
          {/* 데이터 적용 2 : 제목 넣기 */}
          <h2 className="cat-tit">{selData.제목}</h2>
          {/* <!-- 2-1-2. 서브메뉴(LNB:Local Navigation Bar) --> */}
          {/* 데이터적용 3 : 서브 메뉴 넣기 */}
          {
          selData.메뉴 != "없음" &&
          <nav className="lnb">
            {
              <ul>
                {selData.메뉴.map((v) => (
                  <li>
                    <a href="#">{v}</a>
                  </li>
                ))}
              </ul>
            }
          </nav>
          }
        </header>
        {/* <!-- 2-2. 카테고리 페이지 컨텐츠영역 --> */}
        <div className="cat-cont-area">
          {/* 데이터 적용 4 : 컨텐츠 타이틀 넣기 */}
          <section className="pt2">
            <div className="cbx bgi bg1-1">
              {makeCode(selData.타이틀[0])}
            </div>
            <div className="cbx bgi bg1-2">
              {makeCode(selData.타이틀[1])}
            </div>
            <div className="cbx bgi bg1-3">
              {makeCode(selData.타이틀[2])}
            </div>
          </section>
          <section className="pt2">
            <div className="cbx bgi bg2-1">
              {makeCode(selData.타이틀[3])}
            </div>
            <div className="cbx bgi bg2-2">
              {makeCode(selData.타이틀[4])}
            </div>
            <div className="cbx bgi bg2-3">
              {makeCode(selData.타이틀[5])}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} ///////////////////// ItemsArea 컴포넌트 ////////////////
