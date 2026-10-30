import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineLockClosed } from 'react-icons/hi';
import { resetPass } from '../../Apis/authApi';

function ResetPass() {
  const location = useLocation();
  const [inputState, setInputState] = useState({
    new_pass: '',
    old_pass: '',
    confirm_pass: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState({
    new_pass: true,
    old_pass: true,
    confirm_pass: true
  });
  const [inputError,setInputError] =useState({
    new_pass: '',
    confirm_pass: ''
  });
  const [searchParam] = useSearchParams();
  const redirectTo = searchParam.get('redirectTo');
  const  prev  = location?.state?.prev ?? '/reset-pass';
  const navigate = useNavigate();

const resetPassword = async()=>{
  function successFunction (){
    if(redirectTo){
      navigate(redirectTo);
      return;
    }
    navigate(`/`);
  }

  setIsLoading(true);
  await resetPass(prev,inputState.old_pass?.trim(),inputState.new_pass?.trim(),inputState.confirm_pass?.trim(),setInputError,successFunction);
  setIsLoading(false);
}
  return (
    <div
      className="w-dvw min-h-dvh flex justify-center items-center p-2">
      <div
        className="w-[100%] max-w-[500px] flex flex-col items-center gap-3 justify-center bg-half-trans-bg border-2 border-divider p-5 rounded-2xl">
        <div
          className="w-[70px] h-[70px] bg-green-900/30 rounded-2xl flex justify-center items-center"
        >
          <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1793363516/rmj5vx06e749ayf6rphr.png'} className='w-[50px] h-[50px] object-contain' alt="" />
        </div>
        <div className='flex flex-col gap-0 items-center text-center'>
          <h1
            className='text-[17px] md:text-[19px] lg:text-[21px] 
                           text-main-text font-[600] '
          >
            {prev == '/forgot-password' ? 'Reset Password' : ''}
          </h1>
          <span className='text-low-text/70 font-[400]
                           text-[10px] md:text-[11px] lg:text-[12px]'>
            {prev == '/forgot-password' ? 'Please kindly set your new password' : ''}
          </span>

        </div>
        <div className='pt-7 w-full px-2 md:px-5 flex flex-col gap-3 items-center'>
          {
            prev != '/forgot-password' &&
            <>
              <div
                className='w-[100%] flex flex-col gap-1 relative'>
                <label htmlFor="old_pass-input"
                  className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Old Password</label>

                <label htmlFor='old_pass-input'
                  className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
               size-[30px] md:size-[34px] 
              text-[20px] md:text-[24px]'>
                  <HiOutlineLockClosed />
                </label>
                <span onClick={() => setVisible(prev => ({ ...prev, old_pass: !prev.old_pass }))}
                  className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-low-text flex justify-center items-center rounded-lg
            size-[30px] md:size-[34px] 
            text-[16px] md:text-[18px]'>{visible?.old_pass ? <FaEyeSlash title='hide' /> : <FaEye title='show' />}</span>
                <input id='old_pass-input' type={visible?.old_pass ? 'text' : 'password'}
                  placeholder='Enter your old password' required
                  value={inputState.old_pass} onChange={(e) => setInputState(prev => ({ ...prev, old_pass: e.target.value }))}
                  className='border-divider 
              border-1 focus:outline-1 px-9 md:px-11 focus:outline-active-border focus:border-active-border outline-0 
              rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]' />
              </div>
              <div className='w-full h-0 border-t-1 border-divider'></div>
            </>
          }
          <div className='w-full flex flex-col gap-0 relative pb-2'>

            <div
              className='w-[100%] flex flex-col gap-1 relative'>
              <label htmlFor="new_pass-input"
                className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>New Password</label>

              <label htmlFor='new_pass-input'
                className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                <HiOutlineLockClosed />
              </label>
              <span onClick={() => setVisible(prev => ({ ...prev, new_pass: !prev.new_pass }))}
                className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-low-text flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[16px] md:text-[18px]'>{visible.new_pass ? <FaEyeSlash title='hide' /> : <FaEye title='show' />}</span>
              <input id='new_pass-input' type={visible.new_pass ? 'text' : 'password'}
                placeholder='Enter a new password' required
                onFocus={() => setInputError(prev => ({ ...prev, new_pass: '' }))}
                value={inputState.new_pass} onChange={(e) => setInputState(prev => ({ ...prev, new_pass: e.target.value }))}
                className={`${inputError.new_pass ? 'border-red-600' : 'border-divider '}
                border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
            </div>
            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.new_pass}</span>
          </div>
          
          <div className='w-full flex flex-col gap-0 relative pb-2'>

            <div
              className='w-[100%] flex flex-col gap-1 relative'>
              <label htmlFor="confirm_pass-input"
                className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Confirm Password</label>

              <label htmlFor='confirm_pass-input'
                className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                size-[30px] md:size-[34px] 
                text-[20px] md:text-[24px]'>
                <HiOutlineLockClosed />
              </label>
              <span onClick={() => setVisible(prev => ({ ...prev, confirm_pass: !prev.confirm_pass }))}
                className='absolute bottom-1 md:bottom-1.5 right-1 md:right-1.5 text-low-text flex justify-center items-center rounded-lg
                 size-[30px] md:size-[34px] 
                 text-[16px] md:text-[18px]'>{visible.confirm_pass ? <FaEyeSlash title='hide' /> : <FaEye title='show' />}</span>
              <input id='confirm_pass-input' type={visible.confirm_pass ? 'text' : 'password'}
                placeholder='Enter a new password' required
                onFocus={() => setInputError(prev => ({ ...prev, confirm_pass: '' }))}
                value={inputState.confirm_pass} onChange={(e) => setInputState(prev => ({ ...prev, confirm_pass: e.target.value }))}
                className={`${inputError.confirm_pass ? 'border-red-600' : 'border-divider '}
                border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
            </div>
            <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.confirm_pass}</span>
          </div>
        </div>

        <button
          onClick={resetPassword}
          disabled={isLoading}
          className={`mt-3 py-2 px-6 mb-7 min-w-[170px] text-[12px] md:text-[13px] lg:text-[14px] font-[600] rounded-lg bg-linear-0 text-white flex items-center justify-center
                                ${isLoading ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
          {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> : null}
          {
            isLoading ? <span className='text-white/80'>Processing...</span> : 'Submit'
          }
        </button>
      </div>
    </div>
  )
}

export default ResetPass
