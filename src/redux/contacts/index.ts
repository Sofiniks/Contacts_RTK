import { contactsSlice } from "./slice";

export const contactsReducer = contactsSlice.reducer;
export const { fetchContacts, fetchGroupContacts, fetchFavoriteContacts } = contactsSlice.actions;