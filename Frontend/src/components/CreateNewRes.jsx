

import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import RestaurantSetup from "../Pages/auth/RestaurantSetup";





export default function CreateNewRes({ onClose }) {
    return (
        <div
            className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-fit max-h-[100dvh]  bg-card-bg sm:rounded-2xl
        flex flex-col ">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                            hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        Add New Restaurant
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        Enter the details for your new restaurant location to begin setup.
                    </span>

                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                            hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
                <RestaurantSetup />
            </div>

        </div>
    )
}