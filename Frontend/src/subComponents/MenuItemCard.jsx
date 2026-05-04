import { LuEllipsisVertical, LuPencil, LuTrash } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";
import { VegIcon, NonVegIcon } from "../utils/clientSideData/SvgVariable";




export default function MenuItemCard({ data }) {
    const [openOption, setOpenOption] = useState(false);

    const clickBtnRef = useRef();
    const optionsRef = useRef();
    useOutsideClick(optionsRef, () => setOpenOption(false), clickBtnRef);
    return (
        <div className="w-full bg-card-bg shadow-black/30 shadow-md rounded-lg p-2 md:p-3 xl:p-4
        flex flex-col relative items-center gap-0.5 md:gap-1">
            {
                openOption &&
                <div ref={optionsRef} className="absolute top-[25px] md:top-[35px] xl:top-[40px] right-2 md:right-3 xl:right-4 
                rounded-lg bg-card-bg shadow-black/30 shadow-md p-2 flex flex-col">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setOpenOption(false);
                        // setOpenEdit(true);
                    }}
                        className="flex text-sec-text/80 
                                        hover:text-sec-text active:text-main-text hover:bg-divider/40 active:bg-divider/70 
                                        items-center justify-start gap-2 p-2 rounded-lg text-[11px] sm:text-[13px] font-[500]"><LuPencil />Edit</button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setOpenOption(false);
                        // setOpenConfirm(true);
                    }}
                        className="flex text-red-600/60
                            hover:text-red-600/80 active:text-red-600 hover:bg-red-600/10 active:bg-red-600/20 
                            items-center justify-start gap-2 p-2 rounded-lg text-[11px] sm:text-[13px] font-[500]"><LuTrash />Delete</button>
                </div>
            }
            <div ref={clickBtnRef} onClick={() => setOpenOption(prev => !prev)}
                title="Options" className="absolute top-0 right-0 flex justify-center items-center
                hover:bg-divider/40 active:bg-divider/60 size-[25px] md:size-[35px]  rounded-[50%] text-low-text/70 
                hover:text-low-text active:text-sec-text text-[13px] md:text-[15px]">
                <LuEllipsisVertical />
            </div>
            <div className="w-full aspect-square flex justify-center items-center bg-toast-bg rounded-lg mb-2 md:mb-3">
                {data?.image ?
                    <img src={data?.image} alt="" className="w-full h-full rounded-lg object-cover" /> :
                    <span className="text-[24px] md:text-[30px] xl:text-[34px] text-active-border">
                        <IoFastFoodOutline />
                    </span>
                }
            </div>
            <div className="w-full flex items-center gap-0.5">
                <span className="flex-1 min-w-0 truncate capitalize text-main-text text-[12px] md:text-[13px] font-[500]">
                    {data?.item_name}
                </span>
                <div className="w-fit h-fit" title={`${data?.is_veg?'Veg':'Non-Veg'}`}>
                    {data?.is_veg ?
                        <VegIcon className="size-[12px] md:size-[14px] xl:size-[16px]"/> :
                        <NonVegIcon className="size-[12px] md:size-[14px] xl:size-[16px]" />}
                </div>
            </div>

            <div className="w-full line-clamp-3 text-low-text/70 text-[9px]/3 md:text-[10px]/3">
                {data?.description}
            </div>
           {    data?.price_array?.map(row=>
            <div key={row.id} className="w-full min-w-0 flex items-center justify-between">
                <div className="flex-1 min-w-0 truncate text-low-text text-[9px] md:text-[10px]">
                        {row.variant_name}
                </div>
                <div className="w-fit h-fit text-[10px] md:text-[11px] font-[500] text-sec-text">
                        ${row.price}
                </div>
            </div>)}
        </div>
    )
}