/**
 * Created by jessietang on 2017/6/5.
 */
var HelloWorld = React.createClass({
    getInitialState: function(){
        return {
            titleMessage: 'hello world!'
        }
    },
    alertMe: function(){
        alert('你刚才点了我一下。。。');
    },
    render: function(){
        var messages = [];
        for(var ii=0; ii<5; ii++){
            messages.push(<SubMessage/>);
        }
        return (
            <div>
                <h1 onClick={this.alertMe}>{this.state.titleMessage}</h1>
                {messages}
            </div>
        );
    }
});

var SubMessage = React.createClass({
    render: function(){
        return (
            <div>
                <h2>我是二级元素</h2>
            </div>
        )
    }
});

ReactDOM.render(
    <HelloWorld/>,
    document.getElementById('app'),
    function(){
        alert("渲染完成！");
    }
)