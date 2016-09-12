/**
 * Created by jessietang on 9/2/2016.
 */
var MessageBox = React.createClass({
    getInitialState: function(){
        return {
            isVisible: true,
            titleMessage: 'hello (from state!)'
        }
    },
    changeColor: function(){
    //永远不要直接的来改变this.state，(如果用了就必须要用forceUpdate()来强制render一下)
    // 而应该使用setState(), 这时， react会直接帮我们render一下
        this.setState({
            isVisible: !this.state.isVisible
        });
    },
    render: function(){
        var displayColor = {
            color: this.state.isVisible ? 'red' : 'blue'
        };
        return (
            <h1 style={displayColor} onClick={this.changeColor}>{this.state.titleMessage}</h1>
        )
    }
});


var ClickApp = React.createClass({
    getInitialState: function(){
        return {
            clickCount: 0
        }
    },
    handleClick: function(){
        this.setState({
            clickCount: this.state.clickCount + 1
        });
    },
    render: function(){
        return (
            <div>
                <h2>点击下面的按钮</h2>
                <button onClick={this.handleClick}>click me</button>
                <p>you have clicked it <b>{this.state.clickCount}</b> times.</p>
            </div>
        )
    }
});

var messageBox = ReactDOM.render(
    <MessageBox/>,
    document.getElementById('app'),
    function(){
        alert('已经渲染完成啦！');
    }
);

var clickApp = ReactDOM.render(
    <ClickApp/>,
    document.getElementById("clickApp"),
    function(){
        alert('渲染完成');
    }
);