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

// const defaultIdeas = [
//   {
//     idea: "Regulaciones de fusiones y adquisiciones?",
//     moreContext: "Cuáles son las regulaciones actuales para fusiones y adquisiciones en Panamá?"
//   },
//   {
//     idea: "Compliance de leyes laborales?",
//     moreContext: "Cómo puede asegurarse una corporación de cumplir con todas las leyes laborales panameñas?"
//   },
 
//   {
//     idea: "Regulaciones sobre la importación y exportación?",
//     moreContext: "Cuáles son las regulaciones vigentes para importar y exportar mercancías en Panamá?"
//   },
//   {
//     idea: "Litigios corporativos?",
//     moreContext: "Cuáles son los procesos comunes para manejar litigios corporativos en Panamá?"
//   },
//  {
//     idea: "Protección de propiedad intelectual?",
//     moreContext: "Cuál es el proceso para registrar y proteger la propiedad intelectual en Panamá?"
//   },
//   {
//     idea: "Incentivos fiscales para inversionistas extranjeros?",
//     moreContext: "Qué incentivos fiscales ofrece Panamá para atraer a inversionistas extranjeros?"
//   },
// ];

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
