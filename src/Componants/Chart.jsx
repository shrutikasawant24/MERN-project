import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function Chart() {

    const [chartdata,setchartdata]=React.useState([{
    }])

    

//         {
//             id: 1,
//             date: '2024-01-01',
//             customerName: 'John Doe',
//             total: 150,
//             products: [
//               { id: 1, name: 'Product A', price: 50, quantity: 2 },
//               { id: 2, name: 'Product B', price: 25, quantity: 3 }
//             ]
//           },
//           {
//             id: 2,
//             date: '2024-01-05',
//             customerName: 'Jane Smith',
//             total: 220,
//             products: [
//               { id: 3, name: 'Product C', price: 70, quantity: 2 },
//               { id: 1, name: 'Product A', price: 50, quantity: 3 }
//             ]
//           },
//           {
//             id: 3,
//             date: '2024-01-10',
//             customerName: 'Bob Johnson',
//             total: 180,
//             products: [
//               { id: 2, name: 'Product B', price: 25, quantity: 4 },
//               { id: 3, name: 'Product C', price: 70, quantity: 1 }
//             ]
//           }
//     ])
  
//   const dummySalesData = [
//     {
//       id: 1,
//       date: '2024-01-01',
//       customerName: 'John Doe',
//       total: 150,
//       products: [
//         { id: 1, name: 'Product A', price: 50, quantity: 2 },
//         { id: 2, name: 'Product B', price: 25, quantity: 3 }
//       ]
//     },
//     {
//       id: 2,
//       date: '2024-01-05',
//       customerName: 'Jane Smith',
//       total: 220,
//       products: [
//         { id: 3, name: 'Product C', price: 70, quantity: 2 },
//         { id: 1, name: 'Product A', price: 50, quantity: 3 }
//       ]
//     },
//     {
//       id: 3,
//       date: '2024-01-10',
//       customerName: 'Bob Johnson',
//       total: 180,
//       products: [
//         { id: 2, name: 'Product B', price: 25, quantity: 4 },
//         { id: 3, name: 'Product C', price: 70, quantity: 1 }
//       ]
//     }
//   ];


function loadData(){
    axios.get("http://127.0.01:8081/sales")
    .then((res)=>{
        console.log(res.data)
        setchartdata(res.data.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
React.useEffect(()=>{
    loadData()
},[])


  const xAxisData = chartdata.map(entry => entry.sdate);
  const yAxisData = chartdata.map(entry => entry.grandtotal);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={[{ type: 'bar', data: yAxisData }]} 
      width={300}
      height={300}
    />
  );
}