// 전체 레이아웃 컴포넌트 ///

import { useState } from "react";
import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import TopArea from "./TopArea";

export default function Layout(){

    // 상태 관리 변수
    // 1. 로그인 상태 관리 변수
    // -> 초기값으로 로컬 스토리지 "minfo"를 할당함
    const [loginSts, setLoginSts] =useState();
    useState(localStorage.getItem("minfo"));
    
    // 2. 로그인 환영 메시지 상태 변수
    const [loginMsg, setLoginMsg] = useState(null);







    //// 코드 리턴구역 //////////////
    return(
        <>
           {/* 1.상단영역 */}
           <TopArea />
           {/* 2.메인영역 */}
           <MainArea />
           {/* 3.하단영역 */}
           <FooterArea />
        </>
    );

} /////////// Layout /////////////////////