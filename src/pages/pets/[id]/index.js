import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../../utils/db-connect";
import Pet from "../../../models/pet";

function PetPage({ pet }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  async function handleDelete() {
    const petID = router.query.id;

    try {
      await fetch(`/api/pets/${petID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the pet.");
    }
  }

  return (
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
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const pet = await Pet.findById(params.id).lean();
  pet._id = pet._id.toString();

  return {
    props: {
      pet,
    },
  };
}

export default PetPage;
