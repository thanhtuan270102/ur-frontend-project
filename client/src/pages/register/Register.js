import React from "react";
import "./Register.css";

function Register() {
    return (
        <div className={"container"}>
            <div className={"header"}>
                {/*<Images/>*/}
            </div>
            <div className={"content"}>
                <div className={"form"}>
                    <h2 className={"login_heading"}>Đăng Kí</h2>
                    <div className={"login_section"}>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Tên người dùng</label>
                        </div>
                        <div className={"password"}>
                            <input className={"password_input"} type={"password"} placeholder={" "}/>
                            <label className={"label_password"}>Mật khẩu</label>
                        </div>
                        <div className={"password"}>
                            <input className={"password_input"} type={"password"} placeholder={" "}/>
                            <label className={"label_password"}>Xác nhận mật khẩu</label>
                        </div>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Email</label>
                        </div>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Số điện thoại</label>
                        </div>
                        <div className={"login_button"}>
                            <input type={"submit"} className={"login_button"} value={"Đăng kí"}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;