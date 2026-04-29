import { useEffect } from "react";
import { useState } from "react"
import { getMenuCategories } from "../Apis/menuApi";
import { MdDragIndicator } from "react-icons/md";
import CategoriesComponent from "../subComponents/CategoriesComponent";




export default function MenuBuilder() {
    const [categories, setCategories] = useState([
        { id: '1', category_name: 'Starters', itemCount: 12 },
        { id: '2', category_name: 'Main Course', itemCount: 25 },
        { id: '3', category_name: 'Breads & Rice', itemCount: 8 },
        { id: '4', category_name: 'Beverages', itemCount: 15 },
        { id: '5', category_name: 'Starters', itemCount: 12 },
        { id: '6', category_name: 'Main Course', itemCount: 25 },
        { id: '7', category_name: 'Breads & Rice', itemCount: 8 },
        { id: '8', category_name: 'Beverages', itemCount: 15 },
        { id: '9', category_name: 'Starters', itemCount: 12 },
        { id: '10', category_name: 'Main Course', itemCount: 25 },
        { id: '11', category_name: 'Breads & Rice', itemCount: 8 },
        { id: '12', category_name: 'Beverages', itemCount: 15 },
        { id: '13', category_name: 'Starters', itemCount: 12 },
        { id: '14', category_name: 'Main Course', itemCount: 25 },
        { id: '15', category_name: 'Breads & Rice', itemCount: 8 },
        { id: '16', category_name: 'Beverages', itemCount: 15 },
    ]);
    const [activeCat, setActiveCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(() => {
        // getCategory();
    }, []);

    const getCategory = async () => {
        function successFunction(data) {
            setCategories(data);
        }
        setIsLoading(true);
        await getMenuCategories(successFunction);
        setIsLoading(false);
    }
    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <CategoriesComponent categories={categories} setCategories={setCategories}
                isLoading={isLoading} 
                activeCat={activeCat} setActiveCat={setActiveCat}/>

            <div className="">
                {/* Menu Item */}
            </div>
        </div>
    )
}