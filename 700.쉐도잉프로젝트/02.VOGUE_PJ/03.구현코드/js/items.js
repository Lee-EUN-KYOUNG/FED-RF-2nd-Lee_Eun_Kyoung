// 보그 PJ 메인 JS - Items.js

// 상단영역 불러오기
import TopArea from "./components/TopArea";

// 아이템 영역 불러오기
import ItemsArea from "./components/ItemsArea";

// 하단 영역 불러오기
import FooterArea from "./components/FooterArea";



// 아이템 페이지 전체 레이아웃 로딩 컴포넌트
function Layout() {
  return (
    <React.Fragment>
      {/* 1. 상단 영역 컴포넌트 */}
      <TopArea />
      {/* 2. 아이템 영역 컴포넌트 */}
      <ItemsArea catName="living" />
      {/* 3. 하단 영역 컴포넌트 */}
      <FooterArea />
    </React.Fragment>
  );
} /////////////////////////////// Layout 컴포넌트////////////////

// 아이템 페이지 전체 출력하기
// 상단영역만 넣어보기
ReactDOM.render(<Layout />, document.querySelector("#root"));
