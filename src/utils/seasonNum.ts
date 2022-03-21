export function seasonNum (season: number, episodeNum: number): string{
    let seasonString = ""
    let episodeString = ""
    if (season < 10){
        seasonString = season.toString()
        seasonString = "0".concat(seasonString)
    } else {
        seasonString = season.toString()
    }

    if (episodeNum < 10){
        episodeString = episodeNum.toString()
        episodeString = "0".concat(episodeString)
    } else {
        episodeString = episodeNum.toString()
    }

    const result = "S" + seasonString + "E" + episodeString

return result
}