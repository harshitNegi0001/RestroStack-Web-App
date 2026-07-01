import React, { useState } from 'react'
import { currencies } from '../utils/clientSideData/setupVariables';
import { useSelector } from 'react-redux';


const TransactionHistTableCard = ({ isLoading = false, type = 'default', tableData = [],setPerPage }) => {

  const [fullOpenedRow,setFullOpenedRow] = useState(null);
  const { activeResData } = useSelector(state => state.auth);
  const currency = currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹';
  const viewTypeRows = {
    'default': {
      headerRow: ['Invoice No.', 'Table', 'Payment Method', 'Payment Status', `Revenue (${currency})`],
      dataRows: ['invoice_no', 'table_name', 'payment_method', 'payment_status', 'grand_total']
    }
  }
  const mobileViewCol = {
    'default':{
      headerRow:['Invoice No', `Revenue (${currency})`],
      dataRows:['invoice_no','grand_total'],
      fullDataKey:['Invoice No.', 'Table', 'Payment Method', 'Payment Status', `Revenue (${currency})`],
      fullDataValue:['invoice_no', 'table_name', 'payment_method', 'payment_status', 'grand_total']
    }
  }
  return (
    <div className='bg-card-bg hidden sm:flex p-3 w-full border-divider/60 border-1 rounded-2xl'>
      {!isLoading?<div className='w-full text-[12px]/4 sm:text-[13px]/4 rounded-xl border-1 border-divider overflow-hidden'>
        <table className='w-full '>
          <thead className='border-b-1 border-divider bg-active-border/70'>
            <tr className=''>
              {
                viewTypeRows[type]?.headerRow?.map((t, i) =>
                  <th key={i} className='text-white font-[600] p-2 text-start'>{t}</th>
                )
              }
            </tr>
          </thead>

          <tbody>
            {tableData.map(d => <tr key={d.id} className='border-t-1 border-divider/60'>
              {
                viewTypeRows[type]?.dataRows?.map((t, i) =>
                  <td className='p-2 text-sec-text/80 capitalize' key={i}>{d?.[t] ?? '-'}</td>
                )
              }
            </tr>)}
          </tbody>
        </table>
        
      </div>:
      <div className='w-full text-[12px]/4 sm:text-[13px]/4 rounded-xl border-1 border-divider overflow-hidden'>
        <table className='w-full flex flex-col'>
          <thead className='border-b-1 w-full border-divider bg-active-border/50 animate-pulse'>
            <tr className='w-full flex justify-evenly'>
              {
                [1,2,3,4,5].map((i) =>
                  <th key={i} className='w-full p-2 flex items-center justify-start'>
                    <span className='p-2 w-[50%] animate-wave rounded-2xl' ></span>
                  </th>
                )
              }
            </tr>
          </thead>

          <tbody>
            {[1,2,3,4,5,6,7,8].map(i=> <tr key={i} className='border-t-1 border-divider w-full flex justify-evenly'>
              {
                [1,2,3,4,5].map((i) =>
                  <th key={i} className='w-full p-2 flex items-center justify-start'>
                    <span className='p-1.5 w-[75%] animate-wave rounded-2xl' ></span>
                  </th>
                )
              }
            </tr>)}
          </tbody>
        </table>
        
      </div>
    }

    </div>
  )
}

export default TransactionHistTableCard
