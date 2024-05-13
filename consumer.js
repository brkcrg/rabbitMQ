const amqp = require("amqplib");
const redis = require("redis");
const queueName = process.argv[2] || "jobsQueue"

const data = require("./data.json");

const client =redis.createClient();


connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);

        //Mesajın alınması..
        console.log("Mesaj bekleniyor..")
        channel.consume(queueName,message=>{
            const messageInfo =JSON.parse(message.content.toString());
            //{description:1234}
            const userInfo =data.find(u=>u.id == messageInfo.description)
            if (userInfo) {
                console.log("İşlenen Kayıt:",userInfo);
                client.set(`user_${userInfo.id}`,JSON.stringify(userInfo),(err,status)=>{
                    if (!err) {
                        console.log("status:",status);
                        channel.ack(message);//kanal tarafından okundu anlşamına geliyor.tekrardan publisher tetklediğimde mesaj acknowledge olduğu için gözükmüğyor.
                    }
                })
                
            }
        })

    } catch (error) {
        console.log("Error:",error);
    }
}