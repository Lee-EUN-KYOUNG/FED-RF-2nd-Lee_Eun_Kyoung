// 보그 PJ 메인 JS - main.js

// 상단영역 불러오기
import TopArea from "./components/TopArea";

// 메인영역 불러오기
import MainArea from "./components/MainArea";

// 하단 영역 불러오기
import FooterArea from "./components/FooterArea";

// 메인 페이지 전체 레이아웃 로딩 컴포넌트
function Layout() {
  return (
    <React.Fragment>
      {/* 1. 상단 영역 컴포넌트 */}
      <TopArea />
      {/* 2. 메인 영역 컴포넌트 */}
      <MainArea />
      {/* 3. 하단 영역 컴포넌트 */}
      <FooterArea />
    </React.Fragment>
  );
} /////////////////////////////// Layout 컴포넌트////////////////

// 메인 페이지 전체 출력하기
// 상단영역만 넣어보기
ReactDOM.render(<Layout />, document.querySelector("#root"));
