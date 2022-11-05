import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main () {
    const user = await prisma.user.create ({
        data: {
            name: 'John Doe',
            email: 'john@doe.com',
            avatarUrl: 'https://github.com/rmartins94.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: 
                    {
                     userId: user.id,
            }
        }
    }})

await prisma.game.create({
    data: {
        date: '2022-11-10T12:00:00.201Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'AR'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-24T12:00:00.201Z',
        firstTeamCountryCode: 'PT',
        secondTeamCountryCode: 'GH'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-24T12:00:00.201Z',
        firstTeamCountryCode: 'UY',
        secondTeamCountryCode: 'KR'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-24T12:00:00.201Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'RS'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-24T12:00:00.201Z',
        firstTeamCountryCode: 'BE',
        secondTeamCountryCode: 'CA'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-24T12:00:00.201Z',
        firstTeamCountryCode: 'CH',
        secondTeamCountryCode: 'CM'
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-10T12:00:00.201Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'DE',

        guesses: {
            create: {
                firstTeamPoins: 2,
                secondTeamPoins: 1,

                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,

                        }
                    }
                }
            }
        }

    }
    })

}

main()