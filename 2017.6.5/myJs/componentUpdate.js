/**
 * Created by jessietang on 2017/6/5.
 */
var CompUpdate = React.createClass({
    getInitialState: function(){
        return {
            count: 0
        }
    },
    shouldComponentUpdate: function(nextPro, nextState){ // 组件判断是否重新渲染时调用
        console.log('shouldComponentUpdate');
        return true;
    },
    componentWillUpdate: function(){
        console.log('componentWillUpdate');
    },
    componentDidUpdate: function(){
        console.log('componentDidUpdate');
    },
    updateComp: function(){
        this.setState({
            count: this.state.count+1
        })
    },
    render: function(){
        console.log('render--渲染');
        return (
            <div>
                <h1>计数：{this.state.count}</h1>
                <h2>component update example</h2>
                <button onClick={this.updateComp}>手动更新组件（包括子组件哦）</button>
                <SubMessage count={this.state.count}/>
            </div>
        )
    }
});

var SubMessage = React.createClass({
    componentWillReceiveProps: function(nextProp){ // 已加载组件收到新的参数时调用
        console.log('子组件将要获得props');
    },
    shouldComponentUpdate: function(nextProp, nextState){ // 组件判断是否重新渲染时调用
        if(nextProp.count > 3){
            return false;
        }
        return true;
    },
    render: function(){
        return (
            <div>
                <h3>当前计数是： {this.props.count}</h3>
            </div>
        )
    }
});

ReactDOM.render(
    <CompUpdate/>,
    document.getElementById('app')
)