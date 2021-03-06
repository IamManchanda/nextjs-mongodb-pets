import { useRouter } from "next/router";
import useSWR from "swr";
import ReactiveForm from "../../../components/reactive-form";
import fetcher from "../../../utils/fetcher";

function PageEditPet() {
  const router = useRouter();
  const { id } = router.query;
  const { data: pet, error } = useSWR(id ? `/api/pets/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!pet) return <p>Loading...</p>;

  const petForm = {
    name: pet.name,
    owner_name: pet.owner_name,
    species: pet.species,
    age: pet.age,
    poddy_trained: pet.poddy_trained,
    diet: pet.diet,
    image_url: pet.image_url,
    likes: pet.likes,
    dislikes: pet.dislikes,
  };

  return (
    <ReactiveForm formId="edit-pet-form" petForm={petForm} forNewPet={false} />
  );
}

export default PageEditPet;
