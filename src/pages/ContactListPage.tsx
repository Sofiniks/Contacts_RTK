import { memo, useEffect } from "react";
import { CommonPageProps } from "./types";
import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { FilterForm, FilterFormValues } from "src/components/FilterForm";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { filterContacts } from "src/redux/contacts";

type ContactListPageProps = Pick<CommonPageProps, "groupContactsState">;

export const ContactListPage = memo<ContactListPageProps>(
	({ groupContactsState }) => {
		const dispatch = useAppDispatch();
		const filteredContacts = useAppSelector(
			(state) => state.contacts.filteredContacts
		);

		useEffect(() => {
			dispatch(filterContacts({}));
		}, [dispatch]);

		const onSubmit = (fv: Partial<FilterFormValues>) => {
			dispatch(filterContacts(fv));
		};

		return (
			<Row xxl={1}>
				<Col className='mb-3'>
					<FilterForm
						groupContactsList={groupContactsState}
						initialValues={{}}
						onSubmit={onSubmit}
					/>
				</Col>
				<Col>
					<Row xxl={4} className='g-4'>
						{filteredContacts.map((contact) => (
							<Col key={contact.id}>
								<ContactCard contact={contact} withLink />
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		);
	}
);
