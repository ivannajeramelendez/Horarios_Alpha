
import { useSelector } from 'react-redux';
import {Menu} from '../pages/Menu';
export const DashboardPages = () => {
  const {collapsed}=useSelector(state=>state.dashboard);
  return (
    <div className={collapsed?'principal-collapsed':'principal'} >
      <Menu />
    </div>
  )
}
