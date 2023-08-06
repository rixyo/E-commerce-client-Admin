"use client"
import { format } from 'date-fns';
import React from 'react';
import { useRouter } from 'next/navigation';
import { formatter } from '@/lib/utils';

import { columns, OrderColumn } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import useGetAllOrders from '@/hooks/useGetAllOrders';


type pageProps = {
    params:{
        storeId:string
    }
};
const Orders:React.FC<pageProps> = ({params}) => {
    const {data:orders,isLoading}=useGetAllOrders(params.storeId)
    const router = useRouter()
  
    const data:OrderColumn[]|undefined = orders?.map((item) => ({
        id: item.id,
        address: item.address,
        phone: item.phone,
        orderItems:item.orderItems.map((item)=>item.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
          }, 0)),
        orderItemsQuantity:item.orderItems.map((item)=>item.quantity).join(', '),
        orderItemsSize:item.orderItems.map((item)=>item.size).join(', '),
        orderItemsColor:item.orderItems.map((item)=>item.color),
        isDelivered: item.isDelivered,
        isPaid: item.isPaid,
        createdAt:format(new Date(item.createdAt), 'MMMM do, yyyy').toString(),
    }));
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <>
      <Heading
        title={data===undefined?'Orders (0)':`Orders (${(data?.length)})`}
        description='List of all orders'
         />  
        </>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>
      {data && <DataTable columns={columns} searchKey='orderItems' data={data} /> }  
        </div>
   
            </div>
        </div>
    )
}
export default Orders;