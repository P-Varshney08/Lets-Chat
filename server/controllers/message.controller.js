import prisma from "../DB/db.config.js";

export const sendMessage = async (req, res) => {
    try {
        const receiverId = parseInt(req.params.id);
        const { message } = req.body;
        const senderId = req.user.id;

        // Check if a conversation exists between the sender and receiver
        let conversation = await prisma.conversation.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            { participants: { some: { id: senderId } } },
                            { participants: { some: { id: receiverId } } },
                        ],
                    },
                    {
                        AND: [
                            { participants: { some: { id: receiverId } } },
                            { participants: { some: { id: senderId } } },
                        ],
                    },
                ],
            },
        });

        if (!conversation) {
            console.log("No conversation exists, creating new...");
            conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        connect: [{ id: senderId }, { id: receiverId }],
                    },
                },
            });
            console.log(`New conversation created: ${conversation}`);
        }

        // Create a new message
        const newMessage = await prisma.message.create({
            data: {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } }, // Add this line to specify the receiver
                message,
                conversation: {
                    connect: { id: conversation.id },
                },
            },
        });

        // below code is not adding new messages id in messages array
        console.log(`New message created: ${newMessage}`);
        if(conversation) {
            await prisma.conversation.update({
                where: { id: conversation.id },
                data: {
                    messages: {
                        connect: { id: newMessage.id },
                    },
                },
            });
            console.log(`Message added to conversation: ${conversation.id}`)
        }

        const convo = await prisma.conversation.findFirst({
            where: { id: conversation.id },
            include: {messages: true},
        });
        console.log(`convo: ${JSON.stringify(convo, null, 2)}`);

        res.status(200).json(newMessage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getMessage = async(req, res) => {
    try {
        const userToChatID = req.params.id;
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { id: senderId } } },
                    { participants: { some: { id: userToChatID } } },
                ]
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error"});
    }
}