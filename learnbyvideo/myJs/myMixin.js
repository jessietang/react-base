/**
 * Created by jessietang on 9/5/2016.
 */
var StateRecordMixin = {
    componentWillMount: function(){
        this.oldStates = [];
    },
    componentWillUpdate: function(nextProp, nextState){
        this.oldStates.push(nextState);
    },
    previousState: function(){
        var index = this.oldStates.length - 1;
        return index == -1 ? {} : this.oldStates[index];
    }

};

var MessageBox = React.createClass({
    mixins: [StateRecordMixin],
    getInitialState: function(){
        return {
            count: 0
        }
    },
    doUpdate: function(){
        this.setState({
            count: this.state.count+1
        });
        alert('上一次的计数是：'+this.previousState().count);
    },
    render: function(){
        return (
            <div>
                <h1>计数：{this.state.count}</h1>
                <button onClick={this.doUpdate}>手动更新一下组件（包括子组件哦）</button>
                <SubMessage count={this.state.count}/>
            </div>
        )
    }
});

var SubMessage = React.createClass({
    mixins: [StateRecordMixin],
    getInitialState: function(){
        return {
            count: 0
        }
    },
    componentWillReceiveProps: function(nextProp){
        this.setState({
            count: this.props.count * 2
        });
    },
    render: function(){
        console.log('上一次的计数是：'+this.previousState().count);
        return (
            <div>
                <h2>我是子元素哦</h2>
                <h2>当前子元素计数是： {this.state.count}</h2>
            </div>
        )
    }
});


ReactDOM.render(
    <MessageBox/>,
    document.getElementById('app')
);