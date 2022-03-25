import './App.css';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
//https://exchangerate.host/#/#docs
//https://manage.exchangeratesapi.io/dashboard?logged_in=1

function App() {

  const [returnedData, setReturnedData] = useState({})
  const [returnedDatabase, setReturnedDataBase] = useState({})
  const [returnedData1, setReturnedData1] = useState([])
  const [dataValute, setdataValute] = useState(null)
  const [useValute, setUseValute] = useState()
  const [value1, onChange1] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log('datavaluteuseEffect')
    console.log(dataValute)
  }, [dataValute])

  function change() {
    return document.querySelector('#lang').value;
  }

  function changeBase() {
    return document.querySelector('#base').value;
  }

  const fetchDataValute = async () => {
    if (dateFormat(value2, "yyyy-mm-dd") !== dateFormat(value1, "yyyy-mm-dd")) {
      dateFormat(value2, "yyyy-dd-mm");
      var requestURL = `https://api.exchangerate.host/timeseries?start_date=${dateFormat(value1, "yyyy-mm-dd")}
    &end_date=${dateFormat(value2, "yyyy-mm-dd")}&symbols=${change()}&base=${changeBase()}`;
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();

      request.onload = function () {
        var response = request.response;
        let arr1 = Object.keys(response.rates)
        let newData = arr1.map(function (key) {
          return { curse: parseFloat(Object.values(response.rates[key])), data: [key].toString() };
        })
        setdataValute(newData)
        // console.log(response.rates);
        // console.log(Array.from(response.rates));
      }
    }
    else {
      var requestURL = `https://api.exchangerate.host/${dateFormat(value1, "yyyy-mm-dd")}}&symbols=${change()}`;
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();

      request.onload = function () {
        var response = request.response;
        // let arr1 = Object.keys(response.rates)
        // let newData = arr1.map(function (key) {
        //   return { curse: parseFloat(Object.values(response.rates[key])), data: [key].toString() };
        // })
        setdataValute(response)
      }
      // for (let key in dataValute) {
      //   if (dataValute.hasOwnProperty(key)) {
      //     console.log("Key is " + key + ", value is " + dataValute.key);
      //     returnedData1[key] = Object.entries(dataValute[key])
      //   }
      // }


      // window.location.reload();
    }
  }

  const fetchData = async () => {
    var requestURL = 'https://api.exchangerate.host/symbols';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      var response = request.response;
      setReturnedData(response.symbols)
      setReturnedDataBase(response.symbols)
      console.log('fffff' + '\n' + response.symbols)
    }
    setUseValute(change())
  }
  //   var requestURL = 'https://api.exchangerate.host/symbols&symbols=USD,EUR,JPY,CNY,GBP,KRW,INR,CAD,HKD,AUD';
  //   var request = new XMLHttpRequest();
  //   request.open('GET', requestURL);
  //   request.responseType = 'json';
  //   request.send();

  //   request.onload = function () {
  //     var response = request.response;
  //     setReturnedDataBase(response.symbols)
  //   }
  //   // setUseValute(change())
  // }

  const ff = async () => {
    console.log(dataValute)
  }

  return (
    <div className="App">
      <div onSubmit={handleAddFormSubmit}>
        <button style={{ width: 150, height: 50, marginTop: 30 }} onClick={() => fetchDataValute()}>Показать данные</button>
        {/* <button style={{ width: 150, height: 50, marginTop: 30 }} onClick={() => ff()}>данные</button> */}
      </div>
      <div style={{ marginTop: 0, height: 500, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: 0, marginTop: 30, alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ marginLeft: 15 }}>Конвертировать из</div>
          <select style={{ width: 80, marginLeft: 15, height: 20, }} id="base">
            <option value={'USD'} onChange={changeBase}>USD</option>
            <option value={'EUR'} onChange={changeBase}>EUR</option>
            <option value={'JPY'} onChange={changeBase}>JPY</option>
            <option value={'CNY'} onChange={changeBase}>CNY</option>
            <option value={'GBP'} onChange={changeBase}>GBP</option>
            <option value={'KRW'} onChange={changeBase}>KRW</option>
            <option value={'INR'} onChange={changeBase}>INR</option>
            <option value={'CAD'} onChange={changeBase}>CAD</option>
            <option value={'HKD'} onChange={changeBase}>HKD</option>
            <option value={'AUD'} onChange={changeBase}>AUD</option>
          </select>
          <div style={{ marginLeft: 15 }}>в</div>
          <select style={{ width: 80, marginLeft: 15, height: 20, }} id="lang">
            <option value={'USD'} onChange={changeBase}>USD</option>
            <option value={'EUR'} onChange={changeBase}>EUR</option>
            <option value={'JPY'} onChange={changeBase}>JPY</option>
            <option value={'CNY'} onChange={changeBase}>CNY</option>
            <option value={'GBP'} onChange={changeBase}>GBP</option>
            <option value={'KRW'} onChange={changeBase}>KRW</option>
            <option value={'INR'} onChange={changeBase}>INR</option>
            <option value={'CAD'} onChange={changeBase}>CAD</option>
            <option value={'HKD'} onChange={changeBase}>HKD</option>
            <option value={'AUD'} onChange={changeBase}>AUD</option>
            {Object.keys(returnedData).map((key, i) => (
              <option key={i} value={key} onChange={change}>{key}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 20, height: 500, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ marginTop: 10, marginRight: 30 }}>
            <DatePicker selected={value1} onChange={(date) => onChange1(date)} />
          </div>
          <div style={{ marginTop: 10 }}>
            <DatePicker selected={value2} onChange={(date) => onChange2(date)} />
            {/* dateFormat="yyyy-mm-dd" */}
            {/* {Object.keys(returnedData).map((key, i) => (
              <p key={i}>
                <span>{key}</span>
                <span>  {returnedData[key]}</span>
              </p>
            ))} */}
          </div>

        </div>
        <div style={{ marginTop: 30 }}>
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart width={500} height={300} data={dataValute} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis dataKey="curse" type="number" domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#000" }} itemStyle={{ color: "#000" }} cursor={false} />
              <Line type="monotone" dataKey="curse" stroke="#8884d8" strokeWidth="1" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 2 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 3, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;