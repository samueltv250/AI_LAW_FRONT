import { IonIcon } from "@ionic/react";
import { shareOutline, informationCircleOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";
import classNames from "classnames";
import { search } from 'ionicons/icons';

export default function HeaderSearch() {
  const [model, systemMessage, useSystemMessageForAllChats] = useSettings(
    (state) => [
      state.settings.selectedModal,
      state.settings.systemMessage,
      state.settings.useSystemMessageForAllChats,
    ]
  );
  return (
    <header className=" text-center my-2 text-sm dark:text-gray-300 border-b dark:border-none dark:shadow-md py-2 flex items-center justify-between px-2">
      <div className="md:block hidden"></div>



      <div className=" flex items-center relative">



      <span
  title="Search Mode"
  className={classNames(
    "gptd uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
    {
      "bg-white dark:bg-dark-primary border-2 dark:": true,
      "opacity-50": false,
    }
  )}
>
  <span
    className={classNames("mr-2 transition", {
      "text-teal-400": true,
    })}
  >
<IonIcon icon={search} />
  </span>
  <span className="mr-2">Search Mode</span>
</span>


        {useSystemMessageForAllChats && (
          <span className=" flex text-xl ml-2 group cursor-pointer">
            <IonIcon icon={informationCircleOutline} />
            <span className=" absolute z-10 left-0 w-[calc(100%+10rem)] top-[calc(100%+1rem)] text-sm bg-gray-900 text-white p-2  rounded-md invisible  pointer-events-none group-hover:visible group-hover:pointer-events-auto transition">
              <span className=" block underline text-teal-600">
                <strong>System message</strong>
              </span>
              <span className=" text-gray-400 block text-left">
                {systemMessage}
              </span>
            </span>
          </span>
        )}
      </div>



      <div className="md:block hidden"></div>
    </header>
  );
}
