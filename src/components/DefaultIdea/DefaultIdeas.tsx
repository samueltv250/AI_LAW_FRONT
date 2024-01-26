import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Encarcelamiento maximo?",
    moreContext: "Cual es la mayor cantidad de tiempo que puede encarcelar a un panameño?",
  },
  {
    idea: "Cual es la edad minima para votar?",
    moreContext:
      "Cual es la edad minima para votar en panama? Puedo votar si tengo 16 años?",
  },
  { idea: "Existe pena de muerte?", moreContext: "Existe pena de muerte en panama?" },
  {
    idea: "Proceso de naturalizacion?",
    moreContext: "Como es el proceso de naturalizacion si soy un extranjero?",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (

    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
