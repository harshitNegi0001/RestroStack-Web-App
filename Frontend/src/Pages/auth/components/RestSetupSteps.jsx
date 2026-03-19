import { IoCallOutline } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
// import { FaCheck } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";


export default function RestSetupSteps({doneQueue,activeTab}) {

    return (
        <div
            className="w-full p-2 flex items-center gap-1 justify-center">
            {/* Steps section */}
            <div
                className={`p-2 md:px-3  rounded-4xl ${(activeTab=='basic-info'||doneQueue?.find(s=>s=='basic-info'))?'text-white bg-green-600':'bg-divider text-low-text/70'}  flex justify-center items-center gap-1
                text-[16px] md:text-[18px] lg:text-[20px]`}>
                {(doneQueue?.find(s=>s=='basic-info'))?<GiConfirmed />:<LuBuilding2 />}
                <span
                    className="text-[12px] md:text-[13px] lg:text-[14px] hidden md:block">Basic Info</span>
            </div>
            <div className="border-b-1 border-divider/80 w-[10%]"></div>
            <div
                className={`p-2 md:px-3 ${(activeTab=='contact'||doneQueue?.find(s=>s=='contact'))?'text-white bg-green-600':'bg-divider text-low-text/70'} rounded-4xl  flex justify-center items-center gap-1
                text-[16px] md:text-[18px] lg:text-[20px]`}>
                {(doneQueue?.find(s=>s=='contact'))?<GiConfirmed />:<IoCallOutline />}
                <span
                    className="text-[12px] md:text-[13px] lg:text-[14px] hidden md:block">Contact</span>
            </div>
            <div className="border-b-1 border-divider/80 w-[10%]"></div>
            <div
                className={`p-2 md:px-3 ${(activeTab=='details'||doneQueue?.find(s=>s=='details'))?'text-white bg-green-600':'bg-divider text-low-text/70'} rounded-4xl  flex justify-center items-center gap-1
                text-[16px] md:text-[18px] lg:text-[20px]`}>
                {(doneQueue?.find(s=>s=='details'))?<GiConfirmed />:<LuChefHat />}
                <span
                    className="text-[12px] md:text-[13px] lg:text-[14px] hidden md:block">Details</span>
            </div>
        </div>
    )
}