import React from "react";
import { Outlet } from "react-router-dom";

function BlogPlaceholder() {
    return (
        <div >
            <Outlet />
        </div>
    );
}

export default BlogPlaceholder;