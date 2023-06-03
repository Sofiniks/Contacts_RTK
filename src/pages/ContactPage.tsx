import { FC, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactCard } from "src/components/ContactCard";
import { Empty } from "src/components/Empty";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { getContactById } from "src/redux/contacts";

export const ContactPage: FC = () => {
	const dispatch = useAppDispatch();
	const contact = useAppSelector((state) => state.contacts.contactById);
	const { contactId } = useParams<{ contactId: string }>();

	useEffect(() => {
		dispatch(getContactById(contactId));
	}, [contactId, dispatch]);

	return (
		<Row xxl={3}>
			<Col className={"mx-auto"}>
				{contact ? <ContactCard contact={contact} /> : <Empty />}
			</Col>
		</Row>
	);
};
