import Home from "./view/Home";
import Detail from "./view/Detail";
import Edit from "./view/Edit";
export default [{ name: 'Home', path: '/', component: Home },
{ name: 'Add', path: '/add', component: Edit },
{ name: 'Edit', path: '/edit', component: Edit },
{ name: 'Detail', path: '/detail', component: Detail }];