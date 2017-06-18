/**
 * Created by 邵志远 on 2017/6/15.
 */
import React, {Component} from "react";
import './UserDialog.css'
import SignUpForm from './SignUpForm'
import {signUp, signIn,sendPasswordResetEmail} from './leanCloud'
import SignInForm from './SignInForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

export default class UserDialog extends Component{
    constructor(props){
        super();
        this.state={
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData
        let success = (user) =>{
            this.props.onSignUp.call(null.user)
            console.log("1")
        }
        let error = (error)=>{
            console.log("2")
            switch(error.code){
                case 125:
                    alert('电子邮箱地址无效')
                    break
                case 201:
                    alert('没有提供密码，或者密码为空')
                    break
                case 202:
                    alert('用户名已被占用')
                    break
                case 214:
                    alert('手机号码已被注册')
                    break
                case 204:
                    alert('没有提供电子邮箱地址')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email,username, password, success, error)
    }
    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error = (error)=>{
            switch(error.code){
                case 201:
                    alert('没有提供密码，或者密码为空')
                    break
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('找不到用户')
                    break
                case 213:
                    alert('手机号码对应的用户不存在')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = "forgotPassword"
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab==="signInOrSignUp" ?
                <SignInOrSignUp  onSignIn={this.signIn.bind(this)}
                    formData={this.state.formData}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}/> :
                <ForgotPasswordForm onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onSignIn={this.returnToSignIn.bind(this)}/> }
                </div>
            </div>
        )
    }
}