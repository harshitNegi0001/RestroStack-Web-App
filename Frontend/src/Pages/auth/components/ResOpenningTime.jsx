import { IoMdTime } from 'react-icons/io';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { weekArray, weekDays } from '../../../utils/clientSideData/setupVariables';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
export default function ResOpenningTime({ localState, setLocalState }) {
    const handleOpenClose = (day) => {
        setLocalState(prev=>({
            ...prev,
            opening_timeing:{
                ...prev.opening_timeing,
                [day]:{
                    ...prev.opening_timeing[day],
                    isClosed:!prev.opening_timeing[day].isClosed
                }
            }
        }))
    };
    const handleChangeOpening = (val, day) => {
        
        setLocalState(prev=>({
            ...prev,
            opening_timeing:{
                ...prev.opening_timeing,
                [day]:{
                    ...prev.opening_timeing[day],
                    opening:val
                }
            }
        }))
    }
    const handleChangeClosing = (val, day) => {
        setLocalState(prev=>({
            ...prev,
            opening_timeing:{
                ...prev.opening_timeing,
                [day]:{
                    ...prev.opening_timeing[day],
                    closing:val
                }
            }
        }))
    }

    const handleCopyMon = () => {
        setLocalState(prev => {
            const updatedTimings = {
                'Monday':prev.opening_timeing['Monday'],
                'Tuesday':prev.opening_timeing['Monday'],
                'Wednesday':prev.opening_timeing['Monday'],
                'Thursday':prev.opening_timeing['Monday'],
                'Friday':prev.opening_timeing['Monday'],
                'Saturday':prev.opening_timeing['Monday'],
                'Sunday':prev.opening_timeing['Monday'],
            };
            return {
                ...prev, opening_timeing: updatedTimings
            };
        });
    }
    const handleSelectAll = () => {
        setLocalState(prev => {
            const updatedTimings = {
                'Monday':{...prev.opening_timeing['Monday'],isClosed:true},
                'Tuesday':{...prev.opening_timeing['Tuesday'],isClosed:true},
                'Wednesday':{...prev.opening_timeing['Wednesday'],isClosed:true},
                'Thursday':{...prev.opening_timeing['Thursday'],isClosed:true},
                'Friday':{...prev.opening_timeing['Friday'],isClosed:true},
                'Saturday':{...prev.opening_timeing['Saturday'],isClosed:true},
                'Sunday':{...prev.opening_timeing['Sunday'],isClosed:true},
            };
            return {
                ...prev, opening_timeing: updatedTimings
            };
        });
    }
    return (
        <div
            className="border-1 border-divider rounded-2xl p-2 
                    flex flex-col gap-3 w-full mt-5">
            <div
                className='flex flex-col gap-0 w-full items-start'>
                <div
                    className="flex gap-1 items-center text-main-text text-[15px] md:text-[17px]">
                    <IoMdTime color="orange" />
                    <span>
                        Opening Hours
                    </span>
                </div>
                <span
                    className="w-full text-main-text text-[9px] md:text-[10px] lg:text-[11px]">
                    Tell us about your restaurant's timming.
                </span>
            </div>

            <div
                className="flex gap-1 items-center justify-between  text-sec-text/80 text-[10px] md:text-[12px]">
                <button onClick={handleSelectAll}
                    className="flex gap-1 justify-center items-center border-1 p-2 rounded-md shadow-lg font-[600] border-green-500/70 text-green-500/70
                            hover:border-green-500/80 hover:bg-green-500/10 hover:text-green-500/80 active:border-green-500 active:text-green-500 active:shadow-md">
                    <IoCheckmarkDoneSharp />
                    Select All
                </button>

                <button onClick={handleCopyMon}
                    className="flex gap-1 justify-center items-center border-1 p-2 rounded-md shadow-lg font-[600] border-orange-500/70 text-orange-500/70
                            hover:border-orange-500/80 hover:bg-orange-500/10 hover:text-orange-500/80 active:border-orange-500 active:text-orange-500 active:shadow-md">
                    <IoIosTimer />
                    Copy Monday to All
                </button>
            </div>
            <div
                className='flex flex-col w-full   gap-2'>
                    
                {
                    weekArray.map((d,i)=> {
                        const day = d.label;
                        const value = localState?.opening_timeing?.[day];
                        const isClosed = value.isClosed;
                        return (<div key={i}

                            className={`border-1 rounded-lg  p-2 ${!isClosed ? 'bg-green-800/10 border-green-500/50' : 'bg-red-800/10 border-red-500/50'} 
                        flex flex-col gap-1`}>
                            <div
                                className='flex justify-between font-[500] text-[13px] md:text-[14px] lg:text-[15px] text-main-text'>
                                <span>{day}</span>
                                <button onClick={() => handleOpenClose(day)}
                                    className={`${isClosed?'text-red-600':'text-green-600'}  p-2 rounded-[50%] flex justify-center items-center text-center hover:bg-divider/60 active:bg-divider`}>
                                    {!isClosed ? <FaRegCheckCircle /> : <FaRegCircle />}
                                </button>
                            </div>
                            {!isClosed && <div
                                className='flex justify-start gap-2 text-[11px] md:text-[12px] lg:text-[13px] items-center text-sec-text/80'>
                                <input type="time" name="" id=""
                                    value={value.opening}
                                    onChange={(e) => handleChangeOpening(e.target.value, day)}
                                    className='outline-divider outline-1 focus:outline-2  focus:outline-active-border 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[12px] md:text-[14px]' />
                                <span>to</span>
                                <input type="time" name="" id=""
                                    value={value.closing}
                                    onChange={(e) => handleChangeClosing(e.target.value, day)}
                                    className='outline-divider outline-1 focus:outline-2  focus:outline-active-border 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[12px] md:text-[14px]'/>

                            </div>}
                        </div>)
                    })
                }
            </div>


        </div>
    )
}