import applogo from '../../assets/appLogo.png';
import { useState } from "react";
import RestSetupSteps from "./components/RestSetupSteps";
import RestBasicInfo from './components/RestBasicInfo';




export default function RestaurantSetup({ setActivePage }) {

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [activeTab, setActiveTab] = useState('basic-info');
    const [doneQueue, setDoneQueue] = useState([]);

    const handleNext = () => {
        if (activeTab == 'basic-info') {
            setActiveTab('contact');
            setDoneQueue(prev => ([...prev, 'basic-info']));
            return;
        }
        if (activeTab == 'contact') {
            setActiveTab('detaild');
            setDoneQueue(prev => ([...prev, 'contact']));
            return;
        }
        if (activeTab == 'details') {
            setDoneQueue(prev => ([...prev, 'details']));

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
                activeTab == 'basic-info' && <RestBasicInfo setBtnDisabled={setBtnDisabled} />
            }
            <div
                className="w-full flex justify-between items-center">

                <button
                    className='mt-3 py-2 px-6  rounded-lg border-1 
                border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                text-low-text/80 hover:text-low-text active:text-sec-text
                 text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                >Back</button>
                <button onClick={handleNext}
                    disabled={btnDisabled}
                    className={` mt-3 py-2 px-6  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                         ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>Next</button>
            </div>
        </div>
    )
}