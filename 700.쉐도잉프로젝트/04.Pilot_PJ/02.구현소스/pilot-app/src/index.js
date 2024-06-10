import React from 'react';
import ReactDom, { createRoot } from 'react-dom/client';

function MainComponent(props) {
  return (
    <div>
      <h1>파일럿 PJ</h1>
    </div>
  );
}


// 출력하기
const root = createRoot(document.querySelector('#root'));
root.render(<MainComponent />);