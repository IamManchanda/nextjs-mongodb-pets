import dbConnect from "../../../utils/db-connect";
import Pet from "../../../models/pet";

async function handlePetsById(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          return res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: pet,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    case "PUT":
      try {
        const pet = await Pet.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!pet) {
          return res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: pet,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;

    case "DELETE":
      try {
        const deletedPet = await Pet.deleteOne({
          _id: id,
        });
        if (!deletedPet) {
          return res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: {},
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

export default handlePetsById;
