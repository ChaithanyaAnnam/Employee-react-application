import React, { useState, useEffect, useNavigate } from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getAllEmployees();
    
    }, []) 
    
    const getAllEmployees = () => {
        EmployeeService.getEmployees().then((response)=>{
            setEmployees(response.data)
            console.log(response.data);
          })
          .catch(error => {
            console.log(error)
          });
    }

    const deleteEmployee = (employeeId)=>{
        console.log(employeeId);
        EmployeeService.deleteEmployee(employeeId).then((response)=>{
            getAllEmployees();
        })
        .catch(error =>{
            console.log(error)
    });
 }
  return (
    <div style={{paddingBottom:"100px"}}>
    <h2 className="text-center">Employees List</h2>
    <Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
 
    <br></br>
    <div className="container">
        <table className='table table-stripped table-bordered'>
            <thead>
                <tr>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                    {
                        employees.map(
                            employee => 
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                    <button className="btn btn-danger" onClick={()=>deleteEmployee(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
            </tbody>
        </table>
    </div>

</div>
  )
}

export default ListEmployeeComponent