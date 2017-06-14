import React, { Component } from 'react';
// import logo from './logo.svg';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStore'


class App extends Component{
    constructor(){
        super();
        this.state={
            newTodo: "",
            todoList: localStore.load('todoList')||[]
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
                    <h2 className="logo">ToDoList</h2>
                    <TodoInput content={this.state.newTodo}
                    onChange={this.changeTitle.bind(this)}
                    onSubmit={this.addTodo.bind(this)}
                    />
                </div>
                <ol className="needtodo">
                   {todos}
                </ol>
            </div>)
    }
    componentDidUpdate(){
        localStore.save('todoList', this.state.todoList)
    }
    addTodo(event){
        this.state.todoList.push({
            id: idMaker(),
            title: event.target.value
        })
        this.setState({
            newTodo: "",
            todoList: this.state.todoList
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
        this.setState(this.state)
    }
    delete(event,todo){
        console.log(todo)
        todo.deleted=true
        this.setState(this.state)
    }

}

let id = 0

export default App
function idMaker(){
    id+=1;
    return id
}

