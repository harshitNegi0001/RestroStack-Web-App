import ComingSoonSvg from "../../utils/illustrations/ComingSoonSvg";




export default function ({ customStyle }) {
    return (
        <div className={`flex-1 w-full min-h-0 flex flex-col overflow-y-auto show-custom-scrollbar  ${customStyle} `}>
            <div className="w-full flex flex-col my-auto items-center text-center py-3">
                <div className="w-full max-w-[300px] px-3">
                    <ComingSoonSvg className="w-full" />
                </div>
                <div className="text-center mt-0 flex flex-col gap-1.5">
                    <h3 className="text-[17px] sm:text-[24px] font-semibold text-main-text">
                        Coming soon!
                    </h3>
                    <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[430px] leading-snug">
                        This Feature/Page is queued for next update. Stay tuned with us.
                    </p>
                </div>
            </div>


        </div>
    )
}