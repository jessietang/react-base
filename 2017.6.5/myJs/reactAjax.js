/**
 * Created by jessietang on 2017/6/6.
 */
var ReactAjax = React.createClass({
    getInitialState: function() {
        return {
            prizeName: [],
            rest: 100,
            loading: true,
            error: null,
            data: null
        };
    },
    // 组件的数据来源，通常是通过 Ajax 请求从服务器获取，
    // 可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI
    componentDidMount: function() { /*这个地方适合做一些ajax操作， 获取值，然后再对dom进行一些操作*/
        var data1 = {
            userId: 190,
            dataType: 'json'
        };
        // 这里用jquery完成ajax请求，所以在页面上要引入jquery库
        $.get(this.props.source1, data1, function(result) {
            if (this.isMounted()) {
                console.log(typeof result); // string
                var data = JSON.parse(result).data;
                var myNames = [];
                data.forEach(function(text, index){
                    myNames.push(data[index].prize.name);
                });
                this.setState({
                    prizeName: myNames
                });
            }
        }.bind(this));

        $.post(this.props.source2, {}, function(res){
            if (this.isMounted()) {
                console.log(typeof res); // string
                var res = JSON.parse(res);
                this.setState({
                    rest: '=='+res.data+'=='
                });
            }
        }.bind(this)); // 这里的bind不要忘了

        this.props.promise.then(
                value => this.setState({loading: false, data: value}),
                error => this.setState({loading: false, error: error})
        );
    },

    render: function() {
        if (this.state.loading) {
            $('#divTest').text('loading...');
        }else if (this.state.error !== null) {
            $('#divTest').text(`Error: ${this.state.error.message}`);
        }else{
            console.log(this.state.data);
            var repos = this.state.data.items;
            console.log(repos);
            var repoList = repos.map(function(repo, index){
                return (
                    <li key={index}>
                        <a href={repo.html_url}>{repo.name}</a>
                        ({repo.stargazers_count} stars) <br/> {repo.description}
                    </li>
                )
            });
        }
        return (
            <div>
                <p>获取到的奖项是： {this.state.prizeName}</p>
                <p>剩余{this.state.rest}张</p>
                <div id="divTest">{repoList}</div>
            </div>
        );
    }
});

ReactDOM.render(
    <ReactAjax source1="http://120.26.10.20:8080/truck/activity/findTop100UserPrizes"
        source2="http://120.26.10.20:8080/truck/coupon/countRecommendedDownloadRecord"
               promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>,
    document.body
);