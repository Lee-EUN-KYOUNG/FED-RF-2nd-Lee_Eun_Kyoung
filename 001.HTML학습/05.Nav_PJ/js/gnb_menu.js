// 네비게이션 유형6 JS - nav06.js
// 가로네비 서브별 드롭다운 전체창

/************************************************** 모둘 불러오기 구역 **************************************************/


// 나의 함수 불러오기
import mFn from "./my_function.js";

// GNB 데이터 불러오기
import mdata from "./mdata.js";

console.log(mdata);

/***************************************************** 기능 구현 파트 *****************************************************/
export default function makeMenu(target) {
  // target - 메뉴 구현 대상 박스
  console.log("오", target);

    // 대상요소에 메뉴 태그 넣기
    target.innerHTML = `
    <ul>
    ${
        /// mdata는 객체이므로 객체키만 모아서 배열로 만들고 map() 메서드를 순회하여 코드를 반복 생성함
        // Object.keys(객체).map().join("")
        Object.keys(mdata).map(v=>`        
        <li>
            <a href="#">${v}</a>
        <div class="smenu">
            <aside class="smbx">
                <h2>
                <div class="stit">${v}</div>
                    <a href="#">전체보기</a>
                </h2>
            <div class="swrap">
                <!-- 2차메뉴 dl생성 -->
                ${
                    // mdata[키배열값=v]
                    // 이 데이터는 객체이므로 map()을 쓰기위해 또 키배열로 뽑아낸다.
                    Object.keys(mdata[v])
                    .map(v2=>`
                    <dl>
                        <dt>${v2}</dt>
                        <!-- 3차메뉴 dd생성 -->
                        ${
                            // mdata[v][v2] -> 3차 배열
                            mdata[v][v2].map(v3=>`
                            <dd>
                                <a href="#">${v3}</a>
                            </dd>
                            `).join('')
                        }
                    </dl>
                    `).join('')
                }
            </div>
            </aside>
        </div>
        </li>
        `).join('')
    }
    </ul>
    `;

    /***************************************************************************************** 
    
            [상위 메뉴 li에 오버시 하위 메뉴 보이기]
            이벤트 대상 : .gnb ul li
            변경 대상 : .gnb ul li > .smenu
            읽어올 높이값 대상 : .smenu < .smbx
            
    *****************************************************************************************/

    // 이벤트 대상
    const gnb = mFn.qsa(".gnb ul li");

    // 이벤트 설정 및 함수 구현
    gnb.forEach(ele=>{

    // 마우스 오버시    
    mFn.addEvt(ele,"mouseenter",(e)=>{

        // 이벤트 대상
        let tg = e.currentTarget;
        console.log("오버시",tg);

        // 하위중 .smbx의 높이값을 읽어서
        // .smenu의 높이값을 변경한다
        mFn.qsEl(tg,".smenu").style.height =
        mFn.qsEl(tg,".smbx").offsetHeight+30 + "px";

    }); //////////////// mouseenter



    // 마우스 아웃시
    mFn.addEvt(ele,"mouseleave",(e)=>{
        let tg = e.currentTarget;
        console.log("아웃시",tg);

        //높이값 0 만들기
        mFn.qsEl(tg,".smenu").style.height = "0";

    }); ///////////// mouseleave

    }); /////////// forEach





} /////////// makeMenu 함수 ////////////////
