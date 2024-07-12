// 상단영역
import React from "react";

// 메뉴 데이터 불러오기
import { gnbData } from "../../js/data/gnb";
import { TotalMenu } from "../modules/TotalMenu";

// 제이쿼리
import $ from "jquery";

function TopArea({pgName}) {
  // pgName - 이동할 페이지 이름
  
  // 전체 메뉴 열기닫기 함수 /////////
  const showHideMenu = (e) => {
    //console.log(e.currentTarget);
    // 전체 메뉴 대상 : .mbox
    $(".mbox").fadeToggle(300);
    // fadeIn(); - 서서히 나타남
    // fadeOut(); - 서서히 사라짐
    // fadeToggle(); - 서서히 나타남/사라짐 전환함

    // 햄버거 버튼에 클래스 "on" 넣기/빼기
    // addClass - 클래스 넣기
    // removeClass - 클래스 빼기
    // toggleClass - 클래스넣기/빼기

    $(e.currentTarget).toggleClass("on");

    //console.log($(e.currentTarget).is(".on"));

    // 비디오 플레이 재생 /멈춤 하기
    // 대상 : .bgm
    let bgm = $(".bgm");

    // 제이쿼리 미디어를 선택 후 실제 사용할때는 get(0)하고 난후 사용한다
    // 햄버거 버튼에 클래스 "on" 있으면 재생, 없으면 멈춤
    $(e.currentTarget).is(".on") ? bgm.get(0).play() : bgm.get(0).pause();

    //js에서는 선택후 바로 play(), pause() 사용함
    // document.querySelector(".bgm").play();
    // document.querySelector(".bgm").pause();
  }; ////// showHideMenu ////////////

  ////// 코드 리턴 구역
  return (
    <>
      <div id="top-area">
        <header className="top-area ibx">
          <h1 id="logo">
            <a href="#">
              <img src={process.env.PUBLIC_URL+"/images/main_logo.png"} alt="파일럿로고" />
            </a>
          </h1>
          <nav className="gnb">
            <ul>
              <li className="bld">배너순번 li 숨기기</li>
              {gnbData[pgName].map((v, i) => (
                <li key={i}>
                  <a href="#">{v}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ham" onClick={showHideMenu}>
            <span></span> <span></span> <span></span>
          </div>
          {/* 전체메뉴 컴포넌트 */}
          <TotalMenu />
        </header>
      </div>
    </>
  );
}

export default TopArea;
