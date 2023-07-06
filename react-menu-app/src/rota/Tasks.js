import  Axios  from "axios";
import { useEffect,useState } from "react";
import "../Tasks.css";
import * as React from "react";
import { useTable } from "react-table";


function Tasks(){
    const [data,setData]= useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3008/api/tasks/').then(res =>{
                console.log("Getting data :::",res.data)
                setData(res.data)
    }).catch(err => console.log(err))
    
    },[])
   
    const columns = React.useMemo(() => [

    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Task",
        accessor: "text",
    },
    {
        Header: "Completed",
        accessor: "completed",
    }
],[]);

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

    return (
        <div className="App">
          <div className="container">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );

}
export default Tasks;