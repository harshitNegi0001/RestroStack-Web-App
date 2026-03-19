import { useEffect, useState } from "react"
import { IoRestaurantOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { searchLocation } from "../../../Apis/rearchApis";
import { MdNavigateNext } from "react-icons/md";

const restaurantNameCheck = /^[a-zA-Z0-9\s&'-]{3,50}$/;
const locationCheck = /^[a-zA-Z0-9\s,.'#\-\/]{10,255}$/;


export default function RestBasicInfo({ state, setState, setActiveTab }) {

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [localState, setLocalState] = useState({
        res_name: state.resName || '',
        logo: state.logo || '',
        full_location: state.full_location || '',
        address: state.address ?? {

        },
    });
    const [inputError, setInputError] = useState({
        res_name: '',
        full_address: ''
    });

    useEffect(() => {
        if (localState.full_location < 3 || !showSuggestions) {
            setSuggestions([]);
            return;
        }
        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            const result = await searchLocation(localState.full_location);
            setSuggestions(result);
            setIsSearching(false);
        }, 500);
        return () => {
            clearTimeout(delayDebounceFn);
        }
    }, [localState.full_location]);

    const handleNext = () => {
        if (!restaurantNameCheck.test(localState.res_name)) {
            setInputError(prev => ({ ...prev, res_name: "Invalid name. Use 3-50 alphanumeric characters." }))
            return;
        }
        if (!locationCheck.test(localState.full_location)) {
            setInputError(prev => ({ ...prev, full_location: "Please enter a valid address (10-255 characters)" }))
            return;
        }
        // if(!localState.address){
        //     setInputError(prev => ({ ...prev, full_location: "Please select address from suggestions." }));
        //     return;
        // }

        setState(prev => ({ ...prev, ...localState }));

        setActiveTab('contact');
    }

    const handleSelect = (item) => {
        const { name, city, state: prov, country, district } = item.properties;
        const [lng, lat] = item.geometry.coordinates;

        const fullAddr = `${name}${district ? `, ${district}` : ""}${city ? `, ${city}` : ""}, ${prov}, ${country}`;
console.log('fulladd',fullAddr)
        const addr = {
            name: name,
            city: city || district || "",
            state: prov || "",
            latitude: lat,
            longitude: lng
        }
        setLocalState(prev => ({
            ...prev,
            full_location: fullAddr,
            address: addr
        }));

        setShowSuggestions(false);
        setSuggestions([]);
    };

    const btnDisabled = Boolean(!localState.res_name.trim() || !localState.full_location);


    return (
        <div
            className="w-full p-2 flex flex-col gap-3">
            <div
                className="flex flex-col gap-1 pb-4">
                <div
                    className="flex items-center gap-1 text-[20px] md:text-[22px] lg:text-[24px] text-active-border">

                    <LuBuilding2 />
                    <span
                        className="text-sec-text text-[15px] md:text-[17px] lg:text-[19px] font-[600]">Basic Information</span>
                </div>
                <span
                    className="text-sec-text/80
                    text-[12px] md:text-[13px] lg:text-[14px]">
                    Tell us about your restaurant
                </span>
            </div>
            <div className='w-full flex flex-col gap-0 relative pb-2'>

                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="restaurantName-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Restaurant Name</label>

                    <label htmlFor='restaurantName-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] md:size-[34px] 
                            text-[20px] md:text-[24px]'>
                        <IoRestaurantOutline />
                    </label>
                    <input id='restaurantName-input' type="text"
                        autoComplete="restaurantName-input"
                        value={localState.res_name} onChange={(e) => setLocalState(prev => ({ ...prev, res_name: e.target.value }))}
                        placeholder='Enter your Restraunt Name' required
                        onFocus={() => setInputError(prev => ({ ...prev, res_name: '' }))}
                        className={`${inputError.res_name ? 'border-red-600' : 'border-divider '}
                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.res_name}</span>
            </div>
            <div className='w-full flex flex-col gap-0 relative pb-2'>
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor="oneLineAddress-input"
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Full Address</label>

                    <label htmlFor='oneLineAddress-input'
                        className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] md:size-[34px] 
                                            text-[20px] md:text-[24px]'>
                        <IoLocationOutline />
                    </label>
                    <input id='oneLineAddress-input' type='text'
                        autoComplete="off"
                        placeholder="Enter restaurant address" required
                        onFocus={() => {
                            setInputError(prev => ({ ...prev, full_location: '' }));
                            setShowSuggestions(true);
                        }}
                        // onBlur={() => setShowSuggestions(false)}
                        value={localState.full_location}
                        onChange={(e) => {
                            setLocalState(prev => ({ ...prev, full_location: e.target.value }));
                            setShowSuggestions(true);
                        }}
                        className={`${inputError.full_location ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                </div>
                {
                    showSuggestions && (suggestions.length > 0 || isSearching) &&
                    <div
                        className="absolute top-[100%] left-0 w-full bg-card-bg border border-divider rounded-2xl mt-1 z-10 shadow-2xl max-h-[250px] show-custom-scrollbar overflow-y-auto">
                        {isSearching ? (
                            <div className="p-3 text-sec-text text-center text-[11px] md:text-[12px] lg:text-[13px] animate-pulse">Searching locations...</div>
                        ) : (
                            suggestions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="p-3 hover:bg-active-border/10 cursor-pointer border-b border-divider/60 last:border-0"
                                >
                                    <p className="text-main-text text-[12px] md:text-[13px] lg:text-[14px] font-[500]">{item.properties.name}</p>
                                    <p className="text-sec-text/80 text-[10px] md:text-[11px] lg:text-[12px] ">
                                        {item.properties.city ? `${item.properties.city}, ` : ""}
                                        {item.properties.district ? `${item.properties.district}, ` : ""}
                                        {item.properties.state ? `${item.properties.state}, ` : ""}
                                        {item.properties.country}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                }
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-8px]' >{inputError.full_location}</span>
            </div>
            <div
                className="w-full flex justify-end items-center">

                {/* <button onClick={handleBackBtn}
                    className='mt-3 py-2 px-6  rounded-lg border-1 
                border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                text-low-text/80 hover:text-low-text active:text-sec-text
                 text-[12px] md:text-[13px] lg:text-[14px] font-[600]'
                >Back</button> */}
                <button onClick={handleNext}
                    disabled={btnDisabled}
                    className={` mt-3 w-[75px] md:w-[80px] py-2  rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center text-center justify-center
                         ${btnDisabled ? 'bg-divider cursor-not-allowed text-low-text/70' : 'text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                   Next <MdNavigateNext />
                </button>
            </div>
        </div>
    )
}