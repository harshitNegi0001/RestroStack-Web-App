import { IoKey } from "react-icons/io5";
import MainPagesHeader from "../../components/MainPagesHeader";
import {  useState } from "react";
import BackdropPage from "../../components/BackdropPage";
import GenerateInviteToken from "../../components/GenerateInviteTokenPage";




export default function StaffPage() {
    const [showGenerateToken,setShowGenerateToken] = useState(false);
   

    return (

        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center">
            
            <MainPagesHeader
                pageHeading={'Staff Management'}
                tagline={'Streamline team management, track performance, send invites, and review join requests.'}
                containBtn={true} btnData={{ iconStart: <IoKey />, text: 'Generate Invite Token' ,onClick:()=>setShowGenerateToken(prev=>!prev)}}
            />

            <BackdropPage isOpen={showGenerateToken} onClose={()=>setShowGenerateToken(false)} >
                <GenerateInviteToken onClose={()=>setShowGenerateToken(false)}/>
            </BackdropPage>
            <div>

            </div>
        </div>
    )
}