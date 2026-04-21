import { useEffect, useState } from "react"





export default function TableAndCapacity({ id }) {
    const [capacity, setCapacity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inputError, setInputError] = useState({
        cap: '',
        quan: ''
    });

    useEffect(()=>{
        if(capacity){

        }
    },[quantity])
    return (
        <div className="w-full flex flex-row gap-2">
            <div className="w-[47%]  flex flex-col gap-0 relative pb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`capacity-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Chairs/Capacity</label>

                    <label htmlFor={`capacity-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        {/* <RiArmchairLine /> */}
                    </label>
                    <input id={`capacity-${id}-input`} type="text"
                        value={capacity} onChange={(e) => setCapacity(e.target.value)}
                        placeholder='Per table capacity' required
                        onFocus={() => setInputError(prev => ({ ...prev, cap: '' }))}
                        className={`${inputError.cap ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.cap}</span>
            </div>
            <div className="w-[47%]  flex flex-col gap-0 relative pb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`quantity-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Tables/Quantity</label>

                    <label htmlFor={`quantity-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        {/* <RiArmchairLine /> */}
                    </label>
                    <input id={`capacity-${id}-input`} type="text"
                        value={quantity} onChange={(e) => setQuantity(e.target.value)}
                        placeholder='Total tables' required
                        onFocus={() => setInputError(prev => ({ ...prev, quan: '' }))}
                        className={`${inputError.quan ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[12px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.quan}</span>
            </div>
        </div>
    )
}