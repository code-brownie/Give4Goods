import React from 'react'
const Alerts = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        props.alert &&
        <div className={`alert alert-${props.alert.type.toLowerCase()} alert-dismissible fade show`}
            role="alert">
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.message}
        </div>
    );
}
export default Alerts
