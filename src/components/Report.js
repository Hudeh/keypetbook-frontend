import React from 'react'

const Report = ({covid_csv}) => {
return (

         <div className="report report">
         <h1>Table Covid Report</h1>
              <table>
    <tr>

      <th>continent</th>
      <th>location</th>
      <th>date</th>
      <th>total_cases</th>
      <th>cases_per_million</th>
      <th>total_deaths</th>
      <th>new_deaths</th>
      <th>cases_smoothed</th>
    </tr>
    {covid_csv.length ?
    	(covid_csv.map(data =>{
        return data.africa.map((africa)=>{
            const {continent,location,date,total_cases,new_cases,total_cases_per_million,
        total_deaths,new_deaths_smoothed_per_million,new_cases_smoothed} = africa;
          return(
                <tr>
      <td>{continent}</td>
      <td>{location}</td>
      <td>{date}</td>
      <td>{total_cases}</td>
      <td>{total_deaths}</td>
      <td>{new_cases}</td>
      <td>{new_deaths_smoothed_per_million}</td> 
      <td>{new_cases_smoothed}</td>
      <td>{total_cases_per_million}</td>
    </tr>
            )
        })
    })):
     ( <div>
         <p>loading data from server pls wait.....<span>Heroku takes time to import large csv on free plan</span></p>
        <p>Upgrade plan</p>
      </div>
     )
}
  </table>
         </div>
    )
}

export default Report
