/**
 * Created by 邵志远 on 2017/6/16.
 */
import React,{Component} from 'react'

export default class ForgotPassword extends Component{
    render(){
        return (
            <div className="forgotPassword">
            <h3 className="resetPassword">重置密码</h3>
            <form className="forgotPassword" onSubmit={this.props.onSubmit}>
    <div className="row">
            <input type="text" value={this.props.formData.email} onChange={this.props.onChange.bind(this,'email')} placeholder="email" className="up"/>
            </div>
            <div className="row actions">
            <button type="submit">发送重置邮件</button>
            <a href="#" onClick={this.props.onSignIn.bind(this)}>返回登入</a>
        </div>
        </form>
        </div>
        )
    }
}