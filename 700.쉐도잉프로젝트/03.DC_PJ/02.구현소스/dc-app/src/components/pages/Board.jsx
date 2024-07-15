// 오피니언 페이지 컴포넌트 ///

// 사용자 기본 정보 생성 함수 불러오기
import { initData } from "../func/mem_fn";
import { initBoardData } from "../func/board_fn";
import { Fragment, useContext, useRef, useState } from "react";
import { dCon } from "../modules/dCon";

// 로컬스토리지 게시판 기본 데이터 제이슨
//import baseData from "../data/board.json";

// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면 된다!
// 제이슨 파일 처리는 다르므로 확장자는 반드시 쓸것

// 제이쿼리 불러오기
import $ from "jquery";

// 게시판용 CSS 불러오기
import "../../css/board.scss";
import "../../css/board_file.scss";

export default function Board() {
  // 컨텍스트 사용하기
  const myCon = useContext(dCon);
  // 전역 로그인 상태 변수 확인하기
  const sts = myCon.loginSts;
  //console.log("로그인상태:", sts);

  // 로컬 스토리지 게시판 데이터 정보 확인
  initBoardData();

  // 로컬스 데이터 변수 할당하기
  const baseData = JSON.parse(localStorage.getItem("board-data"));

  // [상태 관리 변수]
  // 페이지 번호
  const [pageNum, setPageNum] = useState(1);

  // 기능모드
  const [mode, setMode] = useState("L");

  // [참조 변수]
  // 전체 갯수 - 매번 계산하지 않도록 참조 변수로
  const totalCount = useRef(baseData.length);
  //console.log("전체개수 :", totalCount);

  // 선택 데이터 저장
  const selRecord = useRef(null);
  // -> 특정 리스트 글 제목 클릭시 데이터 저장

  // 페이지당 갯수
  const unitSize = 8;

  /// 함수명 : bindList
  /// 기능 : 페이지별 리스트를 생성하여 바인딩함

  const bindList = () => {
    //console.log(baseData);

    // 전체 데이터 선택
    const orgData = baseData;

    // 정렬 적용하기 : 내림차순
    orgData.sort((a, b) =>
      Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
    );

    // 일부 데이터만 선택
    // 예시로 0번부터 9번까지만 선택 - 검증 완료
    // 한페이지당 10개라면 페이지 번호와 연관시켜본다

    // -> 시작번호 = (페이지번호-1)*한페이지당 단위수
    let sNum = (pageNum - 1) * unitSize;

    // -> 끝번호 = 페이지번호*페이지당 단위수
    let eNum = pageNum * unitSize;

    //console.log("첫번호:",sNum,"끝번호:",eNum);

    // 결과 배열
    const selData = [];

    // for문으로 배열 만들기
    for (let i = sNum; i < eNum; i++) {
      //console.log(i);
      // 끝번호가 전체 갯수보다 크면 나가라!
      if (i >= totalCount.current) break;
      // 대상 배열값 추가
      selData.push(orgData[i]);
    } ////////////// for문

    //console.log("일부데이터:", selData);

    return selData.map((v, i) => (
      <tr key={i}>
        {/* 시작번호를 더하여 페이지별 순번을 변경 */}
        <td>{i + 1 + sNum}</td>
        <td>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // 읽기 모드로 변경
              setMode("R");
              // 해당 데이터 저장하기
              selRecord.current = v;
            }}
          >
            {v.tit}
          </a>
        </td>
        <td>{v.unm}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; ////////////bindList 함수

  //////// 함수명 : pagingList
  //////// 기능 : 게시판 리스트의 페이징 기능 목록

  const pagingList = () => {
    // 전체 페이징 갯수 : 전체 레코드수 / 한 페이지당 갯수
    // 유의점 : 나머지가 있는지 검사해서 있으면 +1

    // 1. 페이징 갯수
    let pagingCount = Math.floor(totalCount.current / unitSize);

    // 나머지가 있으면 다음 페이지가 필요함
    // 나머지가 0이 아니면 1 더하기
    if (totalCount.current % unitSize > 0) {
      pagingCount++;
    }

    //console.log(
    //  "페이징갯수:",
    //  pagingCount,
    //  "나머지연산결과:",
    //  totalCount.current % unitSize
    //);

    // 링크 코드 만들기
    const pgCode = [];

    // 1부터 페이지 끝번호까지 돌면서 코드 만들기
    for (let i = 1; i <= pagingCount; i++) {
      pgCode.push(
        <Fragment key={i}>
          {/* 페이징 번호와 현재 페이지 번호 일치시 b태그 */}
          {i === pageNum ? (
            <b>{i}</b>
          ) : (
            // 불일치시에는 모두 링크 코드
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPageNum(i);
              }}
            >
              {i}
            </a>
          )}
          {/* 사이에 | 넣기 */}
          {i !== pagingCount && "  |"}
        </Fragment>
      );
    }

    // 코드 리턴
    return pgCode;
  }; ////////// pagingList 함수

  /// 버튼 클릭시 변경함수
  const clickButton = (e) => {
    // 버튼 글자 읽기
    let btnText = e.target.innerText;
    //console.log(btnText);

    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "Write":
        setMode("W");
        break;
      // 리스트 모드로 변경
      case "List":
        setMode("L");
        break;
      // 글쓰기 모드일 경우 함수 호출
      case "Submit":
        submitFn();
        break;
      // 수정일 경우 수정 모드로 변경
      case "Modify":
        setMode("M");
        break;
    }
  }; //////////////////////////////////////

  ////////// 서브및 처리 함수
  const submitFn = () => {
    // 제목 입력 항목
    let title = $(".subject").val().trim();
    //console.log("제목:", title);

    // 내용 입력 항목
    let cont = $(".content").val().trim();
    //console.log("내용:", cont);
    // trim()으로 앞뒤공백 제거후 검사

    // 1. 공통 유효성 검사
    // 제목, 내용 모두 비었으면 리턴
    if (title == "" || cont == "") {
      alert("Insert title or content!");
      return; // 서브밋 없이 함수 나가기
    }

    // 2. 글쓰기 서브밋 (mode == "w")

    if (mode == "W") {
      // 현재 로그인 사용자 정보 파싱하기
      let person = JSON.parse(sts);

      // 오늘날짜
      let today = new Date();
      // yy-mm-dd 형식으로 구하기 (제이슨 형식으로 : toJSON())
      // 또는 ISO 표준 형식 : toISOString()
      // 시간까지 나오므로 앞에 10자리만 가져감 : 문자열.substr(0,10)

      // 글번호 만들기
      // 전체 데이터중 idx만 모아서 배열 만들기

      let arrIdx = baseData.map((v) => parseInt(v.idx));

      // 최대값 찾기 : 스프레드 연산자로 배열값만 넣음
      let maxNum = Math.max(...arrIdx);

      console.log(maxNum);

      let data = {
        idx: maxNum + 1,
        tit: title,
        cont: cont,
        att: "",
        date: today.toJSON().substr(0, 10),
        uid: person.uid,
        unm: person.unm,
        cnt: "0",
      };
      console.log("글쓰기 서브밋:", data);

      // 로컬쓰에 입력하기
      // 1. 로컬스 파싱
      let locals = localStorage.getItem("board-data");
      locals = JSON.parse(locals);

      // 2. 파싱 배열에 푸쉬
      locals.push(data);

      // 3. 새 배열을 문자화하여 로컬쓰에 넣기
      localStorage.setItem("board-data", JSON.stringify(locals));

      //console.log("로컬쓰:", localStorage.getItem("board-data"));

      // 리스트 돌아가기 -> 모드 변경
      setMode("L");
    }

    // 3. 수정 모드 서브밋 (mode == "M")
  }; ////////////////////////

  /////////////////////////////////// 코드 리턴구역 /////////////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      {
        // 1. 리스트 모드일 경우 리스트 출력하기
        mode == "L" && <ListeMode bindList={bindList} pagingList={pagingList} />
      }
      {
        // 2. 읽기 모드일 경우 상세보기 출력하기
        mode == "R" && <ReadMode selRecord={selRecord} />
      }
      {
        // 3. 쓰기 모드일 경우 로그인 정보 보내기
        /// sts값은 문자열이므로 파싱하여 객체로 보냄
        mode == "W" && <WriteMode sts={JSON.parse(sts)} />
      }
      {
        // 4. 수정 모드일 경우 상세보기 출력하기
        mode == "M" && <ModifyMode selRecord={selRecord} />
      }
      <br />
      {/* 모드별 버튼 출력 박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                // 1. 글쓰기 버튼은 로그인 상태이고 L이면 출력
                mode == "L" && sts && (
                  <button onClick={clickButton}>Write</button>
                )
              }
              {
                // 2. 읽기 상태 "R" 상태일 경우
                <>
                {mode == "R" && <button onClick={clickButton}>List</button>}
                {/* 
                로그인한 상태이고 글쓴이와 일치할때
                수정보드 이동버튼이 노출됨 
                현재 글은 selRecord 참조 변수에 저장됨
                글 정보 항목 중 uid가 사용자 아이디임!
                로그인 상태 정보 하위의 sts.uid와 비교함
                */}
               { console.log("비교:",JSON.parse(sts).uid,"==?", selRecord.current)}
                {
                (mode == "R" && sts &&
                JSON.parse(sts).uid == selRecord.current.uid) && 
                <button onClick={clickButton}>Modify</button>}
                </>
              }

             {
                // 3. 쓰기상태 "W" 일 경우
                mode == "W" && 
                <>
                <button onClick={clickButton}>
                  Submit
                </button>
                <button onClick={clickButton}>
                  List
                </button>
                </>
              }
              {
                // 4. 수정 상태 "M" 일 경우
                mode == "M" && 
                <>
                <button onClick={clickButton}>
                  Submit
                </button>
                <button onClick={clickButton}>
                  Delete
                </button>
                <button onClick={clickButton}>
                  List
                </button>
                </>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
} /////////// Board /////////////////////

