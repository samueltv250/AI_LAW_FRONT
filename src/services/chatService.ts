import { ChatMessageType } from "../store/store";
import { IData} from "../store/store";
const apiUrl = "http://127.0.0.1:5040/getAnswer";

export async function fetchResults(
  messages: Omit<ChatMessageType, "id">[],
  modal: string,
  signal: AbortSignal,
  onData: (data: IData) => void,
  onCompletion: () => void
) {
  try {
    const response = await fetch(apiUrl, {
      method: `POST`,
      signal: signal,
      headers: {
        "content-type": `application/json`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,

      },
      body: JSON.stringify({
        question: messages
      }),
    });

    if (response.status !== 200) {
      throw new Error("Error fetching results");
    }

    const data = await response.json();
    onData({
      answer: data.answer,
      sources: data.sources
    });
    onCompletion();

  } catch (error) {
    if (error instanceof DOMException || error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function fetchModals() {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("apikey")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof DOMException || error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
