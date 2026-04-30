import { LuCheck, LuX } from "react-icons/lu"


const btnColor = {
    'warning':'bg-linear-0 to-orange-500 from-orange-600 hover:from-orange-700 active:to-orange-700 ',
    'error':'bg-linear-0 to-red-500 from-red-600 hover:from-red-700 active:to-red-700 ',
    'success':'bg-linear-0 to-green-500 from-green-600 hover:from-green-700 active:to-green-700 ',
    'info':'bg-linear-0 to-sky-500 from-sky-600 hover:from-sky-700 active:to-sky-700 '
}

export default function AlertBox ({type,title,desc,confirmFunction,data,loadingBtn,onCancel}){

    return(
        <div 
        className=" max-w-[90%] w-[320px] md:w-[450px] p-3 sm:p-4 rounded-2xl flex flex-col gap-3
                bg-card-bg shadow-black/30 shadow-md">
            <div className="w-full flex flex-col gap-1">
                <div className="w-full text-[16px] md:text-[18px] font-[600] text-main-text">
                    {title}
                </div>
                <div className="w-full text-[11px] md:text-[12px] text-low-text/70 whitespace-pre-line">
                    {desc}
                </div>
            </div>

            <div className="w-full flex justify-end gap-3 items-center">
                <button onClick={()=>onCancel()}
                disabled={loadingBtn}
                className={`${loadingBtn?'text-low-text/70':'text-main-text hover:bg-divider/50 active:bg-divider/70'}
                rounded-md px-3 py-2 text-[16px] md:text-[18px]`}>
                    <LuX/>
                </button>
                <button onClick={()=>confirmFunction(data)}
                    disabled={loadingBtn}
                    className={`${(loadingBtn)?'bg-divider text-low-text':
                        `${btnColor[type]} active:scale-97 shadow-black/30 shadow:md hover:shadow-lg active:shadow-sm text-white`}
                     rounded-md px-3 py-2 text-[16px] md:text-[18px] flex items-center justify-center`}>
                    
                    {loadingBtn ? <svg className="animate-spin   h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> : <LuCheck />}
                </button>
            </div>
        </div>
    )
}