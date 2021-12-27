/** String 자료형
--------------------------------
문자열 자료형이다.
" 과 ' 를 동일하게 취급힌다.
` (벡틱)을 지원하여 template literal을 지원한다.
--------------------------------  
**/

// " 과 ' 를 동일하게 취급힌다.
// 만일 '로 쌓여진 문자열에서 '를 출력하고 싶으면 \을 붙여 사용한다.
const str1 = "Just Do it";
const str2 = "Just don't do it";
const str3 = 'Just don\'t do it';


// ` (벡틱)을 사용하면 선언된 변수를 활용할 수 있다.
const myName = "최영재";
const strr = "안녕하세요" + myName + "입니다";
const backtickStr = `안녕하세요 ${myName}입니다`;