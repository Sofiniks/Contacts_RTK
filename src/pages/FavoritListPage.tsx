import React, {memo, useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {ContactDto} from 'src/types/dto/ContactDto';

type FavoritListPageProps = Omit<CommonPageProps, 'groupContactsState'>;

export const FavoritListPage = memo<FavoritListPageProps>(({
  favoriteContactsState,
  contactsState
}) => {
  const [contacts, setContacts] = useState<ContactDto[]>([])
  useEffect(() => {
    setContacts(() => contactsState.filter(({id}) => favoriteContactsState.includes(id)));
  }, [contactsState, favoriteContactsState])
  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})
