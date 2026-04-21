import { useEffect, useState } from "react";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { RiArmchairLine } from "react-icons/ri";
import TableAndCapacity from "./TablesAndCapacity";
import { HiOutlineBanknotes } from "react-icons/hi2";




export default function CreateTableZone({ type = "create", onClose, editData = null }) {

    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [state, setState] = useState({
        zone_name: '',
        hourly_prize: 0,
        tables: []
    });
    const [tablesArray,setTablesArray] = useState([{
            id:1,
            capacity:'',
            quantity:''
        }]);
    const [inputError,setInputError] = useState({
        zone_name:'',
        hourly_prize:''
    });

    useEffect(() => {
        if (!editData) {
            return;
        }
        setState({ ...editData });
    }, [editData]);
    const handleCreate = async () => {
        setIsLoadingBtn(true);

        setIsLoadingBtn(false);
    }

    const addRow = ()=>{
        const newRow = [...tablesArray,{
            id:tablesArray[tablesArray.length-1]?.id+1||1,
            capacity:'',
            quantity:''
        }]

        setTablesArray(newRow);
    }

    return (
        <div
            className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-fit max-h-[100dvh]  bg-card-bg sm:rounded-2xl
        flex flex-col ">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                                        hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        Setup Dining Zones
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        {type=='create'?
                        `Add new dining areas, set hourly charges and automatically generate tables.`:
                        `Edit dining areas, edit hourly charges and zone name.`}
                    </span>

                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className="w-full flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-3">
                <div className='w-full flex flex-col gap-0 relative pb-2'>

                    <div
                        className='w-[100%] flex flex-col gap-1 relative'>
                        <label htmlFor="zone-name-input"
                            className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Zone Name</label>

                        <label htmlFor='zone-name-input'
                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                                                                    size-[30px] text-[20px] '>
                            <RiArmchairLine />
                        </label>
                        <input id='zone-name-input' type="text"
                            value={state.zone_name} onChange={(e) => setState(prev => ({ ...prev, zone_name: e.target.value }))}
                            placeholder='Enter Zone Name' required
                            onFocus={() => setInputError(prev => ({ ...prev, zone_name: '' }))}
                            className={`${inputError.zone_name ? 'outline-red-600' : 'outline-divider '}
                                outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                    </div>
                    <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.zone_name}</span>
                </div>
                <div className='w-full flex flex-col gap-0 relative pb-2'>

                    <div
                        className='w-[100%] flex flex-col gap-1 relative'>
                        <label htmlFor="price-input"
                            className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Per Hour Cost <span className="text-low-text/70">(Optional)</span></label>

                        <label htmlFor='price-input'
                            className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                            <HiOutlineBanknotes />
                        </label>
                        <input id='price-input' type="text"
                            value={state.hourly_prize} onChange={(e) => setState(prev => ({ ...prev, hourly_prize: e.target.value }))}
                            placeholder='Enter hourly charge' required
                            onFocus={() => setInputError(prev => ({ ...prev, hourly_prize: '' }))}
                            className={`${inputError.hourly_prize ? 'outline-red-600' : 'outline-divider '}
                                outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                                rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                    </div>
                    <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.hourly_prize}</span>
                </div>
                {type=='create'&&<div className="border-dashed border-1 border-divider rounded-2xl p-2 flex flex-col items-center gap-2">
                    {tablesArray?.map(t=><TableAndCapacity key={t.id} id={t.id}/>)}
                    <button onClick={addRow}
                        className="capitalize text-[11px] sm:text-[12px] font-[600] text-white w-fit py-2 px-3 rounded-lg
                            bg-linear-0 to-green-500 from-green-600  hover:from-green-700 active:scale-98 active:to-green-600 active:from-green-800
                            shadow-black/30 shadow-md hover:shadow-lg active:shadow-sm flex justify-center items-center"> <IoAdd /> add row</button>
                </div>}
            </div>
            <div className="w-full p-3 border-t-1 border-divider flex justify-end">
                <button disabled={isLoadingBtn}
                    onClick={handleCreate}
                    className={`w-fit px-3 py-2 h-fit gap-1 rounded-lg bg-linear-0 text-white text-[12px] md:text-[13px] lg:text-[14px] font-[500] flex items-center justify-center                         
                                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    {isLoadingBtn ? <svg className="animate-spin -ml-1  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {
                        isLoadingBtn ? <span className='text-white/80'>Creating...</span> : 'Create Zone'
                    }
                </button>
            </div>
        </div>
    )
}