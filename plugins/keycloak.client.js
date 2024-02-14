import Keycloak from 'keycloak-js';
export default defineNuxtPlugin(nuxtApp => {

    const config = useRuntimeConfig();
    let KEY_CLOAK_API_URL = config.public.KEY_CLOAK_API_URL
    let REALM = config.public.REALM
    let CLIENT_ID = config.public.CLIENT_ID

    const keycloak = new Keycloak({
        url: KEY_CLOAK_API_URL,
        realm: REALM,
        clientId: CLIENT_ID
    });

    keycloak.init({ onLoad: 'login-required' }).then(auth => {
        if (!auth) {
            alert("Not Authenticated")
        } else {
            sessionStorage.setItem("token",keycloak.token)
        }

        // Token Refresh
        setInterval(() => {
            keycloak.updateToken(70).then(refreshed => {
                if (refreshed) {
                    console.log('Token refreshed');
                }
            }).catch((e) => {
                console.log('Failed to refresh token');
            });
        }, 60000);
    }).catch((e) => {
        console.log(e)
        console.log("Authentication Failed");
    });

    nuxtApp.provide('keycloak', keycloak);
});
