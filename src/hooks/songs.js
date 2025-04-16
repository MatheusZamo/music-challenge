import { useContext } from "react"
import { SongsContext } from "../contexts/songs"

const useSongs = () => {
  const value = useContext(SongsContext)

  if (!value) {
    throw new Error("useSongs deve estar dentro de SongsProvider")
  }

  return value
}

export { useSongs }
