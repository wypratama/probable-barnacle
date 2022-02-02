import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ItemsWithKey } from './types';

type StoreData = {
  data: ItemsWithKey[] | null;
  loggedUser: string | null;
  dataLoading: boolean;
  fetchData: () => void;
  setUser: (arg: string | null) => void;
};

export default create(
  persist(
    (set, get): StoreData => ({
      data: null,
      loggedUser: null,
      dataLoading: false,
      fetchData: async () => {
        set({ dataLoading: true });
        const res = await fetch('/api/items'),
          parsed = await res.json();
        set({ data: parsed, dataLoading: false });
      },
      setUser: (payload) => {
        set({ loggedUser: payload });
      },
    }),
    {
      name: 'drug-storage', // unique name
    }
  )
);
