/**
 * Created by jessietang on 9/2/2016.
 */
var HelloWorld = React.createClass({
    alertMe: function(){
        alert('你刚才点了我一下。。。');
    },
    getInitialState: function(){
        return {
            titleMessage:' hello world! '
        }
    },
    render: function(){
        var messages = [];
        for(var ii=0; ii<10; ii++){
            messages.push(<SubMessage/>);
        }
        return (
            <div>
                <h1 onClick={this.alertMe}>{this.state.titleMessage}</h1>
                {messages}
            </div>
        )
    }
});

var SubMessage = React.createClass({
    render: function(){
        return (
            <div>
                <h3>我是第二级元素</h3>
                <FooterMessgae/>
            </div>
        );
    }
});

var FooterMessgae = React.createClass({
    render: function(){
        return (<h5>我是第三季元素</h5>);
    }
});

ReactDOM.render(<HelloWorld/>,
    document.getElementById("app"),
    function(){  //callback function
        alert("渲染完成！");
    }
);