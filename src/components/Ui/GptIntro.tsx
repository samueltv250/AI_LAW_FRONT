import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useSettings } from "../../store/store";
import classNames from "classnames";

export default function GptIntro(this: any) {
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);

  const handleSelectChange = (event: { target: { value: string; }; }) => {
    localStorage.setItem('selectedItem', event.target.value);
  }
  
  const isGptThreeSelected = selectedModel.startsWith("gpt-3");
  const isGeminiSelected = selectedModel.startsWith("gemini");
  const isGptFourSelected = selectedModel.startsWith("gpt-4");
  const isGptDraftSelected = selectedModel.startsWith("gpt-d");

  return (
    <>
      <div className="modals md:w-1/5 md:min-w-[500px] mx-2 relative flex items-center rounded-md justify-between mt-5 md:mx-auto  bg-gray-200 dark:bg-[#202123] gap-2">
        <button
          title="GEMINI"
          className={classNames(
            "gpt3 uppercase  rounded-md  font-bold p-2 transition  flex-1 flex items-center  dark:text-white justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
              isGeminiSelected,
              "opacity-50": !isGeminiSelected,
            }
          )}
          type="button"
          onClick={() => setModel("gemini")}
        >
          <span
            className={classNames(" mr-2 transition", {
              "text-teal-400": isGeminiSelected,
            })}
          >
            <i className="fa-solid fa-bolt "></i>
          </span>
          <span className="mr-2">gemini</span>
        </button>

        <button
          title="GPT-3 Turbo"
          className={classNames(
            "gpt3 uppercase  rounded-md  font-bold p-2 transition  flex-1 flex items-center  dark:text-white justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptThreeSelected,
              "opacity-50": !isGptThreeSelected,
            }
          )}
          type="button"
          onClick={() => setModel("gpt-3.5-turbo")}
        >
          <span
            className={classNames(" mr-2 transition", {
              "text-teal-400": isGptThreeSelected,
            })}
          >
            <i className="fa-solid fa-bolt "></i>
          </span>
          <span className="mr-2">gpt - 3.5</span>
        </button>

        <button
          title="GPT - 4"
          className={classNames(
            "gptd uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptFourSelected,
              "opacity-50": !isGptFourSelected,
            }
          )}
          onClick={() => setModel("gpt-4")}
        >
          <span
            className={classNames("mr-2 transition", {
              "text-teal-400": isGptFourSelected,
            })}
          >
            <IonIcon icon={sparkles} />
          </span>
          <span className="mr-2">gpt - 4</span>
        </button>

        <button
          title="Drafter"
          className={classNames(
            "gpt4 uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptDraftSelected,
              "opacity-50": !isGptDraftSelected,
            }
          )}
          onClick={() => setModel("gpt-drafter")}
        >
          <span
            className={classNames("mr-2 transition", {
              "text-teal-400": isGptDraftSelected,
            })}
          >
            <i className="fa-light fa-bolt "></i>
          </span>
          <span className="mr-2">drafter</span>
        </button>
      </div>
      <div className=" h-96 flex items-start justify-center">
        <h1 className=" text-4xl font-bold mt-5 text-center text-gray-300">
          LawGPT
        </h1>

      </div>

      {isGptDraftSelected && (

        
<div className="h-96 flex flex-col items-center justify-center text-white">

<div id="itemSelection" className="flex flex-col items-center">
  <h3>Selecciona el tipo de documento que quieres que escriba</h3>
  <select id="itemList" className="bg-gray-700 text-white mt-2" onChange={handleSelectChange}>
    <option value="Demanda">Demanda</option>
    <option value="Querella">Querella</option>
    {/* Add more options as needed */}
  </select>
</div>

<p className="text-xl mt-5">Draft legal documents</p>

</div>
                )}

    </>
  );
}
