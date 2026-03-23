import { useEffect, useState } from "react";
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
    const [restaurantInfo, setRestaurantInfo] = useState({});

    useEffect(()=>{
        if(!activeTab||activeTab == 'basic-info'){
            setDoneQueue([]);
            return;
        }
        
        if (activeTab == 'contact') {
            setDoneQueue(['basic-info']);
            return;
        }
        if (activeTab == 'details') {
            setDoneQueue(['basic-info','contact']);
        }
    },[activeTab]);
    
    return (
        <div
            className="w-full max-w-[500px] flex flex-col gap-4 items-center c p-2 md:p-4">
            <div
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px]  bg-green-900/30 rounded-2xl flex justify-center items-center"
            >
                <img src={'https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png'}
                    className='w-[45px] h-[45px] md:w-[50px] md:h-[50px] object-contain' alt="" />

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
                activeTab == 'basic-info' && <RestBasicInfo setActiveTab={setActiveTab} state={restaurantInfo} setState={setRestaurantInfo} />
            }
            {
                activeTab == 'contact' && <RestContact setActiveTab={setActiveTab} state={restaurantInfo} setState={setRestaurantInfo} />
            }
            {
                activeTab == 'details' && <RestAllDetails setActiveTab={setActiveTab} state={restaurantInfo} setInputState={setRestaurantInfo} />
            }
            
        </div>
    )
}