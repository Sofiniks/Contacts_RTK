import  {useEffect} from 'react';
import './MainApp.scss';
import {ThemeProvider} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from 'src/components/Layout';
import {ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage} from 'src/pages';
import { fetchContacts, fetchFavoriteContacts, fetchGroupContacts} from 'src/redux/contacts';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';

export const MainApp = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchFavoriteContacts());
    dispatch(fetchGroupContacts());
  }, [dispatch]);

  const contacts = useAppSelector(state => state.contacts.contacts);
  const favoriteContacts = useAppSelector(state => state.contacts.favoriteContacts);
  const groupContacts = useAppSelector(state => state.contacts.groupContacts);


  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ContactListPage
                contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
              />
            } />
            <Route path="contact">
              <Route index element={
                <ContactListPage
                  contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
                />
              } />
              <Route path=":contactId" element={
                <ContactPage
                  contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
                />
              } />
            </Route>
            <Route path="groups">
              <Route index element={
                <GroupListPage
                  contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
                />
              } />
              <Route path=":groupId" element={
                <GroupPage
                  contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
                />
              } />
            </Route>
            <Route path="favorit" element={
              <FavoritListPage
                contactsState={contacts}
                favoriteContactsState={favoriteContacts}
                groupContactsState={groupContacts}
              />
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
