import { useEffect, useState } from "react"
import BackdropPage from "../components/BackdropPage";
import AddNewMenuItem from "../components/AddNewMenuItem";
import MenuItemCard from "./MenuItemCard";
import LoadingMenuItemCard from "./LoadingMenuItemCard";
import { getCatItems } from "../Apis/menuApi";


export default function MenuItems({ activeCat, categories }) {
    const [openAddItem, setOpenAddItem] = useState(false);
    const [catItems, setCatItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        if (!activeCat) {
            return;
        }
        getItemHandler(activeCat);
    }, [activeCat]);

    const getItemHandler = async (cat_id) => {
        function successFunction(items) {
            setCatItems(items);
        }
        setIsLoading(true);
        await getCatItems(cat_id, successFunction);
        setIsLoading(false);
    }
    return (
        <div className=" flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 md:gap-3">
            <BackdropPage isOpen={openAddItem} onClose={() => setOpenAddItem(false)} >
                <AddNewMenuItem onClose={() => setOpenAddItem(false)} type="create" activeCat={activeCat} categories={categories} setCatItems={setCatItems}/>
            </BackdropPage>
            {
                !activeCat ?
                    <div className="flex-1 w-full min-h-0 flex flex-col items-center gap-2 text-center justify-center ">
                        <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1776824800/uppdvvhqrps5hgxpnpwf.png" alt=""
                            className="w-[100%] max-w-[450px] object-contain mb-3" />
                        <div className="w-full flex flex-col items-center text-center gap-1">
                            <div className="w-full text-[24px] md:text-[27px] font-[600] uppercase text-main-text">
                                Category not selected
                            </div>
                            <div className="w-full text-[11px] sm:text-[13px] text-low-text/70">
                                Select an category to see Items in it.
                            </div>
                        </div>
                    </div> :
                    <>
                        {isLoading ?
                            <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 xl:gap-4 mask-bottom-fade">
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                                        <LoadingMenuItemCard key={i} />
                                    )
                                }
                            </div> :
                            <>
                                {activeCat &&
                                    <div className="w-full flex justify-end">
                                        <button onClick={() => setOpenAddItem(true)}
                                            className="px-3 py-2 w-fit rounded-lg bg-linear-0 flex items-center gap-1 text-center justify-center
                                        text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                                        text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                                        shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99 ">Add New Item</button>
                                    </div>
                                }

                                {
                                    catItems.length == 0 ?
                                        <div className="flex-1 w-full min-h-0 flex flex-col items-center gap-2 text-center justify-center ">
                                            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773223629/qrhxbalx1f52bsbarbgk.png" alt=""
                                                className="w-[100%] max-w-[450px] object-contain mb-3" />
                                            <div className="w-full flex flex-col items-center text-center gap-1">
                                                <div className="w-full text-[24px] md:text-[27px] font-[600] uppercase text-main-text">
                                                    No item found
                                                </div>
                                                <div className="w-full text-[11px] sm:text-[13px] text-low-text/70">
                                                    There is no item in this specific category.
                                                </div>
                                            </div>
                                        </div>
                                        : <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar pb-4
                                        w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 xl:gap-4">
                                            {
                                                catItems.map(i =>
                                                    <MenuItemCard data={i} key={i.id} setCatItems={setCatItems} activeCat={activeCat}
                                                        categories={categories}/>
                                                )
                                            }
                                        </div>
                                }

                            </>}
                    </>
            }

        </div>
    )
}