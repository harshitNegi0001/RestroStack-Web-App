import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import { AddMenuItem } from "../Apis/menuApi";
import { useRef } from "react";
import { LuImage } from "react-icons/lu";






export default function AddNewMenuItem({ onClose, type = 'create', activeCat, categories }) {
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [state, setInputState] = useState({
        item_name: '',
        image: '',

    })
    const [itemImage, setItemImage] = useState(null);
    const imgInputRef = useRef(null);


    const handlAddItem = async () => {
        function successFunction() {
        }
        const formData = new FormData();
        formData.append('type', type);
        formData.append('item_name', state?.item_name);
        setIsLoadingBtn(true);
        await AddMenuItem({}, successFunction);
        setIsLoadingBtn(false);
    }

    const handleImgChange = (file) => {
        if (!file) return;
        const imgUrl = URL.createObjectURL(file);
        setInputState(prev => ({
            ...prev, image: imgUrl
        }));
        setItemImage(file);
    }
    const handleRemoveImage = () => {
        setItemImage(null);
        setInputState(prev => ({ ...prev, image: '' }));
        imgInputRef.current.value=''
    }
    return (
        <div
            className="w-[100dvw] h-[100dvh] sm:w-[500px] sm:h-fit max-h-[100dvh]  bg-card-bg sm:rounded-2xl
        flex flex-col ">
            <div className="flex flex-row justify-start gap-2 sm:justify-between items-start sm:items-center p-3 border-b-1 border-divider">

                <button onClick={onClose}
                    className=" p-1.5 sm:hidden flex  rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
                    <IoArrowBack />
                </button><div className="flex-1 flex flex-col ">
                    <h6 className="text-main-text text-[16px]/5 md:text-[18px]/5 font-[500] capitalize">
                        Setup Food Item
                    </h6>
                    <span className="text-low-text/70 text-[10px] md:text-[11px] ">
                        {type == 'create' ?
                            `Add new food item, set variant and according price.` :
                            `Edit food Item, edit price and variant.`}
                    </span>

                </div>

                <button onClick={onClose}
                    className=" p-1.5 hidden sm:flex rounded-[50%] text-low-text/70 text-[20px] hover:text-sec-text active:text-main-text
                        hover:bg-main-text/5 active:bg-main-text/10">
                    <IoClose />
                </button>
            </div>
            <div className="flex-1 w-full min-h-0 overflow-y-auto show-custom-scrollbar p-3">
                <div className="w-full flex flex-col items-center ">
                    <input type="file" ref={imgInputRef} id="" accept="image/*"
                        onChange={(e) => handleImgChange(e.target.files[0])}
                        className="hidden" />

                    {state?.image ?
                        <div className="w-fit h-fit relative">
                            <span onClick={handleRemoveImage}
                                className="absolute top-0 left-[100%]  rounded-full p-2
                            bg-divider/50 hover:bg-divider/70 active:bg-divider
                            text-low-text/70 hover:text-sec-text active:text-main-text "><IoClose /></span>
                            <img src={state.image} alt=""
                                className="size-[100px] sm:size-[120px] lg:size-[150px] rounded-2xl object-cover" />
                        </div> :
                        <div onClick={() => imgInputRef.current.click()}
                            className="size-[100px] sm:size-[120px] lg:size-[150px] rounded-2xl border-dashed p-2 border-1 flex flex-col items-center justify-center text-center
                            cursor-pointer text-[12px] sm:text-[13px] lg:text-[14px]
                            border-active-border/50 hover:border-active-border/70 active:border-active-border
                            bg-active-border/5 hover:bg-active-border/10 active:bg-active-border/20
                            text-active-border/50 hover:text-active-border/70 active:text-active-border">
                            <LuImage />
                            <span>
                                Image of food item
                            </span>
                        </div>}

                    {/* image section */}
                </div>
            </div>

            <div className="w-full p-3 border-t-1 border-divider flex justify-end">
                <button disabled={isLoadingBtn}
                    onClick={handlAddItem}
                    className={`w-fit px-3 py-2 h-fit gap-1 rounded-lg bg-linear-0 text-white text-[12px] md:text-[13px] lg:text-[14px] font-[500] flex items-center justify-center                         
                                        ${isLoadingBtn ? 'bg-disabled-btn/60 cursor-not-allowed' : 'to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'}`}>
                    {isLoadingBtn ? <svg className="animate-spin -ml-1  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null}
                    {
                        isLoadingBtn ? <span className='text-white/80'>{type == 'create' ? 'Adding...' : 'Updating...'}</span> : (type == 'create') ? 'Add Item' : 'Update Changes'
                    }
                </button>
            </div>
        </div>
    )
}