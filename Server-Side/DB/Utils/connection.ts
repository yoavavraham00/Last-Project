import mongoose from "mongoose"; // import mongoose dependency
import User from './../Model/user.model';
import Card from './../Model/card.model';
import { Schema } from "mongoose";


export const connect = async () => {
      const host = process.env.DATABASE_HOST;  
      const port = process.env.DATABASE_PORT;
      const database = process.env.DATABASE_NAME;
      const user = process.env.DATABASE_USER;
      const password = process.env.DATABASE_PASSWORD; 

      const connectionString = `mongodb://${user}:${password}@${host}:${port}/${database}`;  // create the connection string

      let users = []
      const initializeUsers = async () => {
        const count = await User.countDocuments();
        if (count === 0) {
          const usersToCreate = [
            { name: { first: "Alice", last: "Smith" }, address:{country: "israel", city: "Tel abiv", street: "Aza", houseNumber: "16" }, email: "alice@example.com", password: "password123", phone: "1234567890" },
            { name: { first: "Bob", last: "Johnson" }, address:{country: "israel", city: "Ramat Fen", street: "Neot Mithangal", houseNumber: "9" }, email: "bob@example.com", isBusiness: true, password: "password124", phone: "1234567891" },
            { name: { first: "Charlie", last: "Brown" }, address:{country: "israel", city: "Ramat Ha Charon", street: "Mitromen", houseNumber: "7" }, email: "charlie@example.com", isAdmin: true, password: "password125", phone: "1234567892" },
          ];

          for (const userData of usersToCreate) {
            const newUser = new User(userData);
            let user = await newUser.save();
            users.push(user)
          }
        }
      }; // If there are no users, create three new users

      const initializeCards = async () => {
        const count = await Card.countDocuments();
        if(users.length === 0) return
        const [user1_id, user2_id, user3_id] = [users.pop()._id, users.pop()._id, users.pop()._id]
        if (count === 0) {
          const cardsToCreate = [
            { title: "card Number 1", 
            subtitle: "bla bla",
             description: "this is a card 1", 
             phone: "1234567890", 
             email: "alice@example.com", 
            image: {
              url: "https://picsum.photos/200/",
              alt: "Alice image"
            }, 
            user_id:user1_id,
            address:{country: "israel", city: "Tel abiv", street: "Aza", houseNumber: "16" }
          },
            { title: "card Number 2", 
            subtitle: "smit pot",
             description: "this is a card 2",
              phone: "1234567891",
               email: "bob@example.com", 
            image: {
              url: "https://picsum.photos/200/",
              alt: "Bob image"
            }, 
            user_id:user2_id,
            address:{country: "israel", city: "Ramat Fen", street: "Neot Mithangal", houseNumber: "9" }
          },
            { title: "card Number 3",
             subtitle: "pit pot", 
            description: "this is a card 3",
             phone: "1234567892",
              email: "Charlie@example.com",
            user_id:user3_id,
            image: {
              url: "https://picsum.photos/200/",
              alt: "Charlie image"
            }, 
            address:{country: "israel", city: "Ramat Ha Charon", street: "Mitromen", houseNumber: "7" }
          },
          ];
      
          for (const cardData of cardsToCreate) {
            const newCard = new Card(cardData);
            await newCard.save();
          }
        }
      }; // If there are no cards, create three new cards
      
      initializeUsers(); 
      initializeCards(); 

      await mongoose.connect(connectionString); // connect to the database

      console.log("Database Connected"); 
    }; 

export default connect; 



