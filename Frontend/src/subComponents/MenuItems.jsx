import { useState } from "react"
import BackdropPage from "../components/BackdropPage";
import AddNewMenuItem from "../components/AddNewMenuItem";
import MenuItemCard from "./MenuItemCard";
import LoadingMenuItemCard from "./LoadingMenuItemCard";

const data = {
    id: 1,
    item_name: 'Chicken Thukpa',
    image: 'https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png',
    description: 'With soup, Middium spicy, Made with Indian spices and Made in India Noodles.',
    is_veg: true,
    price_array: [
        {
            id: 1,
            quantity: 'Half Plate',
            price: '60'
        },
        {
            id: 2,
            quantity: 'Full Plate',
            price: '100'
        }
    ]
}


export default function MenuItems({ activeCat, categories }) {
    const [openAddItem, setOpenAddItem] = useState(false);
    const [catItems, setCatItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    return (
        <div className=" flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 md:gap-3">
            <BackdropPage isOpen={openAddItem} onClose={() => setOpenAddItem(false)} >
                <AddNewMenuItem onClose={() => setOpenAddItem(false)} type="create" activeCat={activeCat} categories={categories} />
            </BackdropPage>
            {   isLoading?
                <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 xl:gap-4 mask-bottom-fade">
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12].map(i=>
                            <LoadingMenuItemCard key={i} />
                        )
                    }
                </div>:
                <>{activeCat && <div className="w-full flex justify-end">
                <button onClick={() => setOpenAddItem(true)}
                    className="px-3 py-2 w-fit rounded-lg bg-linear-0 flex items-center gap-1 text-center justify-center
                text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99 ">Add New Item</button>
            </div>}
                <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 xl:gap-4">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                            <MenuItemCard data={data} key={i} />
                        )
                    }
                </div>
            </>}
        </div>
    )
}