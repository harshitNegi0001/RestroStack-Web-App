




export default function RestrictionPage({ image='https://res.cloudinary.com/dns5lxuvy/image/upload/v1774678519/d56waceogm6fhcckdiao.png', title='Something Went Wrong', subtitle='Oops! Sorry, We are facing some error!', buttonData = { isButton: false } }) {
    return (
        <div className="min-h-[100dvh] min-w-[100dvw] flex flex-col justify-center items-center text-center gap-3">
            <div className="w-[90%] max-w-[500px]">
                <img src={image} alt=""
                    className="w-full object-contain " />
            </div>
            <div
                className="w-full max-w-[550px] flex flex-col items-center text-center">
                
                <h3
                    className="text-[30px] md:text-[34px] lg:text-[38px] 
                    text-main-text font-[600]">{title}</h3>
                <span
                    className="text-low-text/70  text-[11px]  md:text-[12px] lg:text-[14px]">
                    {subtitle}
                </span>
            </div>
            {
                buttonData?.isButton &&
                <button onClick={buttonData?.onClick}
                    className='w-[180px] md:w-[320px] mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                         to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                         shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>{buttonData?.text}
                </button>
            }

        </div>
    )
}