import {memo, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { filterContacts, getGroupById } from 'src/redux/contacts';

export const GroupPage = memo(() => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.filteredContacts);
  const groupContacts = useAppSelector((state) => state.contacts.groupById);
  const {groupId} = useParams<{ groupId: string }>();

  useEffect(() => {
    dispatch(getGroupById(groupId));
    dispatch(filterContacts({groupId}));
  }, [groupId, dispatch]);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
});
