
import TableCard from "../subComponents/TableCard";






export default function TableView ({isLoading=false,tablesList=[]}){
    
    return(
        <div className={`w-full ${isLoading?'mask-bottom-fade':''} grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 p-2 gap-2 md:gap-4`}>
            {
                isLoading?
                [1,2,3,4,5,6,7,8].map((i)=>
                    <TableCard isLoading={true} key={i} />
                ):
                tablesList?.map((t)=>
                    <TableCard isLoading={false} key={t.id} data={t} />
                )
            }
            
        </div>
    )
}