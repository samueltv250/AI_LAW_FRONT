import { ChatMessageType } from "../store/store";
import { IData} from "../store/store";
const apiUrl = "";

export async function fetchResults(
  messages: Omit<ChatMessageType, "id">[],
  id: string,
  modal: string,
  signal: AbortSignal,
  onData: (data: IData) => void,
  onCompletion: () => void
) {
  try {
    const selectedItem = localStorage.getItem('selectedItem');
    
    const response = await fetch('http://127.0.0.1:5090/getAnswer', {
      method: `POST`,
      signal: signal,
      headers: {
        "content-type": `application/json`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,

      },
      body: JSON.stringify({
        question: messages,
        modal: modal,
        id: id,
        selectedItem : selectedItem
      }),
    });

    if (response.status !== 200) {
      response.json().then(body => {
        throw new Error(`Error: ${body.message || 'Error fetching results'}`);
      }).catch(() => {
        throw new Error('Error processing error message');
      });
    }
    

    const data = await response.json();
    onData({
      answer: data.answer,
      sources: data.sources,
      tokens: data.tokens
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
