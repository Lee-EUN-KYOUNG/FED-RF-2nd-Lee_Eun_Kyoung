// 03.JSX 특성 알아보기

/***************************************************** 
    [ JSX란 무엇인가? ]
    - Javascript XML을 나타냄
    - 리액트에서 HTML을 쉽게 작성할 수 있다.
    - appendChild() 메서드 없이 DOM에 요소넣기가 가능함!
*****************************************************/

// 출력할 요소 선택
const target = document.querySelectorAll("#root>div");

// 1. JSX를 사용한 것과 JSX 사용하지 않은 것 비교
// (1) JSX 사용한 예
// (1-1) 넣을 요소 만들기
const myEle1 = <h1>나는 JSX를 사용한다.</h1>;
// (1-2) 리액트 루트 선택하기 : createRoot() 메서드 사용
const root1 = ReactDOM.createRoot(target[0]);
// (1-3) 요소 출력하기 ////
// 생성된 루트에 render() 메서드를 붙여서 사용
root1.render(myEle1);

// (2) JSX 사용하지 않는 예
// -> 넣을 요소를 createElement() 메서드로 생성한다
// createElement (요소명, {JS 코드 작성}, 요소 내용)
const myEle2 = React.createElement("h1", {}, "나는 JSX를 쓰지 않는다.");
// 두번째 div에 출력하기
ReactDOM.render(myEle2, target[1]);

/***************************************************** 
    [ 출력방식 정리! ]
    1. 한꺼번에 쓰기
    ReactDOM.render(출력할요소,대상요소)

    2. 따로쓰기
        1) 생성변수 = ReactDOM.createRoot(대상요소)
        2) 생성변수.render(출력할요소)

    _____________________________________________

    [ JSX 를 사용하거나 사용하지 않는 경우 ]
    -> 개발자의 선택사항이다!
    -> JSX는 ES6 기반의 자바스크립트 언어의 확장이며
    런타임시 일반 자바스크립트로 변환된다!

    ______________________________________________

    [ JSX 표현식 ]
    JSX를 사용하면 중괄호에 표현식을 작성할 수 있다
    {........ 표현식 ........}

    -> 표현식이란 어떤 값으로 이행하는 임의의 유효한 
    코드 단위를 말한다! 
    즉, 코드가 값으로 변환되는 JS코드를 표현식이라고 한다.

    ((개념이해))
    예컨데 삼항연산자는 그 자리에 값을 출력할 수 
    있으므로 표현식이지만
    if문은 코드 전개구문이고 값이 출력되는 코드가 아니므로
    표현식이 아니다. 또 어떤값을 할당하는 코드도 할당행위만
    있고 값출력이 없으므로 표현식이 아니다!
    함수 자체는 표현식이 아니지만 리턴코드를 가진 함수를
    호출하는 코드는 값을 찍어주기 때문에 표현식이다!

    참고: 
    표현식(Expression)과 대비되는 코드를 
    문장(Statement)이라고함

*****************************************************/

// 표현식 쓸 변수
let num1 = 1000,
  num2 = 7;

// 표현식에 사용할 리턴이 있는 함수
const retFn = () => `만만세`;


// 3. JSX 표현식 사용하기
const myEle3 = (
  <div>
    <h1>리액트는 {num1 * num2}번 사용해도 좋다</h1>
    <h1>리액트는 {num1==1000?"계속":"한번만"} 사용해도 좋다</h1>
    <h1>리액트는 {retFn()}</h1>
  </div>
);

// 세번째 div 출력하기
ReactDOM.render(myEle3, target[2]);
