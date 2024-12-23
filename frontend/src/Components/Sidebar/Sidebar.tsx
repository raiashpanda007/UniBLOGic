import { CreateCommunity, Sidebar_Card as SideBar_Component } from '../Components'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import axios from 'axios'
import { useEffect, useState } from 'react'
interface SidebarProps {
  name:string;
  description:string;
  communityLogo?:string;
  id:string
}
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/Store/Store';
import { setCommunities } from '@/Store/communitiesList';
import { useDispatch } from 'react-redux';
const getUserCommunities = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/community/all",{
      withCredentials: true
    });
    
    return response.data.data
  } catch (error) {
    console.error(error)
    
  }
}
function Sidebar() {
  const dispatch:AppDispatch = useDispatch();
  const communitiesList = useSelector((state: RootState) => state.communitiesList.communities);
  const [loading , setLoading] = useState(true)
  const [communities, setcommunities] = useState<SidebarProps[]>([])
  useEffect(()=>{
    const fetchCommunities = async () =>{
      const response = await getUserCommunities();
      if(response && response.length > 0){
        dispatch(setCommunities(response))
      }
      
    }
    fetchCommunities();
  },[])
  
  useEffect(()=>{
    const fetchCommunities = async () => {
      const communities = await getUserCommunities()
      console.log("Communities",communities)
      setcommunities(communities);
      setLoading(false)

    }
    fetchCommunities();
  },[communitiesList])
  
  

  return (
    <div>
        <div className="w-full flex justify-between">
              <h1 className=" font-poppins px-3 font-bold text-2xl bg-white dark:bg-black dark:text-white">
                Communities
              </h1>
              <CreateCommunity />
            </div>

            <div
              className="w-full py-3 relative top-10"
              style={{ height: "calc(100% - 90px)" }}
            >
              <div className="relative h-full">
                <ScrollArea className="h-full w-full overflow-y-auto pb-10">
                {
                  communities ? communities.map((community) => (
                    <SideBar_Component
                      name={community.name}
                      description={community.description}
                      commuityLogo={community.communityLogo}
                      loading={loading}
                    />
                  )):(
                    <div className='text-center text-gray-500 dark:text-white font-poppins font-semibold'>
                      NO COMMUNITIES JOINED 😞
                    </div>
                  )
                }
                  
                  
                </ScrollArea>
              </div>
            </div>
    </div>
  )
}

export default Sidebar