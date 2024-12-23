import {
  Sidebar,
  EditButton,
  SearchResult,
} from "@/Components/Components";
import { useParams } from "react-router-dom";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { Option_Logo } from "@/Components/Components";
import { Skeleton } from "@/components/ui/skeleton";
import { useState,useEffect } from "react";
import GroupPng from "@/assets/group.png";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface CommunityProps {
  id: string;
  name: string;
  description: string;
  communityLogo: string;
} 
interface UserProps {
  name:string;
  username:string;
  profilePicture:string;
  batch:number;
  branch:string;
  communities:CommunityProps[];

}
function UserDetails() {
  const {user_id} = useParams();
  const getUserDetails = async () => {
    const response = await axios.get("http://localhost:3000/api/user/details", {
      headers: {
        userid: user_id,
      },
      withCredentials: true,
    });

    if(!response.data.data) return null;
    return response.data.data;

    
  }

  const [data, setData] = useState<UserProps>();
  
   
  
  const [loading, setLoading] = useState<boolean>(false);
   useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const result = await getUserDetails();
        setData(result);
        setLoading(false);
      };
      fetchData();
    
      
    }, [user_id]);
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div
      className={`${mode} h-screen w-screen dark:bg-black overflow-hidden z-0`}
    >
      <div className="relative top-32" style={{ height: "calc(100% - 36px)" }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={0}
            style={{ flexBasis: "20%", minWidth: "20%", maxWidth: "50%" }}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div
              className="w-full flex flex-col dark:text-white"
              style={{ height: "calc(100% - 90px)" }}
            >
              <div className="h-1/3  w-full flex rounded-md">
                <div className="w-1/4 h-full  flex flex-col items-center justify-evenly">
                  {loading ? (
                    <Skeleton className="h-40 w-40 rounded-full" />
                  ) : (
                    <div className="w-40 h-40 border rounded-full ">
                      {data && data.profilePicture ? (
                        <img
                          src={data.profilePicture}
                          alt="Community Logo"
                          className="w-40 h-40 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={GroupPng}
                          alt="Default Group"
                          className="w-full bg-white h-full rounded-full"
                        />
                      )}
                    </div>
                  )}
                  
                </div>
                <div className=" w-3/4 flex flex-col space-y-3">
                  {loading ? (
                    <>
                      <Skeleton className="h-1/5 w-5/6 " />
                      <Skeleton className="h-2/5 w-5/6 " />
                    </>
                  ) : (
                    <>
                      <div className="h-1/5  flex items-center  pl-2">
                        <Option_Logo
                          label={data?.name || "Name"}
                          className="text-4xl"
                        />
                        <EditButton type="Users" defaultValues={{name:data?.name,username:data?.username}} />
                      </div>
                      <div className="h-2/5 flex items-center pl-2">
                        <Button variant={"outline"} className="font-montserrat text-2xl font-bold">
                            Branch: 
                        </Button>
                        <div className="font-poppins text-lg pl-3">
                            {data?.branch}
                        </div>
                      </div>
                      <div className="h-2/5 flex items-center pl-2">
                        <Button variant={"outline"} className="font-montserrat text-2xl font-bold">
                            Batch: 
                        </Button>
                        <div className="font-poppins text-lg pl-3">
                            {data?.batch}
                        </div>
                      </div>
                      
                    </>
                  )}
                  <div className="h-1/5 w-1/2  flex">
                    {loading ? (
                      <>
                        <Skeleton className="h-full w-1/3 " />
                        
                      </>
                    ) : (
                      <>
                       
                        <div className="h-full w-1/2 flex justify-start items-center">
                          <p className="font-montserrat font-bold">USERNAME : </p>
                          <Button variant={"secondary"}>
                            <Option_Logo label={data?.username ||" "} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Tabs defaultValue="communities" className="mt-2 h-2/3 w-full">
                <TabsList className="h-1/6 w-full dark:bg-black bg-gray-100">
                  <TabsTrigger value="communities" className="text-5xl font-bold font-montserrat">
                    Communities Joined 
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="communities" className="h-5/6 w-full">
                  {
                    data && data.communities.length > 0 ? <>
                      <ScrollArea className="h-full w-full overflow-y-auto my-1 flex flex-col items-center">
                        {data.communities.map((community)=>(
                          
                          <div key={community.id} className="flex justify-center items-center border">
                            <SearchResult Data={{...community,username:null,profilePicture:null}} type={"communities"} />
                        </div>
                        ))}
                  </ScrollArea>
                    </>:<></>
                  }
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default UserDetails;
