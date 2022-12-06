import styled from "styled-components";

const MemberListContainer=styled.tr`

td{
    vertical-align: bottom;
}

.switch-button {
        position: relative;
        display: inline-block;
        width: 55px;
        height: 29px;
    }
    .switch-button input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .onoff-switch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius:20px;
        background-color: #ccc;
        box-shadow: inset 1px 5px 1px #999;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .onoff-switch:before {
        position: absolute;
        content: "";
        height: 29px;
        width: 29px;
        left: 0px;
        bottom: 1px;
        background-color: #fff;
        -webkit-transition: .5s;
        transition: .4s;
        border-radius:20px;
    }
    .switch-button input:checked + .onoff-switch {
        background-color: #F2D522;
        box-shadow: inset 1px 5px 1px #E3AE56;
    }

    .switch-button input:checked + .onoff-switch:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

const MemberTr=({memberData})=>{
    return(
        memberData &&
            <MemberListContainer>
                <td>{memberData.member_no}</td>
                <td>{memberData.company_no.company_name}</td>
                <td>{memberData.id}</td>
                <td>{memberData.name}</td>
                <td>{memberData.reg_date}</td>
                <td>{String(memberData.isavailable)}</td>
                {/* <td>
                <label class="switch-button">
                    <input type="checkbox"/>
                    <span class="onoff-switch">on off</span>
                </label>
                </td> */}
            </MemberListContainer> 
    )
}
export default MemberTr;