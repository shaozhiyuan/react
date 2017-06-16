/**
 * Created by 邵志远 on 2017/6/13.
 */
import React,{Component} from "react"

class TodoItem extends Component{
    render(){
        return (
            <div>
                <input type="checkbox" className="check"
        checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/>
               <span className="item">{this.props.todo.title}</span>
               <button onClick={this.delete.bind(this)} className="deletebtn">删除</button>
            </div>)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
}
export default TodoItem