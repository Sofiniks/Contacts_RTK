import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const filterContactsByGroup = (contacts: ContactDto[], groups: GroupContactsDto[], groupId?: string) => {
    const groupContacts = groups.find(
			({ id }) => id === groupId
		);
		if (groupContacts) {
			return contacts.filter((contact) => {
				return groupContacts.contactIds.includes(contact.id);
			});
		}
        return [];
}

export const filterContactsByName = (contacts: ContactDto[], name: string) => {
    return contacts.filter((contact) => {
        return contact.name
            .toLowerCase()
            .includes(name.toLowerCase());
    });
}