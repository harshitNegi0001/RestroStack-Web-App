



import { useState } from 'react';
import { MdSearch } from "react-icons/md";
import RestaurantDisplayCard from './RestaurantDisplayCard';
import RestaurantDisplayCardSkeleton from './RestaunrantDisplayCardSkeleton';
import { searchRestaurants, sendConnectReq } from '../../../Apis/restrauntSetupApi';

const fakeRestaurantData = [
    {
        id: 1,
        logo: 'https://cdn-icons-png.freepik.com/512/16225/16225148.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'The Restaurant',
        location: 'Ranikhet, Uttarakhand,India',
        total_emp: 32,
        type: 'Fine Dinning'
    },
    {
        id: 2,
        logo: 'https://cdn-icons-png.freepik.com/512/4266/4266356.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'Spicy Kitchen',
        location: 'Ranibag, haldwani,uttarakhand',
        total_emp: 42,
        type: 'Pop-up Restaurant'
    },
    {
        id: 3,
        logo: 'https://cdn-icons-png.freepik.com/512/10617/10617245.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'Tandoor Palace',
        location: 'new delhi,Delhi India',
        total_emp: 89,
        type: 'Fast Casual'
    },
    {
        id: 4,
        logo: null,
        name: 'The Anupam',
        location: 'Mallital,nainital,uttarakhand',
        total_emp: 40,
        type: 'Fast Food Restaurant'
    },
    {
        id: 5,
        logo: 'https://cdn-icons-png.freepik.com/512/16225/16225148.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'Saraswati Rasoi',
        location: 'Ranikhet, Uttarakhand,India',
        total_emp: 67,
        type: 'Pop-up Restaurant'
    },
    {
        id: 6,
        logo: null,
        name: 'The Lake View Restaurant',
        location: 'Ranikhet, Uttarakhand,India',
        total_emp: 7,
        type: 'Fine Dinning'
    },
    {
        id: 7,
        logo: 'https://cdn-icons-png.freepik.com/512/10617/10617245.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'Indo-Japan Taste Lab',
        location: 'Nainital, Uttarakhand,India',
        total_emp: 56,
        type: 'Fine Dinning'
    },
    {
        id: 8,
        logo: 'https://cdn-icons-png.freepik.com/512/16225/16225148.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'The Golden Spoon',
        location: 'Ranikhet, Uttarakhand,India',
        total_emp: 12,
        type: 'Fine Dinning'
    },
    {
        id: 9,
        logo: 'https://cdn-icons-png.freepik.com/512/16225/16225148.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'Taste Factory',
        location: 'Ranibag, haldwani,uttarakhand',
        total_emp: 30,
        type: 'Fine Dinning'
    },
    {
        id: 10,
        logo: 'https://cdn-icons-png.freepik.com/512/10617/10617245.png?uid=R112081176&ga=GA1.1.1193566231.1757038560',
        name: 'The Restaurant',
        location: 'Ranikhet, Uttarakhand,India',
        total_emp: 3,
        type: 'Fast Food Restaurant'
    },

]

export default function EmpSearchRes() {

    const [searchValue, setSearchValue] = useState('');
    const btnDisabled = Boolean(!searchValue.trim());
    const [selected, setSelected] = useState(null);
    const [display,setDisplay] = useState(false);
    const [restaurantsList,setRestaurantList] = useState([]);
    const [loadingRes, setLoadingRes] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);

    const connectBtnDisabled = Boolean(!selected);
    const handleSearch = async () => {
        function successFunction(data){
            setRestaurantList(data);
            setDisplay(true);
        }

        setLoadingRes(true);
        await searchRestaurants(searchValue,successFunction);
        setLoadingRes(false);
    }
    const sendConnReq = async()=>{
        function successFunction (){
            
        }
        setLoadingBtn(true);
        await sendConnectReq(selected,successFunction);
        setLoadingBtn(false);
    }
    return (
        <div className={`w-full flex flex-col gap-2 md:gap-6 items-start border-b-1 border-divider py-4`}>
            <div
                className='w-full flex flex-col gap-1 relative'>
                <label htmlFor="search-input"
                    className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Restaurant Name</label>

                <label htmlFor='search-input'
                    className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                        size-[30px] md:size-[34px] 
                        text-[20px] md:text-[24px]'>
                    <MdSearch />
                </label>
                <div
                    className='flex w-full gap-2 items-center '>
                    <input id='search-input' type='text'
                    onFocus={()=>setDisplay(false)}
                        autoComplete="search-input"
                        placeholder="Search Restaurant" required
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                        className={`w-[calc(100%-90px)] border-divider  border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                    <button disabled={btnDisabled} onClick={handleSearch}
                        className={`  py-2  w-[85px] md:w-[100px] flex justify-center text-center items-center rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                         ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
                    >
                        Search
                    </button>
                </div>

            </div>

            {display && <div
                className='w-full max-h-[400px] show-custom-scrollbar overflow-auto flex flex-col gap-1.5 '>
                {/* search results */}
                <span
                    className='text-active-border font-[600] text-[12px] md:text-[13px] lg:text-[14px]'>
                    Found {restaurantsList?.length||0} result</span>
                {
                    restaurantsList?.map(r =>
                        <RestaurantDisplayCard onClick={() => setSelected(r.id)} key={r.id} isActive={selected == r.id} data={r} />
                    )
                }
            </div>}
            {loadingRes && <div
                className='w-full max-h-[400px] show-custom-scrollbar overflow-auto flex flex-col gap-1.5 mask-bottom-fade'>
                <span
                    className='text-active-border font-[600] text-[12px] md:text-[13px] lg:text-[14px] animate-pulse'>
                    Searching...</span>
                {
                    [1,2,3,4].map(r =>
                        <RestaurantDisplayCardSkeleton  key={r} />
                    )
                }
            </div>}
            {display && <div className='w-full '>
                <button disabled={connectBtnDisabled}
                onClick={sendConnReq}
                    className={`  py-2  w-full flex justify-center text-center items-center rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                         ${connectBtnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}
                >
                    Send Request
                </button>
            </div>}

        </div>
    )
}