



export default function ({ customStyle }) {
    return (
        <div className={`w-full min-h-0 flex flex-col items-center gap-2 text-center ${customStyle} `}>
            <img src="https://pngtree.com/freepng/burger-with-floating-ingredient_15881303.html" alt=""
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