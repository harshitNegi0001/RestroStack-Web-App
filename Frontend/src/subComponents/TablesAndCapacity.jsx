import { useEffect, useState } from "react"
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiChairBold } from "react-icons/pi";
import { MdOutlineTableBar } from "react-icons/md";




export default function TableAndCapacity({ id,setTablesArray }) {
    const [capacity, setCapacity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inputError, setInputError] = useState({
        cap: '',
        quan: ''
    });

    useEffect(()=>{
        if(!capacity&&!quantity){
            return;
        }
        if(isNaN(capacity)){
            setInputError(prev=>({...prev,cap:'Capacity must be a number'}));
            return;
        }
        if(isNaN(quantity)){
            setInputError(prev=>({...prev,quan:'Quantity must be a number'}));
            return;
        }
        if(Number(capacity)<=0){
            setInputError(prev=>({...prev,cap:'Capacity must be greater than zero'}));
            return;
        }
        if(Number(quantity)<=0){
            setInputError(prev=>({...prev,quan:'Quantity must be greater than zero'}));
            return;
        }
        setInputError({cap:'',quan:''});
        setTablesArray(prev=>([...prev.map(t=>t.id===id?{...t,capacity,quantity}:t)]));
    },[capacity,quantity])

    const removeRow=()=>{
        setTablesArray(prev=>([...prev.filter(t=>t.id!==id)]));
    }
    return (
        <div className="w-full flex flex-row items-center justify-center gap-2">
            <div className="w-[44%]  flex flex-col gap-0 relative pb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`capacity-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Chairs/Capacity</label>

                    <label htmlFor={`capacity-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        <PiChairBold />
                    </label>
                    <input id={`capacity-${id}-input`} type="text"
                        value={capacity} onChange={(e) => setCapacity(e.target.value)}
                        placeholder='Per table capacity' required
                        onFocus={() => setInputError(prev => ({ ...prev, cap: '' }))}
                        className={`${inputError.cap ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.cap}</span>
            </div>
            <div className="w-[44%]  flex flex-col gap-0 relative pb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`quantity-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Tables/Quantity</label>

                    <label htmlFor={`quantity-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        <MdOutlineTableBar />
                    </label>
                    <input id={`capacity-${id}-input`} type="text"
                        value={quantity} onChange={(e) => setQuantity(e.target.value)}
                        placeholder='Total tables' required
                        onFocus={() => setInputError(prev => ({ ...prev, quan: '' }))}
                        className={`${inputError.quan ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.quan}</span>
            </div>
            <div onClick={removeRow} className="text-red-600 text-[14px] sm:text-[16px] p-2 h-fit w-fit rounded-2xl hover:bg-divider/50">
                <MdOutlineDeleteForever />
            </div>
        </div>
    )
}