export const setLatestNotificationToken = (token) => {
    localStorage.setItem('notification-token', token);
}

export const getLatestNotificationToken = () => {
    return localStorage.getItem('notification-token');
}