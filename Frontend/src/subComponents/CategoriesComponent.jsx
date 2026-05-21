
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { LuPlus } from 'react-icons/lu';
import { createCategory, editCategoryOrder } from '../Apis/menuApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../Store/Menu/menuReducer';





export default function CategoriesComponent({activeCat, setActiveCat, showMobileItems, setShowMobileItems }) {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const {isLoading,menu} = useSelector(state=>state.menu);
    const [openAddCat, setOpenAddCat] = useState(false);
    const catInputRef = useRef(null);
    const dispatch = useDispatch();
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(menu);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        dispatch(setMenu(items));
        const orderData = items.map((cat, index) => ({
            id: cat.id,
            display_order: index
        }));

        await editCategoryOrder(orderData);

    };
    const handleCreateCat = async () => {
        const cat_name = catInputRef.current.value;
        function successFunction(cat_id) {
            const new_cat = {
                id: cat_id,
                category_name: cat_name,
                item_count: 0,
                items:[]
            }
            dispatch(setMenu([new_cat,...menu]));
            catInputRef.current.value = '';
            setOpenAddCat(false);
        }
        setLoadingBtn(true);
        await createCategory(cat_name, successFunction);
        setLoadingBtn(false);
    }


    useEffect(() => {
        if (openAddCat && catInputRef.current) {
            catInputRef.current.focus();
        }
    }, [openAddCat]);
    useEffect(()=>{
        if(menu?.length>0 && !activeCat){
            setActiveCat(menu[0].id);
        }
    },[])
    return (
        <div className={`w-full ${!showMobileItems ? 'flex' : 'hidden sm:flex'} pb-2 sm:pb-0 sm:pr-2 sm:w-[250px] xl:w-[300px] h-full sm:h-full flex-col gap-4
             border-divider border-dashed border-r-0 sm:border-r-1 `}>
            <h6 className="text-main-text font-[600] text-[16px] sm:text-[17px] lg:text-[18px] ">
                Categories
            </h6>
            {
                isLoading ?
                    <div className="w-full flex flex-col gap-2 mask-bottom-fade">
                        {
                            [1, 2, 3, 4, 5, 6].map(i =>
                                <div key={i} className="w-full p-2  animate-pulse bg-toast-bg rounded-lg flex items-center gap-2">
                                    <div className="size-[30px]  rounded-2xl animate-wave">
                                    </div>
                                    <div className="rounded-2xl w-[70%] h-[14px] md:h-[16px] animate-wave"></div>
                                </div>
                            )
                        }
                    </div> :
                    menu.length > 0 ?
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="categories-list">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className=" min-h-0 w-full pb-10 overflow-y-auto show-custom-scrollbar flex flex-col gap-2 sm:gap-4"
                                    >
                                        {menu.map((c, index) => (
                                            <CategoryCard
                                                c={c}
                                                key={c.id}
                                                index={index}
                                                activeCat={activeCat}
                                                setActiveCat={setActiveCat}
                                                onClick={() => {
                                                    setActiveCat(c.id);
                                                    setShowMobileItems(true);
                                                }}
                                            />
                                        ))}
                                        {provided.placeholder} 
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext> :
                        <div className='flex flex-col items-center gap-2 text-center'>
                            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1776824800/uppdvvhqrps5hgxpnpwf.png" alt="" />
                            <div className='text-[16px] sm:text-[18px] font-[600] text-main-text'>
                                No Categories Found
                            </div>
                            <span className='text-[12px] sm:text-[13px] text-low-text/70 '>
                                It looks like your menu is empty right now.
                            </span>
                        </div>
            }
            {
                !isLoading &&
                <div className={`w-full border-1 rounded-md
                            ${openAddCat ? 'border-active-border' : 'border-active-border/50 hover:border-active-border/70 active:border-active-border border-dashed'}`}>
                    {
                        openAddCat ?
                            <div className='w-full p-2 flex flex-col gap-1'>
                                <input type="text" ref={catInputRef} placeholder='Category name...'
                                    className='border-b-1 border-divider focus:border-active-border outline-0
                                            text-[11px] sm:text-[13px] font-[500] text-sec-text px-1'/>
                                <div className='w-full flex justify-between items-center'>
                                    <button disabled={loadingBtn} onClick={handleCreateCat}
                                        className={`w-[48%] py-1 text-[9px] sm:text-[11px] rounded-sm flex justify-center items-center
                                                    ${loadingBtn ? 'bg-divider text-low-text' : 'bg-linear-0 text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99'} `}
                                    >{loadingBtn ? <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> : 'Add'}</button>
                                    <button onClick={() => {
                                        setOpenAddCat(false)
                                    }}
                                        className='w-[48%] py-1 text-[9px] sm:text-[11px] 
                                                    hover:bg-divider/50 active:bg-divider/70 text-low-text rounded-sm'>
                                        Cancel
                                    </button>
                                </div>
                            </div> :
                            <div onClick={() => setOpenAddCat(true)} className='w-full p-2 flex justify-center items-center capitalize cursor-pointer 
                                        text-active-border/50 hover:text-active-border/70 active:text-active-border text-[13px] sm:text-[15px]
                                        hover:bg-active-border/5 active:bg-active-border/10'>
                                <LuPlus />
                                Add category
                            </div>
                    }
                </div>
            }

        </div>
    )
}