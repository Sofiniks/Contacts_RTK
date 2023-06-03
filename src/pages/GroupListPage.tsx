import { memo } from "react";
import { CommonPageProps } from "./types";
import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";

type GroupListPageProps = Pick<CommonPageProps, "groupContactsState">;

export const GroupListPage = memo<GroupListPageProps>(
	({ groupContactsState }) => {
		return (
			<Row xxl={4}>
				{groupContactsState.map((groupContacts) => (
					<Col key={groupContacts.id}>
						<GroupContactsCard groupContacts={groupContacts} withLink />
					</Col>
				))}
			</Row>
		);
	}
);
