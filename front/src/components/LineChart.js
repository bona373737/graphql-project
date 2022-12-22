import dayjs from "dayjs";
import {GET_getDviceCountByDate} from "../graphql/query";
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from "chart.js";
import { useQuery } from '@apollo/client';
import { useState } from "react";

const ChartContainer=styled.div`
    margin: auto;
    width: 700px;

    form{
        text-align: center;
    }
`;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart=()=>{
    const now = dayjs().add(1,'d').format('YYYY-MM-DD')
    const [labels, setLabels]=useState([]);
    const [yData, setYData]=useState([]);
    const [newYData, setNewYData] = useState([]);

    //그래프 기본 dataset_ 날짜별 등록장비총계 데이터
    const {data} = useQuery(GET_getDviceCountByDate,{
        onCompleted:(data)=>{
            setLabels(data.getDviceCountByDate.date);
            setYData(data.getDviceCountByDate.count);
            setNewYData(data.getDviceCountByDate.count);
        }
    })

    //flask api_입력된 날짜에 예상되는 등록장비개수 반환
    const getData =(e)=>{
        // console.log(e.target.value);
        const selectedDate = e.target.value;
        const selectedDateInt = selectedDate.replaceAll('-','');

        // console.log(selectedDate)
        fetch(`http://10.90.100.141:8000/result?date=${selectedDateInt}`)
        .then((response) => response.json())
        .then((data) =>{
            // console.log(data)
            setNewYData([...newYData,data.result]);
            // setYData([...yData,data.result]);
            setLabels([...labels,selectedDate]);
        })
    }

    //그래프 기본 dataset : db
    //flask api에서 장비등록일, 해당날짜 등록장비 총계 값 받아오기?
    //https://jsfiddle.net/4m5dp17x/
    const chartData = {
        labels:labels,
        datasets:[{
            label:"추가데이터",
            data:newYData,
            borderDash:[5,5],
            borderWidth:1,
            borderColor: 'rgba(127, 17, 224, .4)',  
        },{
            label:"기본데이터",
            data:yData,
            borderColor: 'rgba(84, 115, 255, .4)',
        }],
    }

    const chartOption={
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return(
        <ChartContainer>
            <form>
                <label>등록장비증감 예측</label>
                <input type="date" placeholder='날짜 입력' min={now} onChange={getData}></input>
            </form>
            {
                data&&
                <Line data={chartData} options={chartOption} />
            }
        </ChartContainer>
    
    )

}
export default LineChart;