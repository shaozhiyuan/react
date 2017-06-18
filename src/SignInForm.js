/**
 * Created by 邵志远 on 2017/6/16.
 */
import React,{Component} from 'react';
export default class SignInForm extends Component{
    render(){
        return (
            <form className="signIn" onSubmit={this.props.onSubmit}>
                <div className="row">
                    <input type="text" value={this.props.formData.username}
                    onChange={this.props.onChange.bind(this,'username')}
                    placeholder="username" className="up username"/>
                </div>
                <div className="row">
                    <input type="password" value={this.props.formData.password}
                    onChange={this.props.onChange.bind(this,'password')}
                    placeholder="password" className="up password"/>
                </div>
                <div className="row actions">
                    <button type="submit">登入</button>
                    <a href="#" onClick={this.props.onForgotPassword.bind(this)} className="forget">忘记密码</a>
                </div>
            </form>
    )
    }
}