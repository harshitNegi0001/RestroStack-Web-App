import { LuGripHorizontal } from "react-icons/lu";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from "react";





export default function CategoriesComponent({categories,setCategories,isLoading,activeCat,setActiveCat}){
    const [loadingBtn,setLoadingBtn] = useState(false);

    return(
        <div className="w-full flex flex-col gap-4">
                <h6 className="text-main-text font-[600] text-[16px] sm:text-[17px] lg:text-[18px] ">
                    Categories
                </h6>
                {
                    isLoading ?
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4">
                            {
                                [1, 2, 3, 4, 5, 6].map(i =>
                                    <div key={i} className="w-full p-2  animate-pulse bg-toast-bg rounded-lg flex items-center gap-2">
                                        <div className="size-[35px]  rounded-2xl animate-wave">
                                        </div>
                                        <div className="rounded-2xl w-[70%] h-[14px] md:h-[16px] animate-wave"></div>
                                    </div>
                                )
                            }
                        </div> :
                        categories.length > 0 ?
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4">
                                {categories.map(c => (
                                    <div key={c.id} className="w-full p-2 bg-divider/40 hover:bg-active-border/10 active:bg-active-border/30 rounded-lg flex items-center gap-2">
                                        <div onClick={(e)=>{
                                            e.stopPropagation();

                                        }}
                                        className="rounded-2xl text-main-text text-[14px] sm:text-[16px] p-2 hover:bg-divider/50 active:bg-divider/80 hover:cursor-grab active:cursor-grabbing">
                                            <LuGripHorizontal />
                                        </div>
                                        <div className="flex-1 min-w-0 text-main-text text-[14px] sm:text-[16px] truncate">{c.category_name}</div>
                                    </div>
                                ))}
                            </div> :
                            <div>

                            </div>
                }

            </div>
    )
}