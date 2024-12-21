const { default: axios } = require("axios")

const fetchGames = async () => {
    const response = await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json");
    return response.data.filter((game) => game.title && game.platform && game.score && game.genre && game.editors_choice);
}

export { fetchGames }