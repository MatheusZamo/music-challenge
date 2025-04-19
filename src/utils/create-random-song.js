import { faker } from "@faker-js/faker"

const createRandomSong = () => ({
  id: faker.string.uuid(),
  name: faker.music.songName(),
  genre: faker.music.genre(),
})

export { createRandomSong }
