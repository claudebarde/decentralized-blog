import { writable } from "svelte/store";
import bodyParser from "../body-parser";

const store = () => {
  const { subscribe, set, update } = writable({
    url: "",
    title: "",
    subtitle: "",
    body: {
      intro: [],
      section1: []
    },
    signature: "",
    timestamp: Date.now()
  });

  return {
    subscribe,
    updateURL: url => {
      update(currentStore => ({ ...currentStore, url }));
    },
    updateTitle: title => {
      update(currentStore => ({ ...currentStore, title }));
    },
    updateSubtitle: subtitle => {
      update(currentStore => ({ ...currentStore, subtitle }));
    },
    updateIntro: intro => {
      update(currentStore => ({
        ...currentStore,
        body: { ...currentStore.body, intro }
      }));
    },
    addSection: ({ number, block }) => {
      update(currentStore => ({
        ...currentStore,
        body: { ...currentStore.body, ["section" + number]: block }
      }));
    }
  };
};

export default store();
