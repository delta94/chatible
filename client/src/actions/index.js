import axios from 'axios';
import socketGetter from '../socket';

export const fetchUserAndRecentContact = (history) => {
    return async dispatch => {
        Promise.all([
            axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }),
            axios.get('/api/room', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
        ]).then(([meRes, contactRes]) => {
            socketGetter.getInstance().emit('thisUserGoesOnline', { username: meRes.data.username });
            dispatch(fetchRecentContactSuccess(contactRes.data));
            dispatch(fetchUserSuccess(meRes.data));
            dispatch(setInitialActiveContact(contactRes.data.find(contact => contact.roomId === meRes.data.lastActiveContact) || contactRes.data[0]));
        }).catch(e => {
            console.log(e);
            dispatch(fetchUserFailure());
            dispatch(fetchRecentContactFailure());
            history.replace('/login');
        });
    }
}


export const fetchUserSuccess = (user) => ({
    type: 'FETCH_USER_SUCCESS',
    payload: user
});


export const fetchUserFailure = () => ({
    type: 'FETCH_USER_FAILURE'
});


export const unfetchRecentContact = () => ({
    type: 'UNFETCH_CONTACTS'
});


export const fetchRecentContactSuccess = (user) => ({
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: user
});


export const fetchRecentContactFailure = () => ({
    type: 'FETCH_CONTACTS_FAILURE'
});


export const updateContactStatusOnline = (username, lastLogin) => ({
    type: 'UPDATE_CONTACT_STATUS__ONLINE',
    payload: { username, lastLogin }
});


export const updateContactStatusOffline = (username, lastLogout) => ({
    type: 'UPDATE_CONTACT_STATUS__OFFLINE', 
    payload: { username, lastLogout }
});


export const setInitialActiveContact = (contact) => ({
    type: 'SET_ACTIVE_CONTACT',
    payload: contact
});


export const setActiveContact = (roomId) => {
    axios.post('/api/user/activeroom/' + roomId, {}, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
    return (dispatch, getState) => {
        const { recentContacts } = getState();
        const activeContact = recentContacts.find(contact => contact.roomId === roomId);
        dispatch({ type: 'SET_ACTIVE_CONTACT', payload: { ...activeContact } });
    }
}


export const changeColorTheme = (roomId, colorTheme) => ({
    type: 'CHANGE_COLOR_THEME',
    payload: { roomId, colorTheme }
});

export const updateSharedFiles = (roomId, fileInfo) => ({
    type: 'UPDATE_CONTACT_FILE',
    payload: { roomId, fileInfo }
});

export const updateSharedImages = (roomId, imageInfo) => ({
    type: 'UPDATE_CONTACT_IMAGE',
    payload: { roomId, imageInfo }
});