import { IoClose } from "react-icons/io5";
import { GrRadialSelected } from "react-icons/gr";
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencies } from "../utils/clientSideData/setupVariables";
import { BiMinus, BiPlus } from "react-icons/bi";
import { LuNotebookText } from "react-icons/lu";



export default function CustomizeDetailBox({ data, openCustomize, onClose,handleAddToOrder }) {
    const [activeVariation, setActiveVariation] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [extraDetail, setExtraDetail] = useState('');
    const { activeResData } = useSelector(state => state.auth);
    const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
    const isDisabled = !activeVariation;
    useEffect(() => {
       return()=>{
        setActiveVariation(null);
        setQuantity(1);
       }
    }, [data?.id])
    return (
        <div onClick={(e) => e.stopPropagation()} className={`w-full rounded-t-2xl bg-card-bg p-2  h-fit max-h-full
        ${openCustomize ? 'translate-y-0' : 'translate-y-full'} transition-all duration-300 flex flex-col gap-2 items-center`}>
            <div className="w-[40px] sm:w-[50px] rounded-2xl p-0.5 bg-divider mb-3"></div>
            <div className="flex w-full items-center">
                <div className="flex-1 min-w-0 truncate text-main-text text-[14px] sm:text-[16px] font-[500] ">
                    Customize ({data?.item_name})
                </div>
                <div onClick={onClose}
                    className="text-main-text size-[30px] rounded-full flex items-center justify-center
                bg-divider/20 hover:bg-divider/40 active:bg-divider/60 text-[14px] sm:text-[15px]">
                    <IoClose />
                </div>
            </div>
            <div className="w-full border-b-1 border-divider/60"></div>
            <div className="flex flex-col gap-2 w-full p-2 flex-1 overflow-y-auto show-custom-scrollbar min-h-0">
                <div className="w-full text-sec-text/80 font-[500] text-[12px] sm:text-[13px] capitalize">
                    Choose variation(pick 1)
                </div>
                {
                    data?.price_array?.map(v =>
                        <div onClick={() => setActiveVariation(v)} key={v.id} className={`flex flex-row items-center gap-2 py-3 px-2 border-1 rounded-2xl
                        ${activeVariation?.id === v.id ? 'border-active-border bg-active-border/10' : 'border-divider hover:bg-active-border/5'}`}>
                            {activeVariation?.id == v.id ?
                                <GrRadialSelected className="text-active-border text-[14px] sm:text-[16px]" /> :
                                <FaRegCircle className="text-divider text-[14px] sm:text-[16px]" />}
                            <div className="flex-1 min-w-0 truncate text-[12px] sm:text-[13px] text-sec-text font-[500]">
                                {v.variant_name}
                            </div>
                            <div className={`text-[14px] sm:text-[16px] font-[600] px-2 py-0.5 rounded-2xl
                                ${activeVariation?.id === v.id ? 'text-active-border bg-active-border/10' : 'text-low-text/70 bg-toast-bg'}`}>
                                {currency} {v.price}
                            </div>
                        </div>
                    )
                }
                <div className='w-full flex flex-col gap-0 relative py-2'>

                    <div
                        className='w-[100%] flex flex-col gap-1 relative'>
                        <label htmlFor="customize-food-input"
                            className='text-sec-text pl-1 text-[12px] md:text-[13px] '>Special Instructions (Optional)</label>

                        <label htmlFor='customize-food-input'
                            className='absolute bottom-1 md:bottom-1.5 left-1 md:left-1.5 text-gray-500/60 flex justify-center items-center rounded-lg
                            size-[30px]  
                            text-[20px] '>
                            <LuNotebookText />
                        </label>
                        <input id='customize-food-input' type="text"
                            autoComplete="customize-food-input"
                            value={extraDetail} onChange={(e) => setExtraDetail(e.target.value)}
                            placeholder='e.g., Make it extra spicy, no onions...'
                            className={`
                            focus:outline-2 pl-9 md:pl-11 focus:outline-active-border focus:border-active-border outline-1 outline-divider
                            rounded-lg p-1.5 md:py-2 text-main-text text-[16px] md:text-[18px]`} />
                    </div>
                </div>
            </div>

            <div className="w-full border-b-1 border-divider/60"></div>
            <div className="flex justify-between items-center w-full p-2">
                <span className="text-sec-text/80 text-[13px] sm:text-[14px] font-[500]">Quantity :</span>
                <div className="flex items-center gap-1 ">
                    <div onClick={() => setQuantity(prev => prev - 1)} className={`${quantity < 2 ? 'hidden' :
                        'flex'} bg-active-border/5 hover:bg-active-border/10 active:bg-active-border/20 text-main-text
                        size-[30px] rounded-full flex items-center justify-center text-[15px] cursor-pointer`}>
                        <BiMinus />
                    </div>
                    <span className="text-sec-text text-[14px] sm:text-[15px] font-[500]">{quantity}</span>
                    <div onClick={() => setQuantity(prev => prev + 1)} className={`bg-active-border/5 hover:bg-active-border/10 active:bg-active-border/20
                         size-[30px] rounded-full flex items-center justify-center text-[15px] text-main-text cursor-pointer`}>
                        <BiPlus />
                    </div>
                </div>
            </div>
            <div className="w-full border-b-1 border-divider/60"></div>
            <div className="w-full flex justify-center">
                <button disabled={!activeVariation} onClick={()=>
                    handleAddToOrder({
                        id:Date.now(),
                        extraDetail,
                        item_id:data.id,
                        item_name:data?.item_name,
                        activeVariation,
                        quantity,
                    })
                }
                 className={`w-[240px] sm:w-[300px] py-2 font-[500] text-[13px] sm:text-[15px] rounded-lg flex items-center justify-center gap-0.5
                        ${isDisabled ? 'bg-divider text-low-text/70' : 'bg-linear-0 text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    Add to Order {activeVariation ? `- ${currency}${activeVariation?.price * quantity}` : null}
                </button>
            </div>
        </div>
    )
}