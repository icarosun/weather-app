jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('/home/sunstark/projects/weather-app/services/hydrologicalData.ts', () => ({
  fetchRecentObservedHydrologicalData: jest.fn(() => (
    Promise.resolve([
      {
        id: 1,
        date: "01/01/2025",
        elevation: 1000,
        flow: 123,
        accumulated_rain: 123,
        station_id: '15630000',
        climatologicalInterpretation: "-3",
        dailyVariation: "-3"
      },
    ])
  )    
  ),
}));

import Page from '../index.tsx';
import { StationProvider } from '@/contexts/stationContext'
import React from 'react'; 
import { render } from '@testing-library/react-native';

describe("Home Screen", () => {
  it("Loading the context and rendering the marker", async () => {
    const { findByText } = render(
      <StationProvider>
          <Page />
      </StationProvider>
    );

    expect(await findByText("10.0")).toBeTruthy();
  })
})
