import { atom } from "recoil";


interface Account {
  id: string,
  platform: string;
  url: string;
}



export const profileInfo = atom({
  key: 'profileInfo',
  default: {},
});


export const profileImageAtom = atom<string | null>({
  key: 'profileImageAtom',
  default: null,
});

export const profileNameAtom = atom<string>({
  key: 'profileNameAtom',
  default: 'User Name',
});

export const profileHeadlineAtom = atom<string>({
  key: 'profileHeadlineAtom',
  default: 'Aspiring Software Engineer',
});

export const profileAccountsAtom = atom<Account[]>({
  key: 'profileAccountsAtom',
  default: [],
});

export const usernameAtom = atom<string>({
  key: 'usernameAtom',
  default: "",
});

export const originalusernameAtom = atom<string>({
  key: 'originalusernameAtom',
  default: "",
});