/**************************************************************************************** 
                                  리스트 모드 서브 컴포넌트
****************************************************************************************/

const ListeMode = ({ bindList, pagingList }) => {
  return (
    <>
      <div className="selbx">
        <select name="cta" id="cta" className="cta">
          <option value="tit">Title</option>
          <option value="cont">Contents</option>
          <option value="unm">Writer</option>
        </select>
        <select name="sel" id="sel" className="sel">
          <option value="0">Descending</option>
          <option value="1">Ascending</option>
        </select>
        <input id="stxt" type="text" maxLength="50" />
        <button className="sbtn">Search</button>
      </div>
      <table className="dtbl" id="board">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>{bindList()}</tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="paging">
              {pagingList()}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

/**************************************************************************************** 
                                  읽기 모드 서브 컴포넌트
****************************************************************************************/

const ReadMode = ({ selRecord }) => {
  // 읽기 모드가 호출되었다는 것은 리스트의 제목이 클릭되었다는 것을 의미
  // 현재 레코드값도 저장되었다는 의미
  //console.log("전달된 참조변수",selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Read</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                value={data.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                readOnly
                value={data.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                readOnly
                value={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ReadMode //////////////////

/****************************************** 
        쓰기 모드 서브 컴포넌트
******************************************/
const WriteMode = ({ sts }) => {
  // sts - 로그인 상태정보
  // 로그인한 사람만 글쓰기 가능!
  console.log(sts);

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Write</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                // 로그인한 사람이름
                value={sts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="text"
                className="email"
                size="40"
                readOnly
                // 로그인한 사람이메일
                value={sts.eml}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input type="text" className="subject" size="60" />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea className="content" cols="60" rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// WriteMode //////////////////


/****************************************** 
        수정 모드 서브 컴포넌트
******************************************/
const ModifyMode = ({ selRecord }) => {
  // 수정 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Modify</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                value={data.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                defaultValue={data.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                defaultValue={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ModifyMode //////////////////