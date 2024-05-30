// 보그 PJ 메인 JS - main.js

// 상단영역 불러오기
import TopArea from "./components/TopArea";

// 메인영역 불러오기
import MainArea from "./components/MainArea";

// 아이템 영역 불러오기
import ItemsArea from "./components/ItemsArea";

// 하단 영역 불러오기
import FooterArea from "./components/FooterArea";

// 갤러리 페이지 불러오기
import Gallery from "./components/Gallery";

// 로그인 페이지 불러오기
import Login from "./components/Login";

// 회원가입 페이지 불러오기
import Member from "./components/Member";



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 메인 페이지 전체 레이아웃 로딩 컴포넌트
function Layout() {

  /// 상태 관리 변수 설정 구역
  // [1] 메뉴 변경 상태 변수
  const [menu, setMenu] = React.useState("home");

  // 화면 랜더링 직전에 CSS 로딩 변경하기
  React.useLayoutEffect(() => {

    // menu 상태 변수에 의존시킨다
    // 메인 CSS 대상 요소 - #main-css
    // menu값이 "home"인 경우 main.css 로딩하고 기타 메뉴인 경우 items.css를 로딩한다
    // menu값이 "gallery"인 경우 gallery.css 로딩한다

    document.querySelector("#main-css").href=
    menu=="home"
    ? "./css/main.css"
    :menu=="gallery"
    ? "./css/gallery.css"
    :menu=="login"
    ? "./css/login.css"
    :menu=="member"
    ? "./css/member.css"
    : "./css/items.css";

    // 페이지 최상단 이동 코드
    window.scrollTo(0,0);

  }),[menu];




  ////////////////////// 코드 리턴 구역
  return (
    <React.Fragment>
      {/* 1. 상단 영역 컴포넌트 */}
      <TopArea changeMenu={setMenu}/>
      {/* 2. 메인 영역 컴포넌트 */}
      {
      menu=="home"
      ?<MainArea />
      :menu=="gallery"
      ?<Gallery />
      :menu=="login"
      ?<Login changeMenu={setMenu} />
      :menu=="member"
      ?<Member changeMenu={setMenu} />
      :<ItemsArea catName={menu}/>
    }
      {/* 3. 하단 영역 컴포넌트 */}
      <FooterArea />
    </React.Fragment>
  );
} /////////////////////////////// Layout 컴포넌트////////////////

// 메인 페이지 전체 출력하기
// 상단영역만 넣어보기
ReactDOM.render(<Layout />, document.querySelector("#root"));
