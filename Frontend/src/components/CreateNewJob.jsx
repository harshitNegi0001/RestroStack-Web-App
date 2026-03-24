import { IoClose } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

export default function CreateNewjob({onClose}) {
    return (
        <div 
        className="w-[100dvw] h-[100dvh] sm:w-[450px] sm:h-fit  bg-card-bg sm:rounded-2xl
        flex flex-col gap-2">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">
                
                <button onClick={onClose}
                 className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack/>
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                    Create New Job Post
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        Create a new job posting for your restaurant.
                    </span>
                </div>
                
                <button onClick={onClose}
                 className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose/>
                </button>
            </div>

            <div>
                {/* canclebtn */}
                {/* createbtn */}
            </div>
        </div>
    )
}