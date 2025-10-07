import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { Station } from '@/constants/stations'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { fetchRecentObservedHydrologicalData } from "@/services/hydrologicalData.ts"

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
  const [station, setStation] = useState<Station>({} as Station)
  const [recentObservedHydrologicalData, setRecentObservedHydrologicalData] =
    useState<ObservedHydrologicalData[]>([])

  function selectStation(station: Station) {
    setStation(station)
  }

  useEffect(() => {
    fetchRecentObservedHydrologicalData().then((data) => 
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
