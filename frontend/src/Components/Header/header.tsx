import { Settings } from '@/assets/Icons/Icons';
import Logo from '../Logo/Logo';
import { useSelector } from 'react-redux';
import type { RootState } from '@/Store/Store';

function Header() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className={`${mode} pl-5 pr-5 w-screen rounded m-2 bg-transparent z-50 backdrop-blur-3xl fixed top-0 left-0 h-32 border border-1 flex justify-between items-center text-black dark:text-white`}>
      <Logo label={"uB"} />
      <Settings className={`${mode} dark:text-white light cursor-pointer text-3xl`} />
    </div>
  );
}

export default Header;
