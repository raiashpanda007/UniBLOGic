import { Button } from "@/components/ui/button"
interface Props {
  label:string;
  classname:string
  // onclick
  onClick?: () => void;
}
export const Outline_Button = ({label,classname= "",onClick} : Props) => {
  return <Button variant="outline" className={`${classname} `} onClick={onClick}>{label}</Button>

}