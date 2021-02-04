import './index.css';
export default function SlantedBackground ({id}){
    return (
        id === 'up'  ? <div id='up' className="slant" /> : <div id='down' className="slant"/>
    );
}