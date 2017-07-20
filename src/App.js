import React, { Component } from 'react';
// import logo from './logo.svg';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'


class App extends Component{
    constructor(){
        super();
        this.state={
            user: getCurrentUser || {},
            newTodo: "",
            todoList: []
        }
        let user = getCurrentUser()
        if(user){
            TodoModel.getByUser(user,(todos)=>{
                let stateCopy=JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
            })
        }
    }
    render(){
        let todos = this.state.todoList.filter((item)=>!item.deleted)
                .map((item,index)=>{
            return (
                <li>
                  <span className="index">{index+1}</span>
                  <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                  onDelete={this.delete.bind(this)}/>
                </li>)
            })
        return (
            <div>
                <div className="header">
                    <h2 className="logo">MYToDoList {this.state.user.id ? <button className="getout" onClick={this.signOut.bind(this)}> 登出</button> : null }</h2>
                    <TodoInput content={this.state.newTodo}
                    onChange={this.changeTitle.bind(this)}
                    onSubmit={this.addTodo.bind(this)}
                    />
                </div>
                <ol className="needtodo">
                   {todos}
                </ol>
            {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)} onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
            </div>)
    }
    signOut(){
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user={}
        this.setState(stateCopy)
    }
    onSignUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }
    componentDidUpdate(){
    }
    addTodo(event){
       let newTodo ={
            title: event.target.value,
           status: '',
           deleted: false
        }
        TodoModel.create(newTodo,(id)=>{
            newTodo.id=id
            this.state.todoList.push(newTodo)
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
        },(error)=>{
            console.log(error)
        })
    }
    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }
    toggle(e,todo){
        todo.status=todo.status==="completed" ? "" : "completed"
        let oldStatus = todo.status
        TodoModel.update(todo,()=>{
            this.setState(this.state)
            },(error)=>{
            todo.status=oldStatus
            this.setState(this.state)
        })
    }
    delete(event,todo){
        console.log("jinlai l ")
        TodoModel.destroy(todo.id,()=>{
            console.log("delete l")
            todo.deleted = true
            this.setState(this.state)
        })

    }

}

let id = 0

export default App
function idMaker(){
    id+=1;
    return id
}

