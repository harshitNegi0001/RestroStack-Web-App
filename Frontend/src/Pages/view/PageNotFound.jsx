import { useNavigate } from "react-router-dom"





export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div
            className="w-dvw min-h-dvh p-2 md:py-4 flex justify-center items-center ">
            <div
                className="w-full  flex flex-col items-center gap-2 ">
                <div 
                className="w-[100%] max-w-[500px]">
                    <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773224748/bpqjla7vww3zo0adcmom.png" 
                    alt="" 
                    className="w-full object-contain "/>
                </div>
                <div 
                className="w-full max-w-[550px] flex flex-col items-center text-center">
                    <span 
                    className="text-sec-text/90 text-[13px] md:text-[15px] lg:text-[17px]">Error 404</span>
                    <h3
                        className="text-[30px] md:text-[34px] lg:text-[38px] 
                    text-main-text font-[600]">Page not found!</h3>
                    <span
                    className="text-low-text/70  text-[11px]  md:text-[12px] lg:text-[14px]">
                        The page your'e trying to access doesn't exist or has been removed.
                    </span>
                </div>
                <button onClick={()=>navigate('/')}
                className='w-[180px] md:w-[320px] mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                         to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                         shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>Go Back Home</button>

            </div>
        </div>
    )
}