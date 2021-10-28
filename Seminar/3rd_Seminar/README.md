# 3rd Seminar

![image](https://user-images.githubusercontent.com/49263163/139227038-8e9fd8f8-04d8-47b7-9e21-c8c5efa25583.png)

# 1. HTTP

## 1) HTTP란?

- 하이퍼미디어 문서를 주고받을 수 있는 프로토콜
- Stateless Protocol (무상태 프로토콜) : 서버가 두 요청 간에 어떠한 데이터(상태)도 유지하지 않음 
  -> 모든 요청이 상호 독립적이다

## 2) Status Code

| 응답 코드 |       표시 상태       |                 의미                 |
| :-------: | :-------------------: | :----------------------------------: |
|    200    |          OK           |                 성공                 |
|    204    |      No Content       |  성공. 전달해줄 응답 데이터는 없음   |
|    304    |     Not Modified      | 캐시 목적. 요청 후 수정된 것이 없음. |
|    400    |      Bad Request      |     서버가 요청을 이해하지 못함      |
|    401    |     Unauthorized      |             인증이 필요              |
|    404    |       Not Found       |    페이지, 리소스를 찾을 수 없음     |
|    500    | Internal Server Error |            서버 내부 오류            |

## 3) request, response

### 3)-1 request

1. URL : param, query를 통해 특정 정보를 요청
2. header : 부가적인 정보를 전송
3. body : XML, JSON, Multi Form 등의 데이터를 담아 요청

### 3)-2 response

- Body : XML, JSON, Multi Form 등의 데이터를 반환한다.

# 2. CRUD

## 1) CRUD 란 ?

- 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능

|  CRUD  | ACTION | HTTP METHOD |  SQL   |
| :----: | :----: | :---------: | :----: |
| CREATE |  생성  |    POST     | INSERT |
|  READ  |  조회  |     GET     | SELECT |
| UPDATE |  수정  |     PUT     | UPDATE |
| DELETE |  삭제  |   DELETE    | DELETE |

## 2) CRUD 실습 - Router

```javascript
router.METHOD('path', (req,res) => {...});
```

1. METHOD : get, post 등 사용할 method를 적어준다.
2. path : 접근할 path를 설정해준다.
3. request : 전달받은 데이터를 request로 담아온다.
   - req.query, req.params, req.headers, req.body, req.file 등으로 다양하게 접근한다
4. response : 전달할 데이터를 response에 담는다.
   - `res.status(xxx)send(json)`
   - `status()`: status code를 정수로 입력한다
   - `send()`: json 형식으로 response body에 입력한다. 