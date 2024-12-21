'use client';

import { useEffect, useState } from "react";

function GameList({games}) {
    const [showGames, setShowGames] = useState(games);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        setShowGames(games);
    }, [games]);

    const sortedGames = [...showGames].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const list = sortedGames.map((game, index) => (
        <tr key={index} className="hover:bg-gray-100 border-b">
            <td className="py-3 px-4">{game.title}</td>
            <td className="py-3 px-4">{game.platform}</td>
            <td className="py-3 px-4">{game.score}</td>
            <td className="py-3 px-4">{game.genre}</td>
            {game.editors_choice === "Y" ? <td className="py-3 px-4 text-green-600">Yes</td> : <td className="py-3 px-4 text-red-600">No</td>}
        </tr>
    ));

    return (
        <main className="p-6 min-h-[600px]">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">POPULAR GAMES</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    {showGames && showGames.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase">
                                <tr>
                                    <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('title')}>Title</th>
                                    <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('platform')}>Platform</th>
                                    <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('score')}>Score</th>
                                    <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('genre')}>Genre</th>
                                    <th className="py-3 px-4 cursor-pointer" onClick={() => requestSort('editors_choice')}>Editors Choice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list}
                            </tbody>
                        </table>
                    ) : <h1 className="text-2xl font-bold text-center p-10">No Games Found</h1>}
                </div>
            </div>
        </main>
    );
}

export default GameList;
