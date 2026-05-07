import { useEffect, useState } from "react"
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiText } from "react-icons/bi";
import { IoCashOutline } from "react-icons/io5";



export default function VariantPriceComponent({ variantData, setPriceArray }) {
    const [variant_name, setVariant] = useState(variantData.variant_name || '');
    const [price, setPrice] = useState(variantData.price || '');
    const id = variantData.id;
    const [inputError, setInputError] = useState({
        variant: '',
        price: ''
    });

    useEffect(() => {
        if (!variant_name && !price) {
            return;
        }
        if (isNaN(price)) {
            setInputError(prev => ({ ...prev, price: 'Price must be a number' }));
            return;
        }
        if (variant_name.length <= 0 || variant_name.length >= 30) {
            setInputError(prev => ({ ...prev, variant: 'Variant name must be less than 30 letters' }));
            return;
        }
        if (Number(price) <= 0) {
            setInputError(prev => ({ ...prev, price: 'Price must be greater than zero' }));
            return;
        }
        setInputError({ variant: '', price: '' });
        setPriceArray(prev => ([...prev.map(t => t.id === id ? { ...t, variant_name, price } : t)]));
    }, [variant_name, price])

    const removeRow = () => {
        setPriceArray(prev => ([...prev.filter(t => t.id !== id)]));
    }
    return (
        <div className="w-full flex flex-row items-center justify-center gap-2">
            <div className="w-[44%]  flex flex-col gap-0 relative mb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`capacity-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Portion / Size</label>
                    <label htmlFor={`capacity-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        <BiText />
                    </label>
                    <input id={`capacity-${id}-input`} type="text"
                        value={variant_name} onChange={(e) => setVariant(e.target.value)}
                        placeholder='e.g., Half, Full, Regular' required
                        onFocus={() => setInputError(prev => ({ ...prev, variant: '' }))}
                        className={`${inputError.variant ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute top-[100%] ' >{inputError.variant}</span>
            </div>
            <div className="w-[44%]  flex flex-col gap-0 relative pb-2">
                <div
                    className='w-[100%] flex flex-col gap-1 relative'>
                    <label htmlFor={`price-${id}-input`}
                        className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Price (₹)</label>
                    <label htmlFor={`price-${id}-input`}
                        className='absolute bottom-0 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px] text-[20px] '>
                        <IoCashOutline />
                    </label>
                    <input id={`price-${id}-input`} type="text"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                        placeholder='e.g., 299' required
                        onFocus={() => setInputError(prev => ({ ...prev, price: '' }))}
                        className={`${inputError.price ? 'outline-red-600' : 'outline-divider '}
                            outline-1 focus:outline-2 pl-9 focus:outline-active-border focus:border-active-border outline-0 
                            rounded-lg p-1 md:py-1 text-main-text text-[14px] md:text-[15px]`} />
                </div>
                <span className='text-red-500 text-[8px] w-full text-start md:text-[10px] pl-1 whitespace-pre-line absolute bottom-[-5px] md:bottom-[-10px]' >{inputError.price}</span>
            </div>
            <div onClick={removeRow} className="text-red-600 text-[14px] sm:text-[16px] p-2 h-fit w-fit rounded-2xl hover:bg-divider/50">
                <MdOutlineDeleteForever />
            </div>
        </div>
    )
}