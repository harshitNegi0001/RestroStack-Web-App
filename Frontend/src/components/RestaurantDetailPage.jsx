import { useEffect, useState } from "react"
import ResIdentityCard from "../subComponents/ResIdentityCard";
import { getCurrentRestaurant } from "../Apis/restrauntSetupApi";
import ResBuisness from "../subComponents/ResBuisness";







export default function ResDetailPage(){
    const [openEditRes,setOpenEditRes] = useState(false);
    const [resData,setResData] = useState({});
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        getData();
    },[]);

    const getData =async()=>{
        setIsLoading(true);
        const successFunction =({resData})=>{
            setResData(...resData);
        }
        await getCurrentRestaurant(successFunction);
        setIsLoading(false);
    }

    return(
        <div className="bg-card-bg p-2 md:p-3 rounded-2xl w-full shadow-md flex flex-col md:flex-row md:justify-evenly md:items-start gap-3">
            <div 
            className="flex p-2 md:p-3 border-1 border-divider rounded-2xl w-full md:w-[48%]">
                <ResIdentityCard resData={resData} setResData={setResData} isLoading={isLoading} />
            </div>
            <div className="flex p-2 md:p-3 border-1 border-divider rounded-2xl w-full md:w-[48%]">
                <ResBuisness resData={resData} setResData={setResData} isLoading={isLoading} />
            </div>
        </div>
    )
}