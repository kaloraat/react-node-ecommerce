import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};
//User or Admin Dashboard
const dashboard = (history)=>{
    if(isAuthenticated()){
        let auhtor = isAuthenticated().user.role===1?"admin":"user";
        return(
            <li className="nav-item">
                <Link className="nav-link" style  = {isActive(history,`/${auhtor}/dashboard`)} 
                    to={`/${auhtor}/dashboard`}>
                    Dashboard
                </Link>
            </li>
      )}
}
//Signin and SignUp Menu
const SignMenu = (history)=>{
    const inOut = ["SignUp","Signin"];
    if(!isAuthenticated()){
       return inOut.map((index,data)=>{
            return (
            <li className="nav-item" key={index}>
                //Use template String here like to={`/${inOut[data]}`}
                <Link className="nav-link" to={'/${inOut[data]}'} style={isActive(history,'/${inOut[data]}')}>
                    {inOut[data]}
                </Link>
            </li>)
        })
    }
}
//Signout
const out = (history)=>{
    if(isAuthenticated()){
        return(
        <li className="nav-item">
            <span className="nav-link" style={{cursor:"pointer",color:"#fff",padding: "0.89rem 2rem"}}
                onClick = {()=>signout(()=>history.push("/"))}>
                SignOut
            </span>
        </li>
    )}
}
//Home Button
const title = (history)=>{
    return(
    <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history,"/")}>
            Home
        </Link>
    </li>)
}
//Shop
const shopmenu = (history)=>{
    return (
        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
            >
                Shop
            </Link>
       </li>
    )
}
//Cart
const cart = (history)=>{
    return (
        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
            >
                Cart{" "}
                <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                </sup>
            </Link>
       </li>
    )
}
const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            {title(history)}
            {shopmenu(history)}
            {cart(histroy)}
            {dashboard(history)}
            {SignMenu(history)}
            {out(history)}
        </ul>
    </div>
);

export default withRouter(Menu);
