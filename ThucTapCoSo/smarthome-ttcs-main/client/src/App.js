import React,{useState,useEffect} from 'react';
import './App.css';

function App(){
 
  useEffect(()=>{
    const interval=setInterval(()=>{
      getStatus();
    },100);
    return()=>clearInterval(interval);
  },[]);
  const [status,setStatus]=useState('');
  const [status1,setStatus1]=useState(true);
  const [status2,setStatus2]=useState(true);
  const [status3,setStatus3]=useState(true);
  const [status4,setStatus4]=useState(true);
  const [status5,setStatus5]=useState(true);

 


const getStatus=async ()=>{
    const reponse= await fetch(`http://127.0.0.1:4000/testStatus`);
    const data = await reponse.json();
    console.log(data.statusDevice);
    setStatus(data.statusDevice);
   
}
 const R1=status.lastIndexOf("R1");
 var statusR1=status[R1+4];

 const R2=status.lastIndexOf("R2");
 var statusR2=status[R2+4];
 
 const R3=status.lastIndexOf("R3");
 var statusR3=status[R3+4];

 const R4=status.lastIndexOf("R4");
 var statusR4=status[R4+4];

 const R5=status.lastIndexOf("R5");
 var statusR5=status[R5+4]; 

 //
if(statusR1 === 't'){
  statusR1 = true;
}
else{
  statusR1 = false;
}

if(statusR2 === 't'){
 statusR2 = true;
}
else{
 statusR2 = false;
}

if(statusR3 === 't'){
  statusR3 = true;
}
else{
  statusR3 = false;
}

if(statusR4 === 't'){
  statusR4 = true;
 }
 else{
  statusR4 = false;
 }

if(statusR5 === 't'){
  statusR5 = true;
}
else{
  statusR5 = false;
}
 //   
var syn1 = '',syn2 = '',syn3 = '',syn4 = '',syn5 = '';

 if(status1 != statusR1){
   syn1 = statusR1;
 }
 else{
    syn1 = status1;
 }

 if(status2 != statusR2){
  syn2=statusR2;
  }
  else{
   syn2=status2;
 }
 if(status3 != statusR3){
  syn3=statusR3;
  }
  else{
  syn3=status3;
 }
 if(status4 != statusR4){
  syn4=statusR4;
  }
  else{
  syn4=status4;
 }
 if(status5 != statusR5){
  syn5=statusR5;
  }
  else{
  syn5=status5;
 }
const sendHttpRequest = (method, url, data) => {
const promise = new Promise((resolve, reject) => {
const xhr = new XMLHttpRequest();
 xhr.open(method, url);

 xhr.responseType = 'json';

 if (data) {
   xhr.setRequestHeader('Content-Type','application/json');
   xhr.setRequestHeader('Accept','*/*');
   xhr.setRequestHeader('X-Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oY3QwMjAzMjhAZ21haWwuY29tIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiIwZjcwZTAxMC05YTY5LTExZTktYmU4NC03NTZmNmIxMzAzYjUiLCJmaXJzdE5hbWUiOiJUaHV5IiwibGFzdE5hbWUiOiJMaW5oIiwiZW5hYmxlZCI6dHJ1ZSwicHJpdmFjeVBvbGljeUFjY2VwdGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMGYzMDA2ODAtOWE2OS0xMWU5LWJlODQtNzU2ZjZiMTMwM2I1IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjA5MTU5NDQ2LCJleHAiOjE2MTA5NTk0NDZ9.Dlo2u1sbQouwch1W4xY60K6_o1ceHLLayGVWTRL10WnMI_etSRgwppx5hzXy_4w8CcRmMBzt_dJ1FMhGXr94iQ');
 }

 xhr.onload = () => {
   if (xhr.status >= 400) {
     reject(xhr.response);
   } else {
     resolve(xhr.response);
   }
 };

 xhr.onerror = () => {
   reject('Đã xảy ra lỗi !!!');
 };

 xhr.send(JSON.stringify(data));
});
return promise;
};
//synchronous...
  //
  const handle = ()=>{
  const promise = new Promise ((resolve,reject)=>{
    
  }
  );
  returnn promise;
  }
  //
//handleClick
const handleClick1=()=>{
  setStatus1(!status1);
  let method="R1";
  sendHttpRequest('POST', 'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',{
   method:`${method}`,
   params:`${status1}`,
   timeout:500
 
})
 .then(responseData => {
   console.log(responseData);
 })
 .catch(err => {
   console.log(err);
 });
 
}
const handleClick2=()=>{
  setStatus2(!status2);
  let method="R2";
  sendHttpRequest('POST', 'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',{
  method:`${method}`,
  params:`${status2}`,
  timeout:500
 
})
 .then(responseData => {
   console.log(responseData);
 })
 .catch(err => {
   console.log(err);
 });   
}
const handleClick3=()=>{
  setStatus3(!status3);
  let method="R3";
  sendHttpRequest('POST', 'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',{
  method:`${method}`,
  params:`${status3}`,
  timeout:500
 
})
 .then(responseData => {
   console.log(responseData);
 })
 .catch(err => {
   console.log(err);
 });
}
const handleClick4=()=>{
  setStatus4(!status4);  
  let method="R4";
  sendHttpRequest('POST', 'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',{
  method:`${method}`,
  params:`${status4}`,
  timeout:500
 
})
 .then(responseData => {
   console.log(responseData);
 })
 .catch(err => {
   console.log(err);
 }); 
}
const handleClick5=()=>{
  setStatus5(!status5);  
  let method="R5";
  sendHttpRequest('POST', 'http://demo.thingsboard.io/api/plugins/rpc/oneway/3e85b630-28a4-11eb-85ee-f936949cce2a',{
  method:`${method}`,
  params:`${status5}`,
  timeout:500
 
})
 .then(responseData => {
   console.log(responseData);
 })
 .catch(err => {
   console.log(err);
 }); 
}

console.log('resu: '+syn1);
 
   return(
    <div className="main">
    <div className="container">
      <div className="submain-relay">
        <div className="sub-main">
          <div id="post-btn-relay1" type="button" className={syn1 ? 'on':'off'} onClick={handleClick1}>
              <h3>Đ1</h3>
          </div>
        </div>
      </div>
      <div className="submain-relay">
      <div className="sub-main">
        <div id="post-btn-relay2" type="button" className={syn2 ? 'on':'off'} onClick={handleClick2}>
            <h3>Đ2</h3>
        </div>
        </div>
      </div>
      <div className="submain-relay">
      <div className="sub-main">
        <div id="post-btn-relay3" type="button" className={syn3 ? 'on':'off'} onClick={handleClick3}>
            <h3>Đ3</h3>
        </div>
        </div>
      </div>
      <div className="submain-relay">
      <div className="sub-main">
        <div id="post-btn-relay4" type="button" className={syn4 ? 'on':'off'} onClick={handleClick4}>
            <h3>Cửa</h3>
        </div>
        </div>
      </div>
      <div className="submain-relay">
      <div className="sub-main">
        <div id="post-btn-relay5" type="button" className={syn5 ? 'on':'off'} onClick={handleClick5}>
            <h3>Quạt</h3>
        </div>
        </div>
      </div>
    </div>
    <div className="container">
     <div className="submain-status">
       <h4>Status light 1</h4>
        <div className={syn1 ? 'status-on':'status-off'}></div>
     </div>
     <div className="submain-status">
        <h4>Status light 2</h4>
        <div className={syn2 ? 'status-on':'status-off'}></div>
     </div>
     <div className="submain-status">
       <h4>Status light 3</h4>
        <div className={syn3 ? 'status-on':'status-off'}></div>
     </div>
     <div className="submain-status">
        <h4>Status door </h4>
        <div className={syn4 ? 'status-on':'status-off'}></div>
     </div>
     <div className="submain-status">
        <h4>Status fan </h4>
        <div className={syn5 ? 'status-on':'status-off'}></div>
     </div>
    </div>
    </div>
   )
}

export default App;
