// 메인 영역

///// 페이지 불러오기
import Fashion from "../pages/Fashion";
import MainCont from "../pages/MainCont";

//////////////////////////////////
function MainArea({ page }) {
  // page - 페이지 변경 문자값 전달
  // 5가지 값 : main, / glist / men / women / style
    console.log("메인전달페이지:",page);
  // 코드 리턴 구역
  return (
    <>
      {/* 조건 출력으로 페이지별 분기 */}
      {page == "main" && <MainCont />}
      {
      (page == "men" ||
      page == "women" ||
      page == "style")
      && <Fashion subCat={page}/>}
    </>
  );
}

export default MainArea;
