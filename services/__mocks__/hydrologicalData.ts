export const fetchRecentObservedHydrologcalData = jest.fn(() => 
    Promise.resolve([
      {
        id: 1,
        date: "01/01/2025",
        elevation: 150,
        flow: 123,
        accumulated_rain: 123,
        station_id: '15630000',
        climatologicalInterpretation: "-3",
        dailyVariation: "-3"
      },
    ])
  ),
}))
