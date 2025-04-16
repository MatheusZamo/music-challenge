import { createContext, useState } from "react"
import { faker } from "@faker-js/faker"

const SongsContext = createContext()

const createRandomSong = () => ({
  id: faker.string.uuid(),
  name: faker.music.songName(),
  genre: faker.music.genre(),
})

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

  return (
    <SongsContext.Provider
      value={{
        songs,
        searchQuery,
        setSearchQuery,
        addSong,
        clearSongs,
        searchedSongs,
      }}
    >
      {children}
    </SongsContext.Provider>
  )
}

export { SongsContext, SongsProvider }
