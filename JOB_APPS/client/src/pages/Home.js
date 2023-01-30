import Wrapper from '../assets/wrappers/SharedLayout'
import BigSidebar from '../components/BigSidebar'
import Navbar from '../components/Navbar'
import SmallSidebar from '../components/SmallSidebar'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar></SmallSidebar>
        <BigSidebar></BigSidebar>
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default Home