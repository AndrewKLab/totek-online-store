import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false

        this._user = {}
        this._user_loading = false
        this._user_error = null

        makeAutoObservable(this)
    }

    setIsAuth(bool) {this._isAuth = bool}
    
    setUser(user) {this._user = user}
    setUserLoading(user_loading) {this._user_loading = user_loading}
    setUserError(user_error) {this._user_error = user_error}

    get isAuth() {return this._isAuth}

    get user() { return this._user }
    get user_loading() { return this._user_loading }
    get user_error() { return this._user_error }

}