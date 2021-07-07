import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"



interface IcomplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    
    async execute({ tag_id, user_sender, user_receiver, message }: IcomplimentRequest){
        const complimentRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver");
        }
        
        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message,
        });

        await complimentRepositories.save(compliment);

        return compliment;
        
    }
}

export { CreateComplimentService }