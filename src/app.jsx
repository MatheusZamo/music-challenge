import { useState } from "react"
import { faker } from "@faker-js/faker"
import { SongsProvider } from "./contexts/songs"
import { useSongs } from "./hooks/songs"

const createRandomSong = () => ({
  id: faker.string.uuid(),
  name: faker.music.songName(),
  genre: faker.music.genre(),
})

const Header = () => {
  const { clearSongs } = useSongs()

  return (
    <header>
      <h1>Minhas Músicas</h1>
      <div>
        <Results />
        <SearchSongs />
        <button onClick={clearSongs}>Limpar músicas</button>
      </div>
    </header>
  )
}

const SearchSongs = () => {
  const { searchQuery, setSearchQuery } = useSongs()

  const handleChange = (e) => setSearchQuery(e.target.value)

  return (
    <input
      value={searchQuery}
      onChange={handleChange}
      placeholder="Busque uma música"
    />
  )
}

const Results = () => {
  const { searchedSongs } = useSongs()

  return <p>{searchedSongs?.length} músicas encontradas</p>
}

const Main = () => (
  <main>
    <FormAddSong />
    <Songs />
  </main>
)

const Songs = () => (
  <section>
    <List />
  </section>
)

const FormAddSong = () => {
  const { addSong } = useSongs()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { genre, songName } = e.target.elements
    addSong({
      name: songName.value,
      genre: genre.value,
      id: faker.string.uuid(),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input required name="songName" placeholder="Nome da música" />
      <textarea required name="genre" placeholder="Gênero da música" />
      <button>Adicionar</button>
    </form>
  )
}

const List = () => {
  const { searchedSongs } = useSongs()
  return (
    <ul>
      {searchedSongs?.map((song) => (
        <li className="song" key={song.id}>
          <h3>{song.name}</h3>
          <p>
            <i>{song.genre}</i>
          </p>
        </li>
      ))}
    </ul>
  )
}

const Archive = () => {
  const { addSong } = useSongs()

  const [archivedSongs, setArchivedSongs] = useState(() =>
    Array.from({ length: 10 }, createRandomSong),
  )
  const [showArchive, setShowArchive] = useState(false)

  const toggleArchive = () => setShowArchive((s) => !s)

  const addArchived = (song) => {
    addSong(song)
    setArchivedSongs((prev) => prev.filter((s) => s.id !== song.id))
  }

  return (
    <aside>
      <h2>Arquivo de músicas</h2>
      <button onClick={toggleArchive}>
        {showArchive ? "Esconder" : "Mostrar"}
      </button>
      {showArchive && (
        <ul>
          {archivedSongs.map((song) => (
            <li className="archivedSong" key={song.id}>
              <p>
                <strong>{song.name}</strong> - {song.genre}
              </p>
              <button onClick={() => addArchived(song)}>Adicionar</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

const Footer = () => <footer>Minhas Músicas</footer>

const App = () => {
  return (
    <section>
      <SongsProvider>
        <Header />
        <Main />
        <Archive />
      </SongsProvider>
      <Footer />
    </section>
  )
}

export { App }
