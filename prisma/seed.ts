import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

function createRandomPosts() {
  const posts = []
  for (var i = 0; i < 60; i++) {
    posts.push({
      userId: '5cb96500-01be-43c4-891d-2d06e977774f',
      title: faker.book.title(),
      description: faker.lorem.paragraphs(3),
      category: faker.helpers.arrayElement(['Tecnologia', 'Geral']),
      created_at: faker.date.past(),
      image: faker.image.urlPicsumPhotos(),
      published: true,
    })
  }
  return posts
}

async function main() {
  await prisma.post.createMany({
    data: createRandomPosts(),
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
