"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import useGetAllBillboards from '@/hooks/useGetAllBillboards';

import { PlusIcon } from 'lucide-react';

import { columns } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';


type pageProps = {
    params:{
        storeId:string
    }
};
const BillBoards:React.FC<pageProps> = ({params}) => {
    const {data}=useGetAllBillboards(params.storeId)
    const router = useRouter()
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?'Bill Boards(0)':`Bill Boards (${(data?.length)})`}
        description='BillBoard is a place where you can advertise your products'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>
      {data && <DataTable columns={columns} searchKey='label' data={data} /> }  
        </div>
   
            </div>
        </div>
    )
}
export default BillBoards;