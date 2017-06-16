/**
 * Created by 邵志远 on 2017/6/14.
 */
import AV from 'leancloud-storage'
var APP_ID = 'r5nKOz3kbi3df5NeKiNNMUvy-gzGzoHsz';
var APP_KEY = 'wIRij8WSqlVKpGBg7NYon4kn';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
export default AV
export function signUp(email,username, password, successFn, errorFn) {

    console.log(AV.User)

    var user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    },function (error) {
        errorFn.call(null, error)
    })
    return undefined
}
export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username,password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },function (error) {
        errorFn.call(null, error)
    })
}
export function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}
export function signOut() {
    AV.User.logOut()
    return undefined
}
export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
        errorFn.call(null,error)
    })
}
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}