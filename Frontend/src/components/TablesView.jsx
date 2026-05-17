import TableCard from "../subComponents/TableCard";





export default function TableView ({isLoading=false,tablesList=[]}){
    return(
        <div className={`w-full ${isLoading?'mask-bottom-fade':''} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-2 `}>
            {
                
            }
        </div>
    )
}