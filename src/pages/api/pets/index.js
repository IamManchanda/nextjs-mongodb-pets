import dbConnect from "../../../utils/db-connect";
import Pet from "../../../models/pet";

async function handlePets(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pets = await Pet.find({});
        res.status(200).json({
          success: true,
          data: pets,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    case "POST":
      try {
        const pet = await Pet.create(req.body);
        res.status(201).json({
          success: true,
          data: pet,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    default:
      res.status(400).json({
        success: false,
      });
      break;
  }
}

export default handlePets;
