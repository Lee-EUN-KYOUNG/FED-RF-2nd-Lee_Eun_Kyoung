// 09. 중간 스크롤 가로이동 JS - dance.js

// 나의 함수 불러오기
import mFn from './my_function.js';

// [1] 태그 셋팅
// 1. 3번 스테이지에 ul>li 구조 이미지 넣기
// 대상 : .slidePg ( 스티키 박스)
const slidePg = mFn.qs('.slidePg');

// 2. 코드 변수에 태그 만들어 넣기
let hcode = "<ul>";

for(let i = 1; i<=7; i++){

    hcode += `
        <li>
            <img src="./images/dance/${i}.jpg" alt="dance image" />
        </li>
    `;


} /////////////// for ///////////

hcode += "</ul>";

// 3. 코드 출력하기
slidePg.innerHTML = hcode;

// [2] 3번째 영역에 도달한 경우 ul 박스 가로 방향 이동 하기

// 1. 대상 선정 하기
// 이벤트 대상 : window
// 이벤트 종류 : scroll
// 위치 기준 대상 : .tpg -> 스티키를 싸고 있는 부모 박스
const tpg = mFn.qs('.tpg');
// 움직일 대상 : .slidePg>ul
const target = mFn.qs('.slidePg>ul');
// 추가 대상 : .slidePg>ul>li
const eachList = mFn.qsaEl(target, 'li');

/* console.log(tpg,target,eachList); */

// 2. 이벤트 설정하기
mFn.addEvt(window, 'scroll', moveSlide);

// 3. 함수 만들기
// (1) 슬라이드 이동 함수
function moveSlide(){

    // 1. 스티키 부모 박스 바운딩 top값
    let bTop = mFn.getBCR(tpg);
    /* console.log('바운딩top:', bTop); */

    // 2. 이동할 타겟 박스 left 값으로 부모 바운딩 top값 넣기
    // (1) 바운딩 top값이 0 초과일때 처음 위치 재설정하기
    if(bTop > 0) {
        target.style.left = '0px';
    }
    // (2) 바운딩 top값이 0 이하 -3000 이상일때 부모 바운딩 top값으로 위치 이동하기

    else if(bTop <= 0 && bTop >= -3000) {
        target.style.left = bTop + 'px';
    }

    // (3) 마지막 한계 이후에는 한계값으로 셋팅
    else{
        target.style.left = '-3000px';
    }

    // 3. 개별 리스트 상하 이동 함수 호출하기
    // ele - 해당 리스트 li 자신
    // idx -  li 자신의 순번
    eachList.forEach((ele,idx)=>upDownFn(ele,idx));

} /////////////// moveSlide


// (2) 리스트 상하 이동 함수
function upDownFn (ele,idx) {
    
    // ele - 각 li 요소
    // idx - 각 li 순번

    // 1. 스티키 박스 하위 li가 기준 보이는 화면 left 기준선에 대한 위치값 바운딩left값을 이용하여
    // 자기 위치에서 위,아래로 이동하는 수치 변경하기
    let mVal = mFn.getBCR2(ele);
    

    // 2. 위치값을 양수로 만들어 윈도우 크기로 나눈 후 백분율하기
    // -> 수치가 크므로 2로 나누어주었음
    mVal = Math.abs(mVal/window.innerWidth)*100/5;
    
    /* console.log('바운딩 left:',mVal); */

    // 3. 들어온 li 순번이 짝수일 경우 마이너스 처리하기 
    // 짝수일 경우 마이너스를 곱하여 방향을 반대로 해준다
    // 짝수는 % 연산자 사용 : 숫자 %2 == 0 이면 짝수임

    if (idx%2==0) mVal = -mVal;
    //console.log("순번을 2로 나눈 나머지:", idx%2);

    // 4. 실제 위치 이동 CSS 적용하기
    ele.style.translate = `0 ${mVal}%`;
    
} //////////////// upDownFn /////////////

/////////////////////////////////////////////////////////////
// 메뉴 오버시 배경 박스 따라다니기 구현 ////////////

// 1. 대상 선정
// 이벤트 대상 : .gnb li
const gnbList = mFn.qsa(".gnb li");

// 변경 대상 : .mbg
const mbg = mFn.qs(".mbg");

// 2. 이벤트 설정하기
// 이벤트  종류 : mouseenter / mouseleave
gnbList.forEach(ele=>{

    mFn.addEvt(ele,"mouseenter",overFn);
    mFn.addEvt(ele,"mouseleave",outFn);

}); ////////// forEach

// 3. 함수 만들기
function overFn(){

    // 오버된 li에 left 위치값 읽기
    let posLeft = this.offsetLeft;
    let boxWidth = this.offsetWidth;
    // console.log("오버:",posLeft);
    
    mbg.style.opacity = 1;
    mbg.style.left = posLeft + 'px';
    mbg.style.width = boxWidth + 'px';


}  ////// overFn


function outFn(){

    // console.log("아웃:",this);
    mbg.style.opacity = 0;

}  ////// outFn