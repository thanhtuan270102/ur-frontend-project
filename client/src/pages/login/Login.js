import React from "react";
import "./Login.css";
import axios from 'axios';



import Document from "../tableDocument/DocumentTable";
  class Login extends React.Component {   
     
     constructor(props) {
        super(props); 
        this.state = {
            username: "",
            password: ""
        };
       
    }
 
    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    login = () => {
        const user = {
            email: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:8080/api/user/login', user)
            .then(response => {
                console.log(response.data);
                // Thêm logic chuyển trang tại đây
            })
            .catch(error => {
                console.error("Đăng nhập thất bại:", error);
            });
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"content"}>
                    <div className={"form"}>
                        <h2 className={"login_heading"}>Đăng nhập</h2>
                        <div className={"login_section"}>
                            <form>
                                <div className={"username"}>
                                    <input className={"user_input"} type={"text"} name="username" onChange={this.setParams} placeholder={" "}/>
                                    <label className={"label_username"}>Tên đăng nhập hoặc email</label>
                                </div>
                                <div className={"password"}>
                                    <input className={"password_input"} name="password" onChange={this.setParams} type={"password"} placeholder={" "}/>
                                    <label className={"label_password"}>Mật khẩu</label>
                                </div>
                                <div className={"remember"}>
                                    <input type={"checkbox"}/>
                                    <p>Nhớ mật khẩu</p>
                                </div>
                                <div className={"login_button"}>
                                    <button type={"button"} onClick={this.login}>Đăng nhập</button>
                                </div>
                                <div className={"forgot"}>
                                    <p className={"link_forgot"}>Quên mật khẩu?</p>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;