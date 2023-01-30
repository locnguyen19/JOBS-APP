import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import   Loading  from '../components/Loading'
import StatsContainer from '../components/StatsContainer'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer></StatsContainer>
    </>
  )
}

export default Stats
