<template>
    <div @click="requestNotificationPermission" v-if="!subscribed"
        class="notification-wrapper cursor-pointer absolute right-8 bottom-16">
        <div class="phone">
            <img src="@/assets/Notifications.svg" alt="Activar Notificaciones">
        </div>
        <div class="circle1"></div>
        <div class="circle2"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subscribed: false
        }
    },
    mounted() {
        this.isSubscribed();
    },
    methods: {
        requestNotificationPermission() {
            Notification.requestPermission()
                .then(() => {
                    this.isSubscribed();
                })
                .catch((error) => {
                    this.isSubscribed();
                });
        },
        declineNotificationPermission() {
            this.$OneSignal.User.PushSubscription.optOut();
        },
        isSubscribed() {
            if (this.$OneSignal.User.PushSubscription.id != null || this.$OneSignal.User.PushSubscription.id != undefined) {
                return this.subscribed = true;
            } else {
                return this.subscribed = false;
            }
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.notification-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.phone {
    z-index: 2;
    background-color: #4e8f05;
    animation: phone-scale 1s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite alternate-reverse;
    display: grid;
    justify-content: center;
    align-items: center;
    border: 0.5px white solid;
    border-radius: 50%;
    padding: 5px;
}

.circle1,
.circle2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #5C832F;
    z-index: 1;
    animation: scaling 2s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite;
}

@keyframes scaling {
    0% {
        transform: translate(-50%, -50%) scale(1);
        background-color: #5C832F;
    }

    100% {
        transform: translate(-50%, -50%) scale(6);
        background-color: rgba(245, 0, 182, 0);
    }
}

@keyframes phone-scale {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.1);
    }
}

.circle1 {
    animation-delay: 0s;
}

.circle2 {
    animation-delay: 1s;
}
</style>
