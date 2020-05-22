import styled, { keyframes, css } from 'styled-components';

export const Div = styled.div`

 /* min-width: "1000vh"; */

 height:80vh;
 min-height: 40vh;

background-color: rgba(212, 212, 212, 0.5);

display:flex;
align-items:center;
justify-content:center;




max-width:180vh;
border-radius: 4px;
box-shadow:0 0 20px rgba(0, 0, 0, 0.1);
padding: 10px;
margin: 20px auto;

margin-left: 18vh;


`;



export const Div2 = styled.div`


background-color: rgba(230, 230, 230,0.1);


/* display:flex;
align-items:center;
justify-content:center; */


width:45vh;
height:26vw;
/* max-width:800px; */
border-radius: 4px;
box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.5);
padding: 2px;
margin: 2px auto;

margin-left:2vh;
margin-right:2vh;

margin-top:-20vh;



/* margin-left:-20vw; */
  display:flex;
  flex-direction:column;


.search{
  
  


/* border: 1px solid  rgba(255,255,255,1); */
/* padding: 10px 15px; */
/* border-radius:4px; */
/* font-size: 15px; */
max-height:5vw;
min-width:35vh;

/* background-color: rgba(255,255,255,0.1); */

/* 
 margin-left:30vh; 
margin-right:1vh;
margin-top:2vh;  */

}

input{
     flex-direction:column;

      flex:1;
      border: 1px solid  rgba(255,255,255,1);
      padding: 10px 15px;
      border-radius:4px;
      font-size: 15px;
      max-height:1.2vw;
      max-width:35vh;
      background-color: rgba(255,255,255,0.1);
      min-width:35vh;


      margin-left:2vh;
      margin-right:1vh;
      margin-top:2vh;

    }
    button{
      flex-direction:column;

      flex:1;
      border: 2px solid  rgba(32, 117, 86);
      padding: 10px 15px;
      border-radius:4px;
      font-size: 15px;
      max-height:1.2vw;
      max-width:35vh;
      background-color: rgb(60, 188, 141);
      min-width:35vh;
      min-height:6vh;
      color: rgb(255,255,255);
      align-items:center;


      margin-left:4vh;
      margin-right:1vh;
      margin-top:20vh;
          }


`;




export const Form = styled.form`

margin-top:-68vh;
margin-right:2vw;
/* margin-left:-20vw; */
background-color:#eee;
  display:flex;
  flex-direction:row;
  input{
      flex:1;
      border: 1px solid #eee;
      padding: 10px 15px;
      border-radius:4px;
      font-size: 15px;

    }

`;