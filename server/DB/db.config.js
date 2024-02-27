import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query"],
});

prisma.$connect()
.then(()=>{
    console.log('Database Connected');
})
.catch((err)=>{
    console.log(err);
})

export default prisma;
