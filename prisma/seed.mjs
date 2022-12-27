import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const categoriesToInsert = ['frontend', 'backend', 'testing']

async function main() {
    await Promise.all(
        categoriesToInsert.map((category) =>
            prisma.category.upsert({
                where: {
                    name: category,
                },
                create: {
                    name: category
                },
                update: {
                    name: category
                }
            }),
        ),
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
