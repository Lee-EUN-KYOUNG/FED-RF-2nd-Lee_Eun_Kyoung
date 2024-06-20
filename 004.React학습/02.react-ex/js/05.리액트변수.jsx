// 05.리액트변수 : useRef

/******************************************************** 
☑️ useRef : 리액트 후크 참조 변수
1. 특정 DOM 선택할때 주로 쓰이며 
.current 프로퍼티로 전달된 인자로 
초기화된 변경 가능한 ref 객체를 반환한다. 

-> 예) <참조할요소/컴포넌트 ref="useRef사용변수명" .../>
-> ref속성에 값으로 설정된 useRef변수를 써준다!
이변수에 담긴 요소를 사용할 수 있다! -> 변수명.current
-> current를 써야하는 이유 : useref 컴포넌트 객체에서 이 변수를 관리해주고
값을 유지 업데이트하는데 사용하는 속성으로 current를 사용하도록 지정함

2. 그밖에 컴포넌트가 리랜더링 되어도 변경되어서는
안되는 변수의 값이 있다면 useRef를 사용하여 일정값을 유지함!

반환된 객체는 컴포넌트의 전 생애주기를 통해 유지된다.

const myRef = useRef(null);
********************************************************/

// 컴포넌트 외부 일반 변수
// -> 전역 변수 역할을 하지만 컴포넌트가 여러개 사용될때
// 이 변수를 업데이트하면 여러가지 프로그래밍이 꼬인다
// 그러므로 절대 변경되는 변수를 바깥쪽에 쓰지 않는다
// 변경되지 않는 데이터 ocnst 변수나 공유하는 함수 등은 컴포넌트 바깥에 코딩 가능

let what = "난뭐임?";

// 메인 컴포넌트
function MainComp() {
  console.log("컴포넌트 랜더링");

  // 이름 상태관리 변수 :
  // (1) 변경된 값을 컴포넌트 소멸전까지 유지됨
  // (2) 변수값 변경시 리랜더링 됨
  // (3) 값 변경시 반영은 useEffect 구역에서 확인됨
  // -> 실제 DOM에 반영할 때 변경값이 업데이트 되는 시점임

  const [stsName, setStsName] = React.useState("공유");

  // 컴포넌트 내부 일반 변수
  // -> 컴포넌트가 리랜더링될때 다시 초기화 됨
  let varName = "김수현";

  // 리액트 참조 변수
    // (1) 변경된 값을 컴포넌트 소멸전까지 유지됨
  // (2) 변수값 변경시 리랜더링 되지 않음
  const refName = React.useRef("송새벽");



  /////////////// 컴포넌트 화면 랜더링 실행 구역
  React.useEffect(() => {

    /// 일반 변수와 참조 변수가 화면에 반영되게 함
    let ele = document.querySelectorAll(".name");
    ele[1].innerText = varName;
    ele[2].innerText = refName.current;

    console.log("useState랜더링:", stsName);
  });

  // 이름바꾸기 함수
  const changeName = (e) => {
    // 대상 버튼 텍스트 읽기
    let txt = e.target.innerText;

    // 앞의 형제요소인 input의 입력값 읽기
    let val = e.target.previousElementSibling.value;

    // 버튼별 분기
    switch (txt) {
      // 상태 변수 업데이트
      case "이름바꿔 : useState":
        console.log("useState변경전:", stsName);
        setStsName(val);
        console.log("useState변경후:", stsName);
        break;
      // 컴포넌트 내부 일반 변수 업데이트
      case "이름바꿔 : let":
        console.log("let변경전:", varName);
        varName = val;
        console.log("let변경후:", varName);
        break;
      // 참조 변수 업데이트
      case "이름바꿔 : useRef":
        console.log("useRef변경전:", refName.current);
        refName.current = val;
        console.log("useRef변경후:", refName.current);
        break;
      // 외부 변수 업데이트
      case "이름바꿔 : outside":
        console.log("outside변경전:", what);
        what = val;
        console.log("outside변경후:", what);
        break;
    }
  };

  // 코드리턴 /////////////////
  return (
    <React.Fragment>
      <h1>[ 🚩useRef 변수사용하기🚩 ]</h1>
      <div className="wrap">
        <div>
          <h1>
            1. useState 출력
            <br />
            <b>
              나는 <span className="name">{stsName}</span> 좋아해!
            </b>
          </h1>
          <h1>
            3. useRef 출력
            <br />
            나는 <span className="name">{refName.current}</span> 좋아해!
          </h1>
          <h1>
            4. 바깥 let 출력
            <br />
            나는 <span className="name">{what}</span> 좋아해!
          </h1>
        </div>
        <div>
          <h2>1. useState 이름변경</h2>
          <input type="text" className="ip-name1" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : useState</button> <br />
          <h2>2. let 이름변경</h2>
          <input type="text" className="ip-name2" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : let</button> <br />
          <h2>3. useRef 이름변경</h2>
          <input type="text" className="ip-name3" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : useRef</button>
          <h2>4. 바깥let 이름변경</h2>
          <input type="text" className="ip-name3" /> &nbsp;
          <button onClick={changeName}>이름바꿔 : outside</button>
        </div>
      </div>
    </React.Fragment>
  );
} ///////////// MainComp 컴포넌트 ////////////

// 컴포넌트 출력하기 ///////
ReactDOM.render(<MainComp />, document.querySelector("#root"));
