// import axios from 'axios';
const main = document.querySelector('#root');
const productSrc = 'https://acme-users-api-rev.herokuapp.com/api/products';
const companySrc = 'https://acme-users-api-rev.herokuapp.com/api/companies';
const { Component } = React;
const { render } = ReactDOM;
const loader = () => {
    return React.createElement('div', null, 'fetching data...');
}

const item = (props) => {
    return React.createElement( 'li', null, props);
}

const List = (props) => {
    const lis = props.map ( (prop, idx) => React.createElement(item, { key:idx }));
    return React.createElement( 'ul', null, lis)

}
class App extends React.Component {
    constructor(){
        super();
        this.state = {
            products:[],
            companies:[],
            waitingProducts: true,
            waitingCompanies: true
        };
    }
    componentDidMount(){
        axios.get(productSrc)
            .then(response => {
                const products = response.data;
                this.setState({products, waitingProducts: false});
            });
        axios.get(companySrc)
            .then(response => {
                const companies = response.data;
                this.setState({companies, waitingCompanies: false});
            });
    }

    render(){
        const { products, companies, waitingProducts, waitingCompanies } = this.state;
        const productCount = products.length
        const companyCount = companies.length
        const title = React.createElement('h1', null, `ACME-We have ${productCount} Products and ${companyCount} Companies.`)
        const productList = products.map( product => React.createElement('li', { key : product.id}, product.name));
        const companyList = companies.map( company => React.createElement('li', { key: company.id}, company.name));
        const productDiv = React.createElement('div', {className:'product-list'}, productList);
        const companyDiv = React.createElement('div', {className:'company-list'}, companyList);
        return React.createElement('div',{className:'main'}, title, productDiv, companyDiv);  
    }
}
render(React.createElement(App), root);