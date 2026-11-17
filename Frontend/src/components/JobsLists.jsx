import React, { useEffect, useState } from 'react'
import JobFilterComponent from '../subComponents/JobFilter'
import DisplayJobsList from './DisplayJobsList';

const allDepartments = [
  {
    id:1,
    label:'Management',
    value:'management'
  },
  {
    id:2,
    label:'Bar',
    value:'bar'
  },
  {
    id:3,
    label:'Culinary',
    value:'culinary'
  },
  
]
function JobsLists() {
  const [jobsList,setJobsList] = useState([]);
  const [department,setDepartment] = useState(null);
  const [searchValue,setSearchValue] = useState('');
  const [bounceSearch,setBounceSearch] = useState('');
  const [jobStatus,setJobStatus] = useState(null);
  useEffect(()=>{
    const bounceTimer =setTimeout(()=>{
      setBounceSearch(searchValue);
    },[3000]);
    return ()=>{
      clearTimeout(bounceTimer);
    }
  },[searchValue])
  useEffect(()=>{
    // api call.
  },[bounceSearch,department,jobStatus]);
  
  return (
    <div className="w-full flex flex-col gap-3">
    <JobFilterComponent department={department} setDepartment={setDepartment} allDepartments={allDepartments}
      jobStatus={jobStatus} setJobStatus={setJobStatus} 
      searchValue={searchValue} setSearchValue={setSearchValue} />
    {
      jobsList?.length>0?
      <></>:
      <DisplayJobsList />
    }
    </div>
  )
}

export default JobsLists
