// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { Link } from "react-router-dom";
import { menu } from "../data/gnb";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import Logo from "../modules/Logo";
//import { dCon } from "../modules/dCon";

// 폰트 어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// 제이쿼리
import $ from "jquery";

// 상단 영역 CSS 불러오기
import "../../css/top_area.scss";

// 메모이제이션 적용하기! /////
// -> 그.러.나... 단순히 적용하면 효과가 없음!
// 이유는? 컨텍스트 API가 전역적인 함수/변수를 전달하고 있어서
// 매번 새롭게 리랜더린 됨으므로 인해 메모이제이션 갱신을 하게끔 하기에 효가가 없는것!!!
// ->>> 방법은? 컨텍스트API를 사용하지 말고 props로 전달하는 방식으로 전환하면 효과를 볼 수 있다!
// -> React.memo는 전달속성이 변경됨을 기준하여 메모이제이션 기능를 제공하기 때문이다!
// -> 전달되는 함수가 반드시 useCallback() 처리가 되어야 한다!!!
// -> 객체, 배열, 함수는 모두 값 저장이 아니고 주소 저장
//    그래서 이 주소를 고정해 줘야 같은 값으로 인식하여 메모이제이션 된다

//////////////////////////////////////////////////////
////// 코드구역
export const TopArea = memo(({ loginMsg, loginSts, logoutFn, goPage }) => {
  console.log("상단영역!!!");

  // 전달값
  // 1. loginMsg -  로그인 메시지 변수
  // 2. loginSts -  로그인 상태 변수
  // 3. logoutFn - 로그아웃 함수

  // 컨텍스트 사용하기 - 메모이제이션을 위해 사용안함
  //const myCon = useContext(dCon);

  /// 이동함수
  // 사용법: 반드시 useNavigate()메서드를 변수에 담아
  // 이동할 라우터 주소를 쓰면 이동한다
  // 예) goNav('/news') -> 뉴스페이지이동
  // 예) goNav('/') -> 첫페이지이동
  // 이동주소는 대소문자 구분없음!
  // 슬래쉬 없이 써도 루트로 인식함 -> 빈값이면 루트로 이동함

  //const goPage = useNavigate();

  // 사용시 goNav(라우터주소,{전달객체,없으면 비워두기})

  // 검색관련 함수들
  // 1. 검색창 보이기 함수
  const showSearch = (e) => {
    // 기본 기능 막기
    e.preventDefault();

    // 검색창 보이기
    // show는 display를 보이게함
    $(".searchingGnb").show();

    // 입력창에 포커스 보내기
    $("#schinGnb").focus();
  }; //////// showSearch함수

  // 2. 검색창에 엔터키 누르면 검색함수 호출
  const enterKey = (e) => {
    // e.keyCode는 숫자, e.key문자로 리턴함
    // console.log(e.key,e.keyCode);
    if (e.key == "Enter") {
      // 입력창의 입력값 읽어오기 : val()사용
      let txt = $(e.target).val().trim();
      console.log(txt);
      // 빈값이 아니면 검색함수 호출(검색어전달!)
      if (txt != "") {
        // 입력창 비우고 부모박스 닫기
        $(e.target).val("").parent().hide();
        // 검색 보내기
        goSearch(txt);
      } /// if ///
    } //// if ////
  }; //////// enterkey 함수

  // 3. 검색 페이지로 검색어와 함께 이동하기 함수
  const goSearch = (txt) => {
    console.log("검색하기");
    /// 라우터 이동 함수로 이동하기
    // 네비게이트 메서드 (라우터 주소, {state:{보낼 객체}})
    goPage("search", { state: { keyword: txt } });
  }; ///////// goSearch ///////////

  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1.상단영역 */}
      <header className="top-area">
        {/* 로그인 환영메시지 박스 */}
        <div className="logmsg">{loginMsg}</div>
        {/* 네비게이션 GNB파트 */}
        <nav className="gnb">
          <ul>
            {/* 1. 로고 컴포넌트 */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  // 기본 이동 막기
                  e.preventDefault();
                  // 라우터 이동 메서드 호출
                  goPage("/");
                }}
              >
                <Logo logoStyle="top" />
              </a>
              {/* <Link to="/">
                <Logo logoStyle="top" />
              </Link> */}
            </li>
            {/* 2. GNB메뉴 데이터 배열로 만들기 */}
            {menu.map((v, i) => (
              <li key={i}>
                {
                  // 하위 메뉴가 있으면 일반 a 요소에 출력
                  // 없으면 Link 라우팅 출력
                  v.sub ? (
                    <a href="#">{v.txt}</a>
                  ) : (
                    <Link to={v.link}>{v.txt}</Link>
                  )
                }
                {
                  // 서브 메뉴가 있으면 하위 그리기
                  v.sub && (
                    <div className="smenu">
                      <ol>
                        {v.sub.map((v, i) => (
                          <li key={i}>
                            <Link to={v.link}>{v.txt}</Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )
                }
              </li>
            ))}
            {/* 3. 검색, 회원 가입, 로그인 링크 */}
            <li
              style={{
                marginLeft: "auto",
                marginRight: "25px",
              }}
            >
              {/* 검색 입력 박스 */}
              <div className="searchingGnb">
                {/* 검색 버튼 돋보기 아이콘 */}
                <FontAwesomeIcon
                  icon={faSearch}
                  className="schbtnGnb"
                  title="Open search"
                  onClick={(e) => {
                    // 검색어 읽기
                    let stxt = e.currentTarget.nextElementSibling.value;
                    if (stxt.trim() != "") {
                      // 검색하기
                      goSearch(stxt);
                    } else {
                      // 검색어 비었을때 메시지
                      alert("Please enter a search term!");
                    }
                  }}
                />
                {/* 입력창 */}
                <input
                  type="text"
                  name="schinGnb"
                  id="schinGnb"
                  placeholder="Filter by Keyword"
                  onKeyUp={enterKey}
                />
              </div>
              {/* 검색 기능 링크 - 클릭시 검색창 보이기 */}
              <a href="#" onClick={showSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
            {
              /* 회원가입, 로그인 버튼 - 로그인 상태가 null일때 나옴 */
              loginSts === null && (
                <>
                  <li>
                    <Link to="/member">JOIN US</Link>
                  </li>
                  <li>
                    <Link to="/login">LOGIN</Link>
                  </li>
                </>
              )
            }
            {
              /* 로그인 상태이면 로그아웃 버튼 나옴 */
              loginSts !== null && (
                <>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        // 기본 이동 막끼
                        e.preventDefault();
                        // 로그아웃 처리 함수 호출
                        logoutFn();
                      }}
                    >
                      LOGOUT
                    </a>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </header>
    </>
  );
}); /////////// TopArea /////////////////////
