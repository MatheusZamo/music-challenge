import { createContext, useState } from "react"
import { createRandomSong } from "../utils/create-random-song"

const SongsContext = createContext()

const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState(() =>
    Array.from({ length: 10 }, createRandomSong),
  )

  const [searchQuery, setSearchQuery] = useState("")

  const addSong = (song) => setSongs((songs) => [song, ...songs])

  const clearSongs = () => setSongs([])

  const searchedSongs =
    searchQuery.length > 0
      ? songs.filter(({ name, genre }) =>
          `${name} ${genre}`.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : songs

  const value = {
    songs,
    searchQuery,
    setSearchQuery,
    addSong,
    clearSongs,
    searchedSongs,
  }

  return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
}

export { SongsContext, SongsProvider }
