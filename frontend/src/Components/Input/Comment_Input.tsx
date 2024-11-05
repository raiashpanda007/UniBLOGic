import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Option_Logo } from "../Components";
import { useState,useEffect } from "react"
function InputWithButton() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    });
  return (
    <div className="flex h-16 w-2/3 items-center justify-between ">
        <div className="w-12 h-12 rounded-full border">

        </div>
      <Textarea className="w-3/4 placeholder:dark:text-white placeholder:font-montserrat" placeholder="Add Comment" />
      <Button className="w-14" variant={"ghost"}  type="submit">
        <Option_Logo label="Post" />
      </Button>
    </div>
  )
}
export default InputWithButton