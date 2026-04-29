
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from "react";
import CategoryCard from "./CategoryCard";





export default function CategoriesComponent({categories,setCategories,isLoading,activeCat,setActiveCat}){
    const [loadingBtn,setLoadingBtn] = useState(false);

    return(
        <div className="w-full pb-2 sm:pb-0 sm:pr-2 sm:w-[250px] xl:w-[300px] h-full flex flex-col gap-4
            border-b-1 sm:border-b-0 border-divider border-dashed border-r-0 sm:border-r-1 ">
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
                            <div className=" min-h-0 w-full pb-2 sm:pb-4 overflow-y-auto flex flex-col gap-2 sm:gap-4">
                                <div className='w-full border-dashed border-1 border-active-border/50 hover:border-active-border/70 active:border-active-border rounded-md p-2 '>

                                </div>
                                {categories.map(c => (
                                    <CategoryCard c={c} key={c.id} setCategories={setCategories}/>
                                ))}
                            </div> :
                            <div>

                            </div>
                }

            </div>
    )
}