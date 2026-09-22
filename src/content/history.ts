/**
 * Club history, honours and records. Sourced from the NCEL statistics pages and the club's Wikipedia
 * entry (September 2026). CONFIRM against the club's own records before launch.
 */
export type Era = { years: string; title: string; text: string };

export const timeline: Era[] = [
  {
    years: "1888",
    title: "The club is founded",
    text: "Pickering Town Football Club is formed in the market town on the edge of the North York Moors.",
  },
  {
    years: "1955–1972",
    title: "York League",
    text: "Pickering win the York League First Division three times: 1955–56, 1966–67 and 1969–70.",
  },
  {
    years: "1972–1982",
    title: "Yorkshire League",
    text: "Division Three champions in 1973–74 and Division Two runners-up the season after.",
  },
  {
    years: "1982",
    title: "Into the NCEL",
    text: "The Pikes join the new Northern Counties East League and win Division Two in 1987–88.",
  },
  {
    years: "1992",
    title: "Premier Division football",
    text: "Promoted to the NCEL Premier Division, finishing runners-up in their first season, 1992–93.",
  },
  {
    years: "2006",
    title: "FA Vase quarter-finals",
    text: "The club's best national cup run ends in the last eight of the FA Vase, against Nantwich Town.",
  },
  {
    years: "2018",
    title: "Promotion to Step 4",
    text: "After runners-up finishes in 2016–17 and 2017–18, Pickering step up to the Northern Premier League Division One East.",
  },
  {
    years: "2023",
    title: "Back in the NCEL Premier",
    text: "The club returns to the Northern Counties East League Premier Division.",
  },
  {
    years: "2025",
    title: "Pickering Town Ladies",
    text: "A women's team is formed and enters the North Riding Women's League Division One. The men reach the FA Cup second qualifying round.",
  },
];

export type Honour = { competition: string; detail: string; seasons: string[] };

export const honours: Honour[] = [
  { competition: "York League", detail: "First Division champions", seasons: ["1955–56", "1966–67", "1969–70"] },
  { competition: "Yorkshire League", detail: "Division Three champions", seasons: ["1973–74"] },
  { competition: "Northern Counties East League", detail: "Division Two champions", seasons: ["1987–88"] },
  { competition: "NCEL Wilkinson Sword Trophy", detail: "Winners", seasons: ["2000–01"] },
  { competition: "North Riding Senior Cup", detail: "Winners", seasons: ["2012–13"] },
  { competition: "North Riding County Cup", detail: "Winners", seasons: ["1990–91"] },
];

export type RecordItem = { label: string; value: string; detail: string };

export const records: RecordItem[] = [
  { label: "FA Vase", value: "Quarter-final", detail: "2005–06" },
  { label: "FA Cup", value: "2nd qualifying round", detail: "1999–00, 2001–02, 2003–04, 2025–26" },
  { label: "FA Trophy", value: "3rd qualifying round", detail: "2018–19, 2020–21, 2021–22" },
  { label: "NCEL Premier", value: "Runners-up", detail: "1992–93, 2016–17, 2017–18" },
];
