import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

// Import the CSS file

const Envoice = () => {
  let { id } = useParams();
  console.log(id);

  const [bill, setBill] = useState({
    data:{
      cname:"",
      cmobileno:"",
      sdate:"",
    },
    products:[
      
    ]
  });
  // const [print, setPrint] = useState([])

useEffect(()=>{
  axios.get("http://127.0.01:8081/sales/" +id)
  .then((res)=>{
    console.log(res.data);
    setBill(res.data.data);
  })
  .catch((err)=>{
    console.log(err);
  });
},[id])

  console.log(bill,"invoice");

  // const getTotal = () => {
  //   return bill.reduce((total, item) => total + item.quantity * item.Price, 0);
  // };

  // crete variable for storing customer name and currentdate
  
  let customerName = localStorage.getItem("name");
  let currentDate = new Date().toJSON().slice(0, 10);

  const componentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "bill",
    onafterprint: () => alert("Data saved in pdf"),
  });

  return (
    // <Container style={{padding:"15px"}}>
      <div className="container m-2 p-4" >
      <Paper elevation={5} className="bill-container" style={{marginLeft:"5rem", marginRight:"5rem", marginTop:"4rem", fontSize:"35px",justifyContent:"center"}}>
        <h2 className="text-center text-decoration-underline" style={{marginTop:"5px", textAlign:"center"}}>Invoice Form </h2>
        <div ref={componentPDF} style={{ width: "90%" }}>
          <Typography>
            <Box style={{fontSize:"22px", marginLeft:"7px"}}>
              <b className="text-decoration-underline fs-5 ms-3 mt-3">Customer Name:{bill.cname} </b>
               <br />
              <br />
              <b className="text-decoration-underline fs-5 ms-3">Date:{currentDate}</b>
             <br />
              <b className="text-decoration-underline fs-5 ms-3 mt-3">Mobile No:{bill.cmobileno} </b>
               <br />
            </Box>
          </Typography>

          <hr />
          <TableContainer component={Paper} style={{padding:"5px", marginTop:"1rem"}}>
            <Table style={{padding:"5px"}}>
              <TableHead>
                <TableRow style={{fontSize:"25px"}}>
                  <TableCell>Product Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
   {bill.products.map((item,index)=>(
    <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.productid}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
   ))}

   {/* <TextField value={bill.grandtotal} /> */}
   
              </TableBody>
            </Table>
          </TableContainer>

          <div className="total" style={{marginTop:"3rem", marginLeft:"85rem"}}>
   <strong>Total:</strong>
   <TextField id="outlined-basic" variant="outlined" value={bill.grandtotal}/>
   </div>
          {/* <Typography
            variant="h6"
            style={{ marginTop: "20px" }}
            className="d-flex justify-content-between ms-3">
            
          </Typography> */}
        </div>
       
      </Paper>

      <div className="container mt-3" style={{marginLeft:"55rem", marginTop:"3rem"}}>
        <Button className="m-4" variant="contained" color="primary" onClick={generatePdf} style={{fontSize:"20px"}}>
          Print
        </Button>
        </div>
      </div>
    // </Container>
  );
};

export default Envoice;