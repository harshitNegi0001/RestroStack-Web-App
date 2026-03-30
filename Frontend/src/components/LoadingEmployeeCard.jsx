






export default function LoadingEmployeeCard() {

    return (
        <div className="rounded-2xl shadow-black/30 shadow-md animate-pulse p-2 bg-card-bg hover:bg-toast-bg/40 hover:scale-102 flex flex-col gap-3">
            <div className="flex flex-row justify-between gap-1">
                <div className="flex gap-1 items-center">
                    <div className={` size-[30px] text-[18px] rounded-[50%] flex justify-center items-center text-center`}>
                        <div className="animate-wave rounded-[50%] size-[30px]">
                        </div>
                    </div>
                    <div className="flex flex-col w-[100px] gap-1">
                        <span className="w-full animate-wave h-[12px] rounded-md"></span>
                        <span className={`w-[60px] animate-wave rounded-2xl h-[9px] `}></span>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <span className={`size-2 rounded-2xl animate-wave`}></span>
                    <span className={` w-[40px] h-[9px] animate-wave  rounded-2xl `}></span>
                </div>
            </div>
            <div className="w-full p-1  grid grid-cols-3 gap-2 ">
                {[1, 2, 3].map(i => <div key={i} className="  rounded-2xl animate-wave w-full  h-[40px]">
                </div>)}

            </div>
            <div className="w-full border-b-1 border-divider/50"></div>

            <div className="w-full flex justify-between py-1 px-3">
                <div className="rounded-2xl h-[40px] w-[60px] animate-wave"></div>

                                <div className="rounded-2xl h-[40px] w-[60px] animate-wave"></div>



            </div>
        </div >
    )
}