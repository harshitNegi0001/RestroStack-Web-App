import { useSelector } from "react-redux";
import MainPagesHeader from "../../components/MainPagesHeader";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import BackdropPage from "../../components/BackdropPage";
import CreateNewRes from "../../components/CreateNewRes";
import TableSetupPage from "../../components/TableSetupPage";
import ResDetailPage from "../../components/RestaurantDetailPage";



export default function RestaurantManagementPage() {
    const { userInfo, role } = useSelector(state => state.auth);
    const [showCreateRes, setShowCreateRes] = useState(false);
    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <MainPagesHeader
                pageHeading={'My Restaurant'}
                tagline={`Control your brand's digital presence. Update logos, addresses, and core operational details from one place.`}
                containBtn={role == 'owner'} btnData={role == 'owner' ? { iconStart: <IoMdAdd />, text: 'Create New Restaurant', onClick: () => setShowCreateRes(prev => !prev) } : null}
            />

            <BackdropPage isOpen={showCreateRes} onClose={() => setShowCreateRes(false)} >
                <CreateNewRes onClose={() => setShowCreateRes(false)} />
            </BackdropPage>
            <TableSetupPage/>

            {/* Menu Page here */}
            
            <ResDetailPage />
        </div>
    )
}