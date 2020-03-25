import { writable } from "svelte/store";
import bodyParser from "../body-parser";

const store = () => {
  const { subscribe, set, update } = writable({
    url: "",
    title: "",
    subtitle: "",
    banner: "",
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
    updateBanner: banner => {
      update(currentStore => ({ ...currentStore, banner }));
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
