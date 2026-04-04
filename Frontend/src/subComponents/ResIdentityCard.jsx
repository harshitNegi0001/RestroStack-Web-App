import { useState } from "react"
import { IoCamera } from "react-icons/io5";
import { LuBuilding, LuBuilding2, LuPencil } from "react-icons/lu";
import { TbCameraPlus } from "react-icons/tb";




export default function ResIdentityCard({ isLoading = false }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [state, setInputState] = useState({
        res_name: '',
        email: '',
        phone_no: ''
    });
    const [inputError, setInputError] = useState({
        res_name: '',
        email: '',
        phone_no: ''
    })
    return (
        <div className="w-full flex flex-col gap-2 md:gap-3 ">
            <div className="flex w-full justify-between gap-2 items-center h-[30px]">
                <span className="text-low-text font-[500] text-[12px] md:text-[14px]">Restaurant Identity</span>
                {!isLoading && !openEdit &&
                    <div onClick={() => setOpenEdit(true)}
                        className="w-fit h-fit rounded-full p-2 flex items-center justify-center hover:bg-divider/30 active:bg-divider/50 text-low-text font-[500] text-[10px] md:text-[12px]">
                        <LuPencil />
                    </div>}
            </div>
            <div className="flex flex-row w-full items-start gap-4">
                <div className={`flex justify-center items-center size-[45px] md:size-[55px]  rounded-2xl 
                    ${openEdit ? 'bg-active-border/10 border-2 border-active-border/50 hover:border-active-border/70 active:border-active-border border-dashed text-[15px] md:text-[17px] text-active-border/50 hover:text-active-border/70 active:text-active-border' :
                        (isLoading) ? 'animate-wave' :
                            'bg-active-border/10 text-[28px] md:text-[30px] text-active-border'}`}>
                    {
                        !isLoading
                        &&
                        <>
                            {
                                false ?
                                    <img src="" alt="" /> :
                                    (openEdit) ?
                                        <TbCameraPlus /> :
                                        <LuBuilding2 />
                            }
                        </>
                    }

                </div>
                <div className="flex flex-1 flex-col max-w-[450px] min-w-0 p-1 gap-2">
                    {
                        isLoading ?
                            <>
                                {[1, 2, 3, 4].map(i => <div key={i} className="flex flex-col w-full my-3  gap-2">
                                    <span className="w-[70px] h-[14px] animate-wave rounded-2xl"></span>
                                    <span className="w-full max-w-[320px] animate-wave h-[14px] rounded-2xl"></span>
                                </div>)}
                            </> :
                            (openEdit) ?
                                <>
                                    <div className='w-full flex flex-col gap-0 relative pb-2'>

                                        <div
                                            className='w-[100%] flex flex-col gap-1 relative'>
                                            <label htmlFor="email-input"
                                                className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Email</label>

                                            <label htmlFor='email-input'
                                                className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                                            size-[30px] md:size-[34px] 
                                                                            text-[20px] md:text-[24px]'>
                                                {/* <HiOutlineMail /> */}
                                            </label>
                                            <input id='res_name-input' type="text"
                                                value={state.res_name} onChange={(e) => setInputState(prev => ({ ...prev, res_name: e.target.value }))}
                                                placeholder='Enter your email' required
                                                onFocus={() => setInputError(prev => ({ ...prev, res_name: '' }))}
                                                className={`${inputError.res_name ? 'border-red-600' : 'border-divider '}
                                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                                        </div>
                                        <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.res_name}</span>
                                    </div>
                                </> :
                                <>
                                </>
                    }
                </div>
            </div>
            {!isLoading && openEdit &&
                <div className="w-full flex justify-end p-3 ">
                    <button
                        onClick={() => {
                            setOpenEdit(false)
                        }}
                        disabled={isLoadingBtn}
                        className={`w-fit mt-3 py-2 px-3  rounded-lg bg-linear-0 text-white text-[13px] md:text-[14px] lg:text-[15px] font-[600] flex items-center justify-center
                         
                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                        {isLoadingBtn ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : null}
                        {
                            isLoadingBtn ? <span className='text-white/80'>Processing...</span> : 'Save'
                        }
                    </button>
                </div>}
        </div>
    )
}