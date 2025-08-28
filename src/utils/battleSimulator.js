export default function simulateBattle({ teamA, teamB }) {

    const preparedTeamA = teamA.members.map(chr => ({
        ...chr,
        team: 'A',
        hp: chr.defense * 10,
        isKnockOut: false
    }));

    const preparedTeamB = teamB.members.map(chr => ({
        ...chr,
        team: 'B',
        hp: chr.defense * 10,
        isKnockOut: false
    }));

    const battleQueue = [...preparedTeamA, ...preparedTeamB].sort((a, b) => b.speed - a.speed);
}