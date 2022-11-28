export interface Bet {
  id: number;
  draw: number;
  teams: Array<BetTeams>;
}

interface BetTeams {
  name: string;
  win: number;
}
