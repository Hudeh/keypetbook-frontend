import React from 'react';
import DataTable from 'react-data-table-component';

const Report =({columns,data}) => {  
  return (
    <div className="report">
      <p>Please click ot the button on the sidebar to read csv file</p>
      <h6>Read CSV file</h6>
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
}
 
export default Report;