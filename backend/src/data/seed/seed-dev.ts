import { getDataSource, initDB } from "../../config/db/db";
import { User } from "../entities/User";

initDB().then(() => {
  const repository = getDataSource().manager.getRepository(User);
  const user = new User();
  repository.save(user).then(() => {
    console.log("Seeded user table");
  });
});
