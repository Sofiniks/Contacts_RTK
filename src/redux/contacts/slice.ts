import { createSlice } from '@reduxjs/toolkit';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import {ContactDto} from 'src/types/dto/ContactDto';
import {FavoriteContactsDto} from 'src/types/dto/FavoriteContactsDto';
import {GroupContactsDto} from 'src/types/dto/GroupContactsDto';

interface InitialState {
    contacts: ContactDto[];
    groupContacts: GroupContactsDto[];
    favoriteContacts: FavoriteContactsDto;
}

const initialState: InitialState = {
  contacts: [],
  groupContacts: [],
  favoriteContacts: []
};


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetchContacts: (state) => {
        state.contacts = DATA_CONTACT;
    },
    fetchGroupContacts: (state) => {
        state.groupContacts = DATA_GROUP_CONTACT;
    },
    fetchFavoriteContacts: (state) => {
        state.favoriteContacts = [
            DATA_CONTACT[0].id,
            DATA_CONTACT[1].id,
            DATA_CONTACT[2].id,
            DATA_CONTACT[3].id
        ];
  }
}});

export default contactsSlice.reducer;
