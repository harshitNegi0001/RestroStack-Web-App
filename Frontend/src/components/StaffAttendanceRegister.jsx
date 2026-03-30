import { useState } from "react";
import EmployeeFilter from "./EmployeeFilterContainer";
import { FiCalendar } from "react-icons/fi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { roles } from "../utils/clientSideData/staffPageVariables";
import SegmentOptions from "./SegmentOptions";
import { MdOutlineEdit } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";


const attendanceTabs =[
    {
        id:1,
        icon:<MdOutlineEdit />,
        title:'Mark Attendance',
        page:'mark-attendance'
    },
    {
        id:2,
        icon:<TbReportAnalytics />,
        title:'View Reports',
        page:'view-reports'
    }
]

export default function StaffAttendance() {
    const [searchValue, setSearchValue] = useState('');
    const [role, setRole] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTab,setSelectedTab] = useState(attendanceTabs[0]);
    const formatDateForInput = (date) => date.toISOString().split('T')[0];

    const formatDateForDisplay = (date) => {
        return date.toLocaleDateString('en-GB'); // en-GB format dd/mm/yyyy deta hai
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const handleDateChange = (e) => {
        if (e.target.value) {
            setSelectedDate(new Date(e.target.value));
        }
    };
    return (
        <div className="w-full flex flex-col gap-3">

            <EmployeeFilter role={role} setRole={setRole} roles={roles} searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="w-full flex flex-col items-center gap-2">
                <SegmentOptions activeOption={selectedTab} options={attendanceTabs} setActiveOption={setSelectedTab}   />
                <div className="w-full flex flex-row justify-start px-2 ">
                    <div className="border-1 w-[230px] h-[40px] bg-toast-bg/60 border-divider rounded-lg p-1 flex gap-1 items-center justify-between text-low-text/70">
                        <FaChevronLeft
                            className="cursor-pointer hover:text-primary"
                            onClick={() => changeDate(-1)}
                        />

                        <div className="relative flex items-center gap-2  cursor-pointer">
                            <label htmlFor="date-picker" className="flex items-center gap-2 cursor-pointer">
                                <FiCalendar className="text-lg" />
                                <span className="text-sm font-medium select-none">
                                    {formatDateForDisplay(selectedDate)}
                                </span>
                            </label>

                            <input
                                type="date"
                                id="date-picker"
                                value={formatDateForInput(selectedDate)}
                                onChange={handleDateChange}
                                className="absolute opacity-0 w-0 h-0 overflow-hidden"
                            />
                        </div>

                        <FaChevronRight
                            className="cursor-pointer hover:text-primary"
                            onClick={() => changeDate(1)}
                        />
                    </div>
                </div>

                {/* attendance box */}
            </div>
        </div>

    )
}