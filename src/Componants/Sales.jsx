import React, {  useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box,Button } from '@mui/material';
import Grid from '@mui/material/Grid';

// import TextField from '@mui/material/TextField';
import { TextField } from '@mui/material';
import axios from 'axios';
import {Select, MenuItem} from "@mui/material";
import { useNavigate } from 'react-router-dom';




export default function Sales() {

//get products getting data in array from db
let [product,setProduct]=useState([]); 

//let[alltotal,setalltotal]=useState();

//custm details
let [custdet,SetCustDet]=useState({});

let[saleProducts,setSaleProducts]=useState([{
  quantity:1,

}]);






//customer detail like mob,name
function handlecustdet(e)
{
SetCustDet({...custdet,[e.target.id]:e.target.value})
}
console.log(custdet);
//onchnge handle on selected product drop menu

function handleSelectProduct(id,i){

  console.log(id);
  let selectedProduct=product.find((e)=>e._id === id);
  let copyRows=[...saleProducts];
  copyRows[i]={...selectedProduct,quantity:1}
  setSaleProducts(copyRows); 
  // console.log(selectedProduct);
}
console.log(saleProducts);


function changingquantity(i,e)
{
  let updatesaleproduct=[...saleProducts];
  updatesaleproduct[i].quantity= parseInt(e, 10);
  setSaleProducts(updatesaleproduct);
 

}

console.log(saleProducts);



//add row
function addrow(){

setSaleProducts([...saleProducts,{}])
  
}
// console.log('saleProducts:', saleProducts); 
// console.log('products',product);









useEffect(()=>{
   
  //updateSubtotal();
  onload();
},[])



//getting product data
function onload(){


  axios.get(`${process.env.REACT_APP_BASE_URL}/products/`)
  
      .then((resp)=>{
        console.log(resp.data);
        setProduct(resp.data.data);
      })
      .catch((error)=>{
        console.log(error);

      });

 
    }

console.log(product);
console.log(saleProducts);
 
  



console.log('salproduct',saleProducts);
console.log('custde',custdet);

//function send sale data
// function saledata(e){
//  e.preventDefault();


  
//   // let updatesaleproduct=saleProducts.map((item)=>({
//   //   ...item,
//   //   subtotal:item.price*item.quantity,
//   //   gsttotal:(item.price*item.quantity*item.gstpercent)/100,
//   //   billtotal:(item.price*item.quantity) +((item.price* item.quantity*item.gstpercent)/100),

//   // }));

//   const postData={
//     cdate: custdet.cdate,
//         cname: custdet.cname,
//         cmobileno: custdet.cmobileno,
      
//     products:saleProducts.map(product=>({
//       productid:product.id,
//       name:product.name,
//       price:product.price,
//       quantity:product.quantity,
//       subtotal:product.subtotal,
//       gstpercent:product.gstpercent,
//       gsttotal:product.gsttotal,
//       billtotal:product.billtotal,
//     }))
    
  
// }
// console.log(postData,'postdata');
// }




let navigate = useNavigate();

function saledata(e) {
  e.preventDefault();

  const postData = {
     sdate: custdet.cdate,
    cname: custdet.cname,
    cmobileno: custdet.cmobileno,
    grandtotal:saleProducts.reduce((total, product) => total + (  product.price * product.quantity +
      (product.price * product.quantity * product.gstpercent) / 100 || 0), 0),
    products: saleProducts.map((product) => ({
      productid: product._id, // Assuming you have an _id property for each product
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      quantity: product.quantity,
      subtotal: product.price * product.quantity,
      gstpercent: product.gstpercent,
      gsttotal: (product.price * product.quantity * product.gstpercent) / 100,
      billtotal:
        product.price * product.quantity +
        (product.price * product.quantity * product.gstpercent) / 100,
        
    })),
  };


  axios.post("http://127.0.01:8081/sales",postData)
  .then((res)=>{
    console.log(res.data);
  navigate("/sidebar/saledetails");

  })
  .catch((error)=>{
    console.log(error);
  })
  console.log(postData,'postdata'); // Check if postData is correctly populated
}


// let cal=0
// let subtotal =0
// let gsttotal=0
// let billtotal=0


let grandTotal = saleProducts.reduce((total, product) => total + (  product.price * product.quantity +
  (product.price * product.quantity * product.gstpercent) / 100 || 0), 0);
console.log(grandTotal,'total');


  return (
    <>
    <form  > 
     {/* onSubmit={saledata}  */}
    {/* //grid  */}
    <Grid container spacing={2}>
  <Grid item xs={10} >
    
  {/* //breadcrumb */}
<div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Sales
        </Link>
  
      </Breadcrumbs>
       
     
    </div>
    {/* end breadcrumb */}
   </Grid>
   {/* datepicker */}
   <Box component="form"  noValidate sx={{ mt: 1 }}>
   <Grid container spacing={3} >

  <Grid item xs={4}>
  
  <TextField
              margin="normal"
             
              fullWidth

              id="cdate"
              // label="date"
              type="date"
              name="cdate"
               //value={formatDate(custdet.cdate)}

             
              onChange={((e)=>handlecustdet(e))}            />

  </Grid>
  <Grid item xs={4}>
     <TextField
              margin="normal"
           
              fullWidth

              id="cname"
              label="Name"
              type="text"
              name="cname"
              // value={cname}
              // autoComplete="cname"
              // autoFocus
              onChange={((e)=>handlecustdet(e))}            />
  </Grid> 
  <Grid item xs={4}>
     <TextField
              margin="normal"
              
              fullWidth

              id="cmobileno"
              label="Mobileno"
              type="number"
              name="cmobileno"
              // value={cmobileno}
              // autoComplete="cmobileno"
              // autoFocus
              onChange={((e)=>handlecustdet(e))}            />
              
  </Grid> 

  </Grid>
  </Box>
   
   
  
   </Grid>
   </form>
   {/* table */}
   <>
   <Button onClick={addrow}>Add row</Button>
   {/* <Button onClick={handleAddProduct}>add Product</Button> */}
   </>
   <TableContainer component={Paper}>
  <Table>
 
    <TableHead>
      <TableRow >
        <TableCell>Id </TableCell>
        <TableCell>Product Name </TableCell>
        <TableCell  >MRP </TableCell>
        <TableCell>Price </TableCell>
        <TableCell>Quantity </TableCell>
        <TableCell>SubTotal </TableCell>
        <TableCell>GstPercent </TableCell>
        <TableCell>GstTotal </TableCell>
        <TableCell>BillTotal </TableCell>


      </TableRow>
    </TableHead>
    <TableBody>
      
     {saleProducts.map((pitem,index)=>{
      //let cal = pitem.price*pitem.quantity
    
      let subtotal=pitem.price*pitem.quantity
    let gsttotal=(pitem.price*pitem.quantity*pitem.gstpercent)/100
     let billtotal=(pitem.price*pitem.quantity) +((pitem.price* pitem.quantity*pitem.gstpercent)/100)
      return( 
      
        <TableRow  key={index}>
          <TableCell scope='row'> {index+1}   </TableCell>
          <TableCell>
          <Select
            
           onChange={(e)=>handleSelectProduct(e.target.value,index)}
           >
        <MenuItem value="">select product</MenuItem>
        {product.map((prod)=>(
          
        <MenuItem key={prod._id} value={prod._id}>{prod.name}</MenuItem>
        ))}
        


       
      </Select>

          </TableCell>
        
             <TableCell >
          <TextField
              id="mrp"
              value={pitem.mrp}
              //onChange={handleSelectProduct}
              type="number"
              
              /> 
        {/* {selectedProduct && (
              <div>
            {product.find(prod=> prod._id === selectedProduct)?.mrp}
              </div>
            )} */}
          </TableCell>
          <TableCell>
          < TextField
              id="price"
              value={pitem.price}

             
              type="number"
              name="price"
              
             
         />
          
       
              
          </TableCell>
          
          <TableCell>
          <TextField
              id="quantity"
              value={pitem.quantity}
              type="number"
              name="quantity"
              onChange={(e)=>changingquantity(index,e.target.value)}
              
            />
          </TableCell>
          <TableCell>
          <TextField
              
              id="subtotal"
              value={parseFloat(subtotal)}
              type="number"
              name="subtotal"
          
            />
          </TableCell>
          <TableCell>
          <TextField

              id="gstpercent"
             value={pitem.gstpercent} 
              type="number"
              name="gstpercent"
              
            />
          </TableCell>
          <TableCell>
          <TextField
            

             
              id="gsttotal"
              value={parseFloat(gsttotal)}
              type="number"
              
              
              
            
            />
            
          </TableCell>
          
          
          <TableCell >
        
          <TextField style={{marginLeft:"7rem"}}
           id="billtotal"
              value={parseFloat(billtotal) }

            //  value={(pitem.price*pitem.quantity)*pitem.gstpercent/100+ (pitem.price * pitem.quantity)}
              type="number"
              name="billtotal"
          />
          </TableCell>
          {/* <TableCell><Button onClick={handleSubmit}>edit</Button> <Button>Del</Button></TableCell> */}
          
        </TableRow>
       )
          })}
          
       
    </TableBody>
  </Table>
  
</TableContainer>


  <Box><Button type='submit' onClick={saledata} variant='contained' color='primary' style={{margin:"3rem"}}>Submit</Button>
 
  <TextField
  id='grandTotal'
  type='number'
value={grandTotal}
  />

  </Box>





    </>
  )
}