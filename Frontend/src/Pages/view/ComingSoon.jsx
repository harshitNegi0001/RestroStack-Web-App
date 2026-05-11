



export default function ({ customStyle }) {
    return (
        <div className={`flex-1 w-full min-h-0 flex flex-col overflow-y-auto show-custom-scrollbar items-center gap-2 text-center justify-center ${customStyle} `}>
            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1777531095/s5jyarggmjiac04tsaif.png" alt=""
                className="w-[100%] max-w-[450px] object-contain mb-3" />
            <div className="w-full flex flex-col items-center text-center gap-1">
                <div className="w-full text-[24px] md:text-[27px] font-[600] uppercase text-main-text">
                    Coming soon
                </div>
                <div className="w-full text-[11px] sm:text-[13px] text-low-text/70">
                    This Feature/Page is queued for next update. Stay tuned with us.
                </div>
            </div>

        </div>
    )
}