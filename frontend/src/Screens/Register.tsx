import { useSelector } from 'react-redux'
import type { RootState } from '@/Store/Store'

function Register() {
  const mode = useSelector((state: RootState) => state.theme.mode)
  return (
    <div className={`${mode} h-screen w-screen dark:bg-black flex justify-center items-center`}>
      
    </div>
  )
}

export default Register