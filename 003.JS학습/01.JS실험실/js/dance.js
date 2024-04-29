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

/* console.log(tpg,target); */
// 2. 이벤트 설정하기
mFn.addEvt(window, 'scroll', moveSlide);

// 3. 함수 만들기
function moveSlide(){

    // 1. 스티키 부모 박스 바운딩 top값
    let bTop = mFn.getBCR(tpg);
    console.log('바운딩top:', bTop);

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

} /////////////// moveSlide