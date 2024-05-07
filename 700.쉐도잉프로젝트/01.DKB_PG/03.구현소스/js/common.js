// 공통처리 JS - common.js

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 공통 처리 함수 불러오기
import comData from "../data/common_data.js";

// 모듈로 호출된 JS에서는 다른 외부 JS를 import로 호출 가능
// import 하려는 파일에서 반드시 함수, 변수 등을 export 해야함
import slideFn from "./slide.js";
// GNB 메뉴 데이터 불러오기
import gnbData from "../data/gnb_data.js";
// 콤보 박스 데이터 불러오기
import comboData from "../data/combo_data.js";

//console.log(comboData);

export default function setElement() {
  // 대상 선정 : #top-area, #ban-area, #spart-menu, #footer-area

  const topArea = mFn.qs("#top-area");
  const banArea = mFn.qs("#ban-area");
  const spartMenu = mFn.qs("#spart-menu");
  const footerArea = mFn.qs("#footer-area");

  // 호출하기
  topArea.innerHTML = comData.topArea;
  banArea.innerHTML = comData.banArea;
  spartMenu.innerHTML = comData.spartMenu;
  footerArea.innerHTML = comData.footerArea;

  // 기능 처리 함수 호출하기

  // GNB 메뉴 만들기 함수 호출
  makeMenu();

  /// slideFn 슬라이드 기능 함수 호출
  slideFn();

  // 하단 콤보 박스 바인딩 함수 호출
  bindCombo();

} //////////// setElement 함수


// GNB 메뉴 코드 만들기 함수
function makeMenu(){

  // GNB 메뉴 코드 넣기
  // 대상 : .gnb
  // 데이터 : gnbData 는 객체이므로 배열용 map() 매서드 사용 불가
  // -> 키 배열로 변환해서 사용함. 이 객체의 key는 상위 메뉴이기도함
  // Object.keys(객체) -> 해당 객체의 속성명(키) 배열생성

  //console.log(Object.keys(gnbData));

  mFn.qs(".gnb").innerHTML = `
<ul>
  ${Object.keys(gnbData)
    .map(
      (v) => `
    <li>
      <a href="#">${v}</a>
      ${
        // 서브 메뉴 "없음" 이면 빈값. 아니면 서브 메뉴 출력
        // gnbData[키] -> 값을 가져옴
        gnbData[v] == "없음"
          ? ""
          : `
        <!-- 서브메뉴 -->
      <div class="smenu">
        <div class="swrap">
          <h2>${v}</h2>
          <ol>
          ${gnbData[v]
            .map(
              (vSub) => `
            <li>
              <a href="#">${vSub}</a>
            </li>
            `
            )
            .join("")}
          </ol>
        </div>
      </div>
        `
      }
    </li>
    `
    )
    .join("")}
</ul>
`;

} /////// makeMenu 함수 //////////

//////// 콤보박스 바인딩 함수 //////////////
function bindCombo(){

  // 1. 대상 선정 : #brand, #corp
  const brandBox = document.querySelector("#brand");
  const corpBox = document.querySelector("#corp");
  // console.log("콤보바인딩:",brandBox,corpBox);

  //  2. 데이터 바인딩하기
  //  2-1. 브랜드 바로가기 콤보 박스 : 단순 바인딩 (option만)

  // 데이터 대상 : ComboData.brand

  // 대상 요소 내부 데이터 넣기
  // 배열 데이터.map().join('');
  brandBox.innerHTML = comboData.brand.map((v,i)=>`
    <option value="brand${i}">${v}</option>
  `).join('');
  
  // 2-2. 계열사 바로가기
  // -> 복합 바인딩 : optgroup > option 
  // 데이터 분석 :  객체로 된 데이터이므로 map()을 쓰려면 객체의 키(key)를 배열로 추출하여 사용한다
  // object.keys(객체) -> key 배열
  // 객체의 값을 사용할 경우는 원본 객체 [키]



  // 데이터 대상 : ComboData.corp
  const corpData = Object.keys(comboData.corp);
  console.log(corpData);

  // 데이터 만들어서 넣기
  corpBox.innerHTML =
  corpData.map((v,i)=>`
  <optgroup label="${v}">
  ${

    // 해당 객체의 값은 키 배열값과 매칭함
    // ov 변수는 객체가 가지는 배열값임
    comboData.corp[v].map((ov,oi) => `
      <option value="corp${i+1}-${oi+1}">${ov}</option>    
    `).join('')
  }
  </optgroup>
  `).join('');



} //////////// bindCombo