import { useEffect, useRef, useState } from "react";
import { LuDelete, LuEllipsisVertical, LuGripHorizontal, LuPencil, LuRemoveFormatting, LuTrash } from "react-icons/lu";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";
import BackdropPage from "../components/BackdropPage";
import AlertBox from "./ConfirmBox";
import { deleteCategory } from "../Apis/menuApi";



export default function CategoryCard({ c, setCategories }) {
    const [openOption, setOpenOption] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [state,setInputState] = useState('');
    const [loadingBtn,setLoadingBtn] = useState(false);

    const optionRef = useRef(null);
    const clickBtnRef = useRef(null);

    useEffect(()=>{
        setInputState(c?.category_name);
    },[c?.category_name])

    useOutsideClick(optionRef, () => { setOpenOption(false) }, clickBtnRef);


    const removeCat =async()=>{
        function successFunction (){
            setCategories(prev=>(
                [...prev.filter(cat=>cat.id!=c.id)]
            ));
        }
        setLoadingBtn(true);
        await deleteCategory(c.id,successFunction);
        setLoadingBtn(false);
    }
    return (
        <div key={c.id} className="relative w-full p-2 bg-divider/40 hover:bg-active-border/10 rounded-lg flex items-center gap-2">
            <div onClick={(e) => {
                e.stopPropagation();

            }}
                className="rounded-2xl text-main-text text-[12px] sm:text-[14px] p-2 hover:bg-divider/50 active:bg-divider/80 hover:cursor-grab active:cursor-grabbing">
                <LuGripHorizontal />
            </div>
            {!openEdit ?
                <>
                <div className="flex-1 min-w-0 text-main-text text-[12px] sm:text-[14px] truncate">{c.category_name}</div> 
                <span className="size-[20px] md:size-[25px] bg-toast-bg text-low-text rounded-[50%] flex justify-center items-center text-[10px] sm:text-[12px]">{(c.item_count)?(c.item_count<100?c.item_count:'99+'):0}</span>
                </>:
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
            <BackdropPage isOpen={openConfirm} onClose={()=>setOpenConfirm(false)} >
                <AlertBox type={'error'} 
                    title={'Delete Category'} desc={'Are you sure to delete category?\nMenu items will also deleted.'} 
                    confirmFunction={removeCat} loadingBtn={loadingBtn} onCancel={()=>setOpenConfirm(false)}/>
            </BackdropPage>
        </div>
    )
}