import { IoMdTime } from 'react-icons/io';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { weekDays } from '../../../utils/clientSideData/setupVariables';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
export default function ResOpenningTime({ localState, setLocalState }) {
    const handleOpenClose = (index) => {
        setLocalState(prev => {
            const updatedTimings = [...prev.opening_timeing];
            updatedTimings[index] = {
                ...updatedTimings[index],
                isClosed: !updatedTimings[index].isClosed
            };
            return { ...prev, opening_timeing: updatedTimings };
        });
    };
    const handleChangeOpening = (val, index) => {
        setLocalState(prev => {
            const updatedTimings = [...prev.opening_timeing];
            updatedTimings[index] = {
                ...updatedTimings[index],
                opening: val
            };
            return { ...prev, opening_timeing: updatedTimings };
        });
    }
    const handleChangeClosing = (val, index) => {
        setLocalState(prev => {
            const updatedTimings = [...prev.opening_timeing];
            updatedTimings[index] = {
                ...updatedTimings[index],
                closing: val
            };
            return { ...prev, opening_timeing: updatedTimings };
        });
    }

    const handleCopyMon = () => {
        setLocalState(prev => {
            const updatedTimings = [...prev.opening_timeing];


            return {
                ...prev, opening_timeing: updatedTimings.map(p => p = updatedTimings[0])
            };
        });
    }
    const handleSelectAll = () => {
        setLocalState(prev => {
            const updatedTimings = [...prev.opening_timeing?.map(p => {
                return {
                    ...p,
                    isClosed: false
                }
            })];


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
                    weekDays.map((w, i) => {
                        const currentDayData = localState.opening_timeing[i];
                        const isClosed = currentDayData?.isClosed;
                        return (<div key={w.id}

                            className={`border-1 rounded-lg  p-2 ${!isClosed ? 'bg-green-800/10 border-green-500/50' : 'bg-red-800/10 border-red-500/50'} 
                        flex flex-col gap-1`}>
                            <div
                                className='flex justify-between font-[500] text-[13px] md:text-[14px] lg:text-[15px] text-main-text'>
                                <span>{w.label}</span>
                                <button onClick={() => handleOpenClose(i)}
                                    className={`${isClosed?'text-red-600':'text-green-600'}  p-2 rounded-[50%] flex justify-center items-center text-center hover:bg-divider/60 active:bg-divider`}>
                                    {!isClosed ? <FaRegCheckCircle /> : <FaRegCircle />}
                                </button>
                            </div>
                            {!isClosed && <div
                                className='flex justify-start gap-2 text-[11px] md:text-[12px] lg:text-[13px] items-center text-sec-text/80'>
                                <input type="time" name="" id=""
                                    value={currentDayData?.opening}
                                    onChange={(e) => handleChangeOpening(e.target.value, i)}
                                    className='border-divider border-1 focus:outline-1  focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[13px] md:text-[15px]' />
                                <span>to</span>
                                <input type="time" name="" id=""
                                    value={currentDayData?.closing}
                                    onChange={(e) => handleChangeClosing(e.target.value, i)}
                                    className='border-divider border-1 focus:outline-1  focus:outline-active-border focus:border-active-border outline-0 
                                            rounded-lg p-1.5 md:py-2 text-main-text text-[13px] md:text-[15px]'/>

                            </div>}
                        </div>)
                    })
                }
            </div>


        </div>
    )
}