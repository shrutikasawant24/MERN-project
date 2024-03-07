import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Select, MenuItem} from "@mui/material";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box,Button } from '@mui/material';

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

export default function Practice() {
  const [Product,setProduct]=useState([
    {
        "_id": "65ca164d23bf66e0d0d44ae3",
        "name": "bottom",
        "mrp": 8000,
        "price": 1000,
        "gstpercent": 10,
        "__v": 0
    },
    {
        "_id": "65cbab6dbe22fdf77fb62d0f",
        "name": "jeans",
        "mrp": 3000,
        "price": 4000,
        "gstpercent": 10,
        "imagepath": "productpics/1707846509633.jpg",
        "__v": 0
    },
    {
        "_id": "65cc6deddca6def28c627ead",
        "name": "top",
        "mrp": 2000,
        "price": 1000,
        "gstpercent": 10,
        "__v": 0
    },
    {
        "_id": "65cc85c0dca6def28c63f8f2",
        "name": "jeans",
        "mrp": 1000,
        "price": 800,
        "gstpercent": 12,
        "__v": 0
    },
    {
        "_id": "65cd7381d7fcccd4283dad95",
        "name": "top",
        "mrp": 4000,
        "price": 1000,
        "gstpercent": 12,
        "__v": 0
    },
    {
        "_id": "65cda9fbd7fcccd4283e7c87",
        "name": "purse",
        "mrp": 1000,
        "price": 700,
        "gstpercent": 10,
        "__v": 0
    },
    {
        "_id": "65cdb4b5d7fcccd4283e7cd5",
        "name": "shoes",
        "mrp": 3000,
        "price": 2000,
        "gstpercent": 10,
        "__v": 0
    },
    {
        "_id": "65cdcb51d7fcccd4283e7d48",
        "name": "earphones",
        "mrp": 1000,
        "price": 500,
        "gstpercent": 10,
        "__v": 0
    }
])

const [rows, setRows] = useState([{quantity:1}])



    const addrow =()=>{
    let copyRows = [...rows]
    copyRows.push({quantity:1})
    setRows(copyRows)
    }

    console.log(rows);

    function handleSelect (name,i){
       let drop = Product.find((e) => (e._id ===name));
       let sales = [...rows]
       sales[i] = {...drop,quantity:1}
       setRows(sales)
       console.log(drop);
    }

    function handleQuantity(index,value){
     const updaterow = [...rows];
     updaterow[index].quantity = value;
      setRows(updaterow);
    }


  return (
    <>

<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '55ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="sdate" type='date' variant="outlined" />
      <TextField id="cname" type='text' label="Outlined" variant="outlined" />
      <TextField id="cmobileno" type='number' label="Outlined" variant="outlined" />
      
    </Box>

    <Button onClick={addrow}>Add row</Button>

      <TableContainer component={Paper} style={{marginTop:"2rem",}}>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead >
            <TableRow style={{alignContent:"center"}}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">quantity</StyledTableCell>
              <StyledTableCell align="right">subtotal</StyledTableCell>
              <StyledTableCell align="right">GST %</StyledTableCell>
              <StyledTableCell align="right">gsttotal</StyledTableCell>
              <StyledTableCell align="right">Bill-Total</StyledTableCell>



            </TableRow>
          </TableHead>
          <TableBody>
    {rows.map((row,index)=>{
        return(
            <StyledTableRow > 
            <StyledTableCell component="th" scope="row">
              <Select onChange={(e) => handleSelect(e.target.value,index)}
              
                style={{ marginTop:"50px", marginLeft:"30px" }}
              >
              {Product.map((prods, i) => (
              
                  <MenuItem key={i} value={prods._id}> {prods.name} </MenuItem>
                  ))}
              </Select>
              
            </StyledTableCell>
            {/* Add other cells here */}
            <StyledTableCell>
            <TextField id="price" type='number'  variant="outlined" value={row.price}/>
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="mrp" type='number'  variant="outlined" value={row.mrp}/>
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="quantity" type='number' variant="outlined" onChange={(e) => handleQuantity(index,e.target.value)} value={row.quantity}/>
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="subtotal" type='number'  variant="outlined"  value={row.name ? row.price *row.quantity :""} />
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="gstpercent" type='number' variant="outlined" value={row.gstpercent} />
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="gsttotal" type='number' variant="outlined" value={row.name ? row.price * row.gstpercent/100 * row.quantity :""} />
            </StyledTableCell>
          
            <StyledTableCell>
            <TextField id="billtotal" type='number' variant="outlined" value={ row.name ? row.price * row.gstpercent/100 * row.quantity + row.price *row.quantity: ""} />
            </StyledTableCell>
          
          </StyledTableRow>
        )
    })}
 
    
            
      
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
