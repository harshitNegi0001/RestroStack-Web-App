import { useEffect, useRef, useState } from "react";
import { LuDelete, LuEllipsisVertical, LuGripHorizontal, LuPencil, LuRemoveFormatting, LuTrash } from "react-icons/lu";
import { useOutsideClick } from "../utils/coustomHook/useOutsideClick";
import BackdropPage from "../components/BackdropPage";
import AlertBox from "./ConfirmBox";
import { deleteCategory, editCatName } from "../Apis/menuApi";



export default function CategoryCard({ c, setCategories,activeCat,onClick }) {
    const [openOption, setOpenOption] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const catNameInputRef = useRef(null);
    const optionRef = useRef(null);
    const clickBtnRef = useRef(null);

    useEffect(() => {
        if (catNameInputRef.current) {
            catNameInputRef.current.value = c.category_name;
        }
    }, [c?.category_name]);

    useEffect(() => {
        if (openEdit && catNameInputRef.current) {
            catNameInputRef.current.value = c.category_name;
            catNameInputRef.current.focus();
        }
    }, [openEdit])

    useOutsideClick(optionRef, () => { setOpenOption(false) }, clickBtnRef);


    const removeCat = async () => {
        function successFunction() {
            setCategories(prev => (
                [...prev.filter(cat => cat.id != c.id)]
            ));
        }
        setLoadingBtn(true);
        await deleteCategory(c.id, successFunction);
        setLoadingBtn(false);
    }
    const handleEditSave = async(e)=>{
        e.stopPropagation();
        function successFunction (){
            const updatedCat = {
                ...c,category_name:catNameInputRef.current?.value
            }
            setCategories(prev=>(
                [...prev.map(cat=>cat.id!=c.id?cat:updatedCat)]
            ))
            setOpenEdit(false);
        }
        setLoadingBtn(true);
        await editCatName(c.id,catNameInputRef.current?.value,successFunction);
        setLoadingBtn(false);
    }
    return (
        <div key={c.id}
            onClick={()=>{
                if(openEdit){
                    return
                }
                else{
                    onClick();
                }
            }}
         className={`relative w-full p-2 ${c.id==activeCat?'bg-divider/30 ':'hover:bg-sec-text/5 active:bg-sec-text/20 text-low-text/70 hover:text-low-text active:text-sec-text'} rounded-lg flex items-center gap-2`}>
            <div onClick={(e) => {
                e.stopPropagation();
            }}
                className="rounded-2xl text-main-text text-[12px] sm:text-[14px] p-2 hover:bg-divider/50 active:bg-divider/80 hover:cursor-grab active:cursor-grabbing">
                <LuGripHorizontal />
            </div>
            {!openEdit ?
                <>
                    <div className={`flex-1 min-w-0 ${c.id==activeCat? 'text-active-border':'text-main-text'} text-[12px] sm:text-[14px] truncate capitalize`}>{c.category_name}</div>
                    <span className="size-[20px] md:size-[25px] bg-toast-bg text-low-text rounded-[50%] flex justify-center items-center text-[10px] sm:text-[12px]">{(c.item_count) ? (c.item_count < 100 ? c.item_count : '99+') : 0}</span>
                </> :
                <div className="flex-1 min-w-0 ">
                    <input type="text" name="" id="" ref={catNameInputRef}
                        className="outline-0 border-0 focus:border-b-1 border-active-border text-main-text text-[12px] sm:text-[14px]" />
                </div>
            }
            {openEdit ?
                <button disabled={loadingBtn} onClick={handleEditSave}
                    className={` py-1 px-2 text-[9px] sm:text-[11px] rounded-sm flex justify-center items-center
                         ${loadingBtn ? 'bg-divider text-low-text' : 'bg-linear-0 text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'} `}
                >{loadingBtn ? <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> : 'save'}</button> :
                <div ref={clickBtnRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenOption(prev => !prev);
                    }}
                    className="relative rounded-2xl text-main-text text-[12px] sm:text-[14px] p-2 hover:bg-divider/50 active:bg-divider/80 cursor-pointer">
                    <LuEllipsisVertical />

                </div>}
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
            <BackdropPage isOpen={openConfirm} onClose={() => setOpenConfirm(false)} >
                <AlertBox type={'error'}
                    title={'Confirm Deletion'} desc={'Are you sure you want to delete this category? \nThis action will permanently remove all associated menu items.'}
                    confirmFunction={removeCat} loadingBtn={loadingBtn} onCancel={() => setOpenConfirm(false)} />
            </BackdropPage>
        </div>
    )
}