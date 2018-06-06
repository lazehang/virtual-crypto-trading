interface IPlayer {
    id: number;
    number: number;
    name: string;
    isCaptain: boolean;
}

interface ITeam {
    id: number;
    color: string;
    name: string;
    players: IPlayer[]
}

export { IPlayer, ITeam }; 