import { useSelector } from 'react-redux'
import type { RootState } from '@/Store/Store'
import Join_Card from '@/Components/Cards/Join_Card'
function Register() {
  const mode = useSelector((state: RootState) => state.theme.mode)
  return (
    <div className={`${mode} h-screen w-screen dark:bg-black flex justify-center items-center`}>
      <Join_Card />
    </div>
  )
}

export default Register