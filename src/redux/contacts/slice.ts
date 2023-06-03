import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DATA_CONTACT, DATA_GROUP_CONTACT } from "src/__data__";
import { ContactDto } from "src/types/dto/ContactDto";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { filterContactsByGroup, filterContactsByName } from "./helpers";

interface InitialState {
	contacts: ContactDto[];
	groupContacts: GroupContactsDto[];
	favoriteContacts: FavoriteContactsDto;
	filteredContacts: ContactDto[];
    contactById: ContactDto | null;
	groupById: GroupContactsDto | null;
}

interface FilterContactsPayload {
	name?: string;
	groupId?: string;
}

const initialState: InitialState = {
	contacts: [],
	groupContacts: [],
	favoriteContacts: [],
	filteredContacts: [],
    contactById: null,
	groupById: null
};

export const contactsSlice = createSlice({
	name: "contacts",
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
				DATA_CONTACT[3].id,
			];
		},
		filterContacts: (state, action: PayloadAction<FilterContactsPayload>) => {
			if (action.payload.name && action.payload.groupId) {
				state.filteredContacts = filterContactsByName(
					filterContactsByGroup(
						state.contacts,
						state.groupContacts,
						action.payload.groupId
					),
					action.payload.name
				);
			} else if (action.payload.name) {
				state.filteredContacts = filterContactsByName(
					state.contacts,
					action.payload.name
				);
			} else if (action.payload.groupId) {
				state.filteredContacts = filterContactsByGroup(
					state.contacts,
					state.groupContacts,
					action.payload.groupId
				);
			} else {
				state.filteredContacts = DATA_CONTACT;
			}
		},
        getContactById: (state, action: PayloadAction<ContactDto['id'] | undefined>) => {
            state.contactById = state.contacts.find(({ id }) => id === action.payload) || null;
        },
		getGroupById: (state, action: PayloadAction<GroupContactsDto['id'] | undefined>) => {
			state.groupById = state.groupContacts.find(({ id }) => id === action.payload) || null;
			state.filteredContacts = filterContactsByGroup(state.contacts, state.groupContacts, action.payload);
		}
	},
});

export default contactsSlice.reducer;
