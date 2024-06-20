import React, { useState } from "react";

// 폰트 어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// CSS 불러오기
import "../../css/searching.scss";
/// 데이터 불러오기
import { catListData } from "../data/swiper_cat";
// 캐릭터 리스트 결과 컴포넌트
import SearchingCat from "./SearchingCat";

/////////////////////////////////////////////
function Searching({ kword }) {
  console.log("kword:", kword);
  console.log("data:", catListData);

  // 키워드에 따라 검색 결과가 달라지므로 
  // 핵심데이터인 검색어를  상태 관리 변수로 만든다
  // 초기값으로 전달 받은 검색어 변수를 넣어준다

/// 상태 관리 변수
// kword = 전달 받은 키워드
/// [1] 검색어 상태 관리 변수
  const [kw, setKw] = useState(kword);

  /// [2] 정렬 기준 상태 관리 변수
  const [sort,setSort] = useState("asc");

  // 값 : 오름차순 asc , 내림차순 desc

  
  // 검색어가 있는 데이터 필터하기
  // 변수 = 배열.filter(v=>{if(v.속성명.indexOf(검색어)!=-1)return true})
  //  ---> 결과는 검색어가 있는 경우 변수에 모아서 담아준다 (결과값도 배열, 결과가 없어도 빈 배열)
  // filte() 검색 결과는 항상 배열로 나옴
  const newList = catListData.filter((v) => {
    // 속성중 캐릭터 이름 중 검색 (v.cname)
    // 검색어는 모두 영어일 경우 소문자처리함
    // 문자열.indexOf(문자) 문자열 위치 번호 리턴함! -> 결과가 없으면 -1을 리턴함
    // -1이 아닐경우 true를 리턴하면 filter에서 변수에 저장할 배열로 수집된다

    let newVal = v.cname.toLocaleLowerCase();

    // 전달받은 키워드도 소문자처리
    // 상태 변수인 kw로 대체한다
    let key = kw.toLocaleLowerCase();

    // 문자열이 있는 값만 배열로 재수집
    if (newVal.indexOf(key) !== -1) return true;
  });
  
  //console.log("newList", newList);


  //////////////////////////////// 정렬 기능 추가 하기//////////////////////////////
  //////////////// (1) 오름차순
  if(sort == "asc"){
    newList.sort((a,b)=>
      a.cname > b.cname
      ? 1 : a.cname < b.cname
      ? -1 : 0
    );

  }

  //////////////// (2) 내림차순
  else if (sort == "desc"){
    newList.sort((a,b)=>
    a.cname > b.cname
    ? -1 : a.cname < b.cname
    ? 1 : 0
    );
  }


  // 코드 리턴구역 ////////////////////////
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션선택박스 */}
        <div className="schopt">
          {/* 1-1.검색박스 */}
          <div className="searching">
            {/* 검색버튼 돋보기 아이콘 */}
            <FontAwesomeIcon
              icon={faSearch}
              className="schbtn"
              title="Open search"
            />
            {/* 입력창 */}
            <input
              id="schin"
              type="text"
              placeholder="Filter by Keyword"
              defaultValue={kword}
              // 엔터키를 눌렀을때 검색실행
              // 검색어 상태변수만 업데이트하면 끝
              onKeyUp={(e)=>{
                if(e.key=="Enter") {
                  // 검색어 상태값 변경변경
                  setKw(e.target.value);
                  // 처음 검색시 정렬은 기본 정렬 오름차순(asc)
                  setSort("asc");
                  // 정렬 선택 박스 선택값 변경
                  document.querySelector("#sel").value = "asc";
                }
              }}
            />
          </div>
          {/* 1-2. 체크박스구역 */}
          <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2>
                  ALIGNMENT
                  <span className="spbtn">＋</span>
                </h2>
                {/* 체크박스리스트 */}
                <ol>
                  <li>
                    Heroes
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="hero" className="chkhdn" />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    It's Complicated
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="comp" className="chkhdn" />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                  <li>
                    Villains
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="villain" className="chkhdn" />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="villain" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        {/* 2. 결과리스트박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">BROWSE CHARACTERS</h2>
          {/* 2-2. 정렬선택박스 */}
          <aside className="sortbx">
            <select
            name="sel"
            id="sel"
            className="sel"
            // 값을 변경할때 이벤트 발생 
            onChange={(e)=>{
              console.log(e.target.value);
              // 정렬 기준 상태 변수 업데이트
              setSort(e.target.value);
            }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 : 
            데이터 상태변수 중 첫번째값만 보냄 */}
          <SearchingCat dt={newList} />
        </div>
      </section>
    </>
  );
}

export default Searching;
