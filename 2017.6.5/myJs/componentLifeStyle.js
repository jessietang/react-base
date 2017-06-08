/**
 * Created by jessietang on 2017/6/5.
 */
var CompCycle = React.createClass({
        getInitialState: function(){
            console.log('getInitialState');
            return {
                message: 'hello, nice to meet you!',
                count: 0
            }
        },
        getDefaultProps: function(){
            console.log('getDefaultProps');
            return {};
        },
        componentWillMount: function(){
            console.log('componentWillMount');
            this.setState({
                message: 'Nice to meet you, too.'
            });
            var self = this;
            self.timer = setInterval(function(){
                self.setState({
                    count: self.state.count+1
                });
            }, 1000);
        },
        componentDidMount: function(){ /*这个地方适合做一些ajax操作， 获取值，然后再对dom进行一些操作*/
            console.log('componentDidMount');
        },
        componentWillUnmount: function(){ /*取消定时器，取消事件监听等*/
            alert('you are trying to kill me!');
            clearInterval(this.timer);
        },
        killMySelf: function(){
            ReactDOM.unmountComponentAtNode(document.getElementById('app'));
        },
        render: function(){
            console.log('render');
            // 开始渲染半天不对，报这里的div有错，后来发现是type="text/babel"没有写
            return (
                <div>
                    <h2>jessie...</h2>
                    <h2>replay: {this.state.message}</h2>
                    <h2>count: {this.state.count}</h2>
                    <button onClick={this.killMySelf}>卸载掉这个组件</button>
                </div>
            )
        }
});

ReactDOM.render(
<CompCycle/>,
    document.getElementById('app')
)