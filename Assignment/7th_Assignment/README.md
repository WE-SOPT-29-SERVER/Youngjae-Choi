# 7rd Seminar Assignment :fire::fire::fire:

![image](https://user-images.githubusercontent.com/49263163/147310815-26c6c783-ad5f-40dc-8e38-1b1b05949310.png)

---

# Level 2 

<img width="650" alt="Screen Shot 2021-12-24 at 12 36 43 PM" src="https://user-images.githubusercontent.com/49263163/147313375-53fbdfbf-95aa-4548-b10e-63c832347007.png">

firebase 의 bucket!  
firebase-storage-resize-images extensions를 사용하여, 리사이징 된 이미지들은   
`/resized` 폴더에 저장되도록 해주었다🔥



## before resized

![20211224_025435_608039327114](https://user-images.githubusercontent.com/49263163/147313379-54f86e9e-6270-4d65-a607-c0886f580bfb.jpeg)

## after resized



![resized_20211224_025435_608039327114_200x200](https://user-images.githubusercontent.com/49263163/147313381-3c51c193-d0cf-4aa0-835e-d368764bdb20.jpeg)





# Level 3 

### Refresh Token???!

기존의 Access Token 을 활용한 인증은, 제 3자에게 탈취될 경우 보안에 취약하다는 큰 단점이 있다.  
이를 위해 Access Token 의 유효 기간을 짧게 만들고, 유효기간 이 더 긴 Refresh Token을 추가적으로 발급해줌으로써, 
기존의 Access Token만 사용하는 방식보다 훨씬 보안성을 강화한 방법이다. 

### 시나리오 및 로직

1. 로그인 시 Access Token과 Refresh Token을 동시에 발급한다. 
   - 이 때, Refresh Token은 DB에 저장해준다.
2. 인증이 필요한 API에서 토큰을 검증하는 middleware를 거치면, 다양한 경우에 따라 토큰을 핸들링한다.
   - case1. access token과 refresh token 전부다 만료된 경우 -> err return
   - case2. access token 만료, refresh token 유효한 경우 -> access token 재발급
   - case3. access token 유효, refresh token 만료된 경유 -> refresh token 재발급
   - case4. access token, refresh token 전부 유효 -> 다음 미들웨어로 
3. 로그아웃 시 Access Token과 Refresh Token을 전부 만료/삭제시킨다.



[참고 사이트](https://cotak.tistory.com/102)
