import { useEffect, useRef, useState } from "react";
import { LuDelete, LuEllipsisVertical, LuGripHorizontal, LuPencil, LuRemoveFormatting, LuTrash } from "react-icons/lu";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";



export default function CategoryCard({ c, setCategories }) {
    const [openOption, setOpenOption] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [state,setInputState] = useState('');


    const optionRef = useRef(null);
    const clickBtnRef = useRef(null);

    useEffect(()=>{
        setInputState(c?.category_name);
    },[c?.category_name])

    useOutsideClick(optionRef, () => { setOpenOption(false) }, clickBtnRef);
    return (
        <div key={c.id} className="relative w-full p-2 bg-divider/40 hover:bg-active-border/10 active:bg-active-border/30 rounded-lg flex items-center gap-2">
            <div onClick={(e) => {
                e.stopPropagation();

            }}
                className="rounded-2xl text-main-text text-[12px] sm:text-[14px] p-2 hover:bg-divider/50 active:bg-divider/80 hover:cursor-grab active:cursor-grabbing">
                <LuGripHorizontal />
            </div>
            {!openEdit ?
                <div className="flex-1 min-w-0 text-main-text text-[12px] sm:text-[14px] truncate">{c.category_name}</div> :
                <div className="flex-1 min-w-0 ">
                    <input type="text" name="" id="" />
                </div>
            }
            <div ref={clickBtnRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenOption(prev => !prev);
                }}
                className="relative rounded-2xl text-main-text text-[12px] sm:text-[14px] p-2 hover:bg-divider/50 active:bg-divider/80 cursor-pointer">
                <LuEllipsisVertical />

            </div>
            <div ref={optionRef} className={`absolute z-10 top-[-2px] right-[45px] ${openOption ? 'flex' : 'hidden'} p-2 bg-card-bg
                    flex-col text-main-text rounded-lg`}>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setOpenOption(false);
                    setOpenEdit(true);
                }}
                    className="flex text-sec-text/80 
                    hover:text-sec-text active:text-main-text hover:bg-divider/40 active:bg-divider/70 
                    items-center justify-start gap-2 p-2 rounded-lg text-[11px] sm:text-[13px] font-[500]"><LuPencil />Edit</button>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setOpenOption(false);
                    setOpenConfirm(true);
                }}
                    className="flex text-red-600/60
                    hover:text-red-600/80 active:text-red-600 hover:bg-red-600/10 active:bg-red-600/20 
                    items-center justify-start gap-2 p-2 rounded-lg text-[11px] sm:text-[13px] font-[500]"><LuTrash />Delete</button>
            </div>
        </div>
    )
}