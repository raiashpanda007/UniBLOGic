import { Settings } from '@/assets/Icons/Icons'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useSelector,useDispatch } from 'react-redux'
import type { RootState } from '@/Store/Store'
import { setMode } from '@/Store/themeMode'

function DropDown_settings() {
    const mode = useSelector((state: RootState) => state.theme.mode)
    const dispatch = useDispatch()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className='cursor-pointer'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${mode}`}>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={mode} onValueChange={()=>(
           dispatch(setMode(mode))
        )}>
          <DropdownMenuRadioItem value="light" className='cursor-pointer'>Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className='cursor-pointer'>Dark</DropdownMenuRadioItem>
          
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDown_settings