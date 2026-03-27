





export default function LoadingInviteCard() {
    return (
        <div className="flex flex-col w-[90%] max-w-[350px] lg:max-w-[450px] items-center gap-3 bg-card-bg shadow-black/30 shadow-lg px-3 py-[70px] rounded-2xl">
            <div className="">
                <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1774597198/jffuvurfhiqi2gbaz5hb.png" alt=""
                    className="w-[60px] animate-pulse" />
                    {/* <span className="text-[20px] text-sec-text animate-pulse">Loading</span> */}
            </div>
            <div className="h-[30px] animate-wave w-[60%] rounded-lg my-4">

            </div>
            <div className="animate-wave h-[16px] w-[90%] rounded-lg">
            </div>
            <div className="animate-wave h-[16px] w-[90%] rounded-lg">
            </div>
            <div className="animate-wave h-[16px] w-[50%] rounded-lg">
            </div>
            <div className="flex px-3 flex-col items-center gap-2 w-full my-4">
                <div className="rounded-lg h-[40px] animate-pulse bg-divider/70 w-[50%]">

                </div>
                <div className="rounded-lg h-[40px] animate-pulse bg-divider/70 w-[50%]">

                </div>
            </div>

        </div>
    )
}