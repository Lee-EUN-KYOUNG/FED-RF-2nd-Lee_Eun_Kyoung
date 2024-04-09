// JS4-2.객체연습_다국어 JS
// 나의 함수 불러오기
import myFn from './my_function.js';

// console.log(myFn);

// 제이슨 데이터 불러오기 assert 기존 / 최신 브라우저는 with로 통일 -> assert 썼는데 브라우저에서 에러 권고표시 나면 with로 바꿀것
import langData from './data_lang.json' with {type:'json'};
// console.log(langData);

// 1. 다국어 요구사항
// - 언어 선택박스에서 언어를 변경하면 코드에 맞게 다국어 데이터를 제이슨 파일에서 읽어와 본 페이지의 해당 데이터를 업데이트한다

// 2. 대상 선정
// 2-1. 이벤트 대상 : .sel
const selBox = myFn.qs('.sel');

// 2-2. 변경 대상 : #gnb a / #cont img / #info address

// (1) GNB 메뉴 #gnb a
const gnbList = myFn.qsa('#gnb a');
// (2) 메인 이미지 #cont img
const mainImg = myFn.qs('#cont img');
// (3) 하단 주소 #info address
const addrBox = myFn.qs('#info address');

// console.log(selBox,gnbList,mainImg,addrBox);

// 3. 이벤트 설정하기
// 이벤트 종류 : 선택 박스가 변경될때 발생하는 이벤트는? change
myFn.addEvt(selBox,'change',chgLang);

// 4. 함수 만들기
function chgLang(){

    // 선택된 option 의 value 속성값
    let optVal = this.value;
    
    // 읽어온 option의 value 값으로 다국어 객체값 매칭하기
    let selLang = langData[optVal];
    
    // 호출 및 값 확인
    console.log('변경',optVal,selLang);

    // 데이터 셋팅하기
    // GNB 셋팅하기
    gnbList.forEach((ele,idx)=>{
        ele.innerText = selLang['메뉴'][idx];
    }) //////////////// forEach

    // 메인 이미지 src 값 변경하기
    // 각 경로의 이미지명은 다국어 코드명으로 되어 있음
    mainImg.src = `images/${optVal}.jpg`;

    // 회사 데이터 셋팅하기
    addrBox.innerText = selLang['주소'];

} /////////////// chgLang 함수



