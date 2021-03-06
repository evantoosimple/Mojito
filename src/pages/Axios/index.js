import React, {Component} from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

class Axios extends Component{
    constructor(props){
        super(props);

        this.state = {
            person : {}
        }
    }


    componentDidMount(){
        axios.interceptors.request.use(function (config) {
            console.log(config);

            config.params['addByInterceptor'] = '123';

            return config;
        }, function (error) {
            // Do something with request error
            console.error(error);
        });
    }

    fetch(){
        axios.get('http://localhost:9999/axios/get/100', {params : {id: 100}}).then((res)=>{
            this.setState({
                person : res.data
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    fetchParallel(){
        axios.all([
            axios.get('http://localhost:9999/axios/get/100'),
            axios.get('http://localhost:9999/axios/get/200')
        ]).then((res)=>{
            console.dir(res);
        });
    }

    render(){
        const {person} = this.state;


        return (
            <div className="m-page">
                <h3>Axios Demo</h3>
                <div>
                    <button onClick={::this.fetch}>Click me to send a request</button>
                    {
                        !_isEmpty(person) && <div>
                            <p>name : {person.name}</p>
                            <p>age : {person.age}</p>
                            <p>sex : {person.sex}</p>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={::this.fetchParallel}>click me to send a parallel request</button>
                    see console
                </div>
            </div>
        )
    }
}

export default Axios;