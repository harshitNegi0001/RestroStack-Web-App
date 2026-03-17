import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineVpnKey } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { registerUser } from '../../Apis/Auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux';
import { setState } from '../../Store/Auth/authReducer';


export default function Register() {
    const [state, setInputState] = useState({
        name: '',
        email: '',
        pass: '',
        confirmPass: ''
    });
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [inputError, setInputError] = useState({
        name: '',
        email: '',
        pass: '',
        confirmPass: ''
    });
    const [visible, setVisible] = useState({
        pass: false,
        confirmPass: false
    });


    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        const successFunction =(userInfo)=>{
            dispatch(setState({userInfo:userInfo}));
            navigate('/verify-email', { state: { email: state.email,prev:'/register',otp_type:'verification' } });
        }
        await registerUser(e, state, setIsLoadingBtn, setInputError,successFunction);
    }

    return (
        <div

            className="w-dvw min-h-dvh flex justify-center items-center p-2">
            <div
                className="w-[100%] max-w-[500px] flex flex-col items-center gap-3 justify-center bg-half-trans-bg border-2 border-divider p-5 rounded-2xl">
                <div
                    className='w-full flex justify-start '>
                    <div onClick={() => navigate('/auth-window')}
                        className='w-fit p-2 text-low-text/70 text-[12px] md:text-[14px] lg:text-[16px] hover:text-low-text/80 gap-1 flex items-center cursor-pointer active:text-low-text'>
                        <IoMdArrowRoundBack />
                        <span>Back</span>
                    </div>
                </div>
                <div className='w-full'>
                    <form onSubmit={handleRegister}
                        className='w-full flex flex-col gap-3 items-center'
                    >
                        <div
                            className='flex flex-col items-center text-center'>
                            <h4 className='text-sec-text font-[600]
                        text-[20px] md:text-[24px] lg:text-[28px]
                        '>
                                Create account
                            </h4>
                            <span
                                className='text-low-text/70
                        text-[12px] md:text-[14px] lg:text-[16px]'>
                                Get started with your restaurant management
                            </span>
                        </div>
                        <div className='w-full flex flex-col gap-0 relative pb-2'>

                            <div
                                className='w-[100%] flex flex-col gap-1 relative'>
                                <label htmlFor="email-input"
                                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Email</label>

                                <label htmlFor='email-input'
                                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                                    <HiOutlineMail />
                                </label>
                                <input id='email-input' type="email"
                                    value={state.email} onChange={(e) => setInputState(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder='Enter your email' required
                                    onFocus={() => setInputError(prev => ({ ...prev, email: '' }))}
                                    className={`
                                    ${inputError.email ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                            </div>
                            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.email}</span>
                        </div>
                        <div className='w-full flex flex-col gap-0 relative pb-2'>

                            <div
                                className='w-[100%] flex flex-col gap-1 relative'>
                                <label htmlFor="name-input"
                                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Full Name</label>

                                <label htmlFor='name-input'
                                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                                    <FaRegUser />
                                </label>
                                <input id='name-input' type="text"
                                    value={state.name} onChange={(e) => setInputState(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder='Enter your full name' required
                                    onFocus={() => setInputError(prev => ({ ...prev, name: '' }))}
                                    className={`
                                    ${inputError.name ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                            </div>
                            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.name}</span>
                        </div>
                        <div className='w-full flex flex-col gap-0 relative pb-2'>

                            <div
                                className='w-[100%] flex flex-col gap-1 relative'>
                                <label htmlFor="pass-input"
                                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Password</label>

                                <label htmlFor='pass-input'
                                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                                    <HiOutlineLockClosed />
                                </label>
                                <span onClick={() => setVisible(prev => ({ ...prev, pass: !prev.pass }))}
                                    className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-low-text flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[16px] md:text-[18px]'>{visible.pass ? <FaEyeSlash title='hide' /> : <FaEye title='show' />}</span>
                                <input id='pass-input' type={visible.pass ? 'text' : 'password'}
                                    placeholder='Create a password' required
                                    onFocus={() => setInputError(prev => ({ ...prev, pass: '' }))}
                                    value={state.pass} onChange={(e) => setInputState(prev => ({ ...prev, pass: e.target.value }))}
                                    className={`
                                    ${inputError.pass ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                            </div>
                            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.pass}</span>
                        </div>
                        <div className='w-full flex flex-col gap-0 relative pb-2'>
                            <div
                                className='w-[100%] flex flex-col gap-1 relative'>
                                <label htmlFor="confirm-pass-input"
                                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Confirm Password</label>

                                <label htmlFor='confirm-pass-input'
                                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                                    <MdOutlineVpnKey />
                                </label>
                                <span onClick={() => setVisible(prev => ({ ...prev, confirmPass: !prev.confirmPass }))}
                                    className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-low-text flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[16px] md:text-[18px]'>{visible.confirmPass ? <FaEyeSlash title='hide' /> : <FaEye title='show' />}</span>
                                <input id='confirm-pass-input' type={visible.confirmPass ? 'text' : 'password'}
                                    placeholder='Confirm your password' required
                                    onFocus={() => setInputError(prev => ({ ...prev, confirmPass: '' }))}
                                    value={state.confirmPass} onChange={(e) => setInputState(prev => ({ ...prev, confirmPass: e.target.value }))}
                                    className={`
                                    ${inputError.confirmPass ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 px-9 md:px-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />

                            </div>
                            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.confirmPass}</span>
                        </div>
                        <button
                            type='submit'
                            disabled={isLoadingBtn}
                            className={`w-full mt-3 h-[35px] md:h-[50px] rounded-lg bg-linear-0 text-white text-[13px] md:text-[15px] lg:text-[17px] font-[600] flex items-center justify-center
                         
                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                            {isLoadingBtn ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> : null}
                            {
                                isLoadingBtn ? <span className='text-white/80'>Processing...</span> : 'Create Account'
                            }
                        </button>

                    </form>
                    {/* login form */}
                </div>
                <div className='flex items-center justify-center gap-1.5 w-full'>
                    {/* divider */}
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                    <span className='text-low-text/70 '>or</span>
                    <div className='border-b-1 border-divider/60 w-[42%]'></div>
                </div>
                <div
                    className='w-full text-center flex justify-center items-center gap-1'>
                    <span className='text-sec-text  text-[13px] md:text-[15px] lg:text-[17px]'>
                        Already have an account?
                    </span>
                    <span onClick={() => navigate('/login')}
                        className='text-active-border/70 active:text-active-border font-[600]  text-[13px] md:text-[15px] lg:text-[17px]
                    hover:underline active:underline  cursor-pointer'>Log In</span>
                </div>

            </div>
        </div>
    )
}