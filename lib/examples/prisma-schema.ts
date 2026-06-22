export const samplePrismaSchema = `
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique

  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?

  author    User
}

model Comment {
  id        Int      @id @default(autoincrement())
  text      String

  post      Post
}
`;