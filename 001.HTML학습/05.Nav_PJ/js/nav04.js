/* 유형4. 세로네비 서브별 드롭다운 세로형 JS - nav04.js */
// 세로네비 서브별 드롭다운 세로형

const myFn = {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  }; /////// domFn 객체 /////////////
  
  // 1. 구현요구사항:
  // 상위 메뉴 클릭시 하위 메뉴 나타나기
  // 영역을 벗어날때 하위메뉴 닫기
  
  // 2. 대상선정
  // 이벤트 대상: .gnb>ul>li
  const gnbList = myFn.qsa('.gnb>ul>li');
  // 변경 대상: .smenu -> 클릭된 이벤트 대상 하위요소
  // const smenu = myFn.qs('.smenu');

  // console.log('대상:',gnbList,smenu);

  // 3. 이벤트 설정하기
  gnbList.forEach(ele=>{

    // 클릭시 메뉴 열기 & 기타 서브 닫기
    myFn.addEvt(ele,'click',showMenu);
    
    // 마우스 떠날때 메뉴 닫기
    //myFn.addEvt(ele,'mouseleave',hideMenu);

  }); ////////////////// forEach //////////////////////////

/// 4. 함수 만들기
// 4-1. 서브 메뉴 보이기 함수
function showMenu(){
    // 1. 하위의 서브메뉴 가져오기 : 없으면 null
    let smenu = myFn.qsEl(this,'.smenu');
    // HTML 컬렉션 수집시 요소가 없으면 null값 처리함
    // null도 데이터형이다 if 문에서 false 처리됨
    // null의 뜻은 '빈값'
    
    // 함수호출
    console.log('보여줘 서브메뉴',this,smenu);

    // 2. 조건 분기 하기 : 서브가 있는 경우 높이값 만들기
    // 높이값은 하위의 ol 요소의 높이값을 읽어와서 .smenu에 height값으로 넣어준다
    if(smenu){

        // null이 아니면 true처리됨 -> .smenu가 null이 아닌 경우만 들어옴
        // 서브 메뉴 ol 요소 높이값 읽어오기
        let hval = myFn.qsEl(smenu,'ol').clientHeight;
        console.log('높이값:',hval);
        // clientHeight는 요소의 높이값

        // 높이값 적용하기
        // 대상 : .smenu -> smenu 변수
        smenu.style.height = (smenu.clientHeight ===0? hval : 0) + 'px';
        // 해석 : smenu 높이값이 0이냐? 맞으면 높이값 hval 적용, 아니면 0값 적용하여 열었다&닫았다를 가능하게 함

    } //////////// if : .smenu있는 경우 ////////////

    // 3. 서브 메뉴가 없는 상위 li가 클릭되도 모두 닫기 처리 

    // 기타 다른 서브 메뉴가 열렸다면 모두 닫아줌
    // gnb 상위 li를 모두 순회하기
    gnbList.forEach(ele=>{
        // ele - 각li요소
        // isSame()메서드 : 순회중 같은 노드 (요소)인지 판별해주는 기능을 가짐 (같으면 true)
        // -> 여기서 this키워드는 함수를 호출한 li다!

        // 현재 요소가 같은 요소인지 판별하기
        let isSame = ele.isSameNode(this);
        // console.log('서브닫기체크:',ele,isSame);


        // 같은 요소가 아닌 경우만 하위 .smenu 가져옴
        if(!isSame){
            // !(not연산자)로 false일때 ture 가져옴
            let smenu = myFn.qsEl(ele,'.smenu');
            if(smenu){
                // 서브 메뉴가 있는 경우
                // 서브 메뉴의 높이값이 0이 아닌경우
                if(smenu.clientHeight !=0){
                    console.log('0만들어!');
                    smenu.style.height = '0px';
                } /////// if ///

            } //// if ///

        } //////////// if  ////////////

    }); /////////// forEach ////////

} ///////////// showMenu //////////////////////////

// 4. 서브메뉴 숨기기 함수
function hideMenu(){

    // 1. 하위의 서브메뉴 가져오기 : 없으면 null
    let smenu = myFn.qsEl(this,'.smenu');

    console.log('메뉴숨겨');

    // 2. 분기 하기
    if(smenu){
        // 서브가 있는 경우 높이값 0
        if(smenu.clientHeight !=0){
            console.log('0만들어!');
            smenu.style.height = '0px';
        } 
    } ///////////// if /////////////


}  /////////////////// hideMenu //////////////////