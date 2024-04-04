// 구체적인 데이터 구성 처리를 위한 JS - msgFormat.js


// 내용 메시지를 구성하는 함수

// 1. 선언적 함수를 만들고 아래쪽에서 export default 하기
/* function makeMessage(name,age){
return `

    나의 이름은 ${name}입니다.
    나이는 ${age}살입니다. 반갑습니다^^ㅎㅎ
    <br><br>

`;
} /////////////// makeMessage 함수 ////////////// */
////// 내보내기
// export default makeMessage;

/* 
// 2. 선언적 함수를 만들고 함수앞에서 export default 하기
// -> 선언적 함수 형태가 그대로 유지되어야함. 그러나 이름은 중요하지 않다

export default function makeMessage(name,age){
    return `
    
        나의 이름은 ${name}입니다.
        나이는 ${age}살입니다. 반갑습니다^^ㅎㅎ
        <br><br>
    
    `;
    } /////////////// makeMessage 함수 //////////////
 */


/* // 3. 익명 함수를 만들고 함수앞에서 export default 하기
// 내보내기할 때 함수 이름은 중요하지 않으므로 익명 함수로 내보내기해도 무관하다

export default function (name,age){
    return `
    
        나의 이름은 ${name}입니다.
        나이는 ${age}살입니다. 반갑습니다^^ㅎㅎ
        <br><br>
    
    `;
    } /////////////// makeMessage 함수 ////////////// */
    

// 4. 함수앞에서 export default 하기
// 내보내기할 때 함수 이름은 중요하지 않으므로 화살표 함수로 내보내기해도 무관하다
// 이때 화살표 함수는 리턴 키워드 생략이 가능할 경우 이를 생략함

export default (name,age) =>
    `
        나의 이름은 ${name}입니다.
        나이는 ${age}살입니다. 반갑습니다^^ㅎㅎ
        <br>
    `;
    