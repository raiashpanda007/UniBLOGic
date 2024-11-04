import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
 
function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  )
}
export default InputWithButton