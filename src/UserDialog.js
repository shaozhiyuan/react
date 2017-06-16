/**
 * Created by 邵志远 on 2017/6/15.
 */
import React, {Component} from "react";
import './UserDialog.css'
import {signUp, signIn,sendPasswordResetEmail} from './leanCloud'
export default class UserDialog extends Component{
    constructor(props){
        super();
        this.state={
            selected: 'signUp',
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
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
        let signUpForm = (
            <form className="sinUp" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                  <input type="text" value={this.state.formData.email}
        onChange={this.changeFormData.bind(this, 'email')}
        className="up email" placeholder="email"/>
                </div>
                <div className="row">
                    <input type="text" value={this.state.formData.username} onChange={this.changeFormData.bind(this,'username')} placeholder="username" className="up username"/>
                </div>
                <div className="row">
                    <input type="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this,'password')} placeholder="password" className="up password"/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>)
        let signInForm = (
            <form className="signIn">
                <div className="row">
                    <input type="text" value={this.state.formData.username} onChange={this.changeFormData.bind(this,'username')} placeholder="username" className="up username"/>
                </div>
                <div className="row">
                    <input type="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this,'password')} placeholder="password" className="up password"/>
                </div>
                <div className="row actions">
                    <button type="submit">登入</button>
                    <a href="#" onClick={this.showForgotPassword.bind(this)} className="forget">忘记密码</a>
                </div>
            </form>
        )
        let signInOrSignUp = (
            <div className="signInOrSignUp" >
                 <nav onChange={this.switch.bind(this)}>
                     <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.switch.bind(this)}/>注册</label>
                     <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.switch.bind(this)} placeholder="password"/> 登录</label>
                 </nav>
                 <div className="panes">
                     {this.state.selected==='signUp' ? signUpForm : null}
                     {this.state.selected==='signIn' ? signInForm : null}
                 </div>
            </div>
        )
        let forgotPassword = (
            <div className="forgotPassword">
                <h3 className="resetPassword">重置密码</h3>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <input type="text" value={this.state.formData.email} onChange={this.changeFormData.bind(this,'email')} placeholder="email" className="up"/>
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn.bind(this)}>返回登入</a>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab==="signInOrSignUp" ? signInOrSignUp : forgotPassword }
                </div>
            </div>
        )
    }
}