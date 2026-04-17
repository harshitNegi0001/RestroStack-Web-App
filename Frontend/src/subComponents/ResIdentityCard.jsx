import { useEffect, useRef, useState } from "react"
import { IoCallOutline, IoCamera, IoLocationOutline } from "react-icons/io5";
import { LuBuilding2, LuMail, LuPencil } from "react-icons/lu";
import { TbCameraPlus } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { searchLocation } from "../Apis/searchApi";
import { MdVerified } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { editRestaurantDetails } from "../Apis/restrauntSetupApi";
import { useDispatch } from "react-redux";
import { getInitialState } from "../Store/Auth/authReducer";



export default function ResIdentityCard({ isLoading = true, resData = {}, setResData }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [state, setInputState] = useState();
    const [inputError, setInputError] = useState({
        res_name: '',
        email: '',
        phone_no: ''
    });
    const [logoFile, setLogoFile] = useState(null);
    const logoInputRef = useRef(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        if (state?.full_address?.length < 3 || !showSuggestions) {
            setSuggestions([]);
            return;
        }
        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            const result = await searchLocation(state?.full_address);
            setSuggestions(result);
            setIsSearching(false);
        }, 500);
        return () => {
            clearTimeout(delayDebounceFn);
        }
    }, [state?.full_address]);
    useEffect(() => {
        if (!resData) {
            return;
        }
        setInputState({ ...resData });
        // setLogoFile(null);
    }, [resData])
    const handleSelect = (item) => {
        const { name, city, state: prov, country, district } = item.properties;
        const [lng, lat] = item.geometry.coordinates;

        const fullAddr = `${name}${city ? `, ${city}` : ""}${district ? `, ${district}` : ""}, ${prov}, ${country}`;
        const addr = {
            name: name,
            city: city || district || "",
            state: prov || "",
            country: country,
            latitude: lat,
            longitude: lng
        }
        setInputState(prev => ({
            ...prev,
            full_address: fullAddr,
            address: addr
        }));

        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleLogoChange = (file) => {
        if (file) {
            setLogoFile(file);
            setResData(prev => ({
                ...prev,
                res_logo: URL.createObjectURL(file)
            }));
        }
    }

    const editResIdentity = async () => {
        setIsLoadingBtn(true);

        const successFunction = (data) => {
            setOpenEdit(false); 
            setLogoFile(null);  
            
            setResData(prev => ({
                ...prev,
                ...state,
                res_logo: data.res_logo || state.res_logo
            }));
            dispatch(getInitialState());
        }
        const formData = new FormData();
        formData.append('type', 'identity');
        formData.append('res_name', state?.res_name);
        formData.append('email', state?.email);
        formData.append('full_address', state?.full_address);
        formData.append('contact_no', state?.contact_no);

        if (state?.address) {
            formData.append('address', JSON.stringify(state.address));
        }
        if (logoFile instanceof File) {
            formData.append('res_logo', logoFile);
        } else if (resData?.res_logo) {
            formData.append('logo', resData.res_logo);
        }

        await editRestaurantDetails(formData, successFunction);
        setIsLoadingBtn(false);
    }
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
            <input type="file" ref={logoInputRef} id="logo-input" accept="image/*"
                onChange={(e) => handleLogoChange(e.target.files[0])}
                className="hidden" />
            <div className="flex flex-row w-full items-start gap-4">
                <div
                    onClick={() => {
                        if (openEdit && logoInputRef) {
                            logoInputRef.current.click();
                        }
                    }}
                    className={`flex justify-center items-center size-[45px] md:size-[55px]  rounded-2xl 
                    ${openEdit ? 'bg-active-border/10 border-2 border-active-border/50 hover:border-active-border/70 active:border-active-border border-dashed text-[15px] md:text-[17px] text-active-border/50 hover:text-active-border/70 active:text-active-border' :
                            (isLoading) ? 'animate-wave' :
                                'bg-active-border/10 text-[28px] md:text-[30px] text-active-border'}`}>
                    {
                        !isLoading
                        &&
                        <>
                            {
                                resData?.res_logo ?
                                    <img src={resData.res_logo} alt="" className="size-[40px] md:size-[50px] rounded-2xl object-center object-contain" /> :
                                    (openEdit) ?
                                        <TbCameraPlus /> :
                                        <LuBuilding2 />
                            }
                        </>
                    }

                </div>
                <div className="flex flex-1 flex-col  min-w-0 p-1 gap-2">
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
                                            <label htmlFor="res_name-input"
                                                className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Restaurant Name</label>

                                            <label htmlFor='res_name-input'
                                                className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                   size-[30px] text-[20px] '>
                                                <IoRestaurantOutline />
                                            </label>
                                            <input id='res_name-input' type="text"
                                                value={state.res_name} onChange={(e) => setInputState(prev => ({ ...prev, res_name: e.target.value }))}
                                                placeholder='Enter Restaurant Name' required
                                                onFocus={() => setInputError(prev => ({ ...prev, res_name: '' }))}
                                                className={`${inputError.res_name ? 'outline-red-600' : 'outline-divider '}
                                                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                        </div>
                                        <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.res_name}</span>
                                    </div>

                                    <div className='w-full flex flex-col gap-0 relative pb-2'>
                                        <div
                                            className='w-[100%] flex flex-col gap-1 relative'>
                                            <label htmlFor="oneLineAddress-input"
                                                className='text-sec-text pl-1 text-[12px] md:text-[13px] lg:text-[14px]'>Full Address</label>

                                            <label htmlFor='oneLineAddress-input'
                                                className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                            size-[30px] text-[20px] '>
                                                <IoLocationOutline />
                                            </label>
                                            <input id='oneLineAddress-input' type='text'
                                                autoComplete="off"
                                                placeholder="Enter restaurant address" required
                                                onFocus={() => {
                                                    setInputError(prev => ({ ...prev, full_address: '' }));
                                                    setShowSuggestions(true);
                                                }}

                                                value={state?.full_address}
                                                onChange={(e) => {
                                                    setInputState(prev => ({ ...prev, full_address: e.target.value }));
                                                    setShowSuggestions(true);
                                                }}
                                                className={`${inputError.full_address ? 'border-red-600' : 'border-divider '}
                                            border-1 focus:outline-1 pl-9 focus:outline-active-border focus:border-active-border outline-0
                                            rounded-lg p-1  text-main-text text-[14px] md:text-[15px]`} />
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

                                    <div className='w-full flex flex-col gap-0 relative pb-2'>

                                        <div
                                            className='w-[100%] flex flex-col gap-1 relative'>
                                            <label htmlFor="email-input"
                                                className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Email</label>

                                            <label htmlFor='email-input'
                                                className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                    size-[30px] text-[20px] '>
                                                <LuMail />
                                            </label>
                                            <input id='email-input' type="text"
                                                value={state.email} onChange={(e) => setInputState(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder='Enter Restaurant Email' required
                                                onFocus={() => setInputError(prev => ({ ...prev, email: '' }))}
                                                className={`${inputError.email ? 'outline-red-600' : 'outline-divider '}
                                                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                        </div>
                                        <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.email}</span>
                                    </div>

                                    <div className='w-full flex flex-col gap-0 relative pb-2'>

                                        <div
                                            className='w-[100%] flex flex-col gap-1 relative'>
                                            <label htmlFor="phone_no-input"
                                                className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Phone Number</label>

                                            <label htmlFor='phone_no-input'
                                                className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                                            size-[30px]  
                                                                            text-[20px] '>
                                                <IoCallOutline />
                                            </label>
                                            <input id='phone_no-input' type="text"
                                                value={state.contact_no} onChange={(e) => setInputState(prev => ({ ...prev, contact_no: e.target.value }))}
                                                placeholder='Enter Contact Number' required
                                                onFocus={() => setInputError(prev => ({ ...prev, contact_no: '' }))}
                                                className={`${inputError.contact_no ? 'outline-red-600' : 'outline-divider '}
                                                            outline-1 focus:outline-2 pl-9  focus:outline-active-border focus:border-active-border outline-0 
                                                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                                        </div>
                                        <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.contact_no}</span>
                                    </div>
                                </> :
                                <>
                                    <div className="flex flex-1 min-w-0 flex-col items-start ">
                                        <span className="text-[10px] md:text-[12px] text-low-text/70">Restaurant Name :</span>
                                        <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.res_name}</span>
                                    </div>
                                    <div className="flex flex-1 min-w-0 flex-col items-start ">
                                        <span className="text-[10px] md:text-[12px] text-low-text/70">Full Address :</span>
                                        <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.full_address}</span>
                                    </div>
                                    <div className="flex flex-1 min-w-0 flex-col items-start ">
                                        <span className="flex items-center gap-2 text-[10px] md:text-[12px] text-low-text/70"><span>Email :</span>
                                            {resData?.verified_email ? <span className="rounded-2xl bg-toast-bg flex gap-1 items-center px-2 text-sec-text text-[9px]/4 md:text-[11px]/4 font-[Rubik]">Verified <MdVerified className="text-active-border" /></span> :
                                                <span onClick={() => navigate('/verify-email?redirectTo=/restaurant-management',{state:{email:resData.email,prev:'/restaurant-management',otp_type:'res_email_verification',res_id:resData.id}})} className="rounded-2xl bg-indigo-600/10 flex gap-1 items-center px-2 text-indigo-600 cursor-pointer text-[9px]/4 md:text-[11px]/4 font-[Rubik]">Verify <FaExternalLinkAlt /></span>}
                                        </span>
                                        <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.email}</span>
                                    </div>
                                    <div className="flex flex-1 min-w-0 flex-col items-start ">
                                        <span className="text-[10px] md:text-[12px] text-low-text/70">Contact No. :</span>
                                        <span className="text-[12px] md:text-[14px] text-sec-text w-full truncate">{resData?.contact_no}</span>
                                    </div>
                                </>
                    }
                </div>
            </div>
            {!isLoading && openEdit &&
                <div className="w-full flex justify-end p-3 ">
                    <button
                        onClick={editResIdentity}
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