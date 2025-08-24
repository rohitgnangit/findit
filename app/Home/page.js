"use server"
import connectDB from '@/db/connectDB'
import Found from '@/models/Found'
import Lost from '@/models/Lost'
import ItemSwitcher from '@/components/ItemSwitcher'

const home = async () => {
  await connectDB();
   const foundItems = (await Found.find().sort({ report: -1 }).lean()).map(item => ({
    ...item,
    _id: item._id.toString()
  }));

  const lostItems = (await Lost.find().sort({ report: -1 }).lean()).map(item => ({
    ...item,
    _id: item._id.toString()
  }));
  return(
    <>
    <ItemSwitcher foundItems={foundItems} lostItems={lostItems}/>
    </>
  )
 
}

export default home
