import Link from "next/link";
import { Fragment } from "react";
import dbConnect from "../utils/db-connect";
import Pet from "../models/pet";

function PageIndex({ pets }) {
  return (
    <Fragment>
      {pets.map((pet) => (
        <div key={pet._id}>
          <div className="card">
            <img src={pet.image_url} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={`/pets/${pet._id}/edit`}>
                  <a>
                    <button className="btn edit">Edit</button>
                  </a>
                </Link>
                <Link href={`/pets/${pet._id}`}>
                  <a>
                    <button className="btn view">View</button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const result = await Pet.find({});
  const pets = result.map((doc) => {
    const pet = doc.toObject();
    pet._id = pet._id.toString();
    return pet;
  });

  return {
    props: {
      pets: pets,
    },
  };
}

export default PageIndex;
