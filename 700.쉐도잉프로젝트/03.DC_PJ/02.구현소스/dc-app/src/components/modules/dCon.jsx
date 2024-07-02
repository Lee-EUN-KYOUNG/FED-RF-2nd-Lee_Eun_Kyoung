// 컨텍스트 API를 사용하기 위한 생성자

import { createContext } from "react";

// 사용하는 곳에서는 useContext(dCon)으로 사용!
// Root 컴포넌트인 Layout에서 컨텍스트 프로바이더를 셋팅해야 하위 컴포넌트에서 사용가능
export const dCon = createContext();