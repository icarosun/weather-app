import { StationAggregateHydrologicalData } from '@/@types/station-aggregate-hydrological-data.d.ts'
import { Station, STATIONS } from '@/constants/stations'
import { ReactNode, createContext, useEffect, useState } from 'react'

type StationContextData = {
  station: Station
  selectStation: (station: Station) => void
  recentObservedHydrologicalData: ObservedHydrologicalData[]
}

type StationProviderProps = {
  children: ReactNode
}

export const StationContext = createContext({} as StationContextData)

export function StationProvider({ children }: StationProviderProps) {
  const [station, setStation] = useState<StationAggregateHydrologicalData>({} as StationAggregateHydrologicalData)
  const [recentObservedHydrologicalData, setRecentObservedHydrologicalData] =
    useState<StationAggregateHydrologicalData[]>([])

  function selectStation(station: StationAggregateHydrologicalData) {
    setStation(station)
  }

  useEffect(() => {
    async function getRecentObservedHydrologicalData() {

      const request = await fetch("https://labclim.uea.edu.br/api/hydrological-data/station")

      if (request) {
        const observedData = await request.json()
        
        return observedData
      } else {
        console.log("No backend service")
      }
    }

    getRecentObservedHydrologicalData().then((data) =>
      setRecentObservedHydrologicalData(data)
    )
  }, [])

  return (
    <StationContext.Provider
      value={{
        station,
        selectStation,
        recentObservedHydrologicalData,
      }}
    >
      {children}
    </StationContext.Provider>
  )
}
