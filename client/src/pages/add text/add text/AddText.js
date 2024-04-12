import React from "react";
import "./AddText.css";
function AddText(){
    return (<div className={"container"}>
            <div className={"header"}>
                {/*<Images/>*/}
            </div>
            <div className={"content"}>
                <h2 className={"title"}>Thêm văn bản</h2>
                <div className={"element"}>
                    <label className={"label"}>Số hiệu văn bản:</label>
                    <input className={"input_text"} type={"text"}/>
                </div>
                <div className={"element"}>
                    <label className={"label"}>Ngày ban hành:</label>
                    <input className={"input_text"} type={"date"}/>
                </div>
                <div className={"element"}>
                    <label className={"label"}>Ghi chú:</label>
                    <input className={"input_text"} type={"text"}/>
                </div>
                <div className={"element"}>
                    <label className={"label"}>Cơ quan ban hành:</label>
                    <input className={"input_text"} type={"text"}/>
                </div>
                <div className={"element"}>
                    <label className={"label"}>Lĩnh vực:</label>
                    <input className={"input_text"} type={"text"}/>
                </div>
                <div className={"element"}>
                    <label className={"label"}>Đường dẫn:</label>
                    <input className={"input_text"} type={"text"}/>
                </div>
                <div className={"element"}>
                    <input className={"button"} type={"submit"} value={"Gửi"}/>
                </div>
            </div>
        </div>

    )
}

export default AddText;