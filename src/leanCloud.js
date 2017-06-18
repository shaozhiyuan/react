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
export const TodoModel = {
    getByUser(user,successFn,errorFn){
        let query = new AV.Query('Todo')
        query.equalTo('deleted',false)
        query.find().then((response)=>{
            let array = response.map((t)=>{
                return {id: t.id, ...t.attributes}
                })
            successFn.call(null,array)
        },(error)=>{
            errorFn && errorFn.call(null, error)
        })
    },
    create({status, title, deleted}, successFn, errorFn){
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)
        let acl = new AV.ACL()
        acl.setPublicReadAccess(false)
        acl.setWriteAccess(AV.User.current(), true)
        acl.setReadAccess(AV.User.current(), true)

        todo.setACL(acl)

        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        });
    },
    update({id, title, status, deleted}, successFn, errorFn){
        let todo = AV.Object.createWithoutData('Todo', id)
        title !== undefined && todo.set('title', title)
        status !== undefined && todo.set('status', status)
        deleted !== undefined && todo.set('deleted', deleted)
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => errorFn && errorFn.call(null, error))
    },
    destory(todoId, successFn, errorFn){
        TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
    }

}

export function signUp(email,username,password,successFn,errorFn) {

    console.log(AV.User)
    var user = new AV.User()
    // if(email && username &&password ){
    //     emailCheck(email)
    //     usernameCheck(username)
    //     passwordCheck(password)
    // }else{
    //     alert('您的信息不完整')
    // }

    if(emailCheck(email) && usernameCheck(username) && passwordCheck(password)) {
        user.setUsername(username)
        user.setPassword(password)
        user.setEmail(email)
        user.signUp().then(function (loginedUser) {
            console.log(loginedUser);
            let user = getUserFromAVUser(loginedUser)
            successFn.call(null, user)
        }, function (error) {
            errorFn.call(null, error)
        })
    }
    return undefined
}
export function signIn (username, password, successFn, errorFn) {
    AV.User.logIn(username,password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },function (error) {
        errorFn.call(null, error)
    })
}
export function getCurrentUser (){
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}
export function signOut () {
    AV.User.logOut()
    return undefined
}
export function sendPasswordResetEmail (email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
        errorFn.call(null,error)
    })
}
function getUserFromAVUser (AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}
function emailCheck(email) {
    console.log()
    let reg = /[\w]+@[\w\.-]+/
    if(reg.test(email)){
        return true
    }else{
        alert('您的邮箱格式有误')
        return false
    }
}
function usernameCheck(username) {
    let reg = /^[a-zA-Z]*[\w]*/
    if(reg.test(username) && username.length>3){
        return true
    }else{
        alert('用户名格式错误')
        return false
    }
}
function passwordCheck(password) {
    if(password.length>6){
        return true
    }else{
        alert('密码必须不小于6个字符')
        return false
    }
}