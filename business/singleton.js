export default class FirstConnection {
    static instance

    constructor() {
        if(!FirstConnection.instance) {
            this.hour = new Date().toLocaleString()
            FirstConnection.instance = this
            console.log('Guardar hora')
        }
        else {
            console.log('Recuperar hora')
            return FirstConnection.instance
        }
    }
    getHour() {
        return this.hour
    }
}
