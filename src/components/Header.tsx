import { useDisconnect } from '@thirdweb-dev/react';
import MenuIcon from '../icons/Menu'
import Button from './Button';

interface Props{
  address:String
}
function Header(props: Props) {
  const {address} = props
  const disconnect = useDisconnect()

  const handleLogout = () => disconnect()

  return (
    <div className="flex justify-between items-center mx-8 py-4">
      <div className="flex items-center gap-4">
        <img
          src="https://fernando-xi.vercel.app/profile.jpeg"
          alt=""
          className="rounded-full h-12 w-12"
        />
        <div>
          <h1 className="text-lg font-bold text-white">Fernando</h1>
          <p className="text-xs text-emerald-500 truncate">User: {address ? `${address.slice(0,4)}...${address.slice(-3)}` : ""}</p>
        </div>
      </div>
      <div>
      <Button onClick={handleLogout} text='Buy tickets' type='primary'/>
      <Button onClick={handleLogout} text='Logout' type='outlined'/>
      
       </div>
      <div className='scale-150'>
       <MenuIcon color='white'/>
      </div>
    </div>
  );
}

export default Header;
