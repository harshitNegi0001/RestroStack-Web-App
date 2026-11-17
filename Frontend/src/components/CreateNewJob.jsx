import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

export default function CreateNewjob({ onClose }) {
  const [isLoading,setIsLoading] = useState(false);
  return (
    <div
      className="w-[100dvw] max-h-[100dvh] sm:w-[550px] sm:h-fit bg-card-bg sm:rounded-2xl
        flex flex-col gap-2 shadow-2xl"
    >
      {/* --- HEADER --- */}
      <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-4 border-b border-divider">
        <button
          onClick={onClose}
          className="p-1.5 sm:hidden flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10"
        >
          <IoArrowBack />
        </button>
        <div className="flex-1 flex flex-col">
          <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
            Post A Job Opening
          </h6>
          <span className="text-low-text/70 text-[10px] md:text-[11px]">
            Publish a new job opening to hire talent for your restaurant.
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10"
        >
          <IoClose />
        </button>
      </div>

      {/* --- FORM BODY --- */}
      <div className="flex-1 overflow-y-auto show-custom-scrollbar p-4 flex flex-col gap-6">
        
        {/* Basic Info Section */}
        <div className="flex flex-col gap-3">
          <h6 className="text-[13px] md:text-[15px] font-[500] text-main-text">Basic Info</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Job Title</label>
              <select className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text">
                <option value=""  selected className="text-low-text bg-toast-bg">Select Role</option>
                <option value="chef" className="bg-toast-bg text-main-text hover:bg-active-border/30">Head Chef</option>
                <option value="cook" className="bg-toast-bg text-main-text hover:bg-active-border/30">Line Cook</option>
                <option value="server" className="bg-toast-bg text-main-text hover:bg-active-border/30">Server</option>
                <option value="manager" className="bg-toast-bg text-main-text hover:bg-active-border/30">Manager</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Department</label>
              <select className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text">
                <option value=""  selected className="text-low-text bg-toast-bg">Select department</option>
                <option value="culinary" className="bg-toast-bg text-main-text hover:bg-active-border/30">Culinary</option>
                <option value="foh" className="bg-toast-bg text-main-text hover:bg-active-border/30">Front of House</option>
                <option value="management" className="bg-toast-bg text-main-text hover:bg-active-border/30">Management</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Number of Openings</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text"
              />
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="flex flex-col gap-3">
          <h6 className="text-[13px] md:text-[15px] font-[500] text-main-text">Schedule</h6>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] md:text-[14px] text-sec-text">Employment Type</label>
            <div className="flex flex-wrap items-center gap-5 mt-1">
              {/* <label className="flex items-center gap-2 text-[13px] md:text-[15px] text-main-text cursor-pointer">
                <input type="radio" name="empType" className="w-3.5 h-3.5" /> Full-time
              </label>
              <label className="flex items-center gap-2 text-[13px] md:text-[15px] text-main-text cursor-pointer">
                <input type="radio" name="empType" className="w-3.5 h-3.5" /> Part-time
              </label>
              <label className="flex items-center gap-2 text-[13px] md:text-[15px] text-main-text cursor-pointer">
                <input type="radio" name="empType" className="w-3.5 h-3.5" /> Contract
              </label> */}
              <select className=" bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text">
                <option value=""  selected className="text-low-text bg-toast-bg">Select type</option>
                <option value="full_time" className="bg-toast-bg text-main-text hover:bg-active-border/30">Full Time</option>
                <option value="part_time" className="bg-toast-bg text-main-text hover:bg-active-border/30">Part Time</option>
                <option value="contract" className="bg-toast-bg text-main-text hover:bg-active-border/30">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Compensation Section */}
        <div className="flex flex-col gap-3">
          <h6 className="text-[13px] md:text-[15px] font-[500] text-main-text">Compensation (Optional)</h6>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Salary Range (Min)</label>
              <input
                type="number"
                placeholder="Min"
                className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Salary Range (Max)</label>
              <input
                type="number"
                placeholder="Max"
                className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text"
              />
            </div>
            {/* <div className="flex flex-col gap-1.5">
              <label className="text-[12px] md:text-[14px] text-sec-text">Currency</label>
              <select className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text">
                <option value="inr" className="bg-toast-bg text-main-text hover:bg-active-border/30">INR</option>
                <option value="usd" className="bg-toast-bg text-main-text hover:bg-active-border/30">USD</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-3">
          <h6 className="text-[13px] md:text-[15px] font-[500] text-main-text">Description</h6>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] md:text-[14px] text-sec-text">Job Description</label>
            <textarea
              rows="3"
              placeholder="Describe the role, responsibilities, and qualifications..."
              className="w-full bg-transparent outline outline-1 outline-divider focus:outline-2 focus:outline-active-border rounded-md px-3 py-2 text-[13px] md:text-[15px] text-main-text resize-none"
            ></textarea>
          </div>
        </div>

      </div>

      {/* --- FOOTER BUTTONS --- */}
      <div className="flex flex-row justify-center gap-4 p-4 border-t border-divider mt-auto sm:rounded-b-2xl">
        <button
        disabled={isLoading} className="bg-green-500 hover:opacity-90 text-white text-[13px] md:text-[15px] font-[500] px-6 py-2 rounded-md transition-colors">
          Publish Job
        </button>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="bg-transparent outline outline-1 outline-divider hover:bg-main-text/5 text-main-text text-[13px] md:text-[15px] font-[500] px-6 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}