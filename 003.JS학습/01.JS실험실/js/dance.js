// 09. 중간 스크롤 가로이동 JS - dance.js

// 나의 함수 불러오기
import mFn from './my_function.js';

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