import {useSelector} from 'react-redux';
import TableTypeSelector from '../../components/TableTypeSelector';
import TableView from '../../components/TablesView';
import { useEffect, useState } from 'react';
import { getTableZones } from '../../Apis/tablesApi';
import MainPagesHeader from '../../components/MainPagesHeader';
import { IoAdd } from 'react-icons/io5';
import BackdropPage from '../../components/BackdropPage';
import AddNewTable from '../../components/AddNewTable';




export default function LiveTable(){

    const {role,permissions} = useSelector(state=>state.auth);
    const [isLoading,setIsLoading] = useState(false);
    const [zonesList,setZonesList] = useState([]);
    const [activeZone,setActiveZone] = useState();
    const [tablesList,setTablesList] = useState()
    const [openAddTable,setOpenAddTable] = useState(false);

    useEffect(()=>{
        getZones();
    },[]);
    useEffect(()=>{
        if(activeZone){
           const active = zonesList?.find(z=>z.id==activeZone);
            setTablesList(active?.tables_array);
        }
    },[activeZone])

    const getZones =async()=>{
        function successFunction(data){
            setZonesList(data);
            setActiveZone(data?.[0].id)
        }

        setIsLoading(true);
        await getTableZones(successFunction);
        setIsLoading(false);
    }
    return(
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">
            <MainPagesHeader 
                pageHeading={'Live Floor'} tagline={'Manage live tables and fast-track customer orders.'}
                containBtn={role=='owner' || permissions?.['can_manage_table']} btnData={ {iconStart:<IoAdd/>, text:'Add Table',onClick:()=>{setOpenAddTable(true)} }}/>
            <BackdropPage isOpen={openAddTable} onClose={()=>setOpenAddTable(false)} >
                <AddNewTable onClose={()=>setOpenAddTable(false)}/>
            </BackdropPage>
            <TableTypeSelector zonesList={zonesList} activeZone={activeZone} setActiveZone={setActiveZone} isLoading={isLoading} />
            <TableView tablesList={tablesList} isLoading={isLoading} />
        </div>
    )
}