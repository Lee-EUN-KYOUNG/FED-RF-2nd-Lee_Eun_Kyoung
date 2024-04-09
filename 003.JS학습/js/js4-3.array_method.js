// 배열의 메서드 활용 JS

// 나의 함수 호출
import mFn from "./my_function.js";

// 0. 기본정보 셋팅 //////////////////
// (1) 배열변수 선언과 할당
const fruit = ["배", "사과", "용과", "딸기"];

// (2) 과일명과 배경이미지명을 매칭함 -> 객체
const frObj = {
  배: "fruits_01",
  사과: "fruits_02",
  용과: "fruits_14",
  딸기: "fruits_09",
  두리안: "fruits_17",
  바나나: "fruits_15",
  수박: "fruits_12",
  파인애플: "fruits_13",
  망고: "fruits_24",
  오렌지: "fruits_03",
  체리: "fruits_05",
  멜론: "fruits_11",
  블루베리: "fruits_20",
  레몬: "fruits_04",
  산딸기: "fruits_25",
}; ////////// frObj 객체 /////

// 1. 요구사항 : 배열에 과일정보를 담아서 '과일주세요'버튼 클릭시
// 과일 이미지요소를 화면에 출력해준다!
// 배열구성을 수정, 삭제 등 배열 메서드로 변경할 수 있게 한다!

// 2. 대상선정 :
// 2-1. 이벤트 대상 : .mbtn (기능버튼들)
const mbtn = mFn.qsa(".mbtn");

// 2-2. 변경 대상 : .showit (배열정보출력) / .cont (과일출력박스)
const showit = mFn.qs(".showit");
const cont = mFn.qs(".cont");

// 2-3. 전체과일콤보박스 : #sel
const sel = mFn.qs("#sel");

// 2-4. 선택과일콤보박스(anum=array number) : #anum
const aNum = mFn.qs("#anum");

// 2-5. 지울개수입력창 : #delnum
const delNum = mFn.qs("#delnum");

// console.log('대상:', mbtn, showit, cont, sel, aNum, delNum);

// 3. 초기화 작업 : 처음 배열 출력 / 콤보 박스 바인딩

// 3-1. 처음 배열 출력
// 배열.join(구분자) : 배열값 사이에 구분자를 넣은 문자열값 변환
showit.innerText = fruit.join("♥");

// 3-2. 전체 과일 콤보 박스 바인딩
// 대상 : #sel -> sel 변수
// 데이터 : frObj 객체 -> 객체의 key를 배열로 변환함!
// Object.keys(객체) : 객체의 키(속성명)로 이루어진 배열
// 참고 : Object.values(객체) : 객체의 값(value)으로 이루어진 배열
// 변환 목적 : 배열 메서드를 사용하기 위해서

const arrFruits = Object.keys(frObj);
/* console.log('변환전 객체:',frObj);
console.log('변환후 키배열:',arrFruits);
console.log('변환후 값배열:',Object.values(frObj)); */

// 기존 배열값을 태그로 변환하여 대사 배열로 할당하기
// 배열.map((v,i,arr)=>리턴값) 메서드 : 기본 배열값을 순회하면 변환된 값을 다시 넣어줌
// 기존 forEach 메서드와 전달값이 같음 -> v 배열 / i 순선 / arr 전체 배열
// 새로운 배열은 새로운 변수에 할당한다
// map에 사용한 원본 배열은 보존된다
let newArr = arrFruits.map((v) => `<option>${v}</option>`);

// 화살표 함수에서 중괄호를 사용하면 return할 경우 return 키워드를 써줘야함!
// 따라서 중괄호 생략시 리턴 키워드 자동 생략 문법을 사용하면 간단히 표현할 수 있다.

// console.log('map변환후 배열값:',newArr);

// 배열을 순회하여 콤보 박스에 태그 넣기
// 그냥 배열을 할당하면 콤마가 사이에 들어감 -> join() 메서드로 사이값(콤마)을 없애서 넣어야 됨
// -> 빈 문자값 '' 넣으면 배열값으로만 구성된 태그 문자열이 완성됨!
sel.innerHTML = newArr.join("");

// 한번에 쓸 수도 있다
/* sel.innerHTML = Object.keys(frObj).map(v=>`<option>${v}</option>`).join(''); */

// 3-3. 선택 과일 콤보 박스 데이터 바인딩
// 대상 : #anum -> aNum 변수
// 데이터 : fruit 배열
// 갱신시 계속 재바인딩 되어야함 (함수화 필요)
aNum.innerHTML = fruit
  .map((v, i) => `<option value="${i}">${v}</option>`)
  .join("");

// 4. 이벤트 설정하기
mbtn.forEach((ele) => {
  mFn.addEvt(ele, "click", showFruit);
}); /////////// forEach

// 5. 함수 만들기
// 기능 : 배열을 조작하여 과일을 화면에 출력
function showFruit() {
  // 버튼 텍스트 읽기
  let btxt = this.innerText;

  /* console.log(btxt); */

  // 버튼별 기능 분기하기
  // (1) 과일 주세요 버튼 활성화 : 하단 과일 이미지 출력
  if (btxt === "과일주세요~!") {
    // 출력박스에 배열정보로 태그 넣기
    // 구조 : ul>li
    // 과일 배열만큼 돌면서 만들기
    let hcode = `<ul>`;
    fruit.forEach((v) => {
      hcode += `
            <li style="background:url(./addimg/${frObj[v]}.png) no-repeat center/cover">
                ${v}
            </li>
            `;
    }); ///////// forEach/////////
    hcode += `</ul>`;
    //// 출력 박스에 태그 넣기
    cont.innerHTML = hcode;
  } //////////////// if  ///////////////////////
} /////// showFruit 함수 /////////
