import { ObservedHydrologicalData } from '@/@types/observed-hydrological-data'
import { Station, STATIONS } from '@/constants/stations'

export async function fetchRecentObservedHydrologicalData(): Promise<ObservedHydrologicalData[]> {
  const observedData: ObservedHydrologicalData[] = []

  for await (const station of STATIONS) {
    const stationRequest = await fetch(
      `https://labclim.uea.edu.br/api/hydrological-data/observed/${station.id}`
    )

    const stationData = await stationRequest.json()

    observedData.pysh(stationData)
  }

  return observedData
}
