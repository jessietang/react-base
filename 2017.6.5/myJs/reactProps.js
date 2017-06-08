/**
 * Created by jessietang on 2017/6/5.
 */
var MessageBox = React.createClass({
    getInitialState: function(){
        return {
            messages: [
                'first',
                'second',
                'third'
            ],
            value: 'test'
        }
    },
    handleChange: function(e){
        this.setState({
           value: e.target.value
        });
    },
    render: function(){
        return (
            <div>
                <input type="text" onChange={this.handleChange}/>
                <p>{this.state.value}</p>
                <h2>{this.props.title}</h2>
                <SubMessage subMsg={this.state.messages}/>
            </div>
        )
    }
});

var SubMessage = React.createClass({
    propTypes: { // 验证组件实例的属性是否符合要求
        subMsg: React.PropTypes.array.isRequired
    },
    // getDefaultProps方法用来设置组件属性的默认值
    getDefaultProps: function(){ // 如果<SubMessage subMsg={this.state.messages}/>中没有传递subMsg，
        // 而是写成<SubMessage/>
        return {
            subMsg: ['aaa', 'bbb', 'ccc']
        }
    },
    render: function(){
        var subMsgs = [];
        this.props.subMsg.forEach(function(msg, index){
            subMsgs.push(<p>码农这样说：{index+1}. {msg}</p>)
        });
        return (
            <div>
                {subMsgs}
            </div>
        )
    }
});

var title = 'i am title, from props.';
ReactDOM.render(
    <MessageBox title={title}/>,
    document.getElementById('app')
)