import ReactiveForm from "../../components/reactive-form";

function PageNewPet() {
  const petForm = {
    name: "",
    owner_name: "",
    species: "",
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: "",
    likes: [],
    dislikes: [],
  };

  return <ReactiveForm formId="add-pet-form" petForm={petForm} />;
}

export default PageNewPet;
