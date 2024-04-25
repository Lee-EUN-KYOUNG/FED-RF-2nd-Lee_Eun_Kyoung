// 08. 재귀호출 JS - call_myself.js

import mFn from './my_function.js';

//초기 셋팅하기
// 대상 : .gbox
const gbox = mFn.qs(".gbox");

// 코드 변수
let hcode = "<ul>";

// for문으로 코드 만들기 : ul>li>img
for(let i = 1; i<=7; i++){

    hcode += `
        <li>
        <img src="./images/auto_scroll/m${i}.jpg" alt="갤러리이미지">
        </li>    
    `;
} ////////////// for 

hcode += "</ul>";

// 대상에 코드 넣기
gbox.innerHTML = hcode;

// 움직일 대상 : .gbox ul
let target = mFn.qsEl(gbox, 'ul');


// 기준값 업데이트 함수
const updateCriteria = () => window.innerWidth/4; ////////


// 기준값 (윈도우 가로폭의 1/4 -> li 하나 크기)
let criteria = updateCriteria();


// 리사이즈시 업데이트
mFn.addEvt(window, "resize",
()=>{criteria = updateCriteria();
    
    console.log('기준값업데이트:',criteria);

});

// 현재 translate 값
let currVal = 0;


//// 갤러리 박스를 왼쪽으로 계속 움직이게 하는 재귀호출 함수 만들기
function moveGallery(){
    // 현재값 1씩 감소
    target.style.translate = --currVal+"px";

    // 하나 크기 만큼 나가면 처리 -> 기준값을 마이너스로 하고 소수점 아래는 버림
    // Math.floor() 소수점 아래 내림(버림) 함수
    // == 보다는 <=로 해야 안전함
    if(currVal <= Math.floor(-criteria)){

        // 맨앞 li 맨뒤로 이동 -> appendChild(맨앞 li요소)
        target.appendChild(mFn.qsaEl(target,"li")[0]);
        // translate값 초기화
        target.style.translate = "0px";
        // 하나 크기 만큼 나가면 currVal값 초기화
        currVal = 0;
    } ///////////// if ////////////////
    
    // 재귀호출!(타임아웃함수로 호출함!)
    // stopSts 변수값이 false 일때만 실행하기
    if(!stopSts)
    setTimeout(moveGallery,10);

} ///////// moveGallery 함수 /////////////

// 대상에 마우스 오버시 멈추고 아웃시 다시 흘러가게 하기!
// 대상 : .gbox -> gbox 변수
// 멈춤 상태 변수
let stopSts = false;

// 멈추기
mFn.addEvt(gbox,"mouseenter",()=>{

    // 멈춤 상태변수 true로 변경
    stopSts = true;});

    // 흘러가기
    mFn.addEvt(gbox,"mouseleave",()=>{
    // 멈춤 상태 변수 false 변경
    stopSts = false;
    // 재귀함수호출
    moveGallery();

});


/* setTimeout(moveGallery,2000); */



/**********************************  프로그래스 바 퍼센트 증가하기 재귀호출 함수 만들기 ************************************************/

// 퍼센트증가 숫자변수
let percent = 0;

// 숫자 출력박스 : .pNum
const pNum = mFn.qs(".pNum");

// 퍼센트바 : .bar
const bar = mFn.qs(".bar");

// 글자 출력 박스 : .txt
const txt = mFn.qs(".txt");



increasePercent();



// 재귀호출 함수 만들기
function increasePercent (){

    // 1. pNum에 숫자 출력
    pNum.innerText = ++percent + "%";

    // 2. 퍼센트바 width 값 동시에 증가하기
    bar.style.width = percent +"%";

    // 3. 증가 숫자가 100보다 작을 때까지 계속 재귀호출함
    if(percent<100)
    {setTimeout(increasePercent, 60);}

    else{
        
        // 4. 재귀 호출이 끝나면 "준비" 글자를 "출발"로 변경
        txt.innerText = "출발";

        // 바 색 변경하기
        bar.style.backgroundColor = "red";

        // 5. 슬라이드 이동 함수 호출하기 (타임아웃 호출)
        moveGallery();


    } //////////// else

} /////////// increasePercent 함수 ///////////