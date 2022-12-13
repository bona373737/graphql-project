import React from "react";
import styled from "styled-components";
import { Link,useHistory } from "react-router-dom";
import homeImg from "../assets/img/home_image.jpg";

const HomeContainer=styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    nav{
        
        height: 60px;
        background-color: var(--mainColor);
        padding: 0 50px;
        display: flex;
        justify-content: space-between;

        .logo_wrap{
            font-weight: bold;
            font-size: 22px;
            color: var(--pointColor);
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .login_btn_wrap{
            display: flex;
            align-items: center;
            button{
                padding: 10px 20px;
                border-radius: 5px;
                :hover{
                    cursor: pointer;
                    background-color: white;
                }
            }
        }
    }
    main{
        background-color: var(--subColor);
        flex:1;
        /* background:url(${homeImg}) center top no-repeat; */
        background-size: cover;
        overflow: hidden;
        /* h1{
            text-align: center;
            margin-top: 20%
        } */
        
        .container{
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        /* 배너 컨테이너 */
        .rollingbanner{
            position: relative;
            width: 380px;
            height: 32px;
            font-size: .875rem;
            letter-spacing: -1px;
            padding: 7px 15px;
            box-sizing: border-box;
            background-color: #f0f0f0;
            border-radius: 16px;
        }
        /* 타이틀 */
        .rollingbanner > .title{
            font-weight: bold;
            float: left;
            padding-right: 10px;
        }
        /* 롤링 배너 */
        .rollingbanner > .wrap{
            position: relative;
            width: auto;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }        
        .rollingbanner ul{
            list-style: none;
        }
        .rollingbanner li{
            position: absolute;
            top: -36px;
            left: 0;
        }
        /* 이전, 현재, 다음 롤링 배너 표시 */
        .rollingbanner li.prev{
            top: 36px;
            transition: top 0.5s ease;
        }
        .rollingbanner li.current{
            top: 0;
            transition: top 0.5s ease;
        }
        .rollingbanner li.next{
            top: -36px;
        }
        .rollingbanner a{
            display: block;
            display: -webkit-box;
            text-decoration: none;
            -webkit-line-clamp: 1;
            -webkit-box-orient:vertical;
            overflow: hidden;
            color: #000;
        }
        /* 반대 방향으로 진행 */
        .rollingbanner.reverse li.prev{
            top: -36px;
            transition: top 0.5s ease;
        }
        .rollingbanner.reverse li.next{
            top: 36px;
        }
    }
`;

const Home =()=>{
    const history = useHistory();

        // document.addEventListener('DOMContentLoaded', ()=>{
        // var interval = window.setInterval(rollingCallback, 3000);
        // })
        // function rollingCallback(){
        //     //.prev 클래스 삭제
        //     document.querySelector('.rollingbanner .prev').classList.remove('prev');

        //     //.current -> .prev
        //     let current = document.querySelector('.rollingbanner .current');
        //     current.classList.remove('current');
        //     current.classList.add('prev');

        //     //.next -> .current
        //     let next = document.querySelector('.rollingbanner .next');
        //     //다음 목록 요소가 널인지 체크
        //     if(next.nextElementSibling == null){
        //         document.querySelector('.rollingbanner ul li:first-child').classList.add('next');
        //     }else{
        //         //목록 처음 요소를 다음 요소로 선택
        //         next.nextElementSibling.classList.add('next');
        //     }
        //     next.classList.remove('next');
        //     next.classList.add('current');
        // }

    return(
        <HomeContainer>
            <nav>
                <div className="logo_wrap" onClick={()=>{history.push('/')}}>
                    <img src=""></img>
                    <h1>OJT_ITOMS</h1>
                </div>
                <div className="login_btn_wrap">
                    <button onClick={()=>{history.push('/login')}}>Login</button>
                </div>
            </nav>
            <main>
                 <div class="container">
                    <div class="rollingbanner">
                        <div class="wrap">
                            <ul>
                                <li><a href="#">안녕하세요. </a></li>
                                <li class="next"><a href="#">OJT_ITOMS 백오피스개발 과제 진행중입니다.</a></li>
                                <li class="current"><a href="#">아자!</a></li>
                                <li><a href="#">"공법변경 구조검토 요구, 현산 측이 묵살했다"</a></li>
                                <li class="prev"><a href="#">12월 주담대 금리 연 3.63%…7년7개월 만에 최고</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h1>안녕하세요. OJT_ITOMS 백오피스개발 과제 진행중입니다.</h1>
            </main>
        </HomeContainer>
    )
}
export default Home;