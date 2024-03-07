import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function Saledetails() {

  let navigate = useNavigate();

    const [saledetails , setSaledetails] = useState([{
      sdate:"",
      cname:"",
      cmobileno:"",
        gstpercent:"",
        grandtotal:""
    }]);

function loadData(){
    axios.get("http://127.0.01:8081/sales")
    .then((res) => {
        console.log(res.data.data);
        setSaledetails(res.data.data)
    }).catch((err) =>{
        console.log(err);
    })
}useEffect(()=>{
    loadData()
},[]);



function handleDelete(e,id){
  e.preventDefault();
  axios.delete("http://127.0.01:8081/sales/"+id)
  .then((res)=> {
    console.log(res.data.data);
    loadData()
  })
  console.log(id);
 }

function handlePrint(_id){
  navigate(`/envoice/${_id}`);
}

  return (
    <div>Saledetails

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">Sr.no</StyledTableCell>
          <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell  align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Mobole No.</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {saledetails.map((details,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{details.sdate}</StyledTableCell>
              <StyledTableCell align="right">{details.cname}</StyledTableCell>
              <StyledTableCell align="right">{details.cmobileno}</StyledTableCell>
              <StyledTableCell align="right">{details.grandtotal}</StyledTableCell>

              <button className='btn btn-primary me-3'onClick={((e)=>handleDelete(e,details._id))} style={{fontSize:"18px", marginRight:"5px"}}>Delete</button>

              <button className='btn btn-primary me-3'onClick={((e)=>handlePrint(details._id))} style={{fontSize:"18px",marginLeft:"5px"}} >Print</button>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </div>
  )
}
