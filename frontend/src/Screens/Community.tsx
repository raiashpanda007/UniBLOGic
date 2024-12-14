import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "@/Components/Components";
import { useEffect, useState } from "react";
import {
  Sidebar,
  CommunityPostCard,
  EditButton,
  SearchResult
} from "@/Components/Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroupPng from "@/assets/group.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
}
interface CommunityProps {
  CommunityName: string;
  CommunityDescription: string;
  isJoined: boolean;
  CommunityLogo: string | null;
  CommunityAdmin: User;
  CommunityUsers: User[];
}
interface Data {
  name: string;
  username: string;
  profilePicture: string;
}

interface SearchProps {
  Data:Data;
  type:string;

}
function Community() {
  // creating a temp user 
  const Props = {
    Data: {
      name: "John Doe",
      username: "johndoe",
      profilePicture: ""
    },
    type: "user"
  }

  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CommunityProps>();
  const getDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
        withCredentials: true,
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getDetails();
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
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
              className="w-full flex flex-col"
              style={{ height: "calc(100% - 90px)" }}
            >
              <div className="h-1/3  w-full flex rounded-md">
                <div className="w-1/4 h-full  flex flex-col items-center justify-evenly">
                  {loading ? (
                    <Skeleton className="h-40 w-40 rounded-full" />
                  ) : (
                    <div className="w-40 h-40 border rounded-full ">
                      {data && data.CommunityLogo ? (
                        <img
                          src={data.CommunityLogo}
                          alt="Community Logo"
                          className="w-full h-full object-cover"
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
                  <div className="h-10 w-20 flex justify-center items-center ">
                    {loading ? (
                      <Skeleton className="h-10 w-20" />
                    ) : data && data.isJoined ? (
                      <Button variant={"secondary"}>
                        <Option_Logo label="Leave" />
                      </Button>
                    ) : (
                      <Button variant={"ghost"}>
                        <Option_Logo label="Join + " />
                      </Button>
                    )}
                  </div>
                </div>
                <div className=" w-3/4 flex flex-col justify-evenly">
                  {loading ? (
                    <>
                      <Skeleton className="h-1/5 w-5/6 " />
                      <Skeleton className="h-2/5 w-5/6 " />
                    </>
                  ) : (
                    <>
                      <div className="h-1/5  flex items-center  pl-2">
                        <Option_Logo
                          label="Community Name"
                          className="text-4xl"
                        />
                        <EditButton />
                      </div>
                      <ScrollArea className="h-2/5  w-full overflow-y-auto border rounded-md dark:text-white dark:bg-slate-900 bg-gray-200">
                        <p className="text-sm m-1 font-poppins">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Ab ipsam voluptates maxime recusandae quae
                          consequatur in nisi quo dolores omnis vitae, commodi
                          quibusdam, eaque, at quasi aperiam saepe perspiciatis
                          aliquid cupiditate veritatis? Animi obcaecati culpa
                          aliquid id dicta sunt labore unde a dolor
                          reprehenderit amet, eveniet vel hic nisi consectetur
                          repellendus consequuntur ipsam, distinctio magni!
                          Saepe quos laudantium quod commodi veniam sint tempore
                          repudiandae praesentium, quasi illo alias harum
                          aperiam inventore aut maxime totam similique, vel
                          quisquam! Ratione tempore maxime ullam neque officiis
                          quidem magnam dolores modi id magni ipsum ab
                          voluptatum expedita incidunt deserunt, iure numquam
                          architecto quo culpa in dolorum suscipit sed!
                          Accusamus dolor ex quod, nostrum veritatis ipsum sit
                          mollitia voluptatibus perferendis modi delectus
                          doloremque molestiae quis aperiam libero sequi porro
                          accusantium autem nihil! Ex, quod! Corporis facilis
                          omnis dolores officiis eos, dolore ipsum deserunt rem
                          unde dicta! Labore laudantium quasi aperiam
                          repudiandae suscipit est aut accusamus!
                        </p>
                      </ScrollArea>
                    </>
                  )}
                  <div className="h-1/5 w-1/2  flex">
                    {loading ? (
                      <>
                        <Skeleton className="h-full w-1/3 " />
                        <Skeleton className="h-full w-1/3 " />
                      </>
                    ) : (
                      <>
                        <div className="h-full w-1/2 flex justify-center border dark:border-white items-center text-green-600 font-montserrat font-bold">
                          200 Members
                        </div>
                        <div className="h-full w-1/2 flex justify-center items-center">
                          <p className="font-montserrat font-bold">ADMIN : </p>
                          <Button variant={"secondary"}>
                            <Option_Logo label="@god" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Tabs defaultValue="posts" className="h-2/3 w-full">
                <TabsList className="h-1/6 grid w-full grid-cols-2 dark:bg-gray-800 bg-gray-100">
                  <TabsTrigger
                    value="posts"
                    className="text-2xl font-semibold h-full font-montserrat"
                  >
                    Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="text-2xl font-semibold h-full font-montserrat"
                  >
                    Users
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="h-5/6 w-full ">
                  <ScrollArea className="h-full w-full  overflow-y-auto  ">
                    <div className="w-full flex justify-center items-center">
                      <CommunityPostCard
                        Content="This is our community we will grow and become better day by day Lorem ipsum odor amet, consectetuer adipiscing elit. Libero sollicitudin placerat ligula elementum, facilisi mauris tristique. Metus facilisi lacinia habitant metus ridiculus dictumst montes a elit. Placerat porttitor euismod varius urna curae vel scelerisque. Ultricies tellus efficitur tempor dictum integer ullamcorper pretium dignissim sit. Sollicitudin facilisi ac natoque dignissim tortor fames egestas tincidunt? Phasellus enim ligula eleifend est, taciti consectetur efficitur class.

Euismod cras litora tortor ac varius malesuada condimentum dui. Facilisi eu maecenas diam curabitur cras fames lobortis. Varius per semper velit proin commodo lectus in ut. Conubia feugiat sagittis sodales inceptos, finibus scelerisque viverra ante. Mollis feugiat ex laoreet, enim magna non convallis. Diam iaculis phasellus ullamcorper ipsum ante. Tincidunt nunc leo pellentesque mattis libero ridiculus primis. Posuere habitant netus turpis sagittis, per nunc ultricies id maecenas. Elementum phasellus mattis class turpis tempor luctus molestie. Dapibus cubilia dolor elit curabitur nascetur porta sollicitudin"
                        Upvote_Counts={1000}
                        Comments_Count={239}
                        isUpvoted={false}
                        Image="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?t=st=1734115888~exp=1734119488~hmac=5ca5263e319679fb81a374d75794fffe68b45e18b4047ff560632e8f7415817a&w=2000"
                        onClick={() => {
                          navigate("/post/12");
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <CommunityPostCard
                        Content="This is our community we will grow and become better day by day "
                        Upvote_Counts={1000}
                        Comments_Count={239}
                        isUpvoted={false}
                        Image="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?t=st=1734115888~exp=1734119488~hmac=5ca5263e319679fb81a374d75794fffe68b45e18b4047ff560632e8f7415817a&w=2000"
                        onClick={() => {
                          navigate("/post/12");
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <CommunityPostCard
                        Content="This is our community we will grow and become better day by day "
                        Upvote_Counts={1000}
                        Comments_Count={239}
                        isUpvoted={false}
                        Image="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?t=st=1734115888~exp=1734119488~hmac=5ca5263e319679fb81a374d75794fffe68b45e18b4047ff560632e8f7415817a&w=2000"
                        onClick={() => {
                          navigate("/post/12");
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <CommunityPostCard
                        Content="This is our community we will grow and become better day by day "
                        Upvote_Counts={1000}
                        Comments_Count={239}
                        isUpvoted={false}
                        Image="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?t=st=1734115888~exp=1734119488~hmac=5ca5263e319679fb81a374d75794fffe68b45e18b4047ff560632e8f7415817a&w=2000"
                        onClick={() => {
                          navigate("/post/12");
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <CommunityPostCard
                        Content="This is our community we will grow and become better day by day "
                        Upvote_Counts={1000}
                        Comments_Count={239}
                        isUpvoted={false}
                        Image="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-1652.jpg?t=st=1734115888~exp=1734119488~hmac=5ca5263e319679fb81a374d75794fffe68b45e18b4047ff560632e8f7415817a&w=2000"
                        onClick={() => {
                          navigate("/post/12");
                        }}
                      />
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="users" className="h-5/6 w-full">
                      <ScrollArea className="h-full w-full  overflow-y-auto my-1 flex flex-col items-center" > 
                        <div className=" flex justify-center items-center border" >
                          <SearchResult Data={Props.Data} type={Props.type} />
                        </div>
                      </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Community;
