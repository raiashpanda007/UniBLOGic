import React from 'react'
import { CreateCommunity, Sidebar_Card as SideBar_Component } from '../Components'
import { ScrollArea } from '@radix-ui/react-scroll-area'

function Sidebar() {
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
                <SideBar_Component
                    title="Pyc"
                    description="Coding Club"
                    img="https://d1ng1bucl7w66k.cloudfront.net/ghost-blog/2024/10/Screen-Shot-2024-10-22-at-11.33.25-AM.png"
                  />
                  <SideBar_Component
                    title="ML"
                    description="Machine Learning"
                    img="https://imgs.search.brave.com/_jkpq0a31YQNSyiu5BbPPBPUgChzU1ZvYUgtfGzZvNI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/ODI5MTc5OC9waG90/by9hcnRpZmljaWFs/LWludGVsbGlnZW5j/ZS1hbmQtbWFjaGlu/ZS1sZWFybmluZy1j/b25jZXB0LndlYnA_/YT0xJmI9MSZzPTYx/Mng2MTImdz0wJms9/MjAmYz1abjZmM3M1/WF9CZHgtSXJ1VDd0/QTU4Q2ZNajU2OXhw/cDF0b0otYVZaSFpN/PQ"
                  />
                  <SideBar_Component
                    title="DevC"
                    description="Development Club"
                    img="https://imgs.search.brave.com/B50W_wTa7i9vbGODFbFvsFV6tKEu9UASdPs6GHC_Oso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2dyaWRzLzliNS9s/ZXR0ZXJzLXdlYi0z/LTE1NzQ3NDkuanBn"
                  />
                  <SideBar_Component
                    title="Web 3"
                    description="WEB 3 technologies"
                    img="https://imgs.search.brave.com/cgzcDwIoya9c4h8L4ye2eP1A-zYMn6MEolxoFSfUcdc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MTQwMTM1NS9waG90/by93ZWItMy0wLWNv/bmNlcHQtb2YtZGVj/ZW50cmFsaXplZC1p/bnRlcm5ldC0zZC1y/ZW5kZXIuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXI4LVJS/OEhlVnZNcFVublph/NEQ5bnJwXy1WcVJw/dUEtMG9OdndRT2Zx/TTg9"
                  />
                  
                </ScrollArea>
              </div>
            </div>
    </div>
  )
}

export default Sidebar