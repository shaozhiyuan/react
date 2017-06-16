/**
 * Created by 邵志远 on 2017/6/13.
 */
import React,{Component} from "react"

class TodoInput extends Component{
    render(){
        return <input type="text" className="ipt"
        value={this.props.content}
        onChange={this.changeTitle.bind(this)}
        placeholder="新建ToDo"
        onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key==="Enter"){
           this.props.onSubmit(e)
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}


export default TodoInput