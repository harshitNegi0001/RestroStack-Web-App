

export default function MainPagesHeader({pageHeading,tagline,containBtn =false,btnData={}}) {
    return (
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex-1 flex flex-col gap-1 font-[Rubik]">
                <h4 className="text-main-text text-[20px]/5 md:text-[23px]/6 font-[500] ">{pageHeading}</h4>
                <span className="text-low-text/70 text-[11px]/4 md:text-[13px]/4">
                   {tagline}
                </span>
            </div>
            {containBtn&&<button
                onClick={btnData.onClick}
                // disabled={btnDisabled || isLoadingBtn}
                className={` mt-3 px-3 py-2 w-fit rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center gap-1 text-center justify-center
                             ${false || false ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>

                {btnData?.iconStart}
                
                   <span className="capitalize">{btnData?.text}</span>
                
            </button>}
        </div>
    )
}