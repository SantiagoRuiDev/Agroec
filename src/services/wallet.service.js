import instance from "../libs/axios.js";

export const getWalletStats = async () => {
    try {
        const {data} = await instance.get('/wallet', {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const rechargeWallet = async (monto, metodo) => {
    try {
        const {data} = await instance.post('/wallet/recharge', {monto_recarga: monto, metodo_pago: metodo}, {withCredentials: true})
        return data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
