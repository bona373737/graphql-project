## front

### 공통
- [ ] 로그페이지 에러처리
- [ ] 쿼리에 order by reg_date desc 추가
- [ ] 
#### 사이트관리자
- [ ] 사이트관리자 ITOMS운영현황페이지_담당자 번호->담당자이름 으로 표출되도록 백엔드 수정
- [ ] 



## Error
```javaScript
    getCompany({
            variables:null,
            onCompleted:(_,data)=>{console.log("성공")},
            onError:(error)=>{
                console.log({...error});
                console.log(error.networkError.result.errors);
            }
        });
```