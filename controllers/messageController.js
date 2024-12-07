const Message = require('../models/Messages');



//@desc- send message to someone
//@route - api/users/sendMessage
//@access - PRIVATE
const sendMessage = async(req,res)=>{
    const {sender, receiver, content} = req.body;
    try{
     const newMessage = new Message({
        sender,
        receiver,
        content
     });

     await newMessage.save();
     res.status(201).json({ message: 'Message sent successfully', newMessage });

    }catch(error){
        res.status(500).json({message:"Internal Server Error", error: error.message })
    }
}


//@desc - Retrieve messages between sender and receiver
//@route - api/users/viewMessage
//@access - PRIVATE
const viewMessage = async (req, res) => {
    console.log(req.body)
    const { sender, receiver } = req.body;

    try {
        // Fetch messages where sender/receiver pair matches either direction
        const allMessages = await Message.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort({ timestamp: 1 }); // Optional: Sort by timestamp (ascending)

        // Respond with the messages
        res.status(200).json({ 
            success: true, 
            messages: allMessages 
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};



module.exports={
    sendMessage,
    viewMessage,
}