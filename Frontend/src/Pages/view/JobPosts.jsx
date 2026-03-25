import MainPagesHeader from "../../components/MainPagesHeader";
import { useState } from "react";
import BackdropPage from "../../components/BackdropPage";
import { MdOutlineAdd } from "react-icons/md";
import CreateNewjob from "../../components/CreateNewJob";
import { LuBadgeCheck } from "react-icons/lu";
import { FaRegCirclePause } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuBriefcaseBusiness } from "react-icons/lu";
import SubStatsCard from "../../components/SubStatsCard";

const subStatsCard = [
    {
        id: 1,
        title: 'Active Posts',
        value: '5',
        icon: <LuBriefcaseBusiness />,
        color: 'green'
    },
    {
        id: 2,
        title: 'Total Applicants',
        value: '50',
        icon: <HiOutlineUsers />,
        color: 'sky'
    },
    {
        id: 3,
        title: 'shortlisted',
        value: '8',
        icon: <LuBadgeCheck />,
        color: 'green'
    },
    {
        id: 4,
        title: 'Paused posts',
        value: '2',
        icon: <FaRegCirclePause />,
        color: 'yellow'
    },

]



export default function JobPosts() {
    const [showNewJob, setShowNewJob] = useState(false);

    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center">
            <MainPagesHeader
                pageHeading={'Job Posts'}
                tagline={'Create jobs, track applications, and manage hiring in your restaurant.'}
                containBtn={true} btnData={{ iconStart: <MdOutlineAdd />, text: 'Post new job', onClick: () => setShowNewJob(prev => !prev) }}
            />
            <BackdropPage isOpen={showNewJob} onClose={() => setShowNewJob(false)} >
                <CreateNewjob onClose={() => setShowNewJob(false)} />
            </BackdropPage>

            <div
                className="w-full mt-5 container grid grid-cols-2 md:grid-cols-4 gap-2">
                {
                    subStatsCard.map(c =>
                        <SubStatsCard data={c} key={c.id} />
                    )
                }
            </div>
        </div>
    )
}