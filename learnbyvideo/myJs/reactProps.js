/**
 * Created by jessietang on 9/2/2016.
 */
var MessageBox = React.createClass({
    getInitialState: function(){
        return {
            messages: [
                '我是码农',
                '我会搬砖',
                '不说了，码代码去了。。。'
            ]
        }
    },
    render: function(){
        return (
            <div>
                <h2>{this.props.title}</h2>
                <SubMessage subMsg={this.state.messages}/>
            </div>

        )
    }
});

var SubMessage = React.createClass({
    propTypes: {
        subMsg: React.PropTypes.array.isRequired
    },
    getDefaultProps: function(){  // 如果<SubMessage subMsg={this.state.messages}/>中没有传递subMsg，
    // 而是写成<SubMessage/>
        return {
            subMsg: ['默认的子消息']
        }
    },
    render: function(){
        var subMsgs = [];
        this.props.subMsg.forEach(function(msg, index){
            subMsgs.push(<p>码农这样说：{index+1}.{msg}</p>);
        });
        return (
            <div>
                {subMsgs}
            </div>
        )
    }
});



var title = '我是title，来自props';
var messageBox = ReactDOM.render(
    <MessageBox title={title}/>,
    document.getElementById('app'),
    function(){
        alert('渲染完成！（我是可选参数，callback函数）');
    }
);