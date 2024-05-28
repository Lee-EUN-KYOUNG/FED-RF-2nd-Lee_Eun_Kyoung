// 산이름 타이틀 옆에 출력할 아이콘 이미지 생성 컴포넌트

// 산 아이콘 이미지 경로
const isrc = {
  에베레스트산: "https://cdn-icons-png.freepik.com/512/2036/2036196.png",
  백두산: "https://www.svgrepo.com/show/2207/mountain.svg",
  후지산:
    "https://icon2.cleanpng.com/20240109/ct/transparent-icon-mountain-snow-capped-peaks-bright-orange-sun-minimalist-image-of-mountain-sun-and-1710930048130.webp",
};

export default function MtIcon({ mtName }) {
  // 화면 랜더링 후 실행 구역 (DOM 생성 후)
  React.useEffect(() => {
    console.log("산 아이콘 랜더링");
    // 현재 컴포넌트가 제거될 경우 관리 구역
    return () => {
      console.log("산 아이콘 소멸");
      alert("후지산은 일본에 있다");
    }; ///////////// return 함수 구역
  }, []); ////////// 빈 배열 []은 컴포넌트 한번만 실행

  // 코드 리턴 구역
  return (
    <img
      src={isrc[mtName]}
      alt={mtName + " 아이콘"}
      style={{
        width: "100px",
        verticalAlign: "middle",
        marginLeft: "0 20px",
        borderRadius: "50%",
      }}
    />
  );
} ///////////////////// mtIcon 컴포넌트
