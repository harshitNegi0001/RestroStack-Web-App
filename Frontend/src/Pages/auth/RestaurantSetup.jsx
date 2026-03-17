import applogo from '../../assets/appLogo.png';
import { useState } from "react";
import RestSetupSteps from "./components/RestSetupSteps";
import RestBasicInfo from './components/RestBasicInfo';
import RestContact from './components/RestContact';
import RestAllDetails from './components/RestAllDetails';
import { submitRestrauntData } from '../../Apis/restrauntSetupApi';



export default function RestaurantSetup({ setActivePage }) {

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [activeTab, setActiveTab] = useState('basic-info');
    const [doneQueue, setDoneQueue] = useState([]);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [state, setState] = useState({
        restaurantName: '',
        oneLineAddress: '',
        phoneNum: '',
        busiEmail: '',
        gstNum: '',
        fssaiLiNum: '',
        currency: 'INR',
        restType: 'casual_dining',
        texPrecent: '0',
        openingTimimgs: {
            'Monday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Tuesday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Wednesday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Thursday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Friday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Saturday': {
                opening: '',
                closing: '',
                selected: true
            },
            'Sunday': {
                opening: '',
                closing: '',
                selected: true
            },
        }
    })
    const [inputError, setInputError] = useState({
        restaurantName: '',
        oneLineAddress: '',
        phoneNum: '',
        busiEmail: '',
        gstNum: '',
        fssaiLiNum: '',
        openingTimimgs: ''
    });

    const handleNext = async() => {
        if (activeTab == 'basic-info') {
            setActiveTab('contact');
            setDoneQueue(prev => ([...prev, 'basic-info']));
            return;
        }
        if (activeTab == 'contact') {
            setActiveTab('details');
            setDoneQueue(prev => ([...prev, 'contact']));
            return;
        }
        if (activeTab == 'details') {
            setDoneQueue(prev => ([...prev, 'details']));
            console.log('userPressedSubmit')
            await submitRestrauntData(state, setActiveTab, setInputError, setIsLoadingBtn)
            // return;
        }
    }
    const handleBackBtn =  () => {
        if (activeTab == 'basic-info') {
            setActivePage('role-select');
        }
        if (activeTab == 'contact') {
            setActiveTab('basic-info');
            const filtedList = doneQueue.filter(d => d != 'basic-info');
            setDoneQueue(filtedList);
            return;
        }
        if (activeTab == 'details') {
            setActiveTab('contact');
            const filtedList = doneQueue.filter(d => d != 'contact');
            setDoneQueue(filtedList);

            return;
        }
    }
    return (
        <div
            className="w-full max-w-[500px] flex flex-col gap-4 items-center c p-2 md:p-4">
            <div
                className="w-[80px] h-[80px] bg-green-900/30 rounded-2xl flex justify-center items-center"
            >
                <img src={applogo} className='w-[55px] h-[55px] object-contain' alt="" />

            </div>
            <div
                className="w-full text-center flex flex-col items-center gap-1 ">
                <h6
                    className="text-main-text font-[600]
                    text-[22px] md:text-[24px] lg:text-[26px]">
                    Set up your restaurant
                </h6>
                <span
                    className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]
                    ">
                    Complete the setup to start managing your restaurant
                </span>
            </div>

            <RestSetupSteps setDoneQueue={setDoneQueue} doneQueue={doneQueue} activeTab={activeTab} setActiveTab={setActiveTab} />

            {
                activeTab == 'basic-info' && <RestBasicInfo setBtnDisabled={setBtnDisabled} state={state} setState={setState} inputError={inputError} setInputError={setInputError} />
            }
            {
                activeTab == 'contact' && <RestContact setBtnDisabled={setBtnDisabled} state={state} setState={setState} inputError={inputError} setInputError={setInputError}/>
            }
            {
                activeTab == 'details' && <RestAllDetails setBtnDisabled={setBtnDisabled} state={state} setState={setState} inputError={inputError} setInputError={setInputError}/>
            }
            <div
                className="w-full flex justify-between items-center">

                <button onClick={handleBackBtn}
                    className='mt-3 py-2 px-6  rounded-lg border-1 
                border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                text-low-text/80 hover:text-low-text active:text-sec-text
                 text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                >Back</button>
                <button onClick={handleNext}
                    disabled={btnDisabled}
                    className={` mt-3 w-[75px] md:w-[80px] py-2 px-6  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center justify-center
                         ${btnDisabled || isLoadingBtn ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    {isLoadingBtn ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : <span >{activeTab == 'details' ? 'Submit' : 'Next'}</span>}

                </button>
            </div>
        </div>
    )
}