import { Button } from "@/components/ui/button"
interface Props {
  label:string;
  classname:string
}
export const Outline_Button = ({label,classname= ""} : Props) => {
  return <Button variant="outline" className={`${classname}`}>{label}</Button>

}