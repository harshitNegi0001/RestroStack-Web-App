import MainPagesHeader from "../../components/MainPagesHeader";
import { useState } from "react";
import BackdropPage from "../../components/BackdropPage";
import { MdOutlineAdd } from "react-icons/md";
import CreateNewjob from "../../components/CreateNewJob";



export default function JobPosts() {
    const [showNewJob,setShowNewJob] = useState(false);

    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center">
            <MainPagesHeader
                pageHeading={'Job Posts'}
                tagline={'Create jobs, track applications, and manage hiring in your restaurant.'}
                containBtn={true} btnData={{ iconStart: <MdOutlineAdd/>, text: 'Post new job', onClick: () => setShowNewJob(prev => !prev) }}
            />
            <BackdropPage isOpen={showNewJob} onClose={()=>setShowNewJob(false)} >
                            <CreateNewjob onClose={()=>setShowNewJob(false)}/>
                        </BackdropPage>
        </div>
    )
}