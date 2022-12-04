import { useMutation } from "@apollo/client";
import styled from "styled-components";
import {M_CREATEMEMBER} from '../graphql/query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CreateDeviceContainer=styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    margin: auto;
    background-color: var(--gray);

    .close_button{
        box-sizing: border-box;
        background-color: var(--gray);
        border: none;
        width: 100%;
        font-size: 20px;
        text-align: right;
        padding: 10px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .input_wrap{
            margin: 20px 0;
            label{
                display: inline-block;
                text-align: center;
                width: 120px;
            }
            input{
                width: 300px;
                line-height: 30px;
                text-indent: 5px;
                border: none;
                :focus{
                    outline: none;
                }
            }
        }
        button{
            width: 100px;
            
        }
    }
`;

const CreateDevice=({setModalOpen})=>{

    // const [createMember, {loading, data, error}]= useMutation(M_CREATEMEMBER);

    const onSubmit =async(e)=>{
        e.preventDefault();

        const current = e.target        
        // await createMember({variables:{
        //     role_no:Number(current.role_no.value),
        //     company_no:Number(current.company_no.value),
        //     name:current.name.value,
        //     id:current.id.value,
        //     password:current.password.value
        // }})

        //input창 입력값 삭제
        e.target.reset();
    };

    return(
        <CreateDeviceContainer>
                <button className="close_button" onClick={()=>{setModalOpen(false)}}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <form onSubmit={onSubmit}>
                    <h1>장비 등록</h1>
                    <div className="input_wrap">
                        <label htmlFor="role_no">기업명</label>
                        <input id="role_no" type="text" defaultValue="기업번호" disabled></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="company_no">장비명</label>
                        <input id="device_name" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="name">OS</label>
                        <input id="os" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="device_user">담당사용자</label>
                        <input id="device_user" type="text" required></input>
                    </div>
                    <button>등록</button>
                </form>
        </CreateDeviceContainer>
    )
};
export default CreateDevice;