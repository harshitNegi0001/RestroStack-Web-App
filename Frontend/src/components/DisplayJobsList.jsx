import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiSearch, FiBriefcase } from 'react-icons/fi';
import NoJobs from '../utils/illustrations/NoJobs';

// Sample initial data representing jobs
const initialJobs = [
  { id: 1, roleName: 'Senior Frontend Engineer', applications: 48, status: 'Active' },
  { id: 2, roleName: 'Product Manager (Growth)', applications: 24, status: 'Paused' },
  { id: 3, roleName: 'Backend Systems Architect', applications: 12, status: 'Active' },
  { id: 4, roleName: 'UI/UX Design Lead', applications: 35, status: 'Paused' },
  { id: 5, roleName: 'DevOps & Infrastructure Engineer', applications: 19, status: 'Active' },
];

export default function JobShowcase() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  // Ref to handle outside click for closing the action dropdown
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers for job actions
  const handleToggleStatus = (id) => {
    setJobs(jobs.map(job => {
      if (job.id === id) {
        const newStatus = job.status === 'Active' ? 'Paused' : 'Active';
        return { ...job, status: newStatus };
      }
      return job;
    }));
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
    setActiveMenuId(null);
  };

  // Filter and search logic
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'All' || job.status === filter;
    const matchesSearch = job.roleName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full  bg-card-bg rounded-xl shadow-sm  ">
      
      

      {/* Responsive Table / Card Container */}
      <div className="border border-divider rounded-lg overflow-hidden">
        <div className="overflow-x-auto ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-divider bg-toast-bg">
                <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-sec-text">Role Name</th>
                <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-sec-text">Applications</th>
                <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-sec-text">Status</th>
                <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-sec-text text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-divider/10 transition-colors">
                    {/* Role Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        
                        <span className="font-medium text-main-text text-sm sm:text-base">{job.roleName}</span>
                      </div>
                    </td>

                    {/* Applications */}
                    <td className="py-4 px-4 text-sm text-sec-text">
                      <span className="font-semibold text-main-text">{job.applications}</span> candidates
                    </td>

                    {/* Status with exact requested styling */}
                    <td className="py-4 px-4">
                      {job.status === 'Active' ? (
                        <span className="text-green-600 bg-green-600/20 py-1.5 sm:py-1 px-2 rounded-2xl text-xs font-medium inline-block">
                          Active
                        </span>
                      ) : (
                        <span className="text-orange-600 bg-orange-600/20 py-1.5 sm:py-1 px-2 rounded-2xl text-xs font-medium inline-block">
                          Paused
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="py-4 px-4 text-right relative">
                      <div className="inline-block" ref={activeMenuId === job.id ? menuRef : null}>
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === job.id ? null : job.id)}
                          className="p-1.5 hover:bg-divider/20 rounded-full text-low-text hover:text-main-text transition-colors"
                          aria-label="Actions menu"
                        >
                          <HiOutlineDotsHorizontal className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === job.id && (
                          <div className="absolute right-4 bottom-0 mt-1 w-48 bg-card-bg rounded-lg shadow-lg border border-divider py-1 z-20 text-left">
                            <button
                              onClick={() => handleToggleStatus(job.id)}
                              className="w-full px-4 py-2 text-sm text-main-text hover:bg-green-600/10 flex items-center gap-2"
                            >
                              {job.status === 'Active' ? 'Pause Recruitment' : 'Resume Recruitment'}
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-600/10 flex items-center gap-2"
                            >
                              Delete Post
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr >
                  <td colSpan="4" className="py-8 px-4">
                    <div className="flex flex-col items-center justify-center gap-1 w-full max-w-sm mx-auto">
                      <div className="w-full max-w-[240px] sm:max-w-[300px]">
                        <NoJobs className="w-full h-auto object-contain" />
                      </div>
                      <p className="text-low-text text-sm text-center">
                        No job postings found matching your criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
