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
    const { sender, receiver } = req.body;

    try {
        const allMessages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        });

        res.status(200).json({ success: true, messages: allMessages });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



module.exports={
    sendMessage,
    viewMessage,
}