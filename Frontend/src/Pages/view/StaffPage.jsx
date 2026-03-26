import { IoKey } from "react-icons/io5";
import MainPagesHeader from "../../components/MainPagesHeader";
import { useState } from "react";
import BackdropPage from "../../components/BackdropPage";
import GenerateInviteToken from "../../components/GenerateInviteTokenPage";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserPlus } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import SegmentOptions from "../../components/SegmentOptions";
import StaffDirectory from "../../components/StaffDirectory";
import SubStatsCard from "../../components/SubStatsCard";
import { TbWaveSawTool } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineCheckCircle } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

const StaffOption = [
    {
        id: 1,
        icon: <HiOutlineUsers />,
        title: 'Employees',
        page: 'staff-list'
    },
    {
        id: 2,
        icon: <MdOutlineCheckCircle />,
        title: 'Attendance',
        page: 'attendance'
    },
    {
        id: 3,
        icon: <LuInbox />,
        title: 'Request box',
        page: 'staff-req'
    },
]

const subStatsCard = [
    {
        id: 1,
        title: 'Total Staff',
        value: '10',
        icon: <HiOutlineUsers />,
        color: 'sky'
    },
    {
        id: 2,
        title: 'Active now',
        value: '5',
        icon: <MdOutlineCheckCircle />,
        color: 'green'
    },
    {
        id: 3,
        title: 'On break',
        value: '2',
        icon: <RiErrorWarningLine />,
        color: 'orange'
    },
    {
        id: 4,
        title: 'Attendance',
        value: '80%',
        icon: <TbWaveSawTool />,
        color: 'green'
    },

]

export default function StaffPage() {
    const [showGenerateToken, setShowGenerateToken] = useState(false);
    const [activeStaffOption, setActiveStaffOption] = useState(StaffOption[0]);
    return (

        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">

            <MainPagesHeader
                pageHeading={'Staff Management'}
                tagline={'Streamline team management, track performance, send invites, and review join requests.'}
                containBtn={true} btnData={{ iconStart: <IoKey />, text: 'Generate Invite Token', onClick: () => setShowGenerateToken(prev => !prev) }}
            />

            <BackdropPage isOpen={showGenerateToken} onClose={() => setShowGenerateToken(false)} >
                <GenerateInviteToken onClose={() => setShowGenerateToken(false)} />
            </BackdropPage>

            <div
                className="w-full container mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
                {
                    subStatsCard.map(c =>
                        <SubStatsCard data={c} key={c.id} />
                    )
                }
            </div>

            <SegmentOptions options={StaffOption} activeOption={activeStaffOption} setActiveOption={setActiveStaffOption} />
            {
                activeStaffOption.page == 'staff-list' && <StaffDirectory />
            }
            {
                activeStaffOption.page == 'attendance' && <StaffDirectory />
            }
            
        </div>
    )
}