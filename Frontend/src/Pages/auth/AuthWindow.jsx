import applogo from '../../assets/appLogo.png'
import { useNavigate } from 'react-router-dom';


export default function AuthWindow() {



    const navigate = useNavigate();

    return (
        <div

            className="w-dvw min-h-dvh flex justify-center items-center p-4 ">
            <div
                className="w-[100%] max-w-[550px]  flex flex-col items-center gap-4 justify-center bg-half-trans-bg border-2 border-divider p-3 md:p-5 py-8 rounded-2xl">
                <div
                    className="w-[80px] h-[80px] bg-green-900/30 rounded-2xl flex justify-center items-center"
                >
                    <img src={applogo} className='w-[55px] h-[55px] object-contain' alt="" />

                </div>
                <div className='flex flex-col gap-0 items-center text-center'>
                    <h1
                        className="text-[30px] md:text-[34px] lg:text-[38px] 
                    text-main-text font-[600] font-['Betania Patmos']"
                    >
                        RestroStack
                    </h1>
                    <span className='text-low-text/70 font-[400]
                    text-[12px] md:text-[14px] lg:text-[16px]'>
                        Complete restaurant management solution for modern businesses
                    </span>


                </div>
                <div className='w-full flex flex-col gap-2'>
                    <button onClick={()=>navigate('/login')}
                        className='w-full mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                         to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                         shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>
                        Log In
                    </button>
                    <button onClick={()=>navigate('/register')}
                            className='w-full mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-active-border/70 bg-transparent text-[13px] md:text-[15px] lg:text-[17px] font-[600]
                        border-active-border/70 border-1 hover:border-active-border/80 active:border-active-border active:bg-divider/10 hover:text-active-border/80 active:text-active-border
                         shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'>
                            Create Account
                        </button>
                    {/* Authentication options */}
                </div>

                <div
                    className='w-full text-center flex justify-center items-center mt-2'>
                    <span className='text-low-text/70  text-[12px]  md:text-[14px] lg:text-[16px]'>
                        Start managing your restaurant efficiently today
                    </span>

                </div>

            </div>
        </div>
    )
}