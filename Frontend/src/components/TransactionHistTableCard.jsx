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
      <div className='w-full text-[12px]/4 sm:text-[13px]/4 rounded-xl border-1 border-divider overflow-hidden'>
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
                  <td className='p-2 text-sec-text/80 capitalize' key={i}>{d?.[t]}</td>
                )
              }
            </tr>)}
          </tbody>
        </table>
        
      </div>

    </div>
  )
}

export default TransactionHistTableCard
