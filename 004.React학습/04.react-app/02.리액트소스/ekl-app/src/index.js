import React from 'react';
import ReactDOM from 'react-dom/client';
// 사스(sass) 패키지 설치했다면 바로 사스 사용 가능 - 확장자 생략 가능하나 여기에서는 써야함
import "./css/main.scss";


const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <>
  <h1><b>Hello,</b><span>world!</span></h1>
  </>

);